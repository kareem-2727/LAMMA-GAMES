const games=[
{id:"speed",emoji:"⚡",name:"أسرع واحد",desc:"اضغط واختر الإجابة الصحيحة قبل الآخرين.",type:"speed"},
{id:"memory",emoji:"🧠",name:"ذاكرة",desc:"احفظ الترتيب ثم اكتشف البطاقة المطلوبة.",type:"memory"},
{id:"guess",emoji:"🕵️",name:"المخفي",desc:"لاعب واحد لا يعرف الكلمة. اكتشفوه من الأسئلة.",type:"guess"},
{id:"draw",emoji:"🎨",name:"ارسم وخمّن",desc:"ارسم الكلمة ودع أصحابك يحاولون معرفتها.",type:"draw"},
{id:"math",emoji:"➕",name:"تحدي الحساب",desc:"حل المسألة بسرعة. الأسرع يحصل على النقطة.",type:"math"},
{id:"xo",emoji:"❌⭕",name:"إكس أو",desc:"لعبة مهارة لشخصين بدون أي حظ.",type:"xo"}
];
const questions=["ما عاصمة فلسطين؟","كم عدد أيام الأسبوع؟","ما الكوكب المعروف بالكوكب الأحمر؟","كم يساوي 7 × 8؟"];
const answers=[["القدس","القاهرة","دمشق","عمّان"],["5","7","9","10"],["المريخ","الزهرة","المشتري","عطارد"],["54","56","64","48"]];
const $=s=>document.querySelector(s), modal=$("#modal"), content=$("#modalContent");
$("#games").innerHTML=games.map(g=>`<article class="game"><div class="emoji">${g.emoji}</div><h3>${g.name}</h3><p>${g.desc}</p><button onclick="openGame('${g.type}')">العب الآن</button></article>`).join("");
function show(html){content.innerHTML=html;modal.classList.remove("hidden")}
$("#close").onclick=()=>modal.classList.add("hidden");
$("#roomBtn").onclick=()=>show(`<h2>أنشئ غرفة</h2><p>هذه نسخة تجريبية بدون خادم. استخدموا نفس الجهاز الآن، وسنضيف الغرف عبر الإنترنت في المرحلة التالية.</p><div class="room-code">${Math.random().toString(36).slice(2,6).toUpperCase()}</div><button class="full" onclick="modal.classList.add('hidden')">جاهز</button>`);
$("#quickBtn").onclick=()=>openGame("speed");
function openGame(type){
 if(type==="speed"){let i=Math.floor(Math.random()*questions.length);show(`<div class="score">⚡ الجولة السريعة</div><div class="question">${questions[i]}</div><div class="choice-grid">${answers[i].map(a=>`<button class="choice" onclick="answer('${a}','${answers[i][0]}')">${a}</button>`).join("")}</div>`)}
 if(type==="math"){let a=Math.floor(Math.random()*12)+2,b=Math.floor(Math.random()*12)+2,correct=a*b;show(`<h2>➕ تحدي الحساب</h2><div class="question">${a} × ${b} = ؟</div><input id="ans" class="input" type="number" inputmode="numeric" placeholder="اكتب الإجابة"><button class="full" onclick="checkMath(${correct})">تحقق</button>`)}
 if(type==="memory"){const nums=[1,2,3,4,5,6].sort(()=>Math.random()-.5);show(`<h2>🧠 ذاكرة</h2><p>احفظ الأرقام بالترتيب:</p><div class="question">${nums.join(" • ")}</div><button class="full" onclick="memoryAsk(${JSON.stringify(nums)})">اختفت!</button>`)}
 if(type==="guess"){show(`<h2>🕵️ المخفي</h2><p>اختاروا كلمة سر يعرفها الجميع ما عدا لاعب واحد، ثم اسألوا بعضكم أسئلة غير مباشرة.</p><button class="full" onclick="newHiddenWord()">ابدأ جولة</button>`)}
 if(type==="draw"){show(`<h2>🎨 ارسم وخمّن</h2><p>واجهة أولية للفكرة. سنضيف لوحة رسم حقيقية في الخطوة التالية.</p><div class="question">ارسم: 🚀 صاروخ</div><button class="full" onclick="modal.classList.add('hidden')">تم</button>`)}
 if(type==="xo"){show(`<h2>❌⭕ إكس أو</h2><div id="board" class="choice-grid"></div>`);startXO()}
}
function answer(ch,correct){show(`<h2>${ch===correct?"🎉 صحيح!":"❌ ليست الإجابة الصحيحة"}</h2><p>${ch===correct?"أخذت نقطة.":"جرب الجولة التالية."}</p><button class="full" onclick="openGame('speed')">جولة جديدة</button>`)}
function checkMath(n){let v=Number($("#ans").value);show(`<h2>${v===n?"🎉 إجابة صحيحة!":"❌ حاول مرة أخرى"}</h2><p>الإجابة الصحيحة: ${n}</p><button class="full" onclick="openGame('math')">مسألة جديدة</button>`)}
function memoryAsk(nums){let shuffled=[...nums].sort(()=>Math.random()-.5);show(`<h2>🧠 تذكّر</h2><p>ما الرقم الذي كان في المركز الثالث؟</p><div class="choice-grid">${shuffled.map(n=>`<button class="choice" onclick="answerMemory(${n},${nums[2]})">${n}</button>`).join("")}</div>`)}
function answerMemory(a,c){show(`<h2>${a===c?"🎉 ممتاز!":"❌ خطأ"}</h2><p>كان الرقم الثالث: ${c}</p><button class="full" onclick="openGame('memory')">جولة جديدة</button>`)}
function newHiddenWord(){const words=["موزة","سيارة","مدرسة","كرة قدم","بيتزا"];const w=words[Math.floor(Math.random()*words.length)];show(`<h2>🕵️ كلمة الجولة</h2><p>مرر الهاتف لكل لاعب ليعرف دوره. توزيع الأدوار الكامل سيضاف مع نظام الغرف.</p><div class="question">الكلمة: ${w}</div>`)}
function startXO(){let board=Array(9).fill("");let turn="X";const render=()=>{$("#board").innerHTML=board.map((v,i)=>`<button class="choice" style="font-size:30px;height:70px" onclick="xoMove(${i})">${v||"·"}</button>`).join("")};window.xoMove=i=>{if(board[i])return;board[i]=turn;turn=turn==="X"?"O":"X";render()};render()}
$("#langBtn").onclick=()=>alert("English mode is planned for the next version.");
