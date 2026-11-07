const data=[
  [
    "She gave me a ___ apology and promised to be more careful.",
    "sincere",
    "offensive",
    "Щире вибачення",
    "Sincere — щирий, відвертий. Так описують почуття або слова, які людина справді має на увазі.",
    "щирий, відвертий"
  ],
  [
    "He offered an ___ for arriving late.",
    "apology",
    "forgiveness",
    "Вибачення",
    "Apology — вибачення. Offer an apology означає попросити вибачення за свої слова або вчинок.",
    "вибачення"
  ],
  [
    "You worked hard, so you ___ a break.",
    "deserve",
    "unfollow",
    "Заслужена перерва",
    "Deserve — заслуговувати. Це слово вживають, коли людина гідна чогось завдяки своїм діям або якостям.",
    "заслуговувати"
  ],
  [
    "She asked for ___ after admitting her mistake.",
    "forgiveness",
    "copyright",
    "Прощення",
    "Forgiveness — прощення. Ask for forgiveness означає просити пробачити за помилку або образу.",
    "прощення"
  ],
  [
    "If you don’t want to see his posts, you can ___ him.",
    "unfollow",
    "bring up",
    "Соціальні мережі",
    "Unfollow — відписатися від когось у соціальній мережі, щоб більше не бачити його дописів у своїй стрічці.",
    "відписатися"
  ],
  [
    "He prayed for forgiveness for his ___.",
    "sins",
    "apology",
    "Гріхи",
    "Sins — гріхи, множина від sin. У релігійному контексті це вчинки, що порушують моральні або релігійні заповіді.",
    "гріхи"
  ],
  [
    "Learning a little every day will help you ___.",
    "in the long run",
    "no offence taken",
    "Довгостроковий результат",
    "In the long run — у довгостроковій перспективі. Вислів описує результат, який стане помітним із часом.",
    "в довгостроковій перспективі"
  ],
  [
    "That joke was rude and ___.",
    "offensive",
    "sincere",
    "Образливий жарт",
    "Offensive — образливий. Так кажуть про слова або поведінку, які можуть когось образити.",
    "образливий"
  ],
  [
    "Please ___ — I only wanted to help.",
    "don’t take offence",
    "no offence taken",
    "Не ображайся",
    "Don’t take offence — не ображайся. У цьому сталому вислові артикль an не вживають: don’t take offence, а не don’t take an offence.",
    "не ображайся"
  ],
  [
    "“Sorry, I didn’t mean to upset you.” “___!”",
    "No offence taken",
    "Don’t take offence",
    "Відповідь на вибачення",
    "No offence taken — я не образилась / не образився. Так відповідають, щоб запевнити співрозмовника, що його слова не образили.",
    "я не образилась"
  ],
  [
    "They want to ___ their children to be kind and honest.",
    "bring up",
    "unfollow",
    "Виховання дітей",
    "Bring up — виховувати. У цьому значенні вислів стосується догляду за дітьми та формування їхніх цінностей і поведінки.",
    "виховувати"
  ],
  [
    "The ___ introduced the guests on the live show.",
    "TV presenter",
    "copyright",
    "Телеведучий",
    "TV presenter — телеведучий або телеведуча: людина, яка веде телевізійну програму.",
    "телеведучий"
  ],
  [
    "You need permission to use a photo protected by ___.",
    "copyright",
    "forgiveness",
    "Авторське право",
    "Copyright — авторське право. Це право автора на використання свого твору, наприклад фотографії, тексту або музики.",
    "авторське право"
  ]
];
function shuffle(items){
const shuffled=[...items];
for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]}
return shuffled
}
let order=shuffle(data.map((_,i)=>i)),pos=0,answers={},layout={};
const card=document.querySelector('#card');
function options(i){return layout[i]??(layout[i]=Math.random()<.5?[0,1]:[1,0])}
function render(){
if(pos>=order.length){results();return}
const i=order[pos],q=data[i],a=answers[i],done=a!==undefined;
card.innerHTML=`<div class="topline"><span>${pos+1} / ${order.length}</span><div class="progress" role="progressbar" aria-label="Прогрес" aria-valuemin="0" aria-valuemax="${order.length}" aria-valuenow="${pos}"><i style="width:${pos/order.length*100}%"></i></div></div><p class="sentence" lang="en">${q[0].replace('___',`<span class="blank">${done?q[1]:'&nbsp;…&nbsp;'}</span>`)}</p><div class="options">${options(i).map((v,n)=>`<button class="option ${done?(v===0?'correct':a===v?'wrong':''):''}" data-choice="${v}" ${done?'disabled':''} aria-label="Варіант ${n+1}: ${q[v+1]}">${q[v+1]}${done&&v===0?' ✓':''}${done&&a===v&&v!==0?' ×':''}</button>`).join('')}</div>${done?`<div class="feedback"><strong>${a===0?'Правильно':'Правильна відповідь: '+q[1]}</strong>${q[4]}</div>`:''}<div class="actions"><button class="textbtn" id="back" ${pos===0?'disabled':''} aria-label="Попереднє запитання">← Назад</button>${done?`<button class="primary" id="next">${pos===order.length-1?'Результат':'Далі'} →</button>`:''}</div>`;
document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{answers[i]=+b.dataset.choice;render()});
if(done)document.querySelector('#next').onclick=()=>{pos++;render()};
document.querySelector('#back').onclick=()=>{if(pos>0){pos--;render()}}
}
function results(){
const wrong=order.filter(i=>answers[i]!==0),score=order.length-wrong.length;
card.innerHTML=`<div class="result"><h2>Результат</h2><div class="score">${score}<span> / ${order.length}</span></div><div class="actions">${wrong.length?'<button class="primary" id="retry">Повторити помилки</button>':''}<button class="textbtn" id="restart">Почати знову ↻</button></div>${wrong.map(i=>`<div class="review"><b>${data[i][1]}</b><p lang="en">${data[i][0].replace('___',data[i][1])}</p>${data[i][4]}</div>`).join('')}</div>`;
document.querySelector('#restart').onclick=()=>{order=shuffle(data.map((_,i)=>i));answers={};layout={};pos=0;render()};
if(wrong.length)document.querySelector('#retry').onclick=()=>{order=shuffle(wrong);answers={};layout={};pos=0;render()}
}
document.addEventListener('keydown',e=>{if(!['1','2'].includes(e.key)||e.repeat)return;const b=document.querySelectorAll('[data-choice]')[+e.key-1];if(b&&!b.disabled)b.click()});
render();
