const sb=supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
const COUNTRIES=[{f:'🇮🇩',c:'+62',n:'Indonesia'},{f:'🇲🇾',c:'+60',n:'Malaysia'},{f:'🇸🇬',c:'+65',n:'Singapura'},{f:'🇵🇭',c:'+63',n:'Filipina'},{f:'🇹🇭',c:'+66',n:'Thailand'},{f:'🇻🇳',c:'+84',n:'Vietnam'},{f:'🇧🇳',c:'+673',n:'Brunei'},{f:'🇲🇲',c:'+95',n:'Myanmar'},{f:'🇺🇸',c:'+1',n:'Amerika Serikat'},{f:'🇬🇧',c:'+44',n:'Inggris'},{f:'🇦🇺',c:'+61',n:'Australia'},{f:'🇨🇦',c:'+1',n:'Kanada'},{f:'🇮🇳',c:'+91',n:'India'},{f:'🇵🇰',c:'+92',n:'Pakistan'},{f:'🇧🇩',c:'+880',n:'Bangladesh'},{f:'🇨🇳',c:'+86',n:'China'},{f:'🇯🇵',c:'+81',n:'Jepang'},{f:'🇰🇷',c:'+82',n:'Korea Selatan'},{f:'🇸🇦',c:'+966',n:'Arab Saudi'},{f:'🇦🇪',c:'+971',n:'UAE'},{f:'🇶🇦',c:'+974',n:'Qatar'},{f:'🇹🇷',c:'+90',n:'Turki'},{f:'🇩🇪',c:'+49',n:'Jerman'},{f:'🇫🇷',c:'+33',n:'Prancis'},{f:'🇮🇹',c:'+39',n:'Italia'},{f:'🇪🇸',c:'+34',n:'Spanyol'},{f:'🇵🇹',c:'+351',n:'Portugal'},{f:'🇳🇱',c:'+31',n:'Belanda'},{f:'🇷🇺',c:'+7',n:'Rusia'},{f:'🇧🇷',c:'+55',n:'Brasil'},{f:'🇳🇬',c:'+234',n:'Nigeria'},{f:'🇿🇦',c:'+27',n:'Afrika Selatan'},{f:'🇰🇪',c:'+254',n:'Kenya'},{f:'🇨🇲',c:'+237',n:'Kamerun'},{f:'🇪🇬',c:'+20',n:'Mesir'},{f:'🇲🇦',c:'+212',n:'Maroko'}];
const METHODS=[{v:'permafresh',n:'Perma Fresh',d:'Baru kena ban pertama kali',tag:'BASE',tc:'t-pro',ic:'fa-seedling',cl:'var(--g)'},{v:'spam_id',n:'Spam (Indo)',d:'Ban karena spam',tag:'ID',tc:'t-pro',ic:'fa-envelope-circle-check',cl:'var(--blue)'},{v:'perma_hard',n:'Perma Hard',d:'Ban keras permanen',tag:'HARD',tc:'t-hot',ic:'fa-shield-halved',cl:'var(--red)'},{v:'perma_week',n:'Perma Seminggu',d:'Banned lebih dari seminggu',tag:'TEMP',tc:'t-new',ic:'fa-clock-rotate-left',cl:'var(--yel)'},{v:'perma_batu',n:'Perma Batu',d:'Ban total, final appeal',tag:'FINAL',tc:'t-hot',ic:'fa-ban',cl:'#f97316'},{v:'looping_ban',n:'Looping Ban',d:'Ban → unban → ban terus',tag:'LOOP',tc:'t-hot',ic:'fa-rotate',cl:'#a78bfa'},{v:'gb_mod',n:'GB/Mod WA',d:'Ban karena WA Mod',tag:'MOD',tc:'t-new',ic:'fa-mobile-screen-button',cl:'#a78bfa'},{v:'mass_report',n:'Mass Report',d:'Di-report banyak user',tag:'RPT',tc:'t-hot',ic:'fa-triangle-exclamation',cl:'var(--red)'},{v:'new_number',n:'Nomor Baru',d:'Nomor baru langsung banned',tag:'SIM',tc:'t-new',ic:'fa-sim-card',cl:'#34d399'},{v:'temp_24h',n:'Temporary 24H',d:'Ban sementara 24 jam',tag:'TEMP',tc:'t-pro',ic:'fa-hourglass-half',cl:'var(--yel)'},{v:'business_ban',n:'Business Ban',d:'WA Business kena ban',tag:'BIZ',tc:'t-new',ic:'fa-briefcase',cl:'var(--blue)'},{v:'no_reason',n:'Banned Ga Jelas',d:'Ban tiba-tiba tanpa alasan',tag:'???',tc:'t-hot',ic:'fa-circle-question',cl:'#f472b6'},{v:'formal_en',n:'Formal English',d:'Appeal profesional EN',tag:'EN',tc:'t-en',ic:'fa-file-pen',cl:'var(--g)'},{v:'casual_id',n:'Santai Indo',d:'Pendek dan kasual',tag:'ID',tc:'t-pro',ic:'fa-comment-dots',cl:'#fb923c'},{v:'turkish',n:'Bahasa Turki',d:'Template TR',tag:'TR',tc:'t-lang',ic:'fa-language',cl:'#f472b6'},{v:'hindi',n:'Bahasa Hindi',d:'Template HI',tag:'HI',tc:'t-lang',ic:'fa-globe',cl:'#67e8f9'},{v:'arabic',n:'Bahasa Arab',d:'Template AR',tag:'AR',tc:'t-lang',ic:'fa-mosque',cl:'#fbbf24'},{v:'malay',n:'Bahasa Melayu',d:'Template MY',tag:'MY',tc:'t-lang',ic:'fa-star-and-crescent',cl:'#34d399'},{v:'portuguese',n:'Bahasa Portugis',d:'Template PT',tag:'PT',tc:'t-lang',ic:'fa-earth-americas',cl:'var(--blue)'},{v:'spanish',n:'Bahasa Spanyol',d:'Template ES',tag:'ES',tc:'t-lang',ic:'fa-sun',cl:'#f97316'},{v:'short_urgent',n:'Pendek + Urgent',d:'Singkat tapi kuat',tag:'SHORT',tc:'t-hot',ic:'fa-bolt',cl:'var(--yel)'},{v:'second_appeal',n:'Second Appeal',d:'Appeal ke-2',tag:'2ND',tc:'t-new',ic:'fa-reply-all',cl:'#a78bfa'},{v:'family_plea',n:'Family Plea',d:'Demi keluarga',tag:'❤️',tc:'t-pro',ic:'fa-heart',cl:'var(--red)'},{v:'multi_lang',n:'🔥 Multi-Language ULTIMATE',d:'EN+ID+Formal — success rate tertinggi',tag:'HOT',tc:'t-hot',ic:'fa-earth-asia',cl:'var(--g)',full:true}];
const LIMIT_KEY='vxz_rp',LIMIT_MAX=5,LIMIT_MS=6*3600000,HIST_KEY='vxz_h';
let selC=COUNTRIES[0],checkC=COUNTRIES[0],appealC=COUNTRIES[0],selMethod='',currentUser=null,userProfile=null,photoFile=null;
const RL=[];
function rc(){const n=Date.now();while(RL.length&&n-RL[0]>60000)RL.shift();if(RL.length>=30)return false;RL.push(n);return true}
function enc(v){return encodeURIComponent(v||'')}
function isAnd(){return/Android/i.test(navigator.userAgent)}
function san(s){if(!s)return'';return String(s).replace(/[<>"'&]/g,c=>({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','&':'&amp;'}[c]))}
function ago(ts){const d=Date.now()-new Date(ts).getTime(),m=Math.floor(d/60000);if(m<1)return'baru saja';if(m<60)return m+'m lalu';const h=Math.floor(m/60);if(h<24)return h+'j lalu';return Math.floor(h/24)+'h lalu'}
function fullNum(raw,country){if(!raw)return'';const s=raw.trim().replace(/\s+/g,'');if(s.startsWith('+'))return s;const code=country.c.replace('+','');if(s.startsWith('0'))return'+'+code+s.slice(1);return'+'+code+s}
function disp(n){return n.startsWith('+')?n:'+'+n}
function roleBadge(role){const m={owner:'👑 OWNER',admin:'🛡️ ADMIN',premium:'⭐ PREMIUM',user:'USER'};const c={owner:'rb-owner',admin:'rb-admin',premium:'rb-premium',user:'rb-user'};return`<span class="role-badge ${c[role]||'rb-user'}">${m[role]||'USER'}</span>`}
function getLiked(){try{return JSON.parse(localStorage.getItem('vxz_lk')||'[]')}catch{return[]}}
function saveLiked(a){localStorage.setItem('vxz_lk',JSON.stringify(a))}
function getRpT(){try{return JSON.parse(localStorage.getItem(LIMIT_KEY)||'[]')}catch{return[]}}
function saveRpT(a){localStorage.setItem(LIMIT_KEY,JSON.stringify(a))}
function limitInfo(){const n=Date.now();const t=getRpT().filter(x=>n-x<LIMIT_MS);saveRpT(t);return{used:t.length,remaining:Math.max(0,LIMIT_MAX-t.length),next:t.length?t[0]+LIMIT_MS:null}}
function useLimit(){const{remaining}=limitInfo();if(remaining<=0)return false;const t=getRpT().filter(x=>Date.now()-x<LIMIT_MS);t.push(Date.now());saveRpT(t);return true}
function updateLimitUI(){const{used,next}=limitInfo();const tx=document.getElementById('limitTxt');const rs=document.getElementById('limitReset');if(tx)tx.textContent=used+'/'+LIMIT_MAX+' report (reset 6 jam)';if(rs&&next){const d=Math.max(0,next-Date.now());rs.textContent='Reset: '+Math.floor(d/3600000)+'j '+Math.floor((d%3600000)/60000)+'m'}else if(rs)rs.textContent=''}
function isOwner(){return userProfile?.role==='owner'}
function isAdmin(){return['admin','owner'].includes(userProfile?.role)}
function isPremium(){return['premium','admin','owner'].includes(userProfile?.role)}

function buildCList(listEl,searchEl,onSel){
  function render(q){const l=q?COUNTRIES.filter(c=>c.n.toLowerCase().includes(q.toLowerCase())||c.c.includes(q)):COUNTRIES;listEl.innerHTML=l.slice(0,80).map(c=>`<div class="c-item" onclick='(${function(x){onSel(x)}.toString()})(${JSON.stringify(c)})'><span>${c.f}</span><span class="c-code">${c.c}</span><span class="c-name">${c.n}</span></div>`).join('')}
  render('');searchEl.addEventListener('input',e=>render(e.target.value));
}
function toggleDrop(id){const el=document.getElementById(id);const was=el.classList.contains('open');document.querySelectorAll('.c-dropdown').forEach(d=>d.classList.remove('open'));if(!was){el.classList.add('open');el.querySelector('.c-search')?.focus()}}
document.addEventListener('click',e=>{if(!e.target.closest('.code-badge')&&!e.target.closest('.c-dropdown'))document.querySelectorAll('.c-dropdown').forEach(d=>d.classList.remove('open'))});
buildCList(document.getElementById('cList'),document.getElementById('cSearch'),c=>{selC=c;document.getElementById('selFlag').textContent=c.f;document.getElementById('selCode').textContent=c.c;document.getElementById('cDrop').classList.remove('open')});
buildCList(document.getElementById('cListCheck'),document.getElementById('cSearchCheck'),c=>{checkC=c;document.getElementById('checkFlag').textContent=c.f;document.getElementById('checkCode').textContent=c.c;document.getElementById('cDropCheck').classList.remove('open')});

function buildGrid(){document.getElementById('mgrid').innerHTML=METHODS.map(m=>`<div class="mc${m.full?' mc-full':''}" data-val="${m.v}" onclick="pickMethod(this,'${m.v}','${m.n}')"><div class="mc-tag ${m.tc}">${m.tag}</div><div class="mc-icon"><i class="fa-solid ${m.ic}" style="color:${m.cl}"></i></div><div class="mc-n">${m.n}</div><div class="mc-d">${m.d}</div></div>`).join('')}
buildGrid();
function pickMethod(el,val,name){document.querySelectorAll('.mc').forEach(c=>c.classList.remove('sel'));el.classList.add('sel');selMethod=val;document.getElementById('selInfoTxt').textContent=name+' — terpilih ✓';document.getElementById('selInfo').classList.add('on')}

function setStatus(id,type,icon,msg){const b=document.getElementById(id);if(!b)return;b.className='status on '+type;b.innerHTML=`<i class="fa-solid ${icon}" ${type==='load'?'style="animation:spinR 1s linear infinite"':''}></i><span>${msg}</span>`}
function clearSt(id){const b=document.getElementById(id);if(b)b.className='status'}

function buildEmail(num,method){
  const d=disp(num);
  const map={
    permafresh:{to:'support@support.whatsapp.com',subject:'Please help — my WhatsApp was permanently banned',body:`Hello WhatsApp Support,\n\nMy account ${d} was permanently banned without any warning. I always follow your Terms of Service.\n\nPlease review and restore my account.\n\nThank you.`},
    spam_id:{to:'support@support.whatsapp.com',subject:'Mohon bantu — akun WhatsApp saya diblokir',body:`Halo Tim WhatsApp,\n\nAkun saya ${d} diblokir dengan alasan spam, padahal saya tidak pernah spam. Saya hanya chat biasa dengan keluarga dan teman.\n\nMohon ditinjau dan dibuka kembali.\n\nTerima kasih.`},
    perma_hard:{to:'support@support.whatsapp.com',subject:`URGENT: Unblock WhatsApp ${d}`,body:`Dear WhatsApp Team,\n\nMy account ${d} was permanently banned. Multiple review requests through the app have failed. I believe this is a system error.\n\nPlease conduct a manual review immediately.\n\nThank you.`},
    perma_week:{to:'support@support.whatsapp.com',subject:'WhatsApp banned for over a week',body:`Hi WhatsApp Support,\n\nMy account ${d} has been banned for over a week without explanation. I always use the official app and follow all rules.\n\nPlease lift this ban.\n\nThank you.`},
    perma_batu:{to:'support@support.whatsapp.com',subject:`Final appeal — ${d}`,body:`Dear WhatsApp,\n\nFinal appeal for permanent ban on ${d}. I have never used third-party apps or sent bulk messages. Please manually review and restore.\n\nWith respect.`},
    looping_ban:{to:'support@support.whatsapp.com',subject:`Recurring ban — account ${d}`,body:`Dear WhatsApp,\n\nAccount ${d} keeps getting banned after every unban. No change in my behavior. Believe it's a system bug.\n\nPlease permanently fix this.\n\nThank you.`},
    gb_mod:{to:'support@support.whatsapp.com',subject:`Appeal — ${d}`,body:`Dear WhatsApp,\n\nI was honest — I previously used an unofficial app. I have since switched to the official WhatsApp only. I sincerely apologize.\n\nPlease give my account ${d} one more chance.\n\nThank you.`},
    mass_report:{to:'support@support.whatsapp.com',subject:`False reports — ${d}`,body:`Dear WhatsApp,\n\nAccount ${d} was banned due to what I believe are malicious false reports. I have never harassed anyone.\n\nPlease manually review my actual account activity.\n\nThank you.`},
    new_number:{to:'support@support.whatsapp.com',subject:`New number banned — ${d}`,body:`Hello WhatsApp,\n\nMy new SIM ${d} was banned immediately upon first registration. I am the new rightful owner.\n\nPlease remove this restriction.\n\nThank you.`},
    temp_24h:{to:'support@support.whatsapp.com',subject:`Temporary ban appeal — ${d}`,body:`Hi WhatsApp,\n\nAccount ${d} got a temporary ban while chatting normally. I did not violate any rules.\n\nPlease review and lift this.\n\nThank you.`},
    business_ban:{to:'support@support.whatsapp.com',subject:`Business account banned — ${d}`,body:`Dear WhatsApp Business Support,\n\nMy Business account ${d} was banned. I only use it for legitimate one-to-one customer service.\n\nPlease restore urgently.\n\nThank you.`},
    no_reason:{to:'support@support.whatsapp.com',subject:`Banned without reason — ${d}`,body:`Dear WhatsApp,\n\nAccount ${d} was banned suddenly with no warning. I never spammed, never used unofficial apps, never violated any policy.\n\nPlease review and restore immediately.\n\nThank you.`},
    formal_en:{to:'support@support.whatsapp.com',subject:`Formal Appeal — Account Reinstatement ${d}`,body:`Dear WhatsApp Trust & Safety Team,\n\nI formally request reinstatement of account ${d}. I have not breached any Terms of Service or Community Guidelines.\n\nI respectfully request a manual review of my account's activity history.\n\nRespectfully.`},
    casual_id:{to:'support@support.whatsapp.com',subject:'tolong bantu unban WA saya',body:`Hai kak,\n\nNomor ${d} kena ban tiba-tiba. Ga tau kenapa. Saya ga ngelakuin apa-apa yang salah.\n\nMohon dibuka lagi kak 🙏\n\nMakasih banyak.`},
    turkish:{to:'support@support.whatsapp.com',subject:`Hesabım yasaklandı — ${d}`,body:`Sayın WhatsApp,\n\n${d} numaralı hesabım haksız yere yasaklanmıştır. Lütfen inceleyip kısıtlamayı kaldırın.\n\nTeşekkürler.`},
    hindi:{to:'support@support.whatsapp.com',subject:`WhatsApp बैन — ${d}`,body:`प्रिय WhatsApp,\n\n${d} बिना कारण बैन हुआ। कृपया समीक्षा करें।\n\nधन्यवाद।`},
    arabic:{to:'support@support.whatsapp.com',subject:`حساب محظور — ${d}`,body:`واتساب،\n\nحسابي ${d} محظور بدون سبب. أرجو المراجعة.\n\nشكراً.`},
    malay:{to:'support@support.whatsapp.com',subject:`Akaun diharamkan — ${d}`,body:`WhatsApp,\n\nAkaun ${d} diharamkan tanpa sebab. Mohon semak.\n\nTerima kasih.`},
    portuguese:{to:'support@support.whatsapp.com',subject:`Apelação — ${d}`,body:`WhatsApp,\n\nMinha conta ${d} foi banida sem motivo. Solicito revisão.\n\nObrigado.`},
    spanish:{to:'support@support.whatsapp.com',subject:`Apelación — ${d}`,body:`WhatsApp,\n\nMi cuenta ${d} fue bloqueada sin razón. Solicito revisión.\n\nGracias.`},
    short_urgent:{to:'support@support.whatsapp.com',subject:`URGENT Unban ${d}`,body:`Hi,\n\nAccount ${d} banned unfairly. No ToS violations. Please restore urgently.\n\nThank you.`},
    second_appeal:{to:'support@support.whatsapp.com',subject:`Second appeal — ${d} still banned`,body:`Dear WhatsApp,\n\nSecond appeal for ${d}. First was unsuccessful. I firmly maintain I never violated any policy.\n\nPlease review with fresh eyes.\n\nThank you.`},
    family_plea:{to:'support@support.whatsapp.com',subject:`Please help — family contact ${d}`,body:`Dear WhatsApp,\n\nAccount ${d} is my lifeline to family who live far away. Since the ban I am completely cut off.\n\nI always used WhatsApp responsibly. Please restore.\n\nWith hope.`},
    multi_lang:{to:'support@support.whatsapp.com',subject:`URGENT Appeal — ${d}`,body:`Dear WhatsApp / Tim WhatsApp,\n\n━━━ ENGLISH ━━━\nI formally appeal the ban on ${d}. Never sent spam, never used unofficial apps, never violated policies. Please manually review and restore urgently.\n\n━━━ BAHASA INDONESIA ━━━\nSaya mengajukan banding atas ban akun ${d}. Tidak pernah spam, tidak pakai mod, tidak melanggar kebijakan. Mohon peninjauan manual.\n\n═══════\nAccount: ${d}\n═══════\nThank you / Terima kasih 🙏`}
  };
  return map[method]||{to:'support@support.whatsapp.com',subject:`Appeal ${d}`,body:`Account ${d} was banned unfairly. Please review.\n\nThank you.`};
}

function openEmail(t){
  const iu=`intent://compose?to=${enc(t.to)}&subject=${enc(t.subject)}&body=${enc(t.body)}#Intent;scheme=mailto;package=com.google.android.gm;end`;
  const mu=`mailto:${enc(t.to)}?subject=${enc(t.subject)}&body=${enc(t.body)}`;
  const gu=`https://mail.google.com/mail/?view=cm&fs=1&to=${enc(t.to)}&su=${enc(t.subject)}&body=${enc(t.body)}`;
  if(isAnd()){try{window.location.href=iu}catch(e){}let done=false;document.addEventListener('visibilitychange',function h(){if(document.hidden){done=true;document.removeEventListener('visibilitychange',h)}},{once:true});setTimeout(()=>{if(!done)try{window.location.href=mu}catch(e){try{window.open(gu,'_blank')}catch(e2){}}},1400)}
  else{try{window.location.href=mu}catch(e){}setTimeout(()=>{if(!document.hidden)try{window.open(gu,'_blank')}catch(e){}},800)}
}

document.getElementById('sendBtn').addEventListener('click',()=>{
  if(!rc()){setStatus('unbanStatus','err','fa-circle-exclamation','Terlalu cepat!');return}
  const num=fullNum((document.getElementById('nomor').value||'').trim(),selC);
  if(!num){setStatus('unbanStatus','err','fa-circle-exclamation','Masukkan nomor WA!');return}
  if(!selMethod){setStatus('unbanStatus','err','fa-circle-exclamation','Pilih metode unban!');return}
  setStatus('unbanStatus','load','fa-circle-notch','Membuka email...');
  saveHist(num,selMethod);openEmail(buildEmail(num,selMethod));
  setTimeout(()=>setStatus('unbanStatus','ok','fa-circle-check','✓ Email terbuka! Kirim ke support@support.whatsapp.com'),1800);
});

function saveHist(num,method){const name=METHODS.find(m=>m.v===method)?.n||method;const h=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');h.unshift({id:Date.now(),num,method,name,ts:new Date().toLocaleString('id-ID')});if(h.length>50)h.splice(50);localStorage.setItem(HIST_KEY,JSON.stringify(h))}
function renderHistory(){const h=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');const el=document.getElementById('histList');if(!h.length){el.innerHTML='<div class="hist-empty"><i class="fa-solid fa-clock-rotate-left"></i><p>Belum ada riwayat.</p></div>';return}el.innerHTML=h.map(x=>`<div class="hist-card"><div class="hc-icon"><i class="fab fa-whatsapp"></i></div><div class="hc-info"><div class="hc-num">${san(x.num)}</div><div class="hc-meta">${san(x.name)} · ${x.ts}</div></div><button class="hc-del" onclick="delH(${x.id})"><i class="fa-solid fa-trash"></i></button></div>`).join('')}
function delH(id){let h=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');h=h.filter(x=>x.id!==id);localStorage.setItem(HIST_KEY,JSON.stringify(h));renderHistory()}
function clearHistory(){if(!confirm('Hapus semua?'))return;localStorage.removeItem(HIST_KEY);renderHistory()}
function exportHistory(){const h=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');if(!h.length){alert('Belum ada!');return}const a=document.createElement('a');a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(h.map(x=>`[${x.ts}] ${x.num} — ${x.name}`).join('\n'));a.download='vxz-history.txt';a.click()}

function doCheck(){
  const num=fullNum((document.getElementById('checkNomor').value||'').trim(),checkC);
  if(!num){alert('Masukkan nomor!');return}
  const clean=num.replace(/\D/g,'');
  window.open('https://wa.me/'+clean,'_blank');
  const r=document.getElementById('checkResult');r.style.display='block';
  document.getElementById('crTitle').innerHTML=`<i class="fab fa-whatsapp" style="color:var(--g)"></i> Link WA Dibuka`;
  document.getElementById('crSub').textContent=`Link: https://wa.me/${clean}\n\nJika terbuka dengan tombol "Kirim Pesan" → nomor aktif ✓\nJika error → nomor tidak terdaftar/banned ✗`;
}

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
  if(data){userProfile=data}else{
    const uname=currentUser.user_metadata?.username||currentUser.email?.split('@')[0]||'User';
    await sb.from('profiles').insert({id:currentUser.id,username:uname,role:'user'});
    const{data:d2}=await sb.from('profiles').select('*').eq('id',currentUser.id).single();
    userProfile=d2;
  }
}
function updateAuthUI(){
  const btn=document.getElementById('authBtn');const txt=document.getElementById('authBtnTxt');
  const pB=document.getElementById('photoLoginBadge');const pA=document.getElementById('photoArea');
  if(currentUser&&userProfile){
    txt.textContent=userProfile.username?.slice(0,10)||'User';
    btn.className='auth-btn logged';btn.querySelector('i').className='fa-solid fa-right-from-bracket';
    if(pB)pB.style.display='none';if(pA)pA.classList.remove('disabled');
  }else{
    txt.textContent='Login';btn.className='auth-btn';btn.querySelector('i').className='fa-solid fa-right-to-bracket';
    if(pB)pB.style.display='inline';if(pA)pA.classList.add('disabled');
  }
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
  if(!title||!cat||!desc){setStatus('reportStatus','err','fa-circle-exclamation','Isi judul, kategori, deskripsi!');return}
  if(title.length<5){setStatus('reportStatus','err','fa-circle-exclamation','Judul terlalu pendek!');return}
  if(desc.length<20){setStatus('reportStatus','err','fa-circle-exclamation','Deskripsi min 20 karakter!');return}
  if(limitInfo().remaining<=0){setStatus('reportStatus','err','fa-circle-exclamation','Limit 5/6jam tercapai!');return}
  setStatus('reportStatus','load','fa-circle-notch','Mengirim...');
  let photoUrl=null;
  if(photoFile&&currentUser){
    const ext=photoFile.name.split('.').pop();const path=`reports/${Date.now()}.${ext}`;
    const{error:ue}=await sb.storage.from('report-photos').upload(path,photoFile);
    if(!ue){const{data:ud}=sb.storage.from('report-photos').getPublicUrl(path);photoUrl=ud.publicUrl}
  }
  const{error}=await sb.from('reports').insert({title,category:cat,description:desc,photo_url:photoUrl,username:currentUser?(userProfile?.username||'User'):'Anonymous',user_id:currentUser?.id||null,fingerprint:btoa(navigator.userAgent).slice(0,20),likes:0});
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

function openAppealFromReport(title,desc){
  const el=document.getElementById('appealFromReport');
  if(el)el.remove();
  const div=document.createElement('div');div.id='appealFromReport';div.className='appeal-modal';
  div.innerHTML=`<div class="appeal-modal-box">
    <div class="modal-head"><div class="modal-title">Pakai Template Appeal</div><button class="modal-close" onclick="document.getElementById('appealFromReport').remove()"><i class="fa-solid fa-xmark"></i></button></div>
    <div style="background:rgba(37,211,102,0.06);border:1px solid var(--border-g);border-radius:10px;padding:10px 12px;margin-bottom:14px;font-size:.75rem;color:var(--t2)"><b style="color:var(--t1)">${san(title)}</b></div>
    <div class="field-g"><div class="field-lbl"><i class="fab fa-whatsapp" style="color:var(--g)"></i> NOMOR WA LU YANG KE-BAN</div>
    <div class="phone-row">
      <div style="position:relative">
        <div class="code-badge" onclick="toggleDrop('cDropAppeal')"><span id="aF">🌏</span><span id="aC">+62</span><i class="fa-solid fa-chevron-down" style="font-size:.5rem;color:var(--t3)"></i></div>
        <div class="c-dropdown" id="cDropAppeal"><input class="c-search" id="cSA" type="text" placeholder="Cari..."/><div id="cLA"></div></div>
      </div>
      <div class="inp-w"><i class="ico fas fa-phone"></i><input type="tel" id="appealNum" class="fi" placeholder="8xxxxxxxxxx" inputmode="numeric"/></div>
    </div></div>
    <button class="send-btn" onclick="sendFromReport('${san(title).replace(/'/g,'&apos;')}','${san(desc.slice(0,300)).replace(/'/g,'&apos;')}')">
      <i class="fab fa-whatsapp"></i><span>BUKA GMAIL SEKARANG</span><i class="fa-solid fa-paper-plane"></i>
    </button>
  </div>`;
  document.body.appendChild(div);setTimeout(()=>div.classList.add('on'),10);
  buildCList(document.getElementById('cLA'),document.getElementById('cSA'),c=>{appealC=c;document.getElementById('aF').textContent=c.f;document.getElementById('aC').textContent=c.c;document.getElementById('cDropAppeal').classList.remove('open')});
}

function sendFromReport(title,desc){
  const num=fullNum((document.getElementById('appealNum')?.value||'').trim(),appealC);
  if(!num){alert('Masukkan nomor WA dulu!');return}
  const d=disp(num);
  const t={to:'support@support.whatsapp.com',subject:`WhatsApp Appeal — ${d}`,body:`Dear WhatsApp Support,\n\nI am appealing the ban on my account ${d}.\n\nMy experience: ${desc}\n\nPlease review and restore my account.\n\nThank you.`};
  document.getElementById('appealFromReport')?.remove();
  openEmail(t);saveHist(num,'community_template');
}

async function loadReports(){
  const list=document.getElementById('reportList');
  list.innerHTML='<div class="loading-state"><i class="fa-solid fa-circle-notch fa-spin"></i> Memuat...</div>';
  const{data,error}=await sb.from('reports').select('*').order('created_at',{ascending:false}).limit(30);
  if(error||!data){list.innerHTML='<div class="loading-state"><i class="fa-solid fa-triangle-exclamation"></i> Gagal memuat.</div>';return}
  if(!data.length){list.innerHTML='<div class="loading-state"><i class="fa-solid fa-inbox"></i> Belum ada report.</div>';return}
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
      <button class="use-appeal-btn" onclick="openAppealFromReport('${san(r.title).replace(/'/g,'&apos;')}','${san(r.description.slice(0,300)).replace(/'/g,'&apos;')}')">
        <i class="fab fa-whatsapp"></i> Pakai Appeal
      </button>
    </div>
  </div>`).join('');
}

async function delReport(id){
  if(!isAdmin())return;if(!confirm('Hapus?'))return;
  await sb.from('reports').delete().eq('id',id);
  document.getElementById('rc-'+id)?.remove();
}

async function renderProfile(){
  const el=document.getElementById('profileContent');
  if(!currentUser||!userProfile){
    el.innerHTML=`<div class="profile-login-prompt"><i class="fa-solid fa-user-lock" style="font-size:2.5rem;color:var(--t3);display:block;margin-bottom:14px"></i><p style="color:var(--t2);font-size:.82rem;margin-bottom:16px">Login untuk lihat profil lu</p><button class="send-btn" onclick="openModal('login')" style="max-width:200px;margin:0 auto"><i class="fa-solid fa-right-to-bracket"></i><span>LOGIN</span></button></div>`;
    return;
  }
  const role=userProfile.role||'user';
  const{count}=await sb.from('reports').select('*',{count:'exact',head:true}).eq('user_id',currentUser.id);
  el.innerHTML=`
    <div class="profile-card">
      <div class="profile-avatar">${(userProfile.username||'U').charAt(0).toUpperCase()}</div>
      <div class="profile-name">${san(userProfile.username||'User')}</div>
      <div style="margin:6px 0">${roleBadge(role)}</div>
      <div class="profile-email">${san(currentUser.email||'')}</div>
      <div class="profile-stats">
        <div class="ps"><div class="ps-n">${count||0}</div><div class="ps-l">Reports</div></div>
        <div class="ps"><div class="ps-n">${role==='owner'?'∞':role==='admin'?'★':role==='premium'?'⭐':'—'}</div><div class="ps-l">Akses</div></div>
      </div>
      <button class="send-btn" onclick="sb.auth.signOut()" style="margin-top:16px;background:rgba(255,79,79,0.12);box-shadow:none;color:var(--red);border:1px solid rgba(255,79,79,0.3);animation:none">
        <i class="fa-solid fa-right-from-bracket"></i><span>LOGOUT</span>
      </button>
    </div>
    ${isAdmin()?adminPanel():''}
  `;
  if(isAdmin())initAdmin();
}

function adminPanel(){
  return`<div class="admin-panel">
    <div class="sh" style="margin:0 0 12px"><div class="sh-l"></div><div class="sh-t">${isOwner()?'👑 OWNER PANEL':'🛡️ ADMIN PANEL'}</div><div class="sh-l"></div></div>
    <div class="admin-tabs">
      <button class="atab active" onclick="switchATab('users',this)">Users</button>
      <button class="atab" onclick="switchATab('announce',this)">Announcement</button>
    </div>
    <div id="aTabUsers">
      <div class="field-g" style="margin:10px 0">
        <div style="display:flex;gap:8px">
          <div class="inp-w"><i class="ico fas fa-search"></i><input type="text" id="uSearch" class="fi" placeholder="Cari username..."/></div>
          <button onclick="searchUsers()" style="padding:12px 14px;background:var(--glass2);border:1px solid var(--border-g);border-radius:var(--r2);color:var(--g);cursor:pointer">Cari</button>
        </div>
      </div>
      <div id="uResult"></div>
    </div>
    <div id="aTabAnnounce" style="display:none">
      <div class="field-g" style="margin:10px 0"><div class="field-lbl">Judul</div><div class="inp-w"><i class="ico fas fa-bullhorn"></i><input type="text" id="aTitle" class="fi" placeholder="Judul..."/></div></div>
      <div class="field-g"><div class="field-lbl">Isi</div><div class="inp-w"><textarea id="aContent" class="fi" placeholder="Isi announcement..." style="height:70px;resize:none"></textarea></div></div>
      <button class="send-btn" onclick="postAnn()"><i class="fa-solid fa-bullhorn"></i><span>POST</span></button>
      <div class="status" id="annStatus" style="margin-top:8px"></div>
      <div id="annList" style="margin-top:12px"></div>
    </div>
  </div>`;
}

function initAdmin(){loadAnn()}
function switchATab(tab,btn){document.querySelectorAll('.atab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.getElementById('aTabUsers').style.display=tab==='users'?'block':'none';document.getElementById('aTabAnnounce').style.display=tab==='announce'?'block':'none';if(tab==='announce')loadAnn()}

async function searchUsers(){
  const q=(document.getElementById('uSearch')?.value||'').trim();
  const el=document.getElementById('uResult');
  if(!q){el.innerHTML='<div style="font-size:.75rem;color:var(--t3)">Masukkan username</div>';return}
  el.innerHTML='<div class="loading-state"><i class="fa-solid fa-circle-notch fa-spin"></i></div>';
  const{data}=await sb.from('profiles').select('*').ilike('username','%'+q+'%').limit(5);
  if(!data?.length){el.innerHTML='<div style="font-size:.75rem;color:var(--t3)">Tidak ditemukan</div>';return}
  el.innerHTML=data.map(u=>`<div class="user-result-card">
    <div class="ur-info"><div class="ur-name">${san(u.username||'?')}</div><div>${roleBadge(u.role||'user')}${u.is_banned?'<span style="color:var(--red);font-size:.62rem;margin-left:4px">BANNED</span>':''}</div></div>
    <div class="ur-actions">
      ${isOwner()?`<select class="role-sel" onchange="setRole('${u.id}',this.value)"><option value="user" ${u.role==='user'?'selected':''}>User</option><option value="premium" ${u.role==='premium'?'selected':''}>Premium</option><option value="admin" ${u.role==='admin'?'selected':''}>Admin</option><option value="owner" ${u.role==='owner'?'selected':''}>Owner</option></select>`:''}
      <button class="ban-btn${u.is_banned?' unban':''}" onclick="toggleBan('${u.id}','${u.is_banned}')">${u.is_banned?'Unban':'Ban'}</button>
    </div>
  </div>`).join('');
}
async function setRole(uid,role){if(!isOwner())return;const{error}=await sb.from('profiles').update({role}).eq('id',uid);if(!error)alert('Role → '+role+'!')}
async function toggleBan(uid,isBanned){
  if(!isAdmin())return;const nb=isBanned==='true'?false:true;
  const reason=nb?prompt('Alasan ban:'):null;
  await sb.from('profiles').update({is_banned:nb,ban_reason:reason||null}).eq('id',uid);
  searchUsers();
}
async function postAnn(){
  const title=(document.getElementById('aTitle')?.value||'').trim();const content=(document.getElementById('aContent')?.value||'').trim();
  if(!title||!content){setStatus('annStatus','err','fa-circle-exclamation','Isi judul dan konten!');return}
  setStatus('annStatus','load','fa-circle-notch','Posting...');
  const{error}=await sb.from('announcements').insert({title,content,author_id:currentUser.id});
  if(error){setStatus('annStatus','err','fa-circle-exclamation','Gagal!');return}
  setStatus('annStatus','ok','fa-circle-check','✓ Posted!');
  document.getElementById('aTitle').value='';document.getElementById('aContent').value='';
  loadAnn();
}
async function loadAnn(){
  const el=document.getElementById('annList');if(!el)return;
  const{data}=await sb.from('announcements').select('*').order('created_at',{ascending:false}).limit(10);
  if(!data?.length){el.innerHTML='<div style="font-size:.75rem;color:var(--t3);text-align:center;padding:10px">Belum ada</div>';return}
  el.innerHTML=data.map(a=>`<div class="ann-card"><div class="ann-title">${san(a.title)}</div><div class="ann-body">${san(a.content)}</div><div class="ann-meta">${ago(a.created_at)}${isOwner()?` <button onclick="delAnn('${a.id}')" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:.68rem;margin-left:8px"><i class="fa-solid fa-trash"></i></button>`:''}</div></div>`).join('');
}
async function delAnn(id){if(!isOwner())return;if(!confirm('Hapus?'))return;await sb.from('announcements').delete().eq('id',id);loadAnn()}

async function loadAnnBanner(){
  const{data}=await sb.from('announcements').select('*').order('created_at',{ascending:false}).limit(1);
  const b=document.getElementById('annBanner');if(!b||!data?.length)return;
  const a=data[0];
  b.innerHTML=`<div class="ann-banner-inner"><i class="fa-solid fa-bullhorn" style="color:var(--gold)"></i><span><b>${san(a.title)}</b> — ${san(a.content.slice(0,80))}${a.content.length>80?'...':''}</span><button onclick="this.closest('.ann-banner-inner').parentElement.style.display='none'" style="background:none;border:none;color:var(--t3);cursor:pointer"><i class="fa-solid fa-xmark"></i></button></div>`;
  b.style.display='block';
}

function goPage(name,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.bn').forEach(b=>b.classList.remove('active'));
  document.getElementById('p-'+name)?.classList.add('on');
  if(btn){btn.classList.add('active')}
  if(name==='history')renderHistory();
  if(name==='community'){loadReports();updateLimitUI()}
  if(name==='profile')renderProfile();
}

const video=document.getElementById('player');
const intro=document.getElementById('intro');
const appEl=document.getElementById('app');
const welcomeEl=document.getElementById('welcome');
const bar=document.getElementById('introBar');
video.addEventListener('loadedmetadata',()=>{const d=video.duration||5;document.documentElement.style.setProperty('--dur',d+'s');if(bar)bar.style.animationDuration=d+'s'});
function tryPlay(){video.muted=false;video.volume=1;video.play().catch(()=>{video.muted=true;video.play().catch(()=>{})})}
window.addEventListener('load',tryPlay);
function showApp(){
  intro.classList.add('out');
  setTimeout(()=>{intro.style.display='none';appEl.classList.add('on');if(!localStorage.getItem('vxz_wc_v52')){setTimeout(()=>{welcomeEl.classList.add('on');localStorage.setItem('vxz_wc_v52','1');setTimeout(()=>welcomeEl.classList.remove('on'),3200)},300)}loadAnnBanner()},900);
}
video.addEventListener('ended',()=>setTimeout(showApp,200));
setTimeout(()=>{if(!video.ended)try{showApp()}catch(e){}},9500);
authInit();
