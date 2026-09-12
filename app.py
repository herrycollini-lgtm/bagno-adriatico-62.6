import os
import itertools
from datetime import datetime
from flask import Flask, jsonify, render_template, request, session, redirect, url_for
from sqlalchemy import create_engine, String, Integer, DateTime, Text, select, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-change-this-secret-key')

DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///prenotazioni.db')
if DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql+psycopg://', 1)
elif DATABASE_URL.startswith('postgresql://'):
    DATABASE_URL = DATABASE_URL.replace('postgresql://', 'postgresql+psycopg://', 1)

engine_kwargs = {'pool_pre_ping': True}
if DATABASE_URL.startswith('sqlite'):
    engine_kwargs['connect_args'] = {'check_same_thread': False}
engine = create_engine(DATABASE_URL, **engine_kwargs)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

class Booking(Base):
    __tablename__ = 'bookings'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    date: Mapped[str] = mapped_column(String(10), index=True)
    time: Mapped[str] = mapped_column(String(5), index=True)
    name: Mapped[str] = mapped_column(String(120))
    phone: Mapped[str] = mapped_column(String(40))
    people: Mapped[int] = mapped_column(Integer)
    zone: Mapped[str] = mapped_column(String(30))
    tables: Mapped[str] = mapped_column(String(250))
    notes: Mapped[str] = mapped_column(Text, default='')
    status: Mapped[str] = mapped_column(String(20), default='confirmed')
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Setting(Base):
    __tablename__ = 'settings'
    key: Mapped[str] = mapped_column(String(50), primary_key=True)
    value: Mapped[str] = mapped_column(String(250))

Base.metadata.create_all(engine)

DEFAULT_SETTINGS = {'max_people': '200', 'reserve_enabled': '1'}
ADMIN_USER = os.environ.get('ADMIN_USER', 'UTENTE1')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', '123456')

with SessionLocal() as db:
    for k, v in DEFAULT_SETTINGS.items():
        if db.get(Setting, k) is None:
            db.add(Setting(key=k, value=v))
    db.commit()

# Normal restaurant tables. Reserve tables are kept separate so the staff can later decide how they are used.
TABLES = []
def add(zone, n, cap, foldable=False, reserve=False, tent=False):
    TABLES.append({'id': f'{zone}-{n}', 'zone': zone, 'number': n, 'capacity': cap,
                   'foldable': foldable, 'reserve': reserve, 'tent': tent})

add('A', 1, 2, True); add('A', 2, 2, True)
for n in range(3, 7): add('A', n, 4)
for n in range(1, 9): add('B', n, 4)
for n in range(1, 6): add('P', n, 6)
for n in range(1, 5): add('O', n, 4)
for n in range(1, 4): add('M', n, 3, True)
for n in range(1, 11): add('R', n, 2, True, True, n <= 5)
TABLE_MAP = {t['id']: t for t in TABLES}
NORMAL_ZONES = ['A', 'B', 'P', 'O', 'M', 'R']

# We model the stated rule as: combining n tables loses 2 places for every physical join.
def combo_capacity(combo):
    return sum(TABLE_MAP[x]['capacity'] for x in combo) - 2 * max(0, len(combo) - 1)

def table_is_booked(db, date, time, table_id):
    rows = db.scalars(select(Booking.tables).where(
        Booking.date == date, Booking.time == time, Booking.status == 'confirmed'
    )).all()
    return any(table_id in [x for x in r.split('+') if x] for r in rows)

def free_table_ids(db, date, time, include_reserve=True):
    rows = db.scalars(select(Booking.tables).where(
        Booking.date == date, Booking.time == time, Booking.status == 'confirmed'
    )).all()
    busy = set()
    for r in rows:
        busy.update(x for x in r.split('+') if x)
    return [t['id'] for t in TABLES if t['id'] not in busy and (include_reserve or not t['reserve'])]

def candidate_groups(db, date, time, people, include_reserve=True):
    free = set(free_table_ids(db, date, time, include_reserve=include_reserve))
    groups = []
    for zone in NORMAL_ZONES:
        ids = [t['id'] for t in TABLES if t['zone'] == zone and t['id'] in free]
        # Up to four physical tables keeps the customer choice understandable.
        for r in range(1, min(4, len(ids)) + 1):
            for combo in itertools.combinations(ids, r):
                if zone == 'M' and combo_capacity(combo) > 12:
                    continue
                cap = combo_capacity(combo)
                if cap >= people:
                    waste = cap - people
                    groups.append({'zone': zone, 'tables': list(combo), 'capacity': cap, 'waste': waste})
    # Prefer fewer tables, then less unused capacity, then non-reserve tables.
    groups.sort(key=lambda g: (len(g['tables']), g['waste'], any(TABLE_MAP[t]['reserve'] for t in g['tables'])))
    # Avoid flooding the customer with near-identical combinations.
    unique, seen = [], set()
    for g in groups:
        key = (g['zone'], tuple(g['tables']))
        if key in seen: continue
        seen.add(key); unique.append(g)
        if len(unique) >= 18: break
    return unique

def get_setting(db, key, default=None):
    row = db.get(Setting, key)
    return row.value if row else default

def is_admin():
    return session.get('admin') is True

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/admin')
def admin_page():
    if not is_admin():
        return render_template('login.html')
    return render_template('admin.html')

@app.post('/api/login')
def login():
    data = request.get_json(silent=True) or {}
    if data.get('username') == ADMIN_USER and data.get('password') == ADMIN_PASSWORD:
        session['admin'] = True
        return jsonify(ok=True)
    return jsonify(ok=False, error='Nome utente o password non validi.'), 401

@app.post('/api/logout')
def logout():
    session.clear()
    return jsonify(ok=True)

@app.get('/api/config')
def config():
    with SessionLocal() as db:
        max_people = int(get_setting(db, 'max_people', '200'))
        reserve_enabled = get_setting(db, 'reserve_enabled', '1') == '1'
    public_tables = [t for t in TABLES if reserve_enabled or not t['reserve']]
    return jsonify(max_people=max_people, tables=public_tables)

@app.get('/api/availability')
def availability():
    date = request.args.get('date', '')
    time = request.args.get('time', '')
    try:
        people = int(request.args.get('people', '0'))
    except ValueError:
        people = 0
    with SessionLocal() as db:
        max_people = int(get_setting(db, 'max_people', '200'))
        reserve_enabled = get_setting(db, 'reserve_enabled', '1') == '1'
        if not date or not time or people < 1:
            return jsonify(ok=False, error='Dati di disponibilità non completi.'), 400
        if people > max_people:
            return jsonify(ok=False, error=f'Il limite attuale è {max_people} persone al giorno.'), 400
        options = candidate_groups(db, date, time, people, include_reserve=reserve_enabled)
        total = db.scalar(select(func.coalesce(func.sum(Booking.people), 0)).where(
            Booking.date == date, Booking.status == 'confirmed')) or 0
        return jsonify(ok=True, daily_people=int(total), max_people=max_people, options=options)

@app.post('/api/bookings')
def create_booking():
    data = request.get_json(silent=True) or {}
    required = ['date', 'time', 'name', 'phone', 'people', 'zone', 'tables']
    if any(data.get(k) in (None, '') for k in required):
        return jsonify(ok=False, error='Compila tutti i campi obbligatori.'), 400
    try:
        people = int(data['people'])
    except (ValueError, TypeError):
        return jsonify(ok=False, error='Numero di persone non valido.'), 400
    tables = data['tables'] if isinstance(data['tables'], list) else []
    with SessionLocal() as db:
        max_people = int(get_setting(db, 'max_people', '200'))
        if people < 1 or people > max_people:
            return jsonify(ok=False, error=f'Numero persone non valido. Limite: {max_people}.'), 400
        if not tables or any(t not in TABLE_MAP for t in tables):
            return jsonify(ok=False, error='Combinazione tavoli non valida.'), 400
        if len(set(tables)) != len(tables):
            return jsonify(ok=False, error='Tavoli duplicati.'), 400
        # All selected tables must belong to same zone.
        zones = {TABLE_MAP[t]['zone'] for t in tables}
        if len(zones) != 1 or data['zone'] not in zones:
            return jsonify(ok=False, error='La combinazione dei tavoli non è valida.'), 400
        if data['zone'] == 'M' and combo_capacity(tables) > 12:
            return jsonify(ok=False, error='La zona M non può superare 12 posti.'), 400
        rows = db.scalars(select(Booking.tables).where(
            Booking.date == data['date'], Booking.time == data['time'], Booking.status == 'confirmed'
        )).all()
        busy = set()
        for r in rows: busy.update(x for x in r.split('+') if x)
        if any(t in busy for t in tables):
            return jsonify(ok=False, error='Uno dei tavoli è stato appena prenotato. Aggiorna la disponibilità.'), 409
        current = int(db.scalar(select(func.coalesce(func.sum(Booking.people), 0)).where(
            Booking.date == data['date'], Booking.status == 'confirmed')) or 0)
        if current + people > max_people:
            return jsonify(ok=False, error=f'Il limite giornaliero di {max_people} persone sarebbe superato.'), 409
        booking = Booking(date=data['date'], time=data['time'], name=str(data['name']).strip(),
                          phone=str(data['phone']).strip(), people=people, zone=data['zone'],
                          tables='+'.join(tables), notes=str(data.get('notes', '')).strip(), status='confirmed')
        db.add(booking); db.commit(); db.refresh(booking)
        return jsonify(ok=True, booking_id=booking.id, message='Prenotazione confermata.')

@app.get('/api/admin/bookings')
def admin_bookings():
    if not is_admin(): return jsonify(ok=False, error='Accesso admin richiesto.'), 403
    date = request.args.get('date')
    with SessionLocal() as db:
        stmt = select(Booking).order_by(Booking.date, Booking.time, Booking.id)
        if date: stmt = stmt.where(Booking.date == date)
        rows = db.scalars(stmt).all()
        return jsonify([booking_to_dict(b) for b in rows])

def booking_to_dict(b):
    return {'id': b.id, 'date': b.date, 'time': b.time, 'name': b.name, 'phone': b.phone,
            'people': b.people, 'zone': b.zone, 'tables': b.tables.split('+'), 'notes': b.notes,
            'status': b.status, 'created_at': b.created_at.isoformat() if b.created_at else ''}

@app.delete('/api/admin/bookings/<int:booking_id>')
def admin_delete(booking_id):
    if not is_admin(): return jsonify(ok=False, error='Accesso admin richiesto.'), 403
    with SessionLocal() as db:
        booking = db.get(Booking, booking_id)
        if not booking: return jsonify(ok=False, error='Prenotazione non trovata.'), 404
        booking.status = 'cancelled'; db.commit()
    return jsonify(ok=True)

@app.get('/api/admin/settings')
def admin_settings():
    if not is_admin(): return jsonify(ok=False, error='Accesso admin richiesto.'), 403
    with SessionLocal() as db:
        return jsonify(max_people=int(get_setting(db, 'max_people', '200')),
                       reserve_enabled=get_setting(db, 'reserve_enabled', '1') == '1')

@app.post('/api/admin/settings')
def save_settings():
    if not is_admin(): return jsonify(ok=False, error='Accesso admin richiesto.'), 403
    data = request.get_json(silent=True) or {}
    try:
        max_people = int(data.get('max_people'))
        if max_people < 1: raise ValueError
    except Exception:
        return jsonify(ok=False, error='Limite persone non valido.'), 400
    reserve_enabled = bool(data.get('reserve_enabled', True))
    with SessionLocal() as db:
        db.get(Setting, 'max_people').value = str(max_people)
        db.get(Setting, 'reserve_enabled').value = '1' if reserve_enabled else '0'
        db.commit()
    return jsonify(ok=True)

@app.get('/health')
def health():
    return 'OK', 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', '5000'))
    app.run(host='0.0.0.0', port=port, debug=False)
