/* ============ Adriatico 62 — shared behaviour ============ */

/* ---------- i18n ---------- */
const I18N = {
en: {
  "nav.home":"Home","nav.rist":"Restaurant","nav.book":"Book now",
  "hero.eyebrow":"Cesenatico, Adriatic coast",
  "hero.title":"The art of seaside relaxation.",
  "hero.sub":"A private beach, sea-driven cuisine and sunset experiences — premium loungers, chef-driven food, all day into the night.",
  "hero.cta1":"Book your umbrella",
  "hero.cta2":"Reserve a table",
  "beach.eyebrow":"The Beach Club",
  "beach.title":"Space to actually stretch out.",
  "beach.p":"120 umbrellas and 280 loungers set with real distance between rows, VIP canopies on the front line, and 23 private cabins for anyone who wants to arrive, change, and disappear into the day.",
  "beach.stat1n":"120","beach.stat1l":"umbrellas",
  "beach.stat2n":"280","beach.stat2l":"king-size loungers",
  "beach.stat3n":"23","beach.stat3l":"private cabins",
  "beach.cta":"Discover the beach & VIP gazebos",
  "food.eyebrow":"Food & Mixology",
  "food.title":"Chef Davide Tusa, feet in the sand.",
  "food.p":"A kitchen that treats the beach seriously: raw fish, clean plating, a cocktail bar built for the hour before dinner.",
  "food.d1t":"Salmon poke",
  "food.d1p":"Marinated salmon, edamame, avocado, sesame, citrus dressing.",
  "food.d2t":"Tagliolini, colatura di alici",
  "food.d2p":"Hand-cut tagliolini, Cetara anchovy colatura, bottarga, lemon zest.",
  "food.d3t":"Timut pepper tuna",
  "food.d3p":"Seared tuna, Timut pepper crust, dark chocolate shavings, citrus reduction.",
  "food.cta":"See the full menu",
  "events.eyebrow":"Sunset & Nightlife",
  "events.title":"The next sunset starts in",
  "events.days":"days","events.hours":"hours","events.min":"min","events.sec":"sec",
  "events.listtitle":"Coming up",
  "events.cta":"Full events calendar",
  "sport.eyebrow":"Beach Arena & Active Life",
  "sport.title":"Play before you order the aperitivo.",
  "sport.p":"Four floodlit courts, board rental, and a morning session for anyone who wants to move before the sand gets hot.",
  "sport.book":"Book a court or a board",
  "footer.addr":"Address",
  "footer.hours":"Hours",
  "footer.hoursv":"Every day, 8:00 – 01:00 (Jun–Sep)",
  "footer.contact":"Contact",
  "footer.lang":"Language",
  "footer.rights":"All rights reserved.",
  "footer.privacy":"Privacy & cookie policy",
  "cookie.text":"We use technical and, with your consent, analytics cookies to improve your experience. No tracking before you choose.",
  "cookie.accept":"Accept all",
  "cookie.reject":"Only technical",
  "rist.eyebrow":"Restaurant & Panorama Terrace",
  "rist.title":"Dinner with your feet still a little sandy.",
  "rist.p":"A raised terrace over the water, candlelight after sunset, and a menu that moves between the sea and the chef's own signature.",
  "rist.tab1":"Starters & Poke",
  "rist.tab2":"First courses",
  "rist.tab3":"Main courses",
  "rist.tab4":"Veggie",
  "rist.tab5":"Wine & bollicine",
  "rist.cta":"Reserve the terrace",
  "book.eyebrow":"Reservations",
  "book.title":"Tell us where you want to be.",
  "book.p":"Pick a service, choose your slot, and we'll confirm by WhatsApp or email — no account needed.",
  "book.tab1":"Beach & gazebo",
  "book.tab2":"Restaurant table",
  "book.tab3":"Sport & SUP",
  "book.date":"Date","book.time":"Time","book.people":"People","book.name":"Full name",
  "book.phone":"Phone","book.email":"Email","book.notes":"Notes (optional)",
  "book.zone":"Zone","book.zone1":"Front row","book.zone2":"VIP gazebo","book.zone3":"Standard row",
  "book.zoneR1":"Terrace, sea view","book.zoneR2":"Beach level","book.zoneR3":"Candlelight (evening)",
  "book.sport":"Activity","book.sport1":"Beach volley court","book.sport2":"Footvolley court","book.sport3":"Racquet court","book.sport4":"SUP rental",
  "book.submit":"Send request",
  "book.note":"This is a request, not an automatic confirmation — no payment is taken here. Real-time availability and card payment require connecting Stripe / a beach-booking engine.",
  "book.confirm":"Thanks — your request is ready. Send it on WhatsApp or by email and the team will confirm your slot."
},
de: {
  "nav.home":"Startseite","nav.rist":"Restaurant","nav.book":"Jetzt buchen",
  "hero.eyebrow":"Cesenatico, Adriaküste",
  "hero.title":"Die Kunst der Entspannung am Meer.",
  "hero.sub":"Privater Strand, meeresbetonte Küche und Sunset-Erlebnisse — Premium-Liegen, Küche vom Chef, den ganzen Tag bis in die Nacht.",
  "hero.cta1":"Sonnenschirm buchen",
  "hero.cta2":"Tisch reservieren",
  "beach.eyebrow":"Der Beach Club",
  "beach.title":"Platz, um wirklich auszuspannen.",
  "beach.p":"120 Sonnenschirme und 280 Liegen mit echtem Abstand zwischen den Reihen, VIP-Baldachine in erster Reihe und 23 private Kabinen.",
  "beach.stat1n":"120","beach.stat1l":"Sonnenschirme",
  "beach.stat2n":"280","beach.stat2l":"King-Size-Liegen",
  "beach.stat3n":"23","beach.stat3l":"private Kabinen",
  "beach.cta":"Strand & VIP-Gazebos entdecken",
  "food.eyebrow":"Food & Mixology",
  "food.title":"Chef Davide Tusa, mit den Füßen im Sand.",
  "food.p":"Eine Küche, die den Strand ernst nimmt: rohe Fischgerichte, klares Plating, eine Cocktailbar für die Stunde vor dem Abendessen.",
  "food.d1t":"Lachs-Poke",
  "food.d1p":"Marinierter Lachs, Edamame, Avocado, Sesam, Zitrus-Dressing.",
  "food.d2t":"Tagliolini, Sardellen-Colatura",
  "food.d2p":"Handgeschnittene Tagliolini, Colatura aus Cetara, Bottarga, Zitronenzeste.",
  "food.d3t":"Thunfisch mit Timut-Pfeffer",
  "food.d3p":"Angebratener Thunfisch, Timut-Pfefferkruste, dunkle Schokoladenspäne, Zitrusreduktion.",
  "food.cta":"Ganze Speisekarte ansehen",
  "events.eyebrow":"Sunset & Nightlife",
  "events.title":"Der nächste Sonnenuntergang beginnt in",
  "events.days":"Tage","events.hours":"Std","events.min":"Min","events.sec":"Sek",
  "events.listtitle":"Demnächst",
  "events.cta":"Ganzer Eventkalender",
  "sport.eyebrow":"Beach Arena & Active Life",
  "sport.title":"Spielen, bevor der Aperitivo kommt.",
  "sport.p":"Vier beleuchtete Plätze, Board-Verleih und eine Morgeneinheit für alle, die sich bewegen wollen, bevor der Sand heiß wird.",
  "sport.book":"Platz oder Board buchen",
  "footer.addr":"Adresse",
  "footer.hours":"Öffnungszeiten",
  "footer.hoursv":"Täglich, 8:00 – 01:00 Uhr (Jun–Sep)",
  "footer.contact":"Kontakt",
  "footer.lang":"Sprache",
  "footer.rights":"Alle Rechte vorbehalten.",
  "footer.privacy":"Datenschutz & Cookie-Richtlinie",
  "cookie.text":"Wir verwenden technische und, mit Ihrer Zustimmung, Analyse-Cookies. Kein Tracking, bevor Sie zustimmen.",
  "cookie.accept":"Alle akzeptieren",
  "cookie.reject":"Nur technische",
  "rist.eyebrow":"Restaurant & Panoramaterrasse",
  "rist.title":"Abendessen mit noch etwas Sand an den Füßen.",
  "rist.p":"Eine erhöhte Terrasse über dem Wasser, Kerzenlicht nach Sonnenuntergang und eine Karte zwischen Meer und Chef-Signature.",
  "rist.tab1":"Vorspeisen & Poke",
  "rist.tab2":"Erste Gänge",
  "rist.tab3":"Hauptgänge",
  "rist.tab4":"Vegetarisch",
  "rist.tab5":"Wein & Bollicine",
  "rist.cta":"Terrasse reservieren",
  "book.eyebrow":"Reservierungen",
  "book.title":"Sagen Sie uns, wo Sie sein möchten.",
  "book.p":"Wählen Sie einen Service und einen Slot — wir bestätigen per WhatsApp oder E-Mail, kein Konto nötig.",
  "book.tab1":"Strand & Gazebo",
  "book.tab2":"Restauranttisch",
  "book.tab3":"Sport & SUP",
  "book.date":"Datum","book.time":"Uhrzeit","book.people":"Personen","book.name":"Name",
  "book.phone":"Telefon","book.email":"E-Mail","book.notes":"Anmerkungen (optional)",
  "book.zone":"Bereich","book.zone1":"Erste Reihe","book.zone2":"VIP-Gazebo","book.zone3":"Standardreihe",
  "book.zoneR1":"Terrasse, Meerblick","book.zoneR2":"Strandebene","book.zoneR3":"Kerzenlicht (abends)",
  "book.sport":"Aktivität","book.sport1":"Beachvolleyball-Platz","book.sport2":"Footvolley-Platz","book.sport3":"Racket-Platz","book.sport4":"SUP-Verleih",
  "book.submit":"Anfrage senden",
  "book.note":"Dies ist eine Anfrage, keine automatische Bestätigung — es wird keine Zahlung erhoben. Echtzeitverfügbarkeit und Kartenzahlung erfordern die Anbindung von Stripe / einem Strand-Buchungssystem.",
  "book.confirm":"Danke — Ihre Anfrage ist bereit. Senden Sie sie per WhatsApp oder E-Mail, das Team bestätigt Ihren Slot."
}
};

let currentLang = 'it';
const ITALIAN_CACHE = {}; // store original IT text so we can switch back

function initI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    ITALIAN_CACHE[key] = el.textContent;
  });
  document.querySelectorAll('.lang-switch button').forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(btn.dataset.lang));
  });
}

function setLang(lang){
  currentLang = lang;
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(lang === 'it'){ el.textContent = ITALIAN_CACHE[key]; return; }
    const dict = I18N[lang];
    if(dict && dict[key]) el.textContent = dict[key];
  });
  document.documentElement.setAttribute('lang', lang);
}

/* ---------- header scroll state ---------- */
function initHeader(){
  const header = document.querySelector('.site-header');
  if(!header) return;
  const onScroll = ()=> header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> nav.classList.remove('open')));
  }
}

/* ---------- countdown to next Saturday 19:00 ---------- */
function initCountdown(){
  const el = document.querySelector('[data-countdown]');
  if(!el) return;
  function nextSaturday(){
    const now = new Date();
    const d = new Date(now);
    const day = d.getDay();
    let add = (6 - day + 7) % 7;
    if(add === 0 && now.getHours() >= 19) add = 7;
    d.setDate(d.getDate() + add);
    d.setHours(19,0,0,0);
    return d;
  }
  const target = nextSaturday();
  function tick(){
    const diff = Math.max(0, target - new Date());
    const days = Math.floor(diff/86400000);
    const hours = Math.floor((diff%86400000)/3600000);
    const mins = Math.floor((diff%3600000)/60000);
    const secs = Math.floor((diff%60000)/1000);
    el.querySelector('[data-d]').textContent = String(days).padStart(2,'0');
    el.querySelector('[data-h]').textContent = String(hours).padStart(2,'0');
    el.querySelector('[data-m]').textContent = String(mins).padStart(2,'0');
    el.querySelector('[data-s]').textContent = String(secs).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- generic tabs (menu + booking) ---------- */
function initTabs(tabSelector, panelSelector){
  const tabs = document.querySelectorAll(tabSelector);
  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll(panelSelector).forEach(p=>p.classList.remove('active'));
      const target = document.querySelector(tab.dataset.target);
      if(target) target.classList.add('active');
    });
  });
}

/* ---------- booking form -> whatsapp handoff ---------- */
function initBookingForms(){
  document.querySelectorAll('form[data-booking]').forEach(form=>{
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const data = new FormData(form);
      const service = form.dataset.booking;
      let msg = `Ciao Adriatico 62! Vorrei prenotare: ${service}%0A`;
      for(const [k,v] of data.entries()){
        if(v) msg += `${k}: ${v}%0A`;
      }
      const waLink = form.querySelector('[data-wa-link]');
      if(waLink) waLink.href = `https://wa.me/390000000000?text=${msg}`;
      const mailLink = form.querySelector('[data-mail-link]');
      if(mailLink) mailLink.href = `mailto:info@adriatico62.it?subject=Richiesta%20prenotazione&body=${msg}`;
      const box = form.querySelector('.confirm-box');
      if(box) box.classList.add('show');
    });
  });
}

/* ---------- magnetic buttons ---------- */
function initMagneticButtons(){
  if(window.matchMedia('(pointer: coarse)').matches) return; // skip on touch
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove', e=>{
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate(${x*0.25}px, ${y*0.25}px)`;
    });
    btn.addEventListener('mouseleave', ()=>{ btn.style.transform=''; });
  });
}

/* ---------- quick booking widget (footer) -> jumps to the real booking form ---------- */
function initQuickBooking(){
  const form = document.getElementById('quick-booking-form');
  if(!form) return;
  const map = {
    beach:{tab:'#booking-beach', date:'#beach-date', people:'#beach-people'},
    restaurant:{tab:'#booking-restaurant', date:'#restaurant-date', people:'#restaurant-people'},
    sport:{tab:'#booking-sport', date:'#sport-date', people:'#sport-people'}
  };
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const type = document.getElementById('qb-type').value;
    const date = document.getElementById('qb-date').value;
    const people = document.getElementById('qb-people').value;
    const cfg = map[type];
    if(!cfg) return;
    const tabBtn = document.querySelector(`.booking-tab[data-target="${cfg.tab}"]`);
    if(tabBtn) tabBtn.click();
    const dateField = document.querySelector(cfg.date);
    const peopleField = document.querySelector(cfg.people);
    if(dateField && date) dateField.value = date;
    if(peopleField && people) peopleField.value = people;
    document.querySelector('#booking').scrollIntoView({behavior:'smooth', block:'start'});
  });
}

/* ---------- hero video fallback ---------- */
/* If the hero video file is missing/broken, hide the <video> so the
   section's own background-image (a real photo) shows through instead
   of a black/empty box. */
function initHeroVideoFallback(){
  document.querySelectorAll('.hero video').forEach(video=>{
    const hide = ()=>{ video.style.display='none'; };
    video.addEventListener('error', hide, true);
    video.querySelectorAll('source').forEach(src=> src.addEventListener('error', hide));
    // Also catch the case where the video loads metadata but has no playable frames.
    setTimeout(()=>{ if(video.readyState === 0) hide(); }, 4000);
  });
}

/* ---------- scroll reveal ---------- */
function initScrollReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  if(!('IntersectionObserver' in window)){
    items.forEach(el=> el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
  items.forEach(el=> io.observe(el));
}

/* ---------- cookie banner ---------- */
function initCookieBanner(){
  const banner = document.querySelector('.cookie-banner');
  if(!banner) return;
  setTimeout(()=> banner.classList.add('show'), 900);
  banner.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=> banner.classList.remove('show'));
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initI18n();
  initHeader();
  initCountdown();
  initTabs('.menu-tab','.menu-panel');
  initTabs('.booking-tab','.booking-form');
  initBookingForms();
  initHeroVideoFallback();
  initScrollReveal();
  initMagneticButtons();
  initQuickBooking();
  initCookieBanner();
});