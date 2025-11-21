/* =========================
   Data & Constants
   ========================= */
const ADVICE_BANK = {
  id: {
    happy: ["Bagus sekali! Sebarkan senyum ke orang sekitar, dunia jadi lebih cerah.","Kebahagiaanmu menular! Catat 3 hal kecil yang bikin kamu tersenyum hari ini.","Hari ini energimu luar biasa! Lakukan satu kebaikan random untuk orang lain.","Mantap! Rayakan kemenangan kecilmu dengan secangkir kopi/teh favorit.","Kamu sedang on fire! Gunakan momentum ini untuk menyelesaikan tugas yang ditunda.","Bahagia itu pilihan, dan kamu memilih dengan benar hari ini!","Jangan lupa foto atau tulis momen bahagia ini, nanti bisa jadi pengingat di hari sulit."],
    neutral: ["Hari yang tenang, sempurna untuk merapikan pikiran dan prioritas.","Netral itu bukan buruk. Ini waktu terbaik untuk refleksi dan perencanaan.","Coba dengarkan playlist favorit sambil jalan kaki 15 menit, pasti lebih segar.","Hari ini seperti kanvas kosong. Mau diapakan terserah kamu!","Kadang netral adalah awal dari sesuatu yang luar biasa.","Ambil napas dalam-dalam 5 kali, lalu mulai satu tugas kecil. Momentum akan datang sendiri."],
    sad: ["Peluk dirimu sendiri dulu. Tidak apa-apa merasa sedih, itu bagian dari manusia.","Hubungi satu orang yang selalu bisa membuatmu tersenyum, walau cuma chat sebentar.","Menangis itu melegakan. Setelah itu, minum air putih dan istirahat sebentar.","Sedih hari ini bukan berarti besok juga. Kamu kuat, selalu.","Tulis semua yang ada di pikiranmu di kertas, lalu sobek atau bakar (aman). Beban jadi ringan.","Dengerin lagu sedih dulu sampai habis, baru ganti ke lagu upbeat."],
    angry: ["Tarik napas dalam 4 detik, tahan 4 detik, buang 4 detik. Ulangi 5 kali.","Marah itu energi. Alihkan ke olahraga, push-up, atau nge-dance keras!","Jangan balas chat/menjawab saat emosi lagi naik. Tunggu 10 menit.","Tulis surat marah (tapi jangan kirim), lalu buang. Terapi yang ampuh.","Keluar rumah, teriak sekeras-kerasnya di tempat sepi. Legenda bilang ampuh."],
    tired: ["Power nap 10–20 menit adalah superpower. Coba sekarang.","Minum segelas air putih besar dulu, dehidrasi sering jadi penyebab lelah.","Mata lelah? Tutup mata, taruh telapak tangan hangat di kelopak mata 1 menit.","Dengar suara hujan atau white noise 5 menit, otak langsung rileks.","Hari ini boleh slow. Besok masih ada kok."]
  },
  en: {
    happy: ["Great job! Spread your smile, it brightens the world.","Your happiness is contagious! Note 3 things that made you smile today.","Your energy is amazing today! Do a random act of kindness.","Awesome! Celebrate your small wins with your favorite coffee/tea.","You're on fire! Use this momentum to tackle a pending task.","Happiness is a choice, and you nailed it today!","Don't forget to snap or jot down this happy moment for tough days."],
    neutral: ["A calm day, perfect for organizing your thoughts and priorities.","Neutral isn't bad. It's the best time for reflection and planning.","Listen to your favorite playlist and take a 15-minute walk, it'll refresh you.","Today is a blank canvas. What will you make of it?","Sometimes neutral is the start of something extraordinary.","Take 5 deep breaths, then start one small task. Momentum will follow."],
    sad: ["Give yourself a hug. It's okay to feel sad, it's human.","Text someone who always makes you smile, even just for a quick chat.","Crying is relieving. Then drink water and rest a bit.","Sad today doesn't mean sad tomorrow. You're strong, always.","Write down your thoughts on paper, then tear or burn it (safely). It lightens the load.","Listen to a sad song till it's done, then switch to something upbeat."],
    angry: ["Breathe in for 4 seconds, hold for 4, exhale for 4. Repeat 5 times.","Anger is energy. Channel it into exercise, push-ups, or a hard dance!","Don't reply or respond when emotions are high. Wait 10 minutes.","Write an angry letter (don't send it), then toss it. Super effective therapy.","Go outside, scream as loud as you can in a quiet place. Legend says it works."],
    tired: ["A 10–20 minute power nap is a superpower. Try it now.","Drink a big glass of water first, dehydration often causes fatigue.","Tired eyes? Close them, place warm palms over your eyelids for a minute.","Listen to rain sounds or white noise for 5 minutes, your brain will relax.","It's okay to go slow today. Tomorrow's still there."]
  }
};

const MOODS = {
  happy: {emoji:'😁', label:{id:'Bahagia',en:'Happy'}},
  neutral: {emoji:'😐', label:{id:'Netral',en:'Neutral'}},
  sad: {emoji:'😔', label:{id:'Sedih',en:'Sad'}},
  angry: {emoji:'😣', label:{id:'Marah',en:'Angry'}},
  tired: {emoji:'😴', label:{id:'Lelah',en:'Tired'}}
};

const KEYS = { themes: 'ec_theme_v2', moods:'ec_moods_v3', notes:'ec_notes_v3', prefs:'ec_prefs_v1' };
let language = 'id';
let selectedMood = null;
let current = new Date();
let lastOpenedDate = nowKey();

/* Helper */
function $(id){return document.getElementById(id);}
function nowKey(){return new Date().toISOString().slice(0,10);}
function load(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d;}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}

/* THEME SYSTEM */
const themes = {
  blue: {accent:'#2b7cff', bg1:'#eef6ff', bg2:'#f7fbff', logo:'#2b7cff'},
  purple: {accent:'#9d4edd', bg1:'#f3e8ff', bg2:'#faf5ff', logo:'#9d4edd'},
  green: {accent:'#2ecc71', bg1:'#e8f5e9', bg2:'#f1f8e9', logo:'#2ecc71'},
  pink: {accent:'#ff6bce', bg1:'#fce4ec', bg2:'#fff1f8', logo:'#ff6bce'},
  sunset: {accent:'#ff9a9e', bg1:'#fff0f2', bg2:'#fff7f9', logo:'#ff9a9e'},
  gold: {accent:'#ffd166', bg1:'#fffaf0', bg2:'#fffdf6', logo:'#ffd166'}
};

function applyTheme(name){
  const t = themes[name] || themes.blue;
  document.documentElement.style.setProperty('--accent', t.accent);
  document.documentElement.style.setProperty('--bg-2', t.bg1);
  document.documentElement.style.setProperty('--bg', t.bg2);
  document.querySelectorAll('.logo').forEach(l=>l.style.background=`linear-gradient(135deg,${t.logo}, ${t.logo}aa)`);
  save(KEYS.themes, name);
}

/* Dark Mode control (Soft Calm) */
function setDark(on){
  if(on) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  const prefs = load(KEYS.prefs,{});
  prefs.darkManual = on;
  save(KEYS.prefs,prefs);
  updateDarkToggle();
}
function updateDarkToggle(){
  const isDark = document.documentElement.classList.contains('dark');
  $('darkToggle').textContent = isDark ? '☀️' : '🌙';
}

/* Auto night setting (20:00-06:00) */
function applyAutoNight(){
  const prefs = load(KEYS.prefs,{});
  const auto = prefs.autoNight===undefined ? true : prefs.autoNight; // default true
  if(!auto) return;
  const hour = new Date().getHours();
  if(hour >= 20 || hour < 6) setDark(true);
  else if(!prefs.darkManual) setDark(false);
}

/* Splash behavior */
function showApp(){
  const splash = $('splash');
  if(splash){
    splash.style.opacity = '0';
    splash.style.pointerEvents = 'none';
    setTimeout(()=>splash.style.display = 'none', 380);
  }
  const app = $('app');
  app.classList.add('show');
  app.setAttribute('aria-hidden','false');
}
function showSplash(){
  const splash = $('splash');
  const app = $('app');
  app.classList.remove('show');
  app.setAttribute('aria-hidden','true');
  splash.style.display = 'flex';
  setTimeout(()=>{ splash.style.opacity = '1'; splash.style.pointerEvents = 'auto'; },10);
}

/* Init on load: theme + prefs + splash */
(function initThemeSplash(){
  const saved = load(KEYS.themes,null);
  const prefs = load(KEYS.prefs,{autoNight:true,darkManual:false});
  if(saved){
    applyTheme(saved);
    if(prefs.darkManual) setDark(true);
    else if(prefs.autoNight) applyAutoNight();
    document.getElementById('splash').style.display = 'none';
    showApp();
  } else {
    showSplash();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(prefersDark) document.getElementById('splash')?.classList.add('dim');
  }
})();

/* Splash selection handlers */
document.querySelectorAll('.theme-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const theme = btn.dataset.theme;
    applyTheme(theme);
    setTimeout(()=>{ showApp(); }, 220);
    applyAutoNight();
  });
});
$('skipSplash')?.addEventListener('click', ()=>{
  applyTheme('blue');
  showApp();
  applyAutoNight();
});
$('resetTheme')?.addEventListener('click', ()=>{
  localStorage.removeItem(KEYS.themes);
  location.reload();
});

/* =========================
   Calendar & Mood logic
   ========================= */
function renderCalendar(){
  const cal = $('calendar'); cal.innerHTML='';
  const year = current.getFullYear(), month = current.getMonth();
  const first = new Date(year,month,1);
  const todayKey = nowKey();

  $('monthLabel').textContent = first.toLocaleString(language==='id'?'id-ID':'en-US',{month:'long',year:'numeric'});

  // monday-first logic
  const startDay = (first.getDay() + 6) % 7; // Senin = 0
  for(let i=0;i<startDay;i++){
    cal.appendChild(document.createElement('div'));
  }

  const moods = load(KEYS.moods, {});
  const notes = load(KEYS.notes, {});
  const lastDate = new Date(year,month+1,0).getDate();

  for(let d=1;d<=lastDate;d++){
    const dateKey = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dayEl = document.createElement('div');
    dayEl.className = 'day';
    if(dateKey===todayKey) dayEl.classList.add('today');
    const moodEmoji = moods[dateKey] ? MOODS[moods[dateKey]].emoji : '';
    dayEl.innerHTML = `<div class="date-num">${d}</div><div class="emoji">${moodEmoji}</div>`;
    if(notes[dateKey] || moods[dateKey]) {
      const dot = document.createElement('div');
      dot.className = 'note-dot';
      dayEl.appendChild(dot);
    }
    dayEl.onclick = ()=>openModal(dateKey);
    cal.appendChild(dayEl);
  }
  renderPercentage();
  renderMoodSummary();
  updateCharts(); // update charts every render
}

/* Modal open / close */
function openModal(dateKey){
  $('modalRoot').style.display='flex';
  $('modalTitle').textContent = dateKey===nowKey() ? (language==='id'?'Pilih Mood Hari Ini':'Pick Today’s Mood') : (language==='id'?`Mood ${dateKey}`:`Mood for ${dateKey}`);
  selectedMood = {date:dateKey, mood:load(KEYS.moods,{})[dateKey]||null};
  lastOpenedDate = dateKey;

  document.querySelectorAll('.mood-card').forEach(c=>{
    c.classList.toggle('selected', c.dataset.mood===selectedMood.mood);
    const moods = ['happy','neutral','sad','angry','tired'];
    const idx = moods.indexOf(c.dataset.mood);
    c.querySelector('.small').textContent = language==='id' ? MOODS[moods[idx]].label.id : MOODS[moods[idx]].label.en;
  });

  // Set date input in modal and load note
  $('dateForModal').value = dateKey;
  const notes = load(KEYS.notes, {});
  $('modalNote').value = notes[dateKey] || '';
  // also set main noteInput to current date's note
  $('noteInput').value = notes[dateKey] || '';
}

function closeModal(){ $('modalRoot').style.display='none'; selectedMood=null; }

/* Save mood & note via modal */
$('modalSave').onclick = ()=>{
  if(!selectedMood || !selectedMood.mood){
    alert(language==='id'?'Pilih mood dulu ya!':'Please pick a mood!');
    return;
  }
  const data = load(KEYS.moods,{});
  data[selectedMood.date] = selectedMood.mood;
  save(KEYS.moods, data);

  // Simpan catatan
  const notes = load(KEYS.notes, {});
  const noteText = $('modalNote').value.trim();
  if(noteText) notes[selectedMood.date] = noteText;
  else delete notes[selectedMood.date];
  save(KEYS.notes, notes);

  // Animasi emoji terbang
  const modal = document.querySelector('.modal');
  const emoji = MOODS[selectedMood.mood].emoji;
  const fly = document.createElement('div');
  fly.className='emoji-fly';
  fly.textContent=emoji;
  fly.style.left=`${modal.offsetLeft + modal.offsetWidth/2}px`;
  fly.style.top=`${modal.offsetTop + modal.offsetHeight/2}px`;
  document.body.appendChild(fly);
  setTimeout(()=>fly.remove(),800);

  closeModal();
  renderCalendar();
  if(selectedMood.date===nowKey()) showRandomAdvice(selectedMood.mood);
};

/* Mood selection in modal */
document.querySelectorAll('.mood-card').forEach(card=>{
  card.onclick = ()=>{
    document.querySelectorAll('.mood-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected');
    selectedMood.mood = card.dataset.mood;
  };
});

/* close handlers */
$('closeModal').onclick = closeModal;
$('modalRoot').onclick = e=>{ if(e.target===e.currentTarget) closeModal(); };

/* Advice */
function showRandomAdvice(mood){
  const list = ADVICE_BANK[language][mood];
  const advice = list[Math.floor(Math.random()*list.length)];
  $('adviceBox').textContent = advice;
}
$('newAdvice').onclick = ()=>{
  const todayMood = load(KEYS.moods,{})[nowKey()];
  if(!todayMood){ alert(language==='id'?'Belum ada mood hari ini':'No mood for today yet'); return; }
  showRandomAdvice(todayMood);
};

/* Quick mood button */
$('quickMood').onclick = ()=> openModal(nowKey());

/* Mark today */
$('markToday').onclick = ()=> openModal(nowKey());

/* Navigation */
$('prev').onclick = ()=>{ current.setMonth(current.getMonth()-1); renderCalendar(); };
$('next').onclick = ()=>{ current.setMonth(current.getMonth()+1); renderCalendar(); };

/* Render percentages */
function renderPercentage(){
  const container = $('percentageContent'); container.innerHTML='';
  const data = load(KEYS.moods,{});
  const counts = {happy:0,neutral:0,sad:0,angry:0,tired:0};
  const year = current.getFullYear(), month = current.getMonth();
  const lastDate = new Date(year,month+1,0).getDate();

  for(let d=1;d<=lastDate;d++){
    const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    if(data[key]) counts[data[key]]++;
  }

  const total = Object.values(counts).reduce((a,b)=>a+b,0);
  Object.keys(counts).forEach(mood=>{
    const perc = total ? ((counts[mood]/total)*100).toFixed(1) : 0;
    const div = document.createElement('div');
    div.className='percentage-card';
    div.innerHTML = `
      <div style="font-size:24px">${MOODS[mood].emoji}</div>
      <div style="font-weight:700;font-size:16px;margin:4px 0">${perc}%</div>
      <div class="small">${language==='id'?MOODS[mood].label.id:MOODS[mood].label.en}</div>
    `;
    container.appendChild(div);
  });
}

/* Mood summary (separate small view) */
function renderMoodSummary(){
  const container = $('moodSummary'); container.innerHTML='';
  const data = load(KEYS.moods,{});
  const counts = {happy:0,neutral:0,sad:0,angry:0,tired:0};
  Object.keys(data).forEach(k=> counts[data[k]]++);
  const total = Object.values(counts).reduce((a,b)=>a+b,0);
  Object.keys(counts).forEach(mood=>{
    const perc = total ? ((counts[mood]/total)*100).toFixed(1) : 0;
    const div = document.createElement('div');
    div.className='percentage-card';
    div.innerHTML = `
      <div style="font-size:20px">${MOODS[mood].emoji}</div>
      <div style="font-weight:700;margin-top:6px">${perc}%</div>
      <div class="small">${language==='id'?MOODS[mood].label.id:MOODS[mood].label.en}</div>
    `;
    container.appendChild(div);
  });
}

/* Language switch */
$('lang').onchange = e=>{
  language = e.target.value;
  document.querySelectorAll('.mood-card').forEach((card,i)=>{
    const moods = ['happy','neutral','sad','angry','tired'];
    card.querySelector('.small').textContent = language==='id' ? MOODS[moods[i]].label.id : MOODS[moods[i]].label.en;
  });
  $('markToday').textContent = language==='id' ? 'Tandai Hari Ini' : 'Mark Today';
  $('newAdvice').textContent = language==='id' ? 'Saran Baru' : 'New Advice';
  $('reset').textContent = language==='id' ? 'Reset Data' : 'Reset Data';
  $('adviceBox').textContent = language==='id' ? 'Pilih mood hari ini untuk mendapatkan saran yang segar dan berbeda setiap kali!' : 'Pick today’s mood to get fresh and unique advice every time!';
  $('noteInput').placeholder = language==='id' ? 'Apa yang membuatmu merasakan mood ini hari ini?' : 'What made you feel this mood today?';
  renderCalendar();
};

/* Reset data */
$('reset').onclick = ()=>{
  if(confirm(language==='id'?'Yakin reset semua data?':'Reset all data?')){
    localStorage.removeItem(KEYS.moods);
    localStorage.removeItem(KEYS.notes);
    renderCalendar();
    $('adviceBox').textContent = language==='id'?'Data direset. Mulai lagi ya!':'Data reset. Start fresh!';
    $('noteInput').value = '';
  }
};

/* Save note (main note box) — per lastOpenedDate */
$('noteInput').addEventListener('input', ()=>{
  if(!lastOpenedDate) return;
  const notes = load(KEYS.notes,{});
  const noteText = $('noteInput').value.trim();
  if(noteText) notes[lastOpenedDate] = noteText;
  else delete notes[lastOpenedDate];
  save(KEYS.notes, notes);
  // update calendar dot
  renderCalendar();
});

/* Dark toggle button */
$('darkToggle').onclick = ()=>{
  const isDark = document.documentElement.classList.contains('dark');
  setDark(!isDark);
};

/* On load: apply saved theme and prefs */
(function initApp(){
  const savedTheme = load(KEYS.themes,null);
  if(savedTheme) applyTheme(savedTheme);
  const prefs = load(KEYS.prefs,{autoNight:true,darkManual:false});
  if(prefs.autoNight===undefined) prefs.autoNight = true;
  save(KEYS.prefs,prefs);
  if(prefs.darkManual) setDark(true);
  applyAutoNight();
  updateDarkToggle();

  document.querySelectorAll('.mood-card').forEach((card,i)=>{
    const moods = ['happy','neutral','sad','angry','tired'];
    card.querySelector('.small').textContent = language==='id' ? MOODS[moods[i]].label.id : MOODS[moods[i]].label.en;
  });

  renderCalendar();
  const todayMood = load(KEYS.moods,{})[nowKey()];
  if(todayMood) showRandomAdvice(todayMood);
})();

/* Keyboard shortcut: press M to open today mood modal */
window.addEventListener('keydown',(e)=>{
  if(e.key.toLowerCase()==='m' && document.activeElement.tagName.toLowerCase()!=='input' && document.activeElement.tagName.toLowerCase()!=='textarea'){
    openModal(nowKey());
  }
});

/* =========================
   Charts (Chart.js)
   ========================= */

const moodColors = {
  happy: '#FFD166',
  neutral: '#94A3B8',
  sad: '#60A5FA',
  angry: '#FB7185',
  tired: '#B794F4'
};

let monthlyChart = null;
let weeklyChart = null;

function getMonthlyCounts(year,month){
  const data = load(KEYS.moods,{});
  const counts = {happy:0,neutral:0,sad:0,angry:0,tired:0};
  const lastDate = new Date(year,month+1,0).getDate();
  for(let d=1;d<=lastDate;d++){
    const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    if(data[key]) counts[data[key]]++;
  }
  return counts;
}

function getWeeklyCounts(){
  const data = load(KEYS.moods,{});
  const counts = {happy:0,neutral:0,sad:0,angry:0,tired:0};
  for(let i=6;i>=0;i--){
    const date = new Date();
    date.setDate(date.getDate()-i);
    const key = date.toISOString().slice(0,10);
    if(data[key]) counts[data[key]]++;
  }
  return counts;
}

function initMonthlyChart(){
  const ctx = document.getElementById('monthlyChart').getContext('2d');
  const labels = Object.keys(MOODS).map(k=> language==='id' ? MOODS[k].label.id : MOODS[k].label.en);
  const counts = Object.values(getMonthlyCounts(current.getFullYear(), current.getMonth()));
  const colors = Object.keys(MOODS).map(k=> moodColors[k]);

  if(monthlyChart) monthlyChart.destroy();
  monthlyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: language==='id' ? 'Jumlah hari' : 'Days count',
        data: counts,
        backgroundColor: colors,
        borderRadius:6
      }]
    },
    options: {
      responsive:true,
      maintainAspectRatio:false,
      scales: {
        x: { grid: { display:false } },
        y: { beginAtZero:true, ticks: { precision:0 } }
      },
      plugins: { legend:{ display:false } }
    }
  });
}

function initWeeklyChart(){
  const ctx = document.getElementById('weeklyChart').getContext('2d');
  const labels = Object.keys(MOODS).map(k=> language==='id' ? MOODS[k].label.id : MOODS[k].label.en);
  const counts = Object.values(getWeeklyCounts());
  const colors = Object.keys(MOODS).map(k=> moodColors[k]);

  if(weeklyChart) weeklyChart.destroy();
  weeklyChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: counts,
        backgroundColor: colors,
        hoverOffset:8
      }]
    },
    options: {
      responsive:true,
      maintainAspectRatio:false,
      plugins: {
        legend:{ position: 'bottom' }
      }
    }
  });
}

/* update charts (call when data or month changes) */
function updateCharts(){
  try{
    initMonthlyChart();
    initWeeklyChart();
  }catch(e){
    console.warn('Chart init error', e);
  }
}

/* Toggle chart views */
$('viewMonthly').onclick = ()=>{
  $('monthlyWrap').style.display='block';
  $('weeklyWrap').style.display='none';
};
$('viewWeekly').onclick = ()=>{
  $('monthlyWrap').style.display='none';
  $('weeklyWrap').style.display='block';
};

/* Update charts after mood save */
(function hookMoodSaveUpdate(){
  const originalSave = save;
  window.save = function(k,v){
    originalSave(k,v);
    if(k === KEYS.moods) {
      setTimeout(()=>{ renderCalendar(); updateCharts(); }, 80);
    }
  };
})();

/* Back to Theme button */
$('backToTheme').onclick = ()=>{
  showSplash();
};

/* ensure charts update on initial load */
window.addEventListener('load', ()=>{ setTimeout(()=>{ updateCharts(); }, 250); });

/* =========================
   PDF Export (Range) - Premium
   ========================= */

function openPdfRangeModal(){
  const notes = load(KEYS.notes,{});
  const keys = Object.keys(notes).sort();
  const start = keys[0] || nowKey();
  const end = keys[keys.length-1] || nowKey();
  $('pdfStart').value = start;
  $('pdfEnd').value = end;
  $('pdfRangeModal').style.display = 'flex';
}
$('pdfExportBtn').onclick = openPdfRangeModal;
$('closePdfRange').onclick = ()=> $('pdfRangeModal').style.display = 'none';

$('doPdfExport').onclick = async ()=>{
  const s = $('pdfStart').value;
  const e = $('pdfEnd').value;
  if(!s || !e){ alert('Pilih tanggal mulai & akhir'); return; }
  $('pdfRangeModal').style.display = 'none';
  await generatePdf(s,e);
};

$('pdfExportThisMonth').onclick = async ()=>{
  const year = current.getFullYear(), month = current.getMonth()+1;
  const start = `${year}-${String(month).padStart(2,'0')}-01`;
  const end = new Date(year,month,0).toISOString().slice(0,10);
  await generatePdf(start,end);
};

/* Premium PDF generator: header, table of notes+mood, and chart snapshot */
async function generatePdf(startDate, endDate){
  const notes = load(KEYS.notes,{});
  const moods = load(KEYS.moods,{});
  // filter keys in range
  const keys = Object.keys(notes).concat(Object.keys(moods)).filter((v,i,a)=>a.indexOf(v)===i).sort().filter(k=> k>=startDate && k<=endDate);

  if(keys.length===0){
    if(!confirm('Tidak ada data di rentang ini. Tetap buat PDF kosong?')) return;
  }

  // create jsPDF instance
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 36;
  let y = 60;

  // Header (premium)
  doc.setFillColor(43,124,255);
  doc.rect(0,0,pageWidth,56,'F');
  doc.setFontSize(16);
  doc.setTextColor(255,255,255);
  doc.text('Emotion Calendar — Laporan', margin, 38);

  doc.setFontSize(10);
  doc.setTextColor(80,80,80);
  doc.text(`Rentang: ${startDate} — ${endDate}`, margin, y);
  y += 18;

  // Add chart snapshot (capture chartArea)
  try{
    const chartArea = document.getElementById('chartArea');
    const canvas = await html2canvas(chartArea, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const imgW = pageWidth - margin*2;
    const imgH = (canvas.height * imgW) / canvas.width;
    doc.addImage(imgData, 'PNG', margin, y, imgW, imgH);
    y += imgH + 12;
  }catch(err){
    console.warn('Chart capture failed', err);
  }

  // Table-like notes
  doc.setFontSize(11);
  doc.setTextColor(20,20,20);
  const lineHeight = 14;
  for(let k of keys){
    if(y > doc.internal.pageSize.getHeight() - 80){
      doc.addPage();
      y = 60;
    }
    const mood = moods[k] ? moods[k] : null;
    const moodLabel = mood ? (language==='id' ? MOODS[mood].label.id : MOODS[mood].label.en) : '-';
    const emoji = mood ? MOODS[mood].emoji : '';
    const note = notes[k] || '';
    // left: date | middle: mood emoji+label | right: note (wrapped)
    doc.setFontSize(10);
    doc.text(k, margin, y);
    doc.text(`${emoji} ${moodLabel}`, margin + 90, y);
    // wrap note into width
    const noteWidth = pageWidth - margin*2 - 200;
    const splitted = doc.splitTextToSize(note, noteWidth);
    doc.text(splitted, margin + 200, y);
    y += Math.max(lineHeight, splitted.length * lineHeight);
    y += 6;
  }

  // watermark on each page (light)
  const totalPages = doc.internal.getNumberOfPages();
  for(let i=1;i<=totalPages;i++){
    doc.setPage(i);
    doc.setFontSize(50);
    doc.setTextColor(0,0,0,0.03);
    doc.text('Emotion Calendar', pageWidth - 200, doc.internal.pageSize.getHeight() - 30, { angle: -22 });
  }

  // save
  doc.save(`Laporan_Mood_${startDate}_to_${endDate}.pdf`);
}

/* small utility: allow date change in modal to open that date */
$('dateForModal').addEventListener('change', (e)=>{
  const val = e.target.value;
  if(!val) return;
  lastOpenedDate = val;
  const notes = load(KEYS.notes,{});
  $('modalNote').value = notes[val] || '';
});

/* close pdf modal when clicking outside */
$('pdfRangeModal').onclick = (e)=>{ if(e.target===e.currentTarget) $('pdfRangeModal').style.display='none'; };

/* close modal click outside */
$('modalRoot').onclick = (e)=>{ if(e.target===e.currentTarget) closeModal(); };

/* ensure noteInput reflects clicks from calendar (renderCalendar sets lastOpenedDate in openModal) */
(function hookNoteInputSave(){
  // nothing else required; input listener saves to lastOpenedDate
})();