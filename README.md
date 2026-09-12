# Bagno Adriatico 62 — sito + prenotazioni online

Questa versione unisce il sito esistente a un backend Flask con database SQL.

## Avvio locale

```bash
pip install -r requirements.txt
python app.py
```

Apri http://127.0.0.1:5000

Admin: http://127.0.0.1:5000/admin

Credenziali predefinite:
- username: UTENTE1
- password: 123456

## Produzione

Variabili consigliate:
- DATABASE_URL = URL PostgreSQL
- SECRET_KEY = stringa casuale lunga
- ADMIN_USER = UTENTE1
- ADMIN_PASSWORD = 123456

Start command:
`gunicorn app:app`
