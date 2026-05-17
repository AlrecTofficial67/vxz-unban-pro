const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const COUNTRIES = [
  {f:'🇮🇩',c:'+62',n:'Indonesia'},{f:'🇲🇾',c:'+60',n:'Malaysia'},{f:'🇸🇬',c:'+65',n:'Singapura'},
  {f:'🇵🇭',c:'+63',n:'Filipina'},{f:'🇹🇭',c:'+66',n:'Thailand'},{f:'🇻🇳',c:'+84',n:'Vietnam'},
  {f:'🇧🇳',c:'+673',n:'Brunei'},{f:'🇲🇲',c:'+95',n:'Myanmar'},{f:'🇰🇭',c:'+855',n:'Kamboja'},
  {f:'🇱🇦',c:'+856',n:'Laos'},{f:'🇹🇱',c:'+670',n:'Timor Leste'},
  {f:'🇺🇸',c:'+1',n:'Amerika Serikat'},{f:'🇬🇧',c:'+44',n:'Inggris'},{f:'🇦🇺',c:'+61',n:'Australia'},
  {f:'🇨🇦',c:'+1',n:'Kanada'},{f:'🇳🇿',c:'+64',n:'Selandia Baru'},
  {f:'🇮🇳',c:'+91',n:'India'},{f:'🇵🇰',c:'+92',n:'Pakistan'},{f:'🇧🇩',c:'+880',n:'Bangladesh'},
  {f:'🇳🇵',c:'+977',n:'Nepal'},{f:'🇱🇰',c:'+94',n:'Sri Lanka'},{f:'🇲🇻',c:'+960',n:'Maladewa'},
  {f:'🇨🇳',c:'+86',n:'China'},{f:'🇯🇵',c:'+81',n:'Jepang'},{f:'🇰🇷',c:'+82',n:'Korea Selatan'},
  {f:'🇭🇰',c:'+852',n:'Hong Kong'},{f:'🇹🇼',c:'+886',n:'Taiwan'},{f:'🇲🇴',c:'+853',n:'Makau'},
  {f:'🇸🇦',c:'+966',n:'Arab Saudi'},{f:'🇦🇪',c:'+971',n:'UAE'},{f:'🇶🇦',c:'+974',n:'Qatar'},
  {f:'🇰🇼',c:'+965',n:'Kuwait'},{f:'🇧🇭',c:'+973',n:'Bahrain'},{f:'🇴🇲',c:'+968',n:'Oman'},
  {f:'🇾🇪',c:'+967',n:'Yaman'},{f:'🇮🇶',c:'+964',n:'Irak'},{f:'🇮🇷',c:'+98',n:'Iran'},
  {f:'🇯🇴',c:'+962',n:'Yordania'},{f:'🇱🇧',c:'+961',n:'Lebanon'},{f:'🇸🇾',c:'+963',n:'Suriah'},
  {f:'🇹🇷',c:'+90',n:'Turki'},{f:'🇮🇱',c:'+972',n:'Israel'},{f:'🇵🇸',c:'+970',n:'Palestina'},
  {f:'🇩🇪',c:'+49',n:'Jerman'},{f:'🇫🇷',c:'+33',n:'Prancis'},{f:'🇮🇹',c:'+39',n:'Italia'},
  {f:'🇪🇸',c:'+34',n:'Spanyol'},{f:'🇵🇹',c:'+351',n:'Portugal'},{f:'🇳🇱',c:'+31',n:'Belanda'},
  {f:'🇧🇪',c:'+32',n:'Belgia'},{f:'🇨🇭',c:'+41',n:'Swiss'},{f:'🇦🇹',c:'+43',n:'Austria'},
  {f:'🇸🇪',c:'+46',n:'Swedia'},{f:'🇳🇴',c:'+47',n:'Norwegia'},{f:'🇩🇰',c:'+45',n:'Denmark'},
  {f:'🇫🇮',c:'+358',n:'Finlandia'},{f:'🇵🇱',c:'+48',n:'Polandia'},{f:'🇷🇺',c:'+7',n:'Rusia'},
  {f:'🇺🇦',c:'+380',n:'Ukraina'},{f:'🇷🇴',c:'+40',n:'Romania'},{f:'🇨🇿',c:'+420',n:'Czech'},
  {f:'🇬🇷',c:'+30',n:'Yunani'},{f:'🇭🇺',c:'+36',n:'Hungaria'},{f:'🇧🇬',c:'+359',n:'Bulgaria'},
  {f:'🇧🇷',c:'+55',n:'Brasil'},{f:'🇦🇷',c:'+54',n:'Argentina'},{f:'🇨🇴',c:'+57',n:'Kolombia'},
  {f:'🇵🇪',c:'+51',n:'Peru'},{f:'🇨🇱',c:'+56',n:'Chile'},{f:'🇻🇪',c:'+58',n:'Venezuela'},
  {f:'🇲🇽',c:'+52',n:'Meksiko'},{f:'🇪🇨',c:'+593',n:'Ekuador'},{f:'🇧🇴',c:'+591',n:'Bolivia'},
  {f:'🇳🇬',c:'+234',n:'Nigeria'},{f:'🇿🇦',c:'+27',n:'Afrika Selatan'},{f:'🇰🇪',c:'+254',n:'Kenya'},
  {f:'🇬🇭',c:'+233',n:'Ghana'},{f:'🇨🇲',c:'+237',n:'Kamerun'},{f:'🇪🇹',c:'+251',n:'Etiopia'},
  {f:'🇹🇿',c:'+255',n:'Tanzania'},{f:'🇺🇬',c:'+256',n:'Uganda'},{f:'🇷🇼',c:'+250',n:'Rwanda'},
  {f:'🇸🇳',c:'+221',n:'Senegal'},{f:'🇲🇦',c:'+212',n:'Maroko'},{f:'🇩🇿',c:'+213',n:'Aljazair'},
  {f:'🇹🇳',c:'+216',n:'Tunisia'},{f:'🇱🇾',c:'+218',n:'Libya'},{f:'🇪🇬',c:'+20',n:'Mesir'},
  {f:'🇵🇬',c:'+675',n:'Papua Nugini'},{f:'🇫🇯',c:'+679',n:'Fiji'},{f:'🇹🇴',c:'+676',n:'Tonga'},
  {f:'🇼🇸',c:'+685',n:'Samoa'},{f:'🇰🇿',c:'+7',n:'Kazakhstan'},{f:'🇺🇿',c:'+998',n:'Uzbekistan'},
  {f:'🇦🇿',c:'+994',n:'Azerbaijan'},{f:'🇬🇪',c:'+995',n:'Georgia'},{f:'🇦🇲',c:'+374',n:'Armenia'},
];

const METHODS = [
  {v:'permafresh',n:'Perma Fresh',d:'Baru kena ban pertama kali',tag:'BASE',tagClass:'t-pro',icon:'fa-seedling',color:'var(--g)'},
  {v:'spam_id',n:'Spam (Indo)',d:'Kena ban alasan spam, ID',tag:'ID',tagClass:'t-pro',icon:'fa-envelope-circle-check',color:'var(--blue)'},
  {v:'perma_hard',n:'Perma Hard',d:'Ban keras permanen',tag:'HARD',tagClass:'t-hot',icon:'fa-shield-halved',color:'var(--red)'},
  {v:'perma_week',n:'Perma Seminggu',d:'Banned lebih dari seminggu',tag:'TEMP',tagClass:'t-new',icon:'fa-clock-rotate-left',color:'var(--yel)'},
  {v:'perma_batu',n:'Perma Batu',d:'Ban total, final appeal',tag:'FINAL',tagClass:'t-hot',icon:'fa-ban',color:'#f97316'},
  {v:'looping_ban',n:'Looping Ban',d:'Ban → unban → ban terus-menerus',tag:'LOOP',tagClass:'t-hot',icon:'fa-rotate',color:'#a78bfa'},
  {v:'gb_mod',n:'GB/Mod WA',d:'Kena ban karena WA Mod',tag:'MOD',tagClass:'t-new',icon:'fa-mobile-screen-button',color:'#a78bfa'},
  {v:'mass_report',n:'Mass Report',d:'Di-report banyak user',tag:'RPT',tagClass:'t-hot',icon:'fa-triangle-exclamation',color:'var(--red)'},
  {v:'new_number',n:'Nomor Baru',d:'Nomor baru langsung banned',tag:'SIM',tagClass:'t-new',icon:'fa-sim-card',color:'#34d399'},
  {v:'temp_24h',n:'Temporary 24H',d:'Ban sementara 24 jam',tag:'TEMP',tagClass:'t-pro',icon:'fa-hourglass-half',color:'var(--yel)'},
  {v:'business_ban',n:'Business Ban',d:'WA Business kena ban',tag:'BIZ',tagClass:'t-new',icon:'fa-briefcase',color:'var(--blue)'},
  {v:'no_reason',n:'Banned Ga Jelas',d:'Ban tiba-tiba tanpa alasan',tag:'???',tagClass:'t-hot',icon:'fa-circle-question',color:'#f472b6'},
  {v:'formal_en',n:'Formal English',d:'Appeal profesional EN',tag:'EN',tagClass:'t-en',icon:'fa-file-pen',color:'var(--g)'},
  {v:'casual_id',n:'Santai (Indo)',d:'Pendek, kasual, bahasa ID',tag:'ID',tagClass:'t-pro',icon:'fa-comment-dots',color:'#fb923c'},
  {v:'turkish',n:'Bahasa Turki',d:'Template appeal Türkçe',tag:'TR',tagClass:'t-lang',icon:'fa-language',color:'#f472b6'},
  {v:'hindi',n:'Bahasa Hindi',d:'Template appeal हिंदी',tag:'HI',tagClass:'t-lang',icon:'fa-globe',color:'#67e8f9'},
  {v:'arabic',n:'Bahasa Arab',d:'Template appeal عربي',tag:'AR',tagClass:'t-lang',icon:'fa-mosque',color:'#fbbf24'},
  {v:'malay',n:'Bahasa Melayu',d:'Template appeal BM',tag:'MY',tagClass:'t-lang',icon:'fa-star-and-crescent',color:'#34d399'},
  {v:'portuguese',n:'Bahasa Portugis',d:'Template appeal PT',tag:'PT',tagClass:'t-lang',icon:'fa-earth-americas',color:'var(--blue)'},
  {v:'spanish',n:'Bahasa Spanyol',d:'Template appeal ES',tag:'ES',tagClass:'t-lang',icon:'fa-sun',color:'#f97316'},
  {v:'short_urgent',n:'Pendek + Urgent',d:'Singkat tapi kuat & urgent',tag:'SHORT',tagClass:'t-hot',icon:'fa-bolt',color:'var(--yel)'},
  {v:'second_appeal',n:'Second Appeal',d:'Appeal ke-2 setelah ditolak',tag:'2ND',tagClass:'t-new',icon:'fa-reply-all',color:'#a78bfa'},
  {v:'family_plea',n:'Family Plea',d:'Minta tolong demi keluarga',tag:'❤️',tagClass:'t-pro',icon:'fa-heart',color:'var(--red)'},
  {v:'multi_lang',n:'🔥 Multi-Language ULTIMATE',d:'EN + ID + Formal — success rate tertinggi',tag:'HOT',tagClass:'t-hot',icon:'fa-earth-asia',color:'var(--g)',full:true},
];

const LIMIT_KEY = 'vxz_rp_times';
const LIMIT_MAX = 5;
const LIMIT_MS = 6 * 60 * 60 * 1000;
const HIST_KEY = 'vxz_hist';

let selCountry = COUNTRIES[0];
let checkCountry = COUNTRIES[0];
let selMethod = '';
let currentUser = null;
let photoFile = null;
let reportListData = [];

function enc(v) { return encodeURIComponent(v || ''); }
function isAndroid() { return /Android/i.test(navigator.userAgent); }
function sanitize(str) {
  if (!str) return '';
  return String(str).replace(/[<>"'&]/g, c => ({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','&':'&amp;'}[c]));
}
function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'baru saja';
  if (m < 60) return m + ' menit lalu';
  const h = Math.floor(m / 60);
  if (h < 24) return h + ' jam lalu';
  return Math.floor(h / 24) + ' hari lalu';
}
function getFullNum(raw, country) {
  if (!raw) return '';
  const s = raw.trim().replace(/\s+/g, '');
  if (s.startsWith('+')) return s;
  const code = country.c.replace('+', '');
  if (s.startsWith('0')) return '+' + code + s.slice(1);
  return '+' + code + s;
}
function dispNum(n) { return n.startsWith('+') ? n : '+' + n; }

function buildFP() {
  const parts = [
    navigator.language || '',
    Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    screen.width + 'x' + screen.height,
    navigator.platform || '',
  ];
  let h = 0;
  const s = parts.join('|');
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
  return Math.abs(h).toString(36);
}
const FP = buildFP();

function getRpTimes() {
  try { return JSON.parse(localStorage.getItem(LIMIT_KEY) || '[]'); } catch { return []; }
}
function saveRpTimes(arr) {
  localStorage.setItem(LIMIT_KEY, JSON.stringify(arr));
}
function getRemainingLimit() {
  const now = Date.now();
  const times = getRpTimes().filter(t => now - t < LIMIT_MS);
  saveRpTimes(times);
  return { used: times.length, remaining: Math.max(0, LIMIT_MAX - times.length), next: times.length ? times[0] + LIMIT_MS : null };
}
function consumeLimit() {
  const { remaining } = getRemainingLimit();
  if (remaining <= 0) return false;
  const times = getRpTimes().filter(t => Date.now() - t < LIMIT_MS);
  times.push(Date.now());
  saveRpTimes(times);
  return true;
}
function updateLimitUI() {
  const { used, remaining, next } = getRemainingLimit();
  const txt = document.getElementById('limitTxt');
  const reset = document.getElementById('limitReset');
  if (txt) txt.textContent = used + '/' + LIMIT_MAX + ' report (reset 6 jam)';
  if (reset && next) {
    const diff = Math.max(0, next + LIMIT_MS - Date.now());
    const hLeft = Math.floor(diff / 3600000);
    const mLeft = Math.floor((diff % 3600000) / 60000);
    reset.textContent = 'Reset: ' + hLeft + 'j ' + mLeft + 'm';
  } else if (reset) {
    reset.textContent = '';
  }
}

function buildCountryList(listEl, searchEl, onSel) {
  function render(q) {
    const list = q
      ? COUNTRIES.filter(c => c.n.toLowerCase().includes(q.toLowerCase()) || c.c.includes(q))
      : COUNTRIES;
    listEl.innerHTML = list.slice(0, 80).map(c =>
      `<div class="c-item" onclick='(${function(x){onSel(x)}.toString()})(${JSON.stringify(c)})'>
        <span>${c.f}</span><span class="c-code">${c.c}</span><span class="c-name">${c.n}</span>
      </div>`
    ).join('');
  }
  render('');
  searchEl.addEventListener('input', e => render(e.target.value));
}

function toggleDrop(id) {
  const el = document.getElementById(id);
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.c-dropdown').forEach(d => d.classList.remove('open'));
  if (!wasOpen) { el.classList.add('open'); el.querySelector('.c-search')?.focus(); }
}

document.addEventListener('click', e => {
  if (!e.target.closest('.code-badge') && !e.target.closest('.c-dropdown')) {
    document.querySelectorAll('.c-dropdown').forEach(d => d.classList.remove('open'));
  }
});

buildCountryList(
  document.getElementById('cList'),
  document.getElementById('cSearch'),
  c => { selCountry = c; document.getElementById('selFlag').textContent = c.f; document.getElementById('selCode').textContent = c.c; document.getElementById('cDrop').classList.remove('open'); }
);
buildCountryList(
  document.getElementById('cListCheck'),
  document.getElementById('cSearchCheck'),
  c => { checkCountry = c; document.getElementById('checkFlag').textContent = c.f; document.getElementById('checkCode').textContent = c.c; document.getElementById('cDropCheck').classList.remove('open'); }
);

function buildMethodGrid() {
  const grid = document.getElementById('mgrid');
  grid.innerHTML = METHODS.map(m => `
    <div class="mc${m.full ? ' mc-full' : ''}" data-val="${m.v}" onclick="selectMethod(this,'${m.v}','${m.n}')">
      <div class="mc-tag ${m.tagClass}">${m.tag}</div>
      <div class="mc-icon"><i class="fa-solid ${m.icon}" style="color:${m.color}"></i></div>
      <div class="mc-n">${m.n}</div>
      <div class="mc-d">${m.d}</div>
    </div>`).join('');
}
buildMethodGrid();

function selectMethod(el, val, name) {
  document.querySelectorAll('.mc').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  selMethod = val;
  const info = document.getElementById('selInfo');
  document.getElementById('selInfoTxt').textContent = name + ' — terpilih ✓';
  info.classList.add('on');
}

function setStatus(id, type, icon, msg) {
  const box = document.getElementById(id);
  if (!box) return;
  box.className = 'status on ' + type;
  box.innerHTML = `<i class="fa-solid ${icon}" style="${type==='load'?'animation:spinR 1s linear infinite':''}"></i><span>${msg}</span>`;
}
function clearStatus(id) {
  const box = document.getElementById(id);
  if (box) box.className = 'status';
}

function buildTpl(num, method) {
  const d = dispNum(num);
  switch (method) {
    case 'permafresh': return {
      to: 'support@support.whatsapp.com',
      subject: 'Please help — my WhatsApp was permanently banned',
      body: `Hello WhatsApp Support Team,\n\nI am writing to you because my WhatsApp account has been permanently banned without any prior warning or notification. The affected number is ${d}.\n\nI genuinely have no idea why this happened. I woke up and tried to message my family, and my account was already blocked. I have always respected your Terms of Service.\n\nI kindly ask that your team review my account and restore access as soon as possible.\n\nThank you.`
    };
    case 'spam_id': return {
      to: 'support@support.whatsapp.com',
      subject: 'Mohon bantu — akun WhatsApp saya diblokir',
      body: `Halo Tim Support WhatsApp yang terhormat,\n\nSaya menulis pesan ini karena akun WhatsApp saya nomor ${d} tiba-tiba diblokir dengan alasan spam, padahal saya tidak pernah melakukan hal tersebut.\n\nSaya hanya berkomunikasi dengan keluarga dan teman seperti biasa. Saya tidak pernah mengirim pesan massal atau melanggar syarat layanan dalam bentuk apapun.\n\nSaya menduga ini adalah kesalahan sistem yang salah mendeteksi chat normal saya sebagai spam. Saya sangat membutuhkan akun ini untuk berkomunikasi dengan keluarga di luar kota.\n\nSaya memohon agar pihak WhatsApp berkenan meninjau kembali akun saya dan membuka blokirnya.\n\nTerima kasih.`
    };
    case 'perma_hard': return {
      to: 'support@support.whatsapp.com',
      subject: `URGENT: Unblock WhatsApp account ${d} — System Error`,
      body: `Dear WhatsApp Developer Team,\n\nI am urgently writing to appeal the permanent ban on my WhatsApp account ${d}.\n\nI have attempted multiple review requests through the app itself, but the ban has not been lifted. I strongly believe this is a system error, as I have never violated any terms or policies.\n\nI have been using WhatsApp responsibly for years and this account contains important personal and professional conversations. Please conduct a manual review and restore access immediately.\n\nThank you.`
    };
    case 'perma_week': return {
      to: 'support@support.whatsapp.com',
      subject: 'My WhatsApp account has been banned for over a week',
      body: `Hi WhatsApp Developer,\n\nMy WhatsApp account (${d}) has been banned for over a week without any clear explanation.\n\nI have always used the official app, never sent spam, and always respected other users. I believe this ban was applied in error by an automated system.\n\nI have important conversations that I cannot access. Please review and lift this ban as soon as possible.\n\nThank you.`
    };
    case 'perma_batu': return {
      to: 'support@support.whatsapp.com',
      subject: `Final appeal — Please restore my WhatsApp ${d}`,
      body: `Dear WhatsApp Support,\n\nThis is my sincere final appeal regarding the permanent ban of my WhatsApp number ${d}.\n\nI have submitted multiple review requests through the app but none have been successful. I have never used third-party apps, never sent bulk messages, and never violated any community guidelines.\n\nI am confident my account was banned incorrectly due to a system error or false positive. Please manually review my account history and restore my access.\n\nWith respect,\nA loyal WhatsApp user (${d})`
    };
    case 'looping_ban': return {
      to: 'support@support.whatsapp.com',
      subject: `Recurring ban issue — account ${d} keeps getting banned after unban`,
      body: `Dear WhatsApp Support Team,\n\nI am experiencing a severe and frustrating issue with my account ${d}: I keep getting banned repeatedly, even immediately after being unbanned.\n\nThe cycle: account gets banned → I appeal → it gets restored → within a short time it gets banned again. This has happened multiple times without any change in my behavior.\n\nI believe there is a technical bug or false-positive in WhatsApp's detection system targeting my account. I urgently request that your technical team investigate the root cause and permanently resolve this looping ban issue.\n\nThank you.`
    };
    case 'gb_mod': return {
      to: 'support@support.whatsapp.com',
      subject: `WhatsApp ban appeal — account ${d}`,
      body: `Hello WhatsApp Support Team,\n\nI want to be fully honest. My account ${d} was banned and I believe it may have been related to a third-party application I previously used.\n\nI have now uninstalled any unofficial apps and reinstalled the official WhatsApp. I understand this violated your terms and I sincerely apologize.\n\nI am committed to using only the official WhatsApp going forward. I respectfully ask that you give my account a second chance.\n\nThank you.`
    };
    case 'mass_report': return {
      to: 'support@support.whatsapp.com',
      subject: `My WhatsApp account was wrongly banned due to false reports — ${d}`,
      body: `Dear WhatsApp Team,\n\nMy account ${d} has been banned and I strongly believe this is the result of coordinated false reports submitted by other users.\n\nI have never harassed, spammed, or disturbed any WhatsApp user. I suspect certain individuals deliberately mass-reported my account out of malice.\n\nI request a thorough manual review of my actual account activity. I am confident you will find no evidence of any policy violations.\n\nPlease do not let bad actors misuse the reporting system against innocent users.\n\nThank you.`
    };
    case 'new_number': return {
      to: 'support@support.whatsapp.com',
      subject: `Brand new number banned immediately — ${d}`,
      body: `Hello WhatsApp Support,\n\nMy brand new SIM card with number ${d} was immediately banned on WhatsApp the moment I tried to register it, before I could even send a single message.\n\nI am the current and rightful owner of this SIM card. I suspect the previous owner of this number may have caused the ban that now incorrectly affects me.\n\nI kindly request that you verify I am a new legitimate user and remove the restriction.\n\nThank you.`
    };
    case 'temp_24h': return {
      to: 'support@support.whatsapp.com',
      subject: `Temporary WhatsApp ban appeal — ${d}`,
      body: `Hi WhatsApp Support,\n\nI received a temporary ban on my account ${d} and I am writing to appeal this decision.\n\nI was chatting normally with my contacts when the restriction was suddenly applied. I did not violate any rules.\n\nI believe this restriction was triggered by an automated system that misidentified my normal chat activity. I would appreciate it if you could review my case and lift the restriction.\n\nThank you.`
    };
    case 'business_ban': return {
      to: 'support@support.whatsapp.com',
      subject: `WhatsApp Business account banned — urgent appeal from ${d}`,
      body: `Dear WhatsApp Business Support Team,\n\nMy WhatsApp Business account ${d} has been banned, causing serious disruption to my small business.\n\nI use WhatsApp Business only for responding to individual customer inquiries. I never send unsolicited bulk messages or use automation tools. All customer interactions are personal one-to-one conversations.\n\nThis ban is causing significant financial harm. I urgently request a manual review and restoration of my account.\n\nThank you.`
    };
    case 'no_reason': return {
      to: 'support@support.whatsapp.com',
      subject: `WhatsApp account banned without any reason — ${d}`,
      body: `Dear WhatsApp Support,\n\nI am writing with confusion because my account ${d} was banned suddenly without any warning or explanation.\n\nI have absolutely no idea what caused this. I was using WhatsApp normally when my account was blocked. I have never:\n• Sent spam or bulk messages\n• Joined suspicious groups\n• Used unofficial WhatsApp applications\n• Shared inappropriate content\n• Communicated with strangers unsolicited\n\nThis ban makes no sense and I believe it is a mistake. I am requesting a thorough review and immediate restoration.\n\nThank you.`
    };
    case 'formal_en': return {
      to: 'support@support.whatsapp.com',
      subject: `Formal Appeal — Account Reinstatement Request for ${d}`,
      body: `Dear WhatsApp Trust & Safety Team,\n\nI am writing to formally submit an appeal requesting the reinstatement of my WhatsApp account associated with the telephone number ${d}, which was recently subjected to a suspension.\n\nFollowing a careful review of my own usage patterns, I am confident I have not engaged in any activity constituting a breach of WhatsApp's Terms of Service, Acceptable Use Policy, or Community Guidelines.\n\nI respectfully submit that automated detection systems may occasionally produce erroneous results. I humbly request that a qualified member of your review team conduct a manual examination of my account's complete activity history.\n\nI remain committed to compliance with all WhatsApp policies.\n\nRespectfully submitted,\nAccount Holder — ${d}`
    };
    case 'casual_id': return {
      to: 'support@support.whatsapp.com',
      subject: 'tolong bantu unban WA saya',
      body: `Hai kak,\n\nNomor WA saya ${d} kena ban tiba-tiba, ga tau kenapa. Saya ga ngelakuin apa-apa yang salah.\n\nMohon dibuka lagi ya kak, saya butuh banget buat komunikasi sama keluarga dan kerjaan.\n\nMakasih banyak 🙏`
    };
    case 'turkish': return {
      to: 'support@support.whatsapp.com',
      subject: `WhatsApp hesabım haksız yere yasaklandı — ${d}`,
      body: `Sayın WhatsApp Destek Ekibi,\n\n${d} numaralı hesabım herhangi bir kural ihlali yapmaksızın yasaklanmıştır. Hizmet şartlarınızı her zaman eksiksiz uyguladım.\n\nBu yasağın bir sistem hatası sonucunda gerçekleştiğine inanıyorum. Hesabımı gözden geçirmenizi ve kısıtlamayı kaldırmanızı saygıyla talep ediyorum.\n\nTeşekkür ederim.`
    };
    case 'hindi': return {
      to: 'support@support.whatsapp.com',
      subject: `मेरा WhatsApp अकाउंट बैन हो गया है — ${d}`,
      body: `प्रिय WhatsApp सपोर्ट टीम,\n\nमैं आपसे निवेदन करता/करती हूं कि मेरे WhatsApp नंबर ${d} पर लगे प्रतिबंध की समीक्षा करें।\n\nमैंने WhatsApp की सेवा शर्तों का कभी उल्लंघन नहीं किया है। मुझे विश्वास है कि यह प्रतिबंध एक तकनीकी त्रुटि के कारण लगाया गया है।\n\nकृपया मेरे अकाउंट की जांच करें और प्रतिबंध हटाएं।\n\nधन्यवाद।`
    };
    case 'arabic': return {
      to: 'support@support.whatsapp.com',
      subject: `حساب واتساب الخاص بي تم حظره — ${d}`,
      body: `عزيزي فريق دعم واتساب،\n\nأكتب إليكم لأطعن في حظر حساب واتساب ${d}.\n\nلم أنتهك أي قواعد أو شروط الخدمة. كنت أستخدم التطبيق فقط للتواصل مع عائلتي وأصدقائي.\n\nأعتقد أن هذا الحظر وقع نتيجة خطأ في النظام الآلي. أرجو مراجعة حسابي ورفع الحظر.\n\nشكراً جزيلاً.`
    };
    case 'malay': return {
      to: 'support@support.whatsapp.com',
      subject: `Akaun WhatsApp saya diharamkan — ${d}`,
      body: `Salam hormat Pasukan Sokongan WhatsApp,\n\nSaya menulis untuk merayu tentang pengharaman akaun WhatsApp saya ${d}.\n\nSaya tidak pernah melanggar sebarang terma perkhidmatan. Saya percaya pengharaman ini berlaku akibat kesilapan sistem automatik.\n\nSaya memohon agar pasukan anda menjalankan semakan manual ke atas akaun saya dan mengangkat sekatan tersebut.\n\nTerima kasih.`
    };
    case 'portuguese': return {
      to: 'support@support.whatsapp.com',
      subject: `Recurso de banimento — Conta WhatsApp ${d}`,
      body: `Prezada Equipe de Suporte do WhatsApp,\n\nEstou escrevendo para recorrer do banimento da minha conta ${d}.\n\nNunca violei os Termos de Serviço do WhatsApp. Acredito que este banimento foi aplicado por erro de um sistema automatizado.\n\nSolicito respeitosamente uma revisão manual do histórico da minha conta.\n\nObrigado.`
    };
    case 'spanish': return {
      to: 'support@support.whatsapp.com',
      subject: `Apelación de bloqueo — Cuenta WhatsApp ${d}`,
      body: `Estimado equipo de soporte de WhatsApp,\n\nMe dirijo a ustedes para apelar el bloqueo de mi cuenta ${d}.\n\nNunca he violado los Términos de Servicio de WhatsApp. Creo que este bloqueo se aplicó por error del sistema automatizado.\n\nSolicito que su equipo realice una revisión manual de mi cuenta.\n\nMuchas gracias.`
    };
    case 'short_urgent': return {
      to: 'support@support.whatsapp.com',
      subject: `URGENT — Unban ${d} immediately`,
      body: `Hi,\n\nMy WhatsApp account ${d} was banned unfairly. I have not violated any of your Terms of Service.\n\nPlease urgently review and restore my account. I need it for critical communication.\n\nThank you.`
    };
    case 'second_appeal': return {
      to: 'support@support.whatsapp.com',
      subject: `Second appeal — WhatsApp account ${d} still banned`,
      body: `Dear WhatsApp Support Team,\n\nThis is my second formal appeal regarding the ban on my account ${d}. My first appeal was not successful, but I believe the situation deserves further review.\n\nI have never violated WhatsApp's Terms of Service. I request that a different member of your team reviews my account with fresh eyes.\n\nThank you for your patience.`
    };
    case 'family_plea': return {
      to: 'support@support.whatsapp.com',
      subject: `Please help — I need my WhatsApp to stay in touch with my family ${d}`,
      body: `Dear WhatsApp Support Team,\n\nI am reaching out with a heartfelt plea to restore my WhatsApp account ${d}.\n\nWhatsApp is my primary lifeline to my family. My parents, siblings, and relatives who live far away rely on this account to stay in touch. Since my account was banned, I have been completely cut off from all of them.\n\nI have always used WhatsApp responsibly. Please, I am asking you to review my account and restore it.\n\nWith hope and respect.`
    };
    case 'multi_lang': return {
      to: 'support@support.whatsapp.com',
      subject: `URGENT Multi-Language Appeal — Restore WhatsApp ${d}`,
      body: `Dear WhatsApp Support Team / Tim Support WhatsApp yang Terhormat,
======================================================

━━━━━━━ ENGLISH APPEAL ━━━━━━━

I am formally appealing the ban on my WhatsApp account ${d}. I have been a dedicated and responsible WhatsApp user who has consistently followed all Terms of Service and Community Guidelines.

I have never sent spam, never used unofficial WhatsApp modifications, never engaged in any abusive behavior, and never violated any policies. I firmly believe this ban is the result of an automated system error.

My account is essential for maintaining contact with my family and professional network. I urgently request a thorough manual review and restoration at the earliest opportunity.

━━━━━━━ PERMOHONAN (BAHASA INDONESIA) ━━━━━━━

Saya mengajukan banding atas pemblokiran akun WhatsApp nomor ${d}. Saya adalah pengguna setia yang selalu mematuhi semua syarat layanan dan panduan komunitas.

Saya tidak pernah mengirim spam, tidak pernah menggunakan aplikasi modifikasi, dan tidak pernah melanggar kebijakan apapun. Saya percaya pemblokiran ini terjadi karena kesalahan sistem otomatis.

Saya memohon agar tim WhatsApp melakukan peninjauan manual dan memulihkan akses sesegera mungkin.

======================================================
Account: ${d}
======================================================
Thank you / Terima kasih / شكراً / धन्यवाद 🙏`
    };
    default: return {
      to: 'support@support.whatsapp.com',
      subject: `WhatsApp appeal — ${d}`,
      body: `Dear WhatsApp Support,\n\nMy account ${d} was banned. I always follow your Terms of Service. Please review and restore my account.\n\nThank you.`
    };
  }
}

function openEmail(t) {
  const intentUrl = `intent://compose?to=${enc(t.to)}&subject=${enc(t.subject)}&body=${enc(t.body)}#Intent;scheme=mailto;package=com.google.android.gm;end`;
  const mailtoUrl = `mailto:${enc(t.to)}?subject=${enc(t.subject)}&body=${enc(t.body)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(t.to)}&su=${enc(t.subject)}&body=${enc(t.body)}`;
  if (isAndroid()) {
    try { window.location.href = intentUrl; } catch (e) {}
    let done = false;
    document.addEventListener('visibilitychange', function vh() {
      if (document.hidden) {
        done = true;
        document.removeEventListener('visibilitychange', vh);
      }
    }, { once: true });
    setTimeout(() => {
      if (!done) { try { window.location.href = mailtoUrl; } catch (e) { try { window.open(gmailUrl, '_blank'); } catch (e2) {} } }
    }, 1400);
  } else {
    try { window.location.href = mailtoUrl; } catch (e) {}
    setTimeout(() => { if (!document.hidden) try { window.open(gmailUrl, '_blank'); } catch (e) {} }, 800);
  }
}

document.getElementById('sendBtn').addEventListener('click', () => {
  const raw = (document.getElementById('nomor').value || '').trim();
  const num = getFullNum(raw, selCountry);
  if (!num) { setStatus('unbanStatus', 'err', 'fa-circle-exclamation', 'Masukkan nomor WA dulu!'); document.getElementById('nomor').focus(); return; }
  if (!selMethod) { setStatus('unbanStatus', 'err', 'fa-circle-exclamation', 'Pilih metode unban dulu!'); return; }
  setStatus('unbanStatus', 'load', 'fa-circle-notch', 'Membuka email...');
  const tpl = buildTpl(num, selMethod);
  saveHistory(num, selMethod);
  openEmail(tpl);
  setTimeout(() => setStatus('unbanStatus', 'ok', 'fa-circle-check', '✓ Email terbuka! Kirim ke support@support.whatsapp.com'), 1800);
});

function saveHistory(num, method) {
  const name = METHODS.find(m => m.v === method)?.n || method;
  const h = JSON.parse(localStorage.getItem(HIST_KEY) || '[]');
  h.unshift({ id: Date.now(), num, method, name, ts: new Date().toLocaleString('id-ID') });
  if (h.length > 50) h.splice(50);
  localStorage.setItem(HIST_KEY, JSON.stringify(h));
}
function renderHistory() {
  const h = JSON.parse(localStorage.getItem(HIST_KEY) || '[]');
  const el = document.getElementById('histList');
  if (!h.length) {
    el.innerHTML = `<div class="hist-empty"><i class="fa-solid fa-clock-rotate-left"></i><p>Belum ada riwayat appeal.<br>Kirim appeal dulu dari tab Unban.</p></div>`;
    return;
  }
  el.innerHTML = h.map(item => `
    <div class="hist-card" id="hc-${item.id}">
      <div class="hc-icon"><i class="fab fa-whatsapp"></i></div>
      <div class="hc-info">
        <div class="hc-num">${sanitize(item.num)}</div>
        <div class="hc-meta">${sanitize(item.name)} · ${item.ts}</div>
      </div>
      <button class="hc-del" onclick="delHistory(${item.id})"><i class="fa-solid fa-trash"></i></button>
    </div>`).join('');
}
function delHistory(id) {
  let h = JSON.parse(localStorage.getItem(HIST_KEY) || '[]');
  h = h.filter(x => x.id !== id);
  localStorage.setItem(HIST_KEY, JSON.stringify(h));
  renderHistory();
}
function clearHistory() {
  if (!confirm('Hapus semua riwayat?')) return;
  localStorage.removeItem(HIST_KEY);
  renderHistory();
}
function exportHistory() {
  const h = JSON.parse(localStorage.getItem(HIST_KEY) || '[]');
  if (!h.length) { alert('Belum ada riwayat!'); return; }
  const txt = h.map(x => `[${x.ts}] ${x.num} — ${x.name}`).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt);
  a.download = 'vxz-history.txt';
  a.click();
}

function doCheck() {
  const raw = (document.getElementById('checkNomor').value || '').trim();
  const num = getFullNum(raw, checkCountry);
  if (!num) { alert('Masukkan nomor dulu!'); return; }
  const clean = num.replace(/\D/g, '');
  window.open('https://wa.me/' + clean, '_blank');
  const r = document.getElementById('checkResult');
  r.style.display = 'block';
  document.getElementById('crTitle').innerHTML = `<i class="fab fa-whatsapp" style="color:var(--g)"></i> Link WA Dibuka`;
  document.getElementById('crSub').textContent = `Link: https://wa.me/${clean}\n\nJika halaman terbuka dan ada tombol "Kirim Pesan" → nomor aktif ✓\nJika halaman error atau kosong → nomor tidak terdaftar/banned ✗\n\nMenggunakan layanan resmi wa.me dari WhatsApp Inc.`;
}

function goPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.bn').forEach(b => b.classList.remove('active'));
  document.getElementById('p-' + name).classList.add('on');
  btn.classList.add('active');
  if (name === 'history') renderHistory();
  if (name === 'community') { loadReports(); updateLimitUI(); }
}

async function authInit() {
  const { data } = await sb.auth.getSession();
  currentUser = data.session?.user || null;
  updateAuthUI();
  sb.auth.onAuthStateChange((_ev, session) => {
    currentUser = session?.user || null;
    updateAuthUI();
  });
}
function updateAuthUI() {
  const btn = document.getElementById('authBtn');
  const txt = document.getElementById('authBtnTxt');
  if (currentUser) {
    const email = currentUser.email || '';
    txt.textContent = email.split('@')[0].slice(0, 10);
    btn.classList.add('logged');
    btn.querySelector('i').className = 'fa-solid fa-right-from-bracket';
    document.getElementById('photoLoginBadge').style.display = 'none';
    document.getElementById('photoArea').classList.remove('disabled');
  } else {
    txt.textContent = 'Login';
    btn.classList.remove('logged');
    btn.querySelector('i').className = 'fa-solid fa-right-to-bracket';
    document.getElementById('photoLoginBadge').style.display = 'inline';
    document.getElementById('photoArea').classList.add('disabled');
  }
}
function handleAuthBtn() {
  if (currentUser) { if (confirm('Logout?')) sb.auth.signOut(); }
  else openModal('login');
}
function openModal(mode) {
  document.getElementById('loginModal').classList.add('on');
  switchModal(mode);
}
function closeModal() {
  document.getElementById('loginModal').classList.remove('on');
  clearStatus('authStatus');
}
function switchModal(mode) {
  const isLogin = mode === 'login';
  document.getElementById('loginForm').style.display = isLogin ? 'block' : 'none';
  document.getElementById('registerForm').style.display = isLogin ? 'none' : 'block';
  document.getElementById('modalTitle').textContent = isLogin ? 'Login' : 'Daftar';
  clearStatus('authStatus');
}
async function doLogin() {
  if (document.getElementById('hp').value) return;
  const email = document.getElementById('lEmail').value.trim();
  const pass = document.getElementById('lPass').value;
  if (!email || !pass) { setStatus('authStatus', 'err', 'fa-circle-exclamation', 'Isi semua field!'); return; }
  setStatus('authStatus', 'load', 'fa-circle-notch', 'Loading...');
  const { error } = await sb.auth.signInWithPassword({ email, password: pass });
  if (error) { setStatus('authStatus', 'err', 'fa-circle-exclamation', error.message); }
  else { clearStatus('authStatus'); closeModal(); }
}
async function doRegister() {
  if (document.getElementById('hp2').value) return;
  const user = document.getElementById('rUser').value.trim();
  const email = document.getElementById('rEmail').value.trim();
  const pass = document.getElementById('rPass').value;
  if (!user || !email || !pass) { setStatus('authStatus', 'err', 'fa-circle-exclamation', 'Isi semua field!'); return; }
  if (pass.length < 8) { setStatus('authStatus', 'err', 'fa-circle-exclamation', 'Password min 8 karakter!'); return; }
  if (!/^[a-zA-Z0-9_]{3,30}$/.test(user)) { setStatus('authStatus', 'err', 'fa-circle-exclamation', 'Username: huruf, angka, _ saja (3-30 karakter)'); return; }
  setStatus('authStatus', 'load', 'fa-circle-notch', 'Mendaftar...');
  const { error } = await sb.auth.signUp({ email, password: pass, options: { data: { username: user } } });
  if (error) { setStatus('authStatus', 'err', 'fa-circle-exclamation', error.message); }
  else { setStatus('authStatus', 'ok', 'fa-circle-check', 'Berhasil! Cek email untuk verifikasi.'); }
}

function showReportForm() {
  document.getElementById('reportFormWrap').style.display = 'block';
  updateLimitUI();
  document.getElementById('reportFormWrap').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function hideReportForm() {
  document.getElementById('reportFormWrap').style.display = 'none';
  photoFile = null;
  document.getElementById('photoPreview').innerHTML = '';
  document.getElementById('photoInput').value = '';
}

function triggerPhoto() {
  if (!currentUser) { openModal('login'); return; }
  document.getElementById('photoInput').click();
}
document.getElementById('photoInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 3 * 1024 * 1024) { alert('Foto terlalu besar! Maks 3MB.'); e.target.value = ''; return; }
  photoFile = file;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('photoPreview').innerHTML = `<img src="${ev.target.result}" alt="preview"/>`;
  };
  reader.readAsDataURL(file);
});
document.getElementById('repDesc').addEventListener('input', function () {
  document.getElementById('descCount').textContent = this.value.length;
});

async function submitReport() {
  if (document.getElementById('hp3').value) return;
  const title = sanitize(document.getElementById('repTitle').value.trim());
  const cat = document.getElementById('repCat').value;
  const desc = sanitize(document.getElementById('repDesc').value.trim());
  if (!title || !cat || !desc) { setStatus('reportStatus', 'err', 'fa-circle-exclamation', 'Isi judul, kategori, dan deskripsi!'); return; }
  if (title.length < 5) { setStatus('reportStatus', 'err', 'fa-circle-exclamation', 'Judul terlalu pendek!'); return; }
  if (desc.length < 20) { setStatus('reportStatus', 'err', 'fa-circle-exclamation', 'Deskripsi terlalu pendek (min 20 karakter)!'); return; }
  const { remaining } = getRemainingLimit();
  if (remaining <= 0) { setStatus('reportStatus', 'err', 'fa-circle-exclamation', 'Limit 5 report per 6 jam tercapai. Coba lagi nanti.'); return; }
  setStatus('reportStatus', 'load', 'fa-circle-notch', 'Mengirim report...');
  let photoUrl = null;
  if (photoFile && currentUser) {
    const ext = photoFile.name.split('.').pop();
    const path = `reports/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await sb.storage.from('report-photos').upload(path, photoFile);
    if (!upErr) {
      const { data: urlData } = sb.storage.from('report-photos').getPublicUrl(path);
      photoUrl = urlData.publicUrl;
    }
  }
  const payload = {
    title, category: cat, description: desc, photo_url: photoUrl,
    username: currentUser ? (currentUser.user_metadata?.username || currentUser.email?.split('@')[0] || 'User') : 'Anonymous',
    user_id: currentUser?.id || null,
    fingerprint: FP,
    likes: 0,
    created_at: new Date().toISOString(),
  };
  const { error } = await sb.from('reports').insert(payload);
  if (error) { setStatus('reportStatus', 'err', 'fa-circle-exclamation', 'Gagal kirim: ' + error.message); return; }
  consumeLimit();
  setStatus('reportStatus', 'ok', 'fa-circle-check', '✓ Report berhasil dikirim!');
  document.getElementById('repTitle').value = '';
  document.getElementById('repCat').value = '';
  document.getElementById('repDesc').value = '';
  document.getElementById('descCount').textContent = '0';
  photoFile = null;
  document.getElementById('photoPreview').innerHTML = '';
  document.getElementById('photoInput').value = '';
  updateLimitUI();
  setTimeout(() => { hideReportForm(); loadReports(); }, 1200);
}

function getLikedReports() {
  try { return JSON.parse(localStorage.getItem('vxz_liked') || '[]'); } catch { return []; }
}
function saveLikedReports(arr) { localStorage.setItem('vxz_liked', JSON.stringify(arr)); }

async function toggleLike(reportId, currentLikes, btn) {
  const liked = getLikedReports();
  const idx = liked.indexOf(reportId);
  if (idx > -1) {
    liked.splice(idx, 1);
    saveLikedReports(liked);
    const newLikes = Math.max(0, currentLikes - 1);
    btn.classList.remove('liked');
    btn.innerHTML = `<i class="fa-regular fa-heart"></i> ${newLikes}`;
    btn.dataset.likes = newLikes;
    await sb.from('reports').update({ likes: newLikes }).eq('id', reportId);
  } else {
    liked.push(reportId);
    saveLikedReports(liked);
    const newLikes = currentLikes + 1;
    btn.classList.add('liked');
    btn.innerHTML = `<i class="fa-solid fa-heart"></i> ${newLikes}`;
    btn.dataset.likes = newLikes;
    await sb.from('reports').update({ likes: newLikes }).eq('id', reportId);
  }
}

async function loadReports() {
  const list = document.getElementById('reportList');
  list.innerHTML = '<div class="loading-state"><i class="fa-solid fa-circle-notch fa-spin"></i> Memuat report...</div>';
  const { data, error } = await sb.from('reports').select('*').order('created_at', { ascending: false }).limit(30);
  if (error || !data) {
    list.innerHTML = '<div class="loading-state"><i class="fa-solid fa-triangle-exclamation"></i> Gagal memuat. Cek koneksi atau setup Supabase.</div>';
    return;
  }
  if (!data.length) {
    list.innerHTML = '<div class="loading-state"><i class="fa-solid fa-inbox"></i> Belum ada report. Jadilah yang pertama!</div>';
    return;
  }
  const liked = getLikedReports();
  list.innerHTML = data.map(r => {
    const isLiked = liked.includes(r.id);
    const avatar = (r.username || 'A').charAt(0).toUpperCase();
    return `
      <div class="report-card">
        <div class="rc-head">
          <div class="rc-avatar">${sanitize(avatar)}</div>
          <div class="rc-info">
            <div class="rc-user">${sanitize(r.username || 'Anonymous')}</div>
            <div class="rc-meta">
              <span class="rc-cat">${sanitize(r.category || 'Lainnya')}</span>
              <span>${timeAgo(r.created_at)}</span>
            </div>
          </div>
        </div>
        <div class="rc-title">${sanitize(r.title)}</div>
        <div class="rc-desc">${sanitize(r.description)}</div>
        ${r.photo_url ? `<img class="rc-img" src="${r.photo_url}" alt="bukti" loading="lazy" onclick="window.open('${r.photo_url}','_blank')"/>` : ''}
        <div class="rc-foot">
          <button class="like-btn ${isLiked ? 'liked' : ''}" data-likes="${r.likes || 0}" onclick="toggleLike('${r.id}',parseInt(this.dataset.likes),this)">
            <i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i> ${r.likes || 0}
          </button>
        </div>
      </div>`;
  }).join('');
}

const video = document.getElementById('player');
const bar = document.getElementById('introBar');
const intro = document.getElementById('intro');
const appEl = document.getElementById('app');
const welcomeEl = document.getElementById('welcome');

video.addEventListener('loadedmetadata', () => {
  const d = video.duration || 5;
  document.documentElement.style.setProperty('--dur', d + 's');
  if (bar) bar.style.animationDuration = d + 's';
});
function tryPlay() {
  video.muted = false; video.volume = 1;
  video.play().catch(() => { video.muted = true; video.play().catch(() => {}); });
}
window.addEventListener('load', tryPlay);
function showApp() {
  intro.classList.add('out');
  setTimeout(() => {
    intro.style.display = 'none';
    appEl.classList.add('on');
    if (!localStorage.getItem('vxz_wc_v51')) {
      setTimeout(() => {
        welcomeEl.classList.add('on');
        localStorage.setItem('vxz_wc_v51', '1');
        setTimeout(() => welcomeEl.classList.remove('on'), 3200);
      }, 300);
    }
  }, 900);
}
video.addEventListener('ended', () => setTimeout(showApp, 200));
setTimeout(() => { if (!video.ended) try { showApp(); } catch (e) {} }, 9500);

authInit();
