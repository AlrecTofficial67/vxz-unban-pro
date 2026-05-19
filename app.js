const sb=supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

const COUNTRIES=[{f:'🇮🇩',c:'+62',n:'Indonesia'},{f:'🇲🇾',c:'+60',n:'Malaysia'},{f:'🇸🇬',c:'+65',n:'Singapura'},{f:'🇵🇭',c:'+63',n:'Filipina'},{f:'🇹🇭',c:'+66',n:'Thailand'},{f:'🇻🇳',c:'+84',n:'Vietnam'},{f:'🇧🇳',c:'+673',n:'Brunei'},{f:'🇲🇲',c:'+95',n:'Myanmar'},{f:'🇰🇭',c:'+855',n:'Kamboja'},{f:'🇱🇦',c:'+856',n:'Laos'},{f:'🇹🇱',c:'+670',n:'Timor Leste'},{f:'🇺🇸',c:'+1',n:'Amerika Serikat'},{f:'🇬🇧',c:'+44',n:'Inggris'},{f:'🇦🇺',c:'+61',n:'Australia'},{f:'🇨🇦',c:'+1',n:'Kanada'},{f:'🇳🇿',c:'+64',n:'Selandia Baru'},{f:'🇮🇳',c:'+91',n:'India'},{f:'🇵🇰',c:'+92',n:'Pakistan'},{f:'🇧🇩',c:'+880',n:'Bangladesh'},{f:'🇳🇵',c:'+977',n:'Nepal'},{f:'🇱🇰',c:'+94',n:'Sri Lanka'},{f:'🇨🇳',c:'+86',n:'China'},{f:'🇯🇵',c:'+81',n:'Jepang'},{f:'🇰🇷',c:'+82',n:'Korea Selatan'},{f:'🇭🇰',c:'+852',n:'Hong Kong'},{f:'🇹🇼',c:'+886',n:'Taiwan'},{f:'🇸🇦',c:'+966',n:'Arab Saudi'},{f:'🇦🇪',c:'+971',n:'UAE'},{f:'🇶🇦',c:'+974',n:'Qatar'},{f:'🇰🇼',c:'+965',n:'Kuwait'},{f:'🇧🇭',c:'+973',n:'Bahrain'},{f:'🇴🇲',c:'+968',n:'Oman'},{f:'🇾🇪',c:'+967',n:'Yaman'},{f:'🇮🇶',c:'+964',n:'Irak'},{f:'🇮🇷',c:'+98',n:'Iran'},{f:'🇯🇴',c:'+962',n:'Yordania'},{f:'🇱🇧',c:'+961',n:'Lebanon'},{f:'🇵🇸',c:'+970',n:'Palestina'},{f:'🇹🇷',c:'+90',n:'Turki'},{f:'🇩🇪',c:'+49',n:'Jerman'},{f:'🇫🇷',c:'+33',n:'Prancis'},{f:'🇮🇹',c:'+39',n:'Italia'},{f:'🇪🇸',c:'+34',n:'Spanyol'},{f:'🇵🇹',c:'+351',n:'Portugal'},{f:'🇳🇱',c:'+31',n:'Belanda'},{f:'🇧🇪',c:'+32',n:'Belgia'},{f:'🇨🇭',c:'+41',n:'Swiss'},{f:'🇸🇪',c:'+46',n:'Swedia'},{f:'🇳🇴',c:'+47',n:'Norwegia'},{f:'🇷🇺',c:'+7',n:'Rusia'},{f:'🇺🇦',c:'+380',n:'Ukraina'},{f:'🇧🇷',c:'+55',n:'Brasil'},{f:'🇦🇷',c:'+54',n:'Argentina'},{f:'🇨🇴',c:'+57',n:'Kolombia'},{f:'🇲🇽',c:'+52',n:'Meksiko'},{f:'🇳🇬',c:'+234',n:'Nigeria'},{f:'🇿🇦',c:'+27',n:'Afrika Selatan'},{f:'🇰🇪',c:'+254',n:'Kenya'},{f:'🇨🇲',c:'+237',n:'Kamerun'},{f:'🇪🇬',c:'+20',n:'Mesir'},{f:'🇲🇦',c:'+212',n:'Maroko'}];

const METHODS=[
  {v:'permafresh',n:'Perma Fresh',d:'Baru kena ban pertama kali',tag:'BASE',tc:'t-pro',ic:'fa-seedling',cl:'var(--g)'},
  {v:'spam_id',n:'Spam (Indo)',d:'Ban karena spam - bahasa ID',tag:'ID',tc:'t-pro',ic:'fa-envelope-circle-check',cl:'var(--blue)'},
  {v:'perma_hard',n:'Perma Hard',d:'Ban keras permanen',tag:'HARD',tc:'t-hot',ic:'fa-shield-halved',cl:'var(--red)'},
  {v:'perma_week',n:'Perma Seminggu',d:'Banned lebih dari seminggu',tag:'WEEK',tc:'t-new',ic:'fa-clock-rotate-left',cl:'var(--yel)'},
  {v:'perma_batu',n:'Perma Batu',d:'Ban total, final appeal',tag:'FINAL',tc:'t-hot',ic:'fa-ban',cl:'#f97316'},
  {v:'looping_ban',n:'Looping Ban',d:'Ban → unban → ban terus',tag:'LOOP',tc:'t-hot',ic:'fa-rotate',cl:'#a78bfa'},
  {v:'gb_mod',n:'GB/Mod WA',d:'Ban karena pakai WA Mod',tag:'MOD',tc:'t-new',ic:'fa-mobile-screen-button',cl:'#a78bfa'},
  {v:'mass_report',n:'Mass Report',d:'Di-report banyak user sekaligus',tag:'RPT',tc:'t-hot',ic:'fa-triangle-exclamation',cl:'var(--red)'},
  {v:'new_number',n:'Nomor Baru',d:'Nomor baru langsung banned',tag:'SIM',tc:'t-new',ic:'fa-sim-card',cl:'#34d399'},
  {v:'temp_24h',n:'Temporary 24H',d:'Ban sementara 24 jam',tag:'TEMP',tc:'t-pro',ic:'fa-hourglass-half',cl:'var(--yel)'},
  {v:'temp_72h',n:'Temporary 72H',d:'Ban sementara 3 hari',tag:'72H',tc:'t-new',ic:'fa-calendar-xmark',cl:'var(--yel)'},
  {v:'business_ban',n:'Business Ban',d:'WA Business kena ban',tag:'BIZ',tc:'t-new',ic:'fa-briefcase',cl:'var(--blue)'},
  {v:'no_reason',n:'Banned Ga Jelas',d:'Ban tiba-tiba tanpa alasan',tag:'???',tc:'t-hot',ic:'fa-circle-question',cl:'#f472b6'},
  {v:'after_update',n:'Ban Setelah Update',d:'Banned setelah update WA',tag:'UPD',tc:'t-new',ic:'fa-arrow-up-right-dots',cl:'#34d399'},
  {v:'link_ban',n:'Ban Karena Link',d:'Kena ban karena kirim link',tag:'LINK',tc:'t-new',ic:'fa-link',cl:'var(--blue)'},
  {v:'broadcast_ban',n:'Ban Karena Broadcast',d:'Banned karena kirim broadcast',tag:'BC',tc:'t-hot',ic:'fa-bullhorn',cl:'var(--red)'},
  {v:'bot_ban',n:'Ban Karena Bot',d:'Banned karena aktivitas bot',tag:'BOT',tc:'t-hot',ic:'fa-robot',cl:'#a78bfa'},
  {v:'group_ban',n:'Ban Karena Grup',d:'Banned karena aktivitas di grup',tag:'GRP',tc:'t-new',ic:'fa-users',cl:'#34d399'},
  {v:'media_ban',n:'Ban Karena Media',d:'Banned karena kirim media tertentu',tag:'MED',tc:'t-new',ic:'fa-photo-film',cl:'var(--blue)'},
  {v:'formal_en',n:'Formal English',d:'Appeal profesional EN panjang',tag:'EN',tc:'t-en',ic:'fa-file-pen',cl:'var(--g)'},
  {v:'casual_id',n:'Santai Indo',d:'Pendek, kasual, friendly',tag:'ID',tc:'t-pro',ic:'fa-comment-dots',cl:'#fb923c'},
  {v:'turkish',n:'Bahasa Turki',d:'Template appeal Türkçe',tag:'TR',tc:'t-lang',ic:'fa-language',cl:'#f472b6'},
  {v:'hindi',n:'Bahasa Hindi',d:'Template appeal हिंदी',tag:'HI',tc:'t-lang',ic:'fa-globe',cl:'#67e8f9'},
  {v:'arabic',n:'Bahasa Arab',d:'Template appeal عربي',tag:'AR',tc:'t-lang',ic:'fa-mosque',cl:'#fbbf24'},
  {v:'malay',n:'Bahasa Melayu',d:'Template appeal BM',tag:'MY',tc:'t-lang',ic:'fa-star-and-crescent',cl:'#34d399'},
  {v:'portuguese',n:'Bahasa Portugis',d:'Template appeal PT',tag:'PT',tc:'t-lang',ic:'fa-earth-americas',cl:'var(--blue)'},
  {v:'spanish',n:'Bahasa Spanyol',d:'Template appeal ES',tag:'ES',tc:'t-lang',ic:'fa-sun',cl:'#f97316'},
  {v:'french',n:'Bahasa Prancis',d:'Template appeal FR',tag:'FR',tc:'t-lang',ic:'fa-wine-glass',cl:'#f472b6'},
  {v:'german',n:'Bahasa Jerman',d:'Template appeal DE',tag:'DE',tc:'t-lang',ic:'fa-beer-mug-empty',cl:'#fbbf24'},
  {v:'short_urgent',n:'Pendek + Urgent',d:'Singkat tapi kuat dan urgent',tag:'SHORT',tc:'t-hot',ic:'fa-bolt',cl:'var(--yel)'},
  {v:'second_appeal',n:'Second Appeal',d:'Appeal ke-2 setelah ditolak',tag:'2ND',tc:'t-new',ic:'fa-reply-all',cl:'#a78bfa'},
  {v:'third_appeal',n:'Third Appeal',d:'Appeal ke-3, lebih kuat',tag:'3RD',tc:'t-hot',ic:'fa-reply',cl:'var(--red)'},
  {v:'family_plea',n:'Family Plea',d:'Minta tolong demi keluarga',tag:'❤️',tc:'t-pro',ic:'fa-heart',cl:'var(--red)'},
  {v:'medical',n:'Medical Emergency',d:'Butuh WA untuk keperluan medis',tag:'MED',tc:'t-hot',ic:'fa-hospital',cl:'var(--red)'},
  {v:'work',n:'Work Emergency',d:'Butuh WA untuk pekerjaan penting',tag:'WORK',tc:'t-new',ic:'fa-building',cl:'var(--blue)'},
  {v:'elderly',n:'Lansia / Orang Tua',d:'Untuk orang tua yang butuh WA',tag:'OT',tc:'t-pro',ic:'fa-person-cane',cl:'var(--gold)'},
  {v:'student',n:'Pelajar',d:'Untuk pelajar yang butuh WA',tag:'EDU',tc:'t-en',ic:'fa-graduation-cap',cl:'var(--blue)'},
  {v:'new_device',n:'Ganti HP',d:'Banned setelah ganti perangkat',tag:'DEV',tc:'t-new',ic:'fa-mobile-retro',cl:'#34d399'},
  {v:'sim_swap',n:'Ganti SIM',d:'Banned setelah ganti kartu SIM',tag:'SIM',tc:'t-new',ic:'fa-arrows-rotate',cl:'var(--yel)'},
  {v:'apologetic',n:'Minta Maaf',d:'Akui kesalahan dan minta maaf',tag:'SORRY',tc:'t-pro',ic:'fa-hand-holding-heart',cl:'#f472b6'},
  {v:'multi_lang',n:'🔥 Multi-Language ULTIMATE',d:'EN+ID+Formal — success rate tertinggi',tag:'HOT',tc:'t-hot',ic:'fa-earth-asia',cl:'var(--g)',full:true},
];

const HIST_KEY='vxz_h6',LIMIT_KEY='vxz_rp6',LIMIT_MAX=5,LIMIT_MS=6*3600000;
let selC=COUNTRIES[0],checkC=COUNTRIES[0],appealC=COUNTRIES[0];
let selMethod='',currentUser=null,userProfile=null,photoFile=null;
let currentAppealTemplate=null;
const RL=[];

function rc(){const n=Date.now();while(RL.length&&n-RL[0]>60000)RL.shift();if(RL.length>=25)return false;RL.push(n);return true}
function enc(v){return encodeURIComponent(v||'')}
function isAnd(){return/Android/i.test(navigator.userAgent)}
function san(s){if(!s)return'';return String(s).replace(/[<>"'&]/g,c=>({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','&':'&amp;'}[c]))}
function ago(ts){const d=Date.now()-new Date(ts).getTime(),m=Math.floor(d/60000);if(m<1)return'baru saja';if(m<60)return m+'m lalu';const h=Math.floor(m/60);if(h<24)return h+'j lalu';return Math.floor(h/24)+'h lalu'}
function fullNum(raw,country){if(!raw)return'';const s=raw.trim().replace(/\s+/g,'');if(s.startsWith('+'))return s;const code=country.c.replace('+','');if(s.startsWith('0'))return'+'+code+s.slice(1);return'+'+code+s}
function disp(n){return n.startsWith('+')?n:'+'+n}
function roleBadge(r){const m={owner:'👑 OWNER',admin:'🛡️ ADMIN',premium:'⭐ PREMIUM',user:'USER'};const c={owner:'rb-owner',admin:'rb-admin',premium:'rb-premium',user:'rb-user'};return`<span class="role-badge ${c[r]||'rb-user'}">${m[r]||'USER'}</span>`}
function getLiked(){try{return JSON.parse(localStorage.getItem('vxz_lk')||'[]')}catch{return[]}}
function saveLiked(a){localStorage.setItem('vxz_lk',JSON.stringify(a))}
function getRpT(){try{return JSON.parse(localStorage.getItem(LIMIT_KEY)||'[]')}catch{return[]}}
function saveRpT(a){localStorage.setItem(LIMIT_KEY,JSON.stringify(a))}
function limitInfo(){const n=Date.now();const t=getRpT().filter(x=>n-x<LIMIT_MS);saveRpT(t);return{used:t.length,remaining:Math.max(0,LIMIT_MAX-t.length),next:t.length?t[0]+LIMIT_MS:null}}
function useLimit(){const{remaining}=limitInfo();if(remaining<=0)return false;const t=getRpT().filter(x=>Date.now()-x<LIMIT_MS);t.push(Date.now());saveRpT(t);return true}
function updateLimitUI(){const{used,next}=limitInfo();const tx=document.getElementById('limitTxt');const rs=document.getElementById('limitReset');if(tx)tx.textContent=used+'/'+LIMIT_MAX+' report (reset 6 jam)';if(rs&&next){const d=Math.max(0,next-Date.now());rs.textContent='Reset: '+Math.floor(d/3600000)+'j '+Math.floor((d%3600000)/60000)+'m'}else if(rs)rs.textContent=''}
function isOwner(){return userProfile?.role==='owner'}
function isAdmin(){return['admin','owner'].includes(userProfile?.role)}

function getDeviceInfo(){
  return{
    browser:navigator.userAgent.includes('Chrome')?'Chrome':navigator.userAgent.includes('Firefox')?'Firefox':navigator.userAgent.includes('Safari')?'Safari':'Other',
    os:navigator.userAgent.includes('Android')?'Android':navigator.userAgent.includes('iPhone')||navigator.userAgent.includes('iPad')?'iOS':navigator.userAgent.includes('Windows')?'Windows':navigator.userAgent.includes('Mac')?'macOS':'Linux',
    screen:screen.width+'x'+screen.height,
    lang:navigator.language||'unknown',
    tz:Intl.DateTimeFormat().resolvedOptions().timeZone||'unknown',
    mobile:/Mobi|Android/i.test(navigator.userAgent)
  };
}

function getFingerprint(){
  const d=getDeviceInfo();
  const str=[d.browser,d.os,d.screen,d.lang,d.tz,navigator.platform||''].join('|');
  let h=0;for(let i=0;i<str.length;i++){h=((h<<5)-h)+str.charCodeAt(i);h|=0}
  return Math.abs(h).toString(36);
}
const FP=getFingerprint();

function setStatus(id,type,icon,msg){const b=document.getElementById(id);if(!b)return;b.className='status on '+type;b.innerHTML=`<i class="fa-solid ${icon}" ${type==='load'?'style="animation:spinR 1s linear infinite"':''}></i><span>${msg}</span>`}
function clearSt(id){const b=document.getElementById(id);if(b)b.className='status'}

function buildCList(listEl,searchEl,onSel){
  function render(q){const l=q?COUNTRIES.filter(c=>c.n.toLowerCase().includes(q.toLowerCase())||c.c.includes(q)):COUNTRIES;listEl.innerHTML=l.slice(0,80).map(c=>`<div class="c-item" onclick='(${function(x){onSel(x)}.toString()})(${JSON.stringify(c)})'><span>${c.f}</span><span class="c-code">${c.c}</span><span class="c-name">${c.n}</span></div>`).join('')}
  render('');searchEl.addEventListener('input',e=>render(e.target.value));
}
function toggleDrop(id){const el=document.getElementById(id);const was=el.classList.contains('open');document.querySelectorAll('.c-dropdown').forEach(d=>d.classList.remove('open'));if(!was){el.classList.add('open');el.querySelector('.c-search')?.focus()}}
document.addEventListener('click',e=>{if(!e.target.closest('.code-badge')&&!e.target.closest('.c-dropdown'))document.querySelectorAll('.c-dropdown').forEach(d=>d.classList.remove('open'))});
buildCList(document.getElementById('cList'),document.getElementById('cSearch'),c=>{selC=c;document.getElementById('selFlag').textContent=c.f;document.getElementById('selCode').textContent=c.c;document.getElementById('cDrop').classList.remove('open')});
buildCList(document.getElementById('cListCheck'),document.getElementById('cSearchCheck'),c=>{checkC=c;document.getElementById('checkFlag').textContent=c.f;document.getElementById('checkCode').textContent=c.c;document.getElementById('cDropCheck').classList.remove('open')});
buildCList(document.getElementById('cListAppeal'),document.getElementById('cSearchAppeal'),c=>{appealC=c;document.getElementById('aFlag').textContent=c.f;document.getElementById('aCode').textContent=c.c;document.getElementById('cDropAppeal').classList.remove('open')});

function buildGrid(){
  document.getElementById('mgrid').innerHTML=METHODS.map(m=>`<div class="mc${m.full?' mc-full':''}" data-val="${m.v}" onclick="pickMethod(this,'${m.v}','${m.n}')"><div class="mc-tag ${m.tc}">${m.tag}</div><div class="mc-icon"><i class="fa-solid ${m.ic}" style="color:${m.cl}"></i></div><div class="mc-n">${m.n}</div><div class="mc-d">${m.d}</div></div>`).join('');
}
buildGrid();
function pickMethod(el,val,name){document.querySelectorAll('.mc').forEach(c=>c.classList.remove('sel'));el.classList.add('sel');selMethod=val;document.getElementById('selInfoTxt').textContent=name+' — terpilih ✓';document.getElementById('selInfo').classList.add('on')}

function buildEmail(num,method){
  const d=disp(num);
  const map={
    permafresh:{to:'support@support.whatsapp.com',subject:'Please help — my WhatsApp was permanently banned',body:`Hello WhatsApp Support Team,\n\nMy WhatsApp account ${d} has been permanently banned without any prior warning or explanation. I always follow your Terms of Service and have never engaged in any behavior that would violate your policies.\n\nI believe this ban was applied in error. Please review my account and restore access as soon as possible.\n\nThank you for your help.`},
    spam_id:{to:'support@support.whatsapp.com',subject:'Mohon bantu — akun WhatsApp saya diblokir karena spam',body:`Halo Tim Support WhatsApp yang terhormat,\n\nAkun WhatsApp saya dengan nomor ${d} tiba-tiba diblokir dengan alasan spam, padahal saya tidak pernah melakukan spam sama sekali. Saya hanya berkomunikasi biasa dengan keluarga dan teman-teman.\n\nSaya menduga ini adalah kesalahan sistem yang salah mendeteksi aktivitas normal saya. Saya sangat membutuhkan akun ini untuk komunikasi sehari-hari.\n\nMohon ditinjau dan dibuka kembali.\n\nTerima kasih.`},
    perma_hard:{to:'support@support.whatsapp.com',subject:`URGENT: Unblock WhatsApp ${d} — Possible System Error`,body:`Dear WhatsApp Developer Team,\n\nI am urgently writing to appeal the permanent ban on my WhatsApp account ${d}. I have submitted multiple review requests through the app but none have been successful.\n\nI have never violated any WhatsApp Terms of Service. I strongly believe this is an automated system error that incorrectly flagged my account.\n\nPlease conduct a manual review immediately and restore my access.\n\nThank you.`},
    perma_week:{to:'support@support.whatsapp.com',subject:'WhatsApp account banned for over a week — please help',body:`Hi WhatsApp Support,\n\nMy account ${d} has been banned for over a week now. I have always used the official WhatsApp application and followed all rules.\n\nI am unable to contact my family and colleagues. Please review and lift this ban.\n\nThank you.`},
    perma_batu:{to:'support@support.whatsapp.com',subject:`Final appeal — Please restore my WhatsApp ${d}`,body:`Dear WhatsApp Support,\n\nThis is my final appeal for the permanent ban on account ${d}. I have never used third-party apps, never sent bulk messages, and never violated any guidelines.\n\nI am confident this is a false positive. Please manually review my account history and restore my access.\n\nWith respect.`},
    looping_ban:{to:'support@support.whatsapp.com',subject:`Recurring ban issue — account ${d} keeps getting banned`,body:`Dear WhatsApp Support Team,\n\nI am experiencing a severe issue: my account ${d} keeps getting banned repeatedly, even after being unbanned. This cycle has happened multiple times without any change in my behavior.\n\nI believe there is a technical bug in your detection system targeting my account. Please investigate and permanently resolve this issue.\n\nThank you.`},
    gb_mod:{to:'support@support.whatsapp.com',subject:`WhatsApp ban appeal — account ${d}`,body:`Hello WhatsApp Support,\n\nI want to be fully honest. My account ${d} may have been banned due to a third-party app I previously used. I have since uninstalled everything and now use only the official WhatsApp.\n\nI sincerely apologize and promise to only use the official app going forward. Please give my account one more chance.\n\nThank you.`},
    mass_report:{to:'support@support.whatsapp.com',subject:`False reports — account ${d} wrongly banned`,body:`Dear WhatsApp Team,\n\nMy account ${d} was banned due to what I believe are coordinated false reports by malicious users. I have never harassed or spammed anyone.\n\nPlease conduct a manual review of my actual account activity, not just the reports against me.\n\nThank you.`},
    new_number:{to:'support@support.whatsapp.com',subject:`Brand new number banned immediately — ${d}`,body:`Hello WhatsApp Support,\n\nMy brand new SIM card ${d} was banned immediately upon first registration before I could send any messages. I am the new legitimate owner of this number.\n\nPlease remove this restriction.\n\nThank you.`},
    temp_24h:{to:'support@support.whatsapp.com',subject:`Temporary ban appeal — ${d}`,body:`Hi WhatsApp Support,\n\nMy account ${d} received a temporary ban while chatting normally. I did not violate any rules.\n\nPlease review and lift this restriction.\n\nThank you.`},
    temp_72h:{to:'support@support.whatsapp.com',subject:`3-day ban appeal — ${d}`,body:`Hi WhatsApp Support,\n\nMy account ${d} has been under a 72-hour ban that I believe was applied in error. I have not violated any Terms of Service.\n\nPlease review and remove this temporary restriction.\n\nThank you.`},
    business_ban:{to:'support@support.whatsapp.com',subject:`WhatsApp Business account banned — ${d}`,body:`Dear WhatsApp Business Support,\n\nMy Business account ${d} was banned, severely disrupting my small business operations. I only use it for legitimate one-to-one customer service and never send bulk or automated messages.\n\nPlease restore urgently.\n\nThank you.`},
    no_reason:{to:'support@support.whatsapp.com',subject:`WhatsApp banned without any reason — ${d}`,body:`Dear WhatsApp Support,\n\nMy account ${d} was banned suddenly with absolutely no warning or explanation. I have never: sent spam, used unofficial apps, shared inappropriate content, or violated any policy.\n\nThis ban is a mistake. Please review and restore immediately.\n\nThank you.`},
    after_update:{to:'support@support.whatsapp.com',subject:`Account banned after WhatsApp update — ${d}`,body:`Dear WhatsApp Support,\n\nMy account ${d} was banned immediately after updating to the latest version of WhatsApp. I had no issues before the update.\n\nI believe the update triggered a false positive detection on my account. Please review and restore my access.\n\nThank you.`},
    link_ban:{to:'support@support.whatsapp.com',subject:`Account banned for sending a link — ${d}`,body:`Dear WhatsApp Support,\n\nMy account ${d} appears to have been banned after I shared a link that I believe was completely legitimate and harmless. The link was not spam, malware, or inappropriate content.\n\nPlease review my account and restore access.\n\nThank you.`},
    broadcast_ban:{to:'support@support.whatsapp.com',subject:`Account banned for broadcast message — ${d}`,body:`Dear WhatsApp Support,\n\nMy account ${d} was banned after sending a broadcast message to my contacts. The message was completely legitimate and sent to people who know me personally.\n\nPlease review and restore my account.\n\nThank you.`},
    bot_ban:{to:'support@support.whatsapp.com',subject:`Account banned for bot activity — ${d}`,body:`Dear WhatsApp Support,\n\nMy account ${d} was banned, apparently for bot-like activity. I want to clarify that all activity on my account is done manually by me as a real person.\n\nI believe the automated system misidentified my normal usage pattern. Please review and restore.\n\nThank you.`},
    group_ban:{to:'support@support.whatsapp.com',subject:`Account banned due to group activity — ${d}`,body:`Dear WhatsApp Support,\n\nMy account ${d} was banned apparently due to activity in WhatsApp groups. I have only participated in legitimate groups with people I know and have never engaged in inappropriate behavior.\n\nPlease review and restore my account.\n\nThank you.`},
    media_ban:{to:'support@support.whatsapp.com',subject:`Account banned for media content — ${d}`,body:`Dear WhatsApp Support,\n\nMy account ${d} was banned seemingly for media I shared. I only share appropriate, legal content with friends and family.\n\nI believe this was flagged in error. Please review and restore my account.\n\nThank you.`},
    formal_en:{to:'support@support.whatsapp.com',subject:`Formal Appeal — Account Reinstatement Request for ${d}`,body:`Dear WhatsApp Trust & Safety Team,\n\nI am formally requesting the reinstatement of my WhatsApp account associated with the telephone number ${d}, which was recently suspended.\n\nI have carefully reviewed my usage history and I am confident that I have not engaged in any activity constituting a breach of WhatsApp's Terms of Service, Acceptable Use Policy, or Community Guidelines.\n\nI respectfully request that a qualified member of your review team conduct a manual examination of my complete account activity history.\n\nI remain committed to full compliance with all WhatsApp policies.\n\nRespectfully submitted,\nAccount Holder — ${d}`},
    casual_id:{to:'support@support.whatsapp.com',subject:'tolong bantu unban WA saya',body:`Hai kak,\n\nNomor WA saya ${d} kena ban tiba-tiba. Saya ga ngelakuin apa-apa yang salah, cuma chat biasa aja.\n\nMohon dibuka lagi ya kak, saya butuh banget buat komunikasi sama keluarga 🙏\n\nMakasih banyak.`},
    turkish:{to:'support@support.whatsapp.com',subject:`WhatsApp hesabım haksız yere yasaklandı — ${d}`,body:`Sayın WhatsApp Destek Ekibi,\n\n${d} numaralı WhatsApp hesabım herhangi bir kural ihlali yapmaksızın yasaklanmıştır. Hizmet şartlarınızı her zaman eksiksiz uyguladım ve yalnızca aile ve arkadaşlarımla normal iletişim kuruyordum.\n\nBu yasağın bir sistem hatası sonucunda gerçekleştiğine inanıyorum. Hesabımın incelenmesini ve kısıtlamanın kaldırılmasını saygıyla talep ediyorum.\n\nTeşekkür ederim.`},
    hindi:{to:'support@support.whatsapp.com',subject:`मेरा WhatsApp अकाउंट बैन हो गया — ${d}`,body:`प्रिय WhatsApp सपोर्ट टीम,\n\nमेरा WhatsApp नंबर ${d} बिना किसी कारण के बैन हो गया है। मैंने कभी भी आपकी सेवा शर्तों का उल्लंघन नहीं किया है।\n\nकृपया मेरे अकाउंट की समीक्षा करें और प्रतिबंध हटाएं।\n\nधन्यवाद।`},
    arabic:{to:'support@support.whatsapp.com',subject:`حساب واتساب محظور — ${d}`,body:`عزيزي فريق دعم واتساب،\n\nتم حظر حسابي ${d} دون أي سبب واضح. لم أنتهك أي قواعد أو شروط خدمة.\n\nأرجو مراجعة حسابي ورفع الحظر في أقرب وقت ممكن.\n\nشكراً جزيلاً.`},
    malay:{to:'support@support.whatsapp.com',subject:`Akaun WhatsApp saya diharamkan — ${d}`,body:`Salam hormat Pasukan Sokongan WhatsApp,\n\nAkaun saya ${d} diharamkan tanpa sebarang sebab yang jelas. Saya tidak pernah melanggar sebarang terma perkhidmatan.\n\nMohon semak akaun saya dan angkat sekatan tersebut.\n\nTerima kasih.`},
    portuguese:{to:'support@support.whatsapp.com',subject:`Apelação de banimento — WhatsApp ${d}`,body:`Prezada Equipe de Suporte do WhatsApp,\n\nMinha conta ${d} foi banida sem motivo aparente. Nunca violei os Termos de Serviço do WhatsApp.\n\nSolicito uma revisão manual da minha conta e a remoção do banimento.\n\nObrigado.`},
    spanish:{to:'support@support.whatsapp.com',subject:`Apelación de bloqueo — WhatsApp ${d}`,body:`Estimado equipo de soporte de WhatsApp,\n\nMi cuenta ${d} fue bloqueada sin razón aparente. Nunca he violado los Términos de Servicio.\n\nSolicito una revisión manual y la eliminación del bloqueo.\n\nMuchas gracias.`},
    french:{to:'support@support.whatsapp.com',subject:`Appel contre le bannissement — WhatsApp ${d}`,body:`Cher service d'assistance WhatsApp,\n\nMon compte ${d} a été banni sans raison apparente. Je n'ai jamais enfreint les Conditions d'utilisation.\n\nJe vous demande de procéder à un examen manuel de mon compte et de lever l'interdiction.\n\nMerci.`},
    german:{to:'support@support.whatsapp.com',subject:`Einspruch gegen Sperrung — WhatsApp ${d}`,body:`Sehr geehrtes WhatsApp-Support-Team,\n\nMein Konto ${d} wurde ohne ersichtlichen Grund gesperrt. Ich habe niemals gegen die Nutzungsbedingungen verstoßen.\n\nIch bitte um eine manuelle Überprüfung meines Kontos und die Aufhebung der Sperrung.\n\nVielen Dank.`},
    short_urgent:{to:'support@support.whatsapp.com',subject:`URGENT — Unban ${d} immediately`,body:`Hi,\n\nAccount ${d} was banned unfairly. Zero ToS violations. Please restore urgently.\n\nThank you.`},
    second_appeal:{to:'support@support.whatsapp.com',subject:`Second appeal — ${d} still banned`,body:`Dear WhatsApp Support,\n\nThis is my second appeal for account ${d}. My first was unsuccessful. I firmly maintain I have never violated any policy.\n\nPlease review with fresh eyes.\n\nThank you.`},
    third_appeal:{to:'support@support.whatsapp.com',subject:`THIRD AND FINAL appeal — ${d}`,body:`Dear WhatsApp Support,\n\nThis is my third and final appeal regarding the ban on account ${d}. I have exhausted all in-app options.\n\nI have NEVER violated your Terms of Service. This ban is a critical error on your system's part. I urge you to escalate this to a senior reviewer.\n\nPlease restore my account immediately.\n\nUrgently awaiting your response.`},
    family_plea:{to:'support@support.whatsapp.com',subject:`Please help — I need WhatsApp to reach my family ${d}`,body:`Dear WhatsApp Support,\n\nMy account ${d} is my only means of communication with my family who live far away. Since being banned, I have been completely cut off from my parents and siblings.\n\nI have always used WhatsApp responsibly. This separation is causing real emotional distress. Please restore my account.\n\nWith hope and respect.`},
    medical:{to:'support@support.whatsapp.com',subject:`Medical emergency — Need WhatsApp restored ${d}`,body:`Dear WhatsApp Support,\n\nI urgently need my account ${d} restored for medical purposes. I use WhatsApp to coordinate with my doctor and family regarding my health condition.\n\nThis ban is preventing critical medical communication. Please treat this as urgent and restore my account immediately.\n\nThank you.`},
    work:{to:'support@support.whatsapp.com',subject:`Work emergency — WhatsApp account ${d} needed urgently`,body:`Dear WhatsApp Support,\n\nMy account ${d} is essential for my work. My employer and colleagues use WhatsApp for all work communication.\n\nThis ban is severely impacting my professional responsibilities. Please restore my account as soon as possible.\n\nThank you.`},
    elderly:{to:'support@support.whatsapp.com',subject:`Senior citizen WhatsApp account banned — ${d}`,body:`Dear WhatsApp Support,\n\nI am writing on behalf of an elderly family member whose WhatsApp account ${d} was banned. They rely on WhatsApp as their primary way to stay in touch with children and grandchildren.\n\nThis account is their lifeline to family. Please review and restore it.\n\nThank you for your compassion.`},
    student:{to:'support@support.whatsapp.com',subject:`Student WhatsApp account banned — ${d}`,body:`Dear WhatsApp Support,\n\nI am a student and my WhatsApp account ${d} was banned. I use WhatsApp for all my study groups, class coordination, and educational communication.\n\nThis ban is impacting my education. Please review and restore my account.\n\nThank you.`},
    new_device:{to:'support@support.whatsapp.com',subject:`Account banned after changing device — ${d}`,body:`Dear WhatsApp Support,\n\nMy account ${d} was banned after I switched to a new phone. I transferred my SIM card to the new device and WhatsApp was immediately banned.\n\nI am the same legitimate user on a new device. Please restore my account.\n\nThank you.`},
    sim_swap:{to:'support@support.whatsapp.com',subject:`Account banned after SIM swap — ${d}`,body:`Dear WhatsApp Support,\n\nMy account ${d} was banned after I replaced my SIM card with a new one from the same carrier. I am the same user with the same number.\n\nPlease review my account and restore access.\n\nThank you.`},
    apologetic:{to:'support@support.whatsapp.com',subject:`Sincere apology and appeal — WhatsApp ${d}`,body:`Dear WhatsApp Support Team,\n\nI am writing with a sincere apology and a humble request to restore my account ${d}.\n\nI acknowledge that I may have unknowingly violated your policies. I have thoroughly read your Terms of Service and Community Guidelines, and I commit to following them completely going forward.\n\nPlease give me one more chance. I genuinely value WhatsApp and will be a model user.\n\nWith sincere apologies and respect.`},
    multi_lang:{to:'support@support.whatsapp.com',subject:`URGENT Multi-Language Appeal — Restore WhatsApp ${d}`,body:`Dear WhatsApp Support / Tim Support WhatsApp yang Terhormat,\n\n━━━━━ ENGLISH ━━━━━\nI formally appeal the ban on my WhatsApp account ${d}. I have been a dedicated and responsible user who has consistently followed all Terms of Service and Community Guidelines. I have never sent spam, used unofficial modifications, or violated any policies. I firmly believe this ban is the result of an automated false positive. Please manually review and restore urgently.\n\n━━━━━ BAHASA INDONESIA ━━━━━\nSaya mengajukan banding atas pemblokiran akun WhatsApp saya nomor ${d}. Saya adalah pengguna setia yang selalu mematuhi semua syarat layanan dan panduan komunitas. Saya tidak pernah spam, tidak pakai aplikasi modifikasi, dan tidak melanggar kebijakan apapun. Saya percaya ini kesalahan sistem otomatis. Mohon peninjauan manual dan pemulihan akses sesegera mungkin.\n\n═══════════════\nAccount / Nomor: ${d}\n═══════════════\nThank you / Terima kasih / Teşekkürler / شكراً / धन्यवाद 🙏`}
  };
  return map[method]||{to:'support@support.whatsapp.com',subject:`WhatsApp Appeal — ${d}`,body:`My account ${d} was banned. I always follow your Terms of Service. Please review and restore.\n\nThank you.`};
}

function openEmail(t){
  const iu=`intent://compose?to=${enc(t.to)}&subject=${enc(t.subject)}&body=${enc(t.body)}#Intent;scheme=mailto;package=com.google.android.gm;end`;
  const mu=`mailto:${enc(t.to)}?subject=${enc(t.subject)}&body=${enc(t.body)}`;
  const gu=`https://mail.google.com/mail/?view=cm&fs=1&to=${enc(t.to)}&su=${enc(t.subject)}&body=${enc(t.body)}`;
  if(isAnd()){try{window.location.href=iu}catch(e){}let done=false;document.addEventListener('visibilitychange',function h(){if(document.hidden){done=true;document.removeEventListener('visibilitychange',h)}},{once:true});setTimeout(()=>{if(!done)try{window.location.href=mu}catch(e){try{window.open(gu,'_blank')}catch(e2){}}},1400)}
  else{try{window.location.href=mu}catch(e){}setTimeout(()=>{if(!document.hidden)try{window.open(gu,'_blank')}catch(e){}},800)}
}

document.getElementById('sendBtn').addEventListener('click',()=>{
  if(!rc()){setStatus('unbanStatus','err','fa-circle-exclamation','Terlalu cepat! Tunggu sebentar.');return}
  const num=fullNum((document.getElementById('nomor').value||'').trim(),selC);
  if(!num){setStatus('unbanStatus','err','fa-circle-exclamation','Masukkan nomor WA dulu!');document.getElementById('nomor').focus();return}
  if(!selMethod){setStatus('unbanStatus','err','fa-circle-exclamation','Pilih metode unban dulu!');return}
  setStatus('unbanStatus','load','fa-circle-notch','Membuka email...');
  saveHist(num,selMethod);
  openEmail(buildEmail(num,selMethod));
  setTimeout(()=>setStatus('unbanStatus','ok','fa-circle-check','✓ Email terbuka! Kirim ke support@support.whatsapp.com'),1800);
});

function saveHist(num,method){const name=METHODS.find(m=>m.v===method)?.n||method;const h=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');h.unshift({id:Date.now(),num,method,name,ts:new Date().toLocaleString('id-ID')});if(h.length>50)h.splice(50);localStorage.setItem(HIST_KEY,JSON.stringify(h))}
function renderHistory(){const h=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');const el=document.getElementById('histList');if(!h.length){el.innerHTML='<div class="hist-empty"><i class="fa-solid fa-clock-rotate-left"></i><p>Belum ada riwayat appeal.</p></div>';return}el.innerHTML=h.map(x=>`<div class="hist-card"><div class="hc-icon"><i class="fab fa-whatsapp"></i></div><div class="hc-info"><div class="hc-num">${san(x.num)}</div><div class="hc-meta">${san(x.name)} · ${x.ts}</div></div><button class="hc-del" onclick="delH(${x.id})"><i class="fa-solid fa-trash"></i></button></div>`).join('')}
function delH(id){let h=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');h=h.filter(x=>x.id!==id);localStorage.setItem(HIST_KEY,JSON.stringify(h));renderHistory()}
function clearHistory(){if(!confirm('Hapus semua?'))return;localStorage.removeItem(HIST_KEY);renderHistory()}
function exportHistory(){const h=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');if(!h.length){alert('Belum ada!');return}const a=document.createElement('a');a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(h.map(x=>`[${x.ts}] ${x.num} — ${x.name}`).join('\n'));a.download='vxz-history.txt';a.click()}

function doCheck(){const num=fullNum((document.getElementById('checkNomor').value||'').trim(),checkC);if(!num){alert('Masukkan nomor!');return}const clean=num.replace(/\D/g,'');window.open('https://wa.me/'+clean,'_blank');const r=document.getElementById('checkResult');r.style.display='block';document.getElementById('crTitle').innerHTML=`<i class="fab fa-whatsapp" style="color:var(--g)"></i> Link WA Dibuka`;document.getElementById('crSub').textContent=`Link: https://wa.me/${clean}\n\nJika terbuka dengan tombol "Kirim Pesan" → nomor aktif ✓\nJika halaman error → nomor tidak terdaftar/banned ✗`}

async function authInit(){
  const{data}=await sb.auth.getSession();
  currentUser=data.session?.user||null;
  if(currentUser)await loadProfile();
  updateAuthUI();
  sb.auth.onAuthStateChange(async(_,session)=>{currentUser=session?.user||null;if(currentUser)await loadProfile();else userProfile=null;updateAuthUI()});
}
async function loadProfile(){
  if(!currentUser)return;
  const{data}=await sb.from('profiles').select('*').eq('id',currentUser.id).single();
  if(data){userProfile=data}
  else{const un=currentUser.user_metadata?.username||currentUser.email?.split('@')[0]||'User';await sb.from('profiles').insert({id:currentUser.id,username:un,role:'user',fingerprint:FP});const{data:d2}=await sb.from('profiles').select('*').eq('id',currentUser.id).single();userProfile=d2}
  if(userProfile){await sb.from('profiles').update({last_seen:new Date().toISOString(),fingerprint:FP,device_info:JSON.stringify(getDeviceInfo())}).eq('id',currentUser.id)}
}
function updateAuthUI(){
  const btn=document.getElementById('authBtn');const txt=document.getElementById('authBtnTxt');
  const pB=document.getElementById('photoLoginBadge');const pA=document.getElementById('photoArea');
  if(currentUser&&userProfile){
    txt.textContent=userProfile.username?.slice(0,10)||'User';btn.className='auth-btn logged';btn.querySelector('i').className='fa-solid fa-right-from-bracket';
    if(pB)pB.style.display='none';if(pA)pA.classList.remove('disabled');
  }else{txt.textContent='Login';btn.className='auth-btn';btn.querySelector('i').className='fa-solid fa-right-to-bracket';if(pB)pB.style.display='inline';if(pA)pA.classList.add('disabled')}
}
function handleAuthBtn(){if(currentUser){if(confirm('Logout?'))sb.auth.signOut()}else openModal('login')}
function openModal(mode){document.getElementById('loginModal').classList.add('on');switchModal(mode)}
function closeModal(){document.getElementById('loginModal').classList.remove('on');clearSt('authStatus')}
function switchModal(mode){const il=mode==='login';document.getElementById('loginForm').style.display=il?'block':'none';document.getElementById('registerForm').style.display=il?'none':'block';document.getElementById('modalTitle').textContent=il?'Login':'Daftar';clearSt('authStatus')}
async function doLogin(){
  if(document.getElementById('hp').value)return;
  if(!rc()){setStatus('authStatus','err','fa-circle-exclamation','Terlalu banyak percobaan!');return}
  const email=(document.getElementById('lEmail').value||'').trim();const pass=document.getElementById('lPass').value;
  if(!email||!pass){setStatus('authStatus','err','fa-circle-exclamation','Isi semua field!');return}
  setStatus('authStatus','load','fa-circle-notch','Loading...');
  const{error}=await sb.auth.signInWithPassword({email,password:pass});
  if(error)setStatus('authStatus','err','fa-circle-exclamation',error.message);
  else{clearSt('authStatus');closeModal()}
}
async function doRegister(){
  if(document.getElementById('hp2').value)return;
  if(!rc()){setStatus('authStatus','err','fa-circle-exclamation','Terlalu banyak percobaan!');return}
  const user=(document.getElementById('rUser').value||'').trim();const email=(document.getElementById('rEmail').value||'').trim();const pass=document.getElementById('rPass').value;
  if(!user||!email||!pass){setStatus('authStatus','err','fa-circle-exclamation','Isi semua field!');return}
  if(pass.length<8){setStatus('authStatus','err','fa-circle-exclamation','Password min 8 karakter!');return}
  if(!/^[a-zA-Z0-9_]{3,30}$/.test(user)){setStatus('authStatus','err','fa-circle-exclamation','Username: huruf/angka/_ (3-30 karakter)');return}
  setStatus('authStatus','load','fa-circle-notch','Mendaftar...');
  const{error}=await sb.auth.signUp({email,password:pass,options:{data:{username:user}}});
  if(error)setStatus('authStatus','err','fa-circle-exclamation',error.message);
  else setStatus('authStatus','ok','fa-circle-check','✓ Berhasil! Cek email untuk verifikasi.');
}

function showReportForm(){document.getElementById('reportFormWrap').style.display='block';updateLimitUI();document.getElementById('reportFormWrap').scrollIntoView({behavior:'smooth',block:'nearest'})}
function hideReportForm(){document.getElementById('reportFormWrap').style.display='none';photoFile=null;document.getElementById('photoPreview').innerHTML='';document.getElementById('photoInput').value=''}
function triggerPhoto(){if(!currentUser){openModal('login');return}document.getElementById('photoInput').click()}
document.getElementById('photoInput').addEventListener('change',e=>{
  const file=e.target.files[0];if(!file)return;
  if(file.size>3*1024*1024){alert('Max 3MB!');e.target.value='';return}
  photoFile=file;const r=new FileReader();r.onload=ev=>{document.getElementById('photoPreview').innerHTML=`<img src="${ev.target.result}"/>`};r.readAsDataURL(file);
});
document.getElementById('repDesc').addEventListener('input',function(){document.getElementById('descCount').textContent=this.value.length});

async function submitReport(){
  if(document.getElementById('hp3').value)return;
  if(!rc()){setStatus('reportStatus','err','fa-circle-exclamation','Terlalu cepat!');return}
  const title=san((document.getElementById('repTitle').value||'').trim());
  const cat=document.getElementById('repCat').value;
  const desc=san((document.getElementById('repDesc').value||'').trim());
  if(!title||!cat||!desc){setStatus('reportStatus','err','fa-circle-exclamation','Isi semua field!');return}
  if(title.length<5||desc.length<20){setStatus('reportStatus','err','fa-circle-exclamation','Judul/deskripsi terlalu pendek!');return}
  if(limitInfo().remaining<=0){setStatus('reportStatus','err','fa-circle-exclamation','Limit 5 report/6 jam!');return}
  setStatus('reportStatus','load','fa-circle-notch','Mengirim...');
  let photoUrl=null;
  if(photoFile&&currentUser){const ext=photoFile.name.split('.').pop();const path=`reports/${Date.now()}.${ext}`;const{error:ue}=await sb.storage.from('report-photos').upload(path,photoFile);if(!ue){const{data:ud}=sb.storage.from('report-photos').getPublicUrl(path);photoUrl=ud.publicUrl}}
  const{error}=await sb.from('reports').insert({title,category:cat,description:desc,photo_url:photoUrl,username:currentUser?(userProfile?.username||'User'):'Anonymous',user_id:currentUser?.id||null,fingerprint:FP,likes:0});
  if(error){setStatus('reportStatus','err','fa-circle-exclamation','Gagal: '+error.message);return}
  useLimit();setStatus('reportStatus','ok','fa-circle-check','✓ Report terkirim!');
  document.getElementById('repTitle').value='';document.getElementById('repCat').value='';document.getElementById('repDesc').value='';document.getElementById('descCount').textContent='0';
  photoFile=null;document.getElementById('photoPreview').innerHTML='';document.getElementById('photoInput').value='';
  updateLimitUI();setTimeout(()=>{hideReportForm();loadReports()},1200);
}

async function toggleLike(id,cur,btn){
  const liked=getLiked();const idx=liked.indexOf(id);
  if(idx>-1){liked.splice(idx,1);saveLiked(liked);const n=Math.max(0,cur-1);btn.classList.remove('liked');btn.innerHTML=`<i class="fa-regular fa-heart"></i> ${n}`;btn.dataset.likes=n;await sb.from('reports').update({likes:n}).eq('id',id)}
  else{liked.push(id);saveLiked(liked);const n=cur+1;btn.classList.add('liked');btn.innerHTML=`<i class="fa-solid fa-heart"></i> ${n}`;btn.dataset.likes=n;await sb.from('reports').update({likes:n}).eq('id',id)}
}

function openAppealModal(title,desc){
  currentAppealTemplate={title,desc};
  document.getElementById('appealTemplatePreview').innerHTML=`<b>${san(title)}</b><br/><span style="color:var(--t3)">${san(desc.slice(0,120))}...</span>`;
  document.getElementById('appealNum').value='';
  document.getElementById('appealModal').classList.add('on');
}
function closeAppealModal(){document.getElementById('appealModal').classList.remove('on')}
function sendFromReport(){
  const num=fullNum((document.getElementById('appealNum')?.value||'').trim(),appealC);
  if(!num){alert('Masukkan nomor WA dulu!');return}
  const d=disp(num);
  const t={to:'support@support.whatsapp.com',subject:`WhatsApp Appeal — ${d}`,body:`Dear WhatsApp Support,\n\nI am appealing the ban on my account ${d}.\n\n${currentAppealTemplate?.desc||''}\n\nPlease review and restore my account.\n\nThank you.`};
  closeAppealModal();openEmail(t);saveHist(num,'community_template');
}

async function loadReports(){
  const list=document.getElementById('reportList');
  list.innerHTML='<div class="loading-state"><i class="fa-solid fa-circle-notch fa-spin"></i> Memuat...</div>';
  const{data,error}=await sb.from('reports').select('*').order('created_at',{ascending:false}).limit(30);
  if(error||!data){list.innerHTML='<div class="loading-state"><i class="fa-solid fa-triangle-exclamation"></i> Gagal memuat.</div>';return}
  if(!data.length){list.innerHTML='<div class="loading-state"><i class="fa-solid fa-inbox"></i> Belum ada report. Jadilah yang pertama!</div>';return}
  const liked=getLiked();
  list.innerHTML=data.map(r=>`<div class="report-card" id="rc-${r.id}">
    <div class="rc-head">
      <div class="rc-avatar">${san((r.username||'A').charAt(0).toUpperCase())}</div>
      <div class="rc-info"><div class="rc-user">${san(r.username||'Anonymous')}</div>
      <div class="rc-meta"><span class="rc-cat">${san(r.category||'Lainnya')}</span><span>${ago(r.created_at)}</span></div></div>
      ${isAdmin()?`<button class="mod-del-btn" onclick="delReport('${r.id}')"><i class="fa-solid fa-trash"></i></button>`:''}
    </div>
    <div class="rc-title">${san(r.title)}</div>
    <div class="rc-desc">${san(r.description)}</div>
    ${r.photo_url?`<img class="rc-img" src="${r.photo_url}" loading="lazy" onclick="window.open('${r.photo_url}','_blank')"/>`:''}
    <div class="rc-foot">
      <button class="like-btn${liked.includes(r.id)?' liked':''}" data-likes="${r.likes||0}" onclick="toggleLike('${r.id}',parseInt(this.dataset.likes),this)">
        <i class="fa-${liked.includes(r.id)?'solid':'regular'} fa-heart"></i> ${r.likes||0}
      </button>
      <button class="use-appeal-btn" onclick="openAppealModal('${san(r.title).replace(/'/g,'&apos;')}','${san(r.description.slice(0,300)).replace(/'/g,'&apos;')}')">
        <i class="fab fa-whatsapp"></i> Pakai Appeal
      </button>
    </div>
  </div>`).join('');
}

async function delReport(id){
  if(!isAdmin())return;
  await sb.from('reports').delete().eq('id',id);
  document.getElementById('rc-'+id)?.remove();
}

async function renderProfile(){
  const el=document.getElementById('profileContent');
  if(!currentUser||!userProfile){
    el.innerHTML=`<div class="profile-login-prompt"><i class="fa-solid fa-user-lock" style="font-size:2.5rem;color:var(--t3);display:block;margin-bottom:14px"></i><p style="color:var(--t2);font-size:.82rem;margin-bottom:16px">Login untuk lihat profil lu</p><button class="send-btn" onclick="openModal('login')" style="max-width:200px;margin:0 auto"><i class="fa-solid fa-right-to-bracket"></i><span>LOGIN</span></button></div>`;
    return;
  }
  const{count}=await sb.from('reports').select('*',{count:'exact',head:true}).eq('user_id',currentUser.id);
  const role=userProfile.role||'user';
  const avSrc=userProfile.avatar_url;
  el.innerHTML=`
    <div class="profile-card">
      <div class="profile-avatar-wrap" onclick="triggerAvatarUpload()">
        ${avSrc?`<img src="${avSrc}" alt="avatar"/>`:`<div class="profile-av-txt">${(userProfile.username||'U').charAt(0).toUpperCase()}</div>`}
        <div class="profile-av-edit"><i class="fa-solid fa-camera"></i></div>
      </div>
      <input type="file" id="avatarInput" accept="image/*" style="display:none" onchange="uploadAvatar(this)"/>
      <div class="profile-name">${san(userProfile.username||'User')}</div>
      <div style="margin:6px 0">${roleBadge(role)}</div>
      <div class="profile-email">${san(currentUser.email||'')}</div>
      <div class="profile-stats">
        <div class="ps"><div class="ps-n">${count||0}</div><div class="ps-l">Reports</div></div>
        <div class="ps"><div class="ps-n">${role==='owner'?'∞':role==='admin'?'★':role==='premium'?'⭐':'—'}</div><div class="ps-l">Akses</div></div>
      </div>
    </div>
    <div class="profile-edit-section">
      <div class="sh" style="margin:0 0 12px"><div class="sh-l"></div><div class="sh-t">EDIT PROFIL</div><div class="sh-l"></div></div>
      <div class="field-g"><div class="field-lbl">USERNAME BARU</div><div class="inp-w"><i class="ico fas fa-user"></i><input type="text" id="newUsername" class="fi" placeholder="${san(userProfile.username||'username')}" maxlength="30"/></div></div>
      <div class="field-g"><div class="field-lbl">PASSWORD BARU</div><div class="inp-w"><i class="ico fas fa-lock"></i><input type="password" id="newPass" class="fi" placeholder="kosongkan jika tidak ubah"/></div></div>
      <button class="send-btn" onclick="saveProfile()" style="margin-bottom:8px"><i class="fa-solid fa-floppy-disk"></i><span>SIMPAN PERUBAHAN</span></button>
      <div class="status" id="profileStatus"></div>
      <button class="send-btn" onclick="sb.auth.signOut()" style="margin-top:10px;background:rgba(255,79,79,0.12);box-shadow:none;color:var(--red);border:1px solid rgba(255,79,79,0.3);animation:none"><i class="fa-solid fa-right-from-bracket"></i><span>LOGOUT</span></button>
    </div>
    ${isAdmin()?adminPanelHTML():''}
  `;
  if(isAdmin())initAdmin();
}

function triggerAvatarUpload(){document.getElementById('avatarInput')?.click()}
async function uploadAvatar(input){
  const file=input.files[0];if(!file||!currentUser)return;
  if(file.size>3*1024*1024){alert('Max 3MB!');return}
  const ext=file.name.split('.').pop();const path=`avatars/${currentUser.id}.${ext}`;
  const{error}=await sb.storage.from('report-photos').upload(path,file,{upsert:true});
  if(error){alert('Gagal upload foto: '+error.message);return}
  const{data}=sb.storage.from('report-photos').getPublicUrl(path);
  await sb.from('profiles').update({avatar_url:data.publicUrl+'?t='+Date.now()}).eq('id',currentUser.id);
  userProfile.avatar_url=data.publicUrl;
  renderProfile();
}

async function saveProfile(){
  const newUN=(document.getElementById('newUsername')?.value||'').trim();
  const newPass=(document.getElementById('newPass')?.value||'').trim();
  if(!newUN&&!newPass){setStatus('profileStatus','err','fa-circle-exclamation','Isi username atau password baru!');return}
  setStatus('profileStatus','load','fa-circle-notch','Menyimpan...');
  if(newUN&&newUN!==userProfile.username){
    if(!/^[a-zA-Z0-9_]{3,30}$/.test(newUN)){setStatus('profileStatus','err','fa-circle-exclamation','Username tidak valid!');return}
    const{error}=await sb.from('profiles').update({username:newUN}).eq('id',currentUser.id);
    if(error){setStatus('profileStatus','err','fa-circle-exclamation','Gagal: '+error.message);return}
    userProfile.username=newUN;
  }
  if(newPass){
    if(newPass.length<8){setStatus('profileStatus','err','fa-circle-exclamation','Password min 8 karakter!');return}
    const{error}=await sb.auth.updateUser({password:newPass});
    if(error){setStatus('profileStatus','err','fa-circle-exclamation','Gagal: '+error.message);return}
  }
  setStatus('profileStatus','ok','fa-circle-check','✓ Profil diperbarui!');
  updateAuthUI();
}

function adminPanelHTML(){
  return`<div class="admin-panel">
    <div class="sh" style="margin:0 0 12px"><div class="sh-l"></div><div class="sh-t">${isOwner()?'👑 OWNER PANEL':'🛡️ ADMIN PANEL'}</div><div class="sh-l"></div></div>
    <div class="admin-tabs">
      <button class="atab active" onclick="switchATab('users',this)">Users</button>
      <button class="atab" onclick="switchATab('announce',this)">Announce</button>
      <button class="atab" onclick="switchATab('logs',this)">Logs</button>
      ${isOwner()?'<button class="atab" onclick="switchATab(\'banned\',this)">Banned</button>':''}
    </div>
    <div id="aTab-users">
      <div style="display:flex;gap:8px;margin-bottom:10px">
        <div class="inp-w"><i class="ico fas fa-search"></i><input type="text" id="uSearch" class="fi" placeholder="Cari username..."/></div>
        <button onclick="searchUsers()" style="padding:12px 14px;background:var(--glass2);border:1px solid var(--border-g);border-radius:var(--r2);color:var(--g);cursor:pointer">Cari</button>
      </div>
      <div id="uResult"></div>
    </div>
    <div id="aTab-announce" style="display:none">
      <div class="field-g" style="margin-top:4px"><div class="field-lbl">Judul</div><div class="inp-w"><i class="ico fas fa-bullhorn"></i><input type="text" id="aTitle" class="fi" placeholder="Judul announcement..."/></div></div>
      <div class="field-g"><div class="field-lbl">Isi</div><div class="inp-w"><textarea id="aContent" class="fi" placeholder="Isi announcement..." style="height:70px;resize:none"></textarea></div></div>
      <button class="send-btn" onclick="postAnn()"><i class="fa-solid fa-bullhorn"></i><span>POST</span></button>
      <div class="status" id="annStatus" style="margin-top:8px"></div>
      <div id="annList" style="margin-top:12px"></div>
    </div>
    <div id="aTab-logs" style="display:none">
      <div id="logList"><div class="loading-state"><i class="fa-solid fa-circle-notch fa-spin"></i></div></div>
    </div>
    ${isOwner()?'<div id="aTab-banned" style="display:none"><div id="bannedList"><div class="loading-state"><i class="fa-solid fa-circle-notch fa-spin"></i></div></div></div>':''}
  </div>`;
}

function switchATab(tab,btn){
  document.querySelectorAll('.atab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  ['users','announce','logs','banned'].forEach(t=>{const el=document.getElementById('aTab-'+t);if(el)el.style.display=t===tab?'block':'none'});
  if(tab==='announce')loadAnn();
  if(tab==='logs')loadLogs();
  if(tab==='banned')loadBanned();
}
function initAdmin(){loadAnn()}

async function searchUsers(){
  const q=(document.getElementById('uSearch')?.value||'').trim();
  const el=document.getElementById('uResult');if(!q){el.innerHTML='<div style="font-size:.75rem;color:var(--t3)">Masukkan username</div>';return}
  el.innerHTML='<div class="loading-state"><i class="fa-solid fa-circle-notch fa-spin"></i></div>';
  const{data}=await sb.from('profiles').select('*').ilike('username','%'+q+'%').limit(8);
  if(!data?.length){el.innerHTML='<div style="font-size:.75rem;color:var(--t3)">Tidak ditemukan</div>';return}
  el.innerHTML=data.map(u=>{
    let di={};try{di=JSON.parse(u.device_info||'{}')}catch(e){}
    return`<div class="user-result-card">
      <div class="ur-top">
        <div style="flex:1">
          <div class="ur-name">${san(u.username||'?')} ${roleBadge(u.role||'user')} ${u.is_banned?'<span style="color:var(--red);font-size:.62rem">BANNED</span>':''}</div>
          <div class="ur-meta">FP: ${u.fingerprint||'?'} · Last: ${u.last_seen?ago(u.last_seen):'?'}</div>
        </div>
      </div>
      ${di.browser?`<div class="ur-device">📱 ${di.os||'?'} · 🌐 ${di.browser||'?'} · 📺 ${di.screen||'?'} · 🌍 ${di.tz||'?'} · 📶 ${di.mobile?'Mobile':'Desktop'}</div>`:''}
      <div class="ur-actions">
        ${isOwner()?`<select class="role-sel" onchange="setRole('${u.id}',this.value)"><option value="user" ${u.role==='user'?'selected':''}>User</option><option value="premium" ${u.role==='premium'?'selected':''}>Premium</option><option value="admin" ${u.role==='admin'?'selected':''}>Admin</option><option value="owner" ${u.role==='owner'?'selected':''}>Owner</option></select>`:''}
        <button class="ban-btn${u.is_banned?' unban':''}" onclick="toggleBan('${u.id}','${u.is_banned}','${u.fingerprint||''}')">${u.is_banned?'Unban':'Ban'}</button>
      </div>
    </div>`;
  }).join('');
}

async function setRole(uid,role){if(!isOwner())return;await sb.from('profiles').update({role}).eq('id',uid);alert('Role → '+role+'!')}
async function toggleBan(uid,isBanned,fp){
  if(!isAdmin())return;const nb=isBanned==='true'?false:true;
  const reason=nb?prompt('Alasan ban (wajib):'):'';
  if(nb&&!reason)return;
  await sb.from('profiles').update({is_banned:nb,ban_reason:reason||null}).eq('id',uid);
  if(nb&&fp){
    await sb.from('banned_fingerprints').insert({fingerprint:fp,reason:reason,banned_by:currentUser.id}).then(()=>{}).catch(()=>{});
  }
  await logActivity(nb?'BAN_USER':'UNBAN_USER',`User ${uid} ${nb?'banned':'unbanned'}. Reason: ${reason||'removed'}`);
  searchUsers();
}

async function postAnn(){
  const title=(document.getElementById('aTitle')?.value||'').trim();const content=(document.getElementById('aContent')?.value||'').trim();
  if(!title||!content){setStatus('annStatus','err','fa-circle-exclamation','Isi semua!');return}
  setStatus('annStatus','load','fa-circle-notch','Posting...');
  const{error}=await sb.from('announcements').insert({title,content,author_id:currentUser.id});
  if(error){setStatus('annStatus','err','fa-circle-exclamation','Gagal!');return}
  setStatus('annStatus','ok','fa-circle-check','✓ Posted!');
  document.getElementById('aTitle').value='';document.getElementById('aContent').value='';
  loadAnn();loadAnnBanner();
}
async function loadAnn(){
  const el=document.getElementById('annList');if(!el)return;
  const{data}=await sb.from('announcements').select('*').order('created_at',{ascending:false}).limit(10);
  if(!data?.length){el.innerHTML='<div style="font-size:.76rem;color:var(--t3);text-align:center;padding:10px">Belum ada</div>';return}
  el.innerHTML=data.map(a=>`<div class="ann-card"><div class="ann-title">${san(a.title)}</div><div class="ann-body">${san(a.content)}</div><div class="ann-meta">${ago(a.created_at)}${isOwner()?`<button onclick="delAnn('${a.id}')" style="background:none;border:none;color:var(--red);cursor:pointer"><i class="fa-solid fa-trash"></i></button>`:''}</div></div>`).join('');
}
async function delAnn(id){if(!isOwner())return;if(!confirm('Hapus?'))return;await sb.from('announcements').delete().eq('id',id);loadAnn()}

async function logActivity(action,detail){
  try{
    const di=getDeviceInfo();
    await sb.from('activity_logs').insert({user_id:currentUser?.id||null,action,detail,fingerprint:FP,device_info:JSON.stringify(di)});
  }catch(e){}
}
async function loadLogs(){
  const el=document.getElementById('logList');if(!el)return;
  const{data}=await sb.from('activity_logs').select('*').order('created_at',{ascending:false}).limit(50);
  if(!data?.length){el.innerHTML='<div style="font-size:.75rem;color:var(--t3);text-align:center;padding:10px">Belum ada log</div>';return}
  el.innerHTML=data.map(l=>{
    const isDanger=['BAN_USER','UNBAN_USER','DELETE_REPORT'].includes(l.action);
    const isWarn=['LOGIN_FAIL','RATE_LIMIT'].includes(l.action);
    return`<div class="log-card ${isDanger?'danger':isWarn?'warn':''}">
      <b style="color:${isDanger?'var(--red)':isWarn?'var(--yel)':'var(--g)'}">${san(l.action)}</b> · ${ago(l.created_at)}<br/>
      ${san(l.detail||'')} · FP: ${l.fingerprint||'?'}
    </div>`;
  }).join('');
}
async function loadBanned(){
  const el=document.getElementById('bannedList');if(!el)return;
  const{data}=await sb.from('banned_fingerprints').select('*').order('created_at',{ascending:false}).limit(30);
  if(!data?.length){el.innerHTML='<div style="font-size:.75rem;color:var(--t3);text-align:center;padding:10px">Tidak ada fingerprint yang dibanned</div>';return}
  el.innerHTML=data.map(b=>`<div class="fp-ban-card">
    <div class="fp-val">${san(b.fingerprint)}<br/><span style="font-size:.62rem;color:var(--t3)">${san(b.reason||'')} · ${ago(b.created_at)}</span></div>
    <button onclick="unbanFP('${b.id}')" style="background:rgba(37,211,102,0.1);border:1px solid var(--border-g);color:var(--g);font-size:.68rem;padding:5px 10px;border-radius:8px;cursor:pointer">Unban</button>
  </div>`).join('');
}
async function unbanFP(id){if(!isOwner())return;await sb.from('banned_fingerprints').delete().eq('id',id);loadBanned()}

async function checkBanned(){
  try{
    const{data}=await sb.from('banned_fingerprints').select('id').eq('fingerprint',FP).limit(1);
    if(data?.length){document.body.innerHTML='<div style="position:fixed;inset:0;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;color:#ff4f4f;font-family:monospace;text-align:center;padding:20px"><div style="font-size:3rem">🚫</div><div style="font-size:1.2rem;font-weight:700">AKSES DIBANNED</div><div style="font-size:.8rem;color:#666">Perangkat ini telah dibanned dari VXZ Unban Pro.<br/>Hubungi admin jika ini kesalahan.</div></div>';return false}
  }catch(e){}
  return true;
}

async function loadAnnBanner(){
  const{data}=await sb.from('announcements').select('*').order('created_at',{ascending:false}).limit(1);
  const b=document.getElementById('annBanner');if(!b)return;
  if(!data?.length){b.style.display='none';return}
  const a=data[0];
  b.innerHTML=`<div class="ann-banner-inner"><i class="fa-solid fa-bullhorn" style="color:var(--gold)"></i><span><b>${san(a.title)}</b> — ${san(a.content.slice(0,80))}${a.content.length>80?'...':''}</span><button onclick="this.closest('#annBanner').style.display='none'" style="background:none;border:none;color:var(--t3);cursor:pointer"><i class="fa-solid fa-xmark"></i></button></div>`;
  b.style.cssText='display:block;background:linear-gradient(135deg,rgba(240,165,0,0.08),rgba(240,165,0,0.04));border-bottom:1px solid rgba(240,165,0,0.2);padding:10px 0';
}

function goPage(name,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.bn').forEach(b=>b.classList.remove('active'));
  document.getElementById('p-'+name)?.classList.add('on');
  if(btn)btn.classList.add('active');
  if(name==='history')renderHistory();
  if(name==='community'){loadReports();updateLimitUI()}
  if(name==='profile')renderProfile();
}

function setTheme(theme,el){
  document.body.dataset.theme=theme;
  localStorage.setItem('vxz_theme',theme);
  document.querySelectorAll('.theme-opt').forEach(o=>o.classList.remove('active'));
  if(el)el.classList.add('active');
}
function loadTheme(){
  const t=localStorage.getItem('vxz_theme')||'dark';
  document.body.dataset.theme=t;
  const el=document.querySelector(`[data-theme="${t}"]`);
  if(el)el.classList.add('active');
}
function savePref(key,val){localStorage.setItem('vxz_pref_'+key,val?'1':'0')}
function loadPrefs(){
  const ti=localStorage.getItem('vxz_pref_intro');const tn=localStorage.getItem('vxz_pref_notif');
  const ti_el=document.getElementById('toggleIntro');const tn_el=document.getElementById('toggleNotif');
  if(ti_el&&ti!==null)ti_el.checked=ti==='1';
  if(tn_el&&tn!==null)tn_el.checked=tn==='1';
}

const video=document.getElementById('player');
const bar=document.getElementById('introBar');
const intro=document.getElementById('intro');
const appEl=document.getElementById('app');
const welcomeEl=document.getElementById('welcome');
video.addEventListener('loadedmetadata',()=>{const d=video.duration||5;document.documentElement.style.setProperty('--dur',d+'s');if(bar)bar.style.animationDuration=d+'s'});
function tryPlay(){video.muted=false;video.volume=1;video.play().catch(()=>{video.muted=true;video.play().catch(()=>{})})}
window.addEventListener('load',async()=>{
  loadTheme();
  const ok=await checkBanned();
  if(!ok)return;
  tryPlay();
});
function showApp(){
  intro.classList.add('out');
  setTimeout(()=>{
    intro.style.display='none';appEl.classList.add('on');
    if(!localStorage.getItem('vxz_wc_v6')){
      setTimeout(()=>{welcomeEl.classList.add('on');localStorage.setItem('vxz_wc_v6','1');setTimeout(()=>welcomeEl.classList.remove('on'),3200)},300);
    }
    loadAnnBanner();loadPrefs();
  },900);
}
video.addEventListener('ended',()=>setTimeout(showApp,200));
setTimeout(()=>{if(!video.ended)try{showApp()}catch(e){}},9500);
authInit();
