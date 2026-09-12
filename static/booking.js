(function(){
  const form = document.getElementById('booking-restaurant');
  if(!form) return;
  const date = document.getElementById('restaurant-date');
  const time = document.getElementById('restaurant-time');
  const people = document.getElementById('restaurant-people');
  const optionsBox = document.getElementById('table-options');
  const selectedBox = document.getElementById('selected-table');
  const details = document.getElementById('restaurant-details');
  const message = document.getElementById('restaurant-message');
  const showBtn = document.getElementById('show-table-options');
  const confirmBtn = document.getElementById('confirm-restaurant');
  let selected = null;

  const today = new Date();
  date.min = new Date(today.getTime() - today.getTimezoneOffset()*60000).toISOString().slice(0,10);

  function esc(s){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function clearSelection(){ selected=null; selectedBox.innerHTML=''; details.classList.add('hidden'); }

  async function showOptions(){
    clearSelection(); message.classList.remove('show'); message.innerHTML='';
    if(!date.value || !time.value || !people.value){
      message.innerHTML='<p>Inserisci data, orario e numero di persone.</p>'; message.classList.add('show'); return;
    }
    showBtn.disabled=true; showBtn.textContent='Controllo disponibilità…';
    try{
      const r = await fetch(`/api/availability?date=${encodeURIComponent(date.value)}&time=${encodeURIComponent(time.value)}&people=${encodeURIComponent(people.value)}`);
      const data = await r.json();
      if(!r.ok){ throw new Error(data.error || 'Impossibile verificare la disponibilità.'); }
      if(!data.options.length){
        optionsBox.innerHTML='<div class="availability-empty">Non c’è una combinazione disponibile per questo numero di persone in una singola zona a questo orario.</div>';
        return;
      }
      optionsBox.innerHTML = '<h3 class="booking-choice-title">Scegli dove sederti</h3>' + data.options.map((o,i)=>{
        const reserve = o.tables.some(t=>t.startsWith('R-'));
        const names = o.tables.map(t=>t.replace('-', ' · Tavolo ')).join(' + ');
        return `<button type="button" class="table-option" data-index="${i}">
          <span><b>Zona ${esc(o.zone)}</b><small>${esc(names)}${reserve?' · Riserva':''}</small></span>
          <strong>${o.capacity} posti</strong>
        </button>`;
      }).join('');
      optionsBox.querySelectorAll('.table-option').forEach(btn=>btn.addEventListener('click',()=>{
        selected=data.options[Number(btn.dataset.index)];
        optionsBox.querySelectorAll('.table-option').forEach(x=>x.classList.remove('selected'));
        btn.classList.add('selected');
        selectedBox.innerHTML=`<div class="selected-summary"><b>Scelta:</b> Zona ${esc(selected.zone)} — ${esc(selected.tables.join(' + '))} · ${selected.capacity} posti disponibili.</div>`;
        details.classList.remove('hidden');
      }));
    }catch(e){
      message.innerHTML=`<p>${esc(e.message)}</p>`; message.classList.add('show');
    }finally{
      showBtn.disabled=false; showBtn.textContent='Mostra tavoli disponibili';
    }
  }

  async function confirm(){
    if(!selected){ message.innerHTML='<p>Prima scegli una combinazione di tavoli.</p>'; message.classList.add('show'); return; }
    const name=document.getElementById('restaurant-name').value.trim();
    const phone=document.getElementById('restaurant-phone').value.trim();
    const notes=document.getElementById('restaurant-notes').value.trim();
    if(!name || !phone){ message.innerHTML='<p>Inserisci nome e telefono.</p>'; message.classList.add('show'); return; }
    confirmBtn.disabled=true; confirmBtn.textContent='Conferma in corso…';
    try{
      const r=await fetch('/api/bookings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        date:date.value,time:time.value,people:Number(people.value),name,phone,notes,zone:selected.zone,tables:selected.tables
      })});
      const data=await r.json();
      if(!r.ok) throw new Error(data.error || 'Prenotazione non riuscita.');
      message.innerHTML=`<p><strong>Prenotazione confermata.</strong><br>Zona ${esc(selected.zone)}, ${esc(selected.tables.join(' + '))}, ${esc(people.value)} persone alle ${esc(time.value)}.</p>`;
      message.classList.add('show');
      confirmBtn.textContent='Prenotazione confermata';
      showBtn.disabled=true;
    }catch(e){
      message.innerHTML=`<p>${esc(e.message)}</p>`; message.classList.add('show'); confirmBtn.disabled=false; confirmBtn.textContent='Conferma prenotazione';
    }
  }

  showBtn.addEventListener('click',showOptions);
  confirmBtn.addEventListener('click',confirm);
})();
