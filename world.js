/* DRAGON GENESIS · living meadow update */
(()=>{
const rarityMeta=[['Обычная','#b8c5b0',35],['Необычная','#75d99a',25],['Редкая','#65c8f5',18],['Эпическая','#b89aff',12],['Легендарная','#f4c56d',7],['Мифическая','#ff8bc8',2.5],['Божественная','#fff1a5',.5]];
const rc=n=>(rarityMeta.find(x=>x[0]===n)||rarityMeta[0])[1];
const partNames={head:'Голова',tail:'Хвост',wings:'Крылья'};
const partValue=(d,k)=>d[k]||'Неизвестный ген';
const rarityOf=(d,k)=>(d.partRarities&&d.partRarities[k])||((d.genes||[]).find(g=>g.slot===k)?.rarity)||'Обычная';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function dragonSvg(d={},id=0){
 const skin=['#7bb8a1','#87a9ce','#c49b79','#9d8bc4','#9fba75'][id%5],wing=['#b3dfc3','#b8d4ee','#edc49c','#d1b5f4','#d5e6a2'][id%5];
 return `<svg viewBox="0 0 180 130" role="img" aria-label="Дракон">
 <ellipse class="dragon-shadow" cx="88" cy="118" rx="52" ry="8"/>
 <path class="dragon-wing" style="--wing:${wing};fill:${wing}" d="M83 75 Q42 4 15 27 Q39 38 24 73 Q50 55 73 91Z"/>
 <path class="dragon-body" style="--skin:${skin};fill:${skin}" d="M48 83 Q55 53 91 58 Q120 57 133 82 Q118 103 78 103 Q55 102 48 83Z"/>
 <path class="dragon-body" style="--skin:${skin};fill:${skin}" d="M113 72 Q129 40 150 48 Q166 53 160 68 Q150 80 130 80Z"/>
 <path class="dragon-body" style="--skin:${skin};fill:${skin}" d="M53 88 Q25 83 14 98 Q33 94 53 104Z"/>
 <path class="dragon-body" style="--skin:${skin};fill:${skin}" d="M72 98 L66 115 L76 115 L84 100 M111 98 L113 115 L124 115 L121 94"/>
 <path class="dragon-body" style="--skin:${skin};fill:${skin}" d="M140 48 L145 32 L151 48 M153 50 L164 39 L162 54" />
 <ellipse class="dragon-eye" cx="151" cy="59" rx="4" ry="3"/><circle class="dragon-pupil" cx="152" cy="59" r="1.8"/>
 <path d="M147 72 Q155 77 161 70" stroke="#38564a" stroke-width="2" fill="none"/>
 <path class="dragon-wing" style="--wing:${wing};fill:${wing}" d="M91 69 Q106 12 132 20 Q119 40 137 61 Q113 51 101 84Z"/>
 <path d="M59 80 Q80 71 104 79" stroke="#ffffff50" stroke-width="3" fill="none"/>
 </svg>`;
}
function landscape(){
 const dragons=state.dragons.slice(0,3);
 const positions=[['7%','42%','18s'],['47%','70%','22s'],['75%','55%','17s']];
 return `<div class="world">
 <div class="sun"></div><div class="cloud"></div><div class="mountains back"></div><div class="mountains"></div><div class="horizon"></div><div class="grassland"></div>
 <div class="tree t1"></div><div class="tree t2"></div><div class="tree t3"></div><i class="firefly f1"></i><i class="firefly f2"></i><i class="firefly f3"></i>
 <div class="scene-title"><strong>Тихая долина</strong><small>ТВОЙ ДОМ · ${state.dragons.length} ДРАКОНОВ</small></div>
 ${dragons.map((d,i)=>`<div class="world-dragon" style="--x:${positions[i][0]};--end:${positions[i][1]};--speed:${positions[i][2]}" onclick="openDragon(${d.id})"><span class="dragon-name">${esc(d.name)}</span>${dragonSvg(d,i)}</div>`).join('')}
 <div style="position:absolute;z-index:9;left:50%;bottom:14%;transform:translateX(-50%);color:#fff6d6;text-shadow:0 2px 8px #29452b;font-size:11px;white-space:nowrap">Коснись дракона, чтобы узнать его историю</div>
 </div>`;
}
function card(d,i){
 const genes=['head','tail','wings'].map(k=>`<span class="part-chip" style="--rarity-color:${rc(rarityOf(d,k))}">${partNames[k]} · ${esc(rarityOf(d,k))}</span>`).join('');
 return `<article class="living-card"><div class="living-art">${dragonSvg(d,i)}</div><h3>${esc(d.name)}</h3><div style="font-size:10px;color:#d1dfc6">Уровень ${d.level||1} · Сила ${d.power||40}</div><div style="margin-top:8px">${genes}</div><button class="mini-btn" onclick="openDragon(${d.id})">Семья и гены</button></article>`;
}
function page(title,sub,inside){return `<div class="world"><div class="sun"></div><div class="mountains back"></div><div class="mountains"></div><div class="horizon"></div><div class="grassland"></div><div class="tree t1"></div><div class="tree t2"></div><section class="scene-panel"><div class="sectionHead"><div><h2>${title}</h2><span class="muted">${sub}</span></div></div><div class="panel-glass">${inside}</div></section></div>`;}
window.openDragon=function(id){const d=state.dragons.find(x=>x.id===id);if(!d)return;const parents=(d.parents||[]).map(pid=>state.dragons.find(x=>x.id===pid)).filter(Boolean);
 document.getElementById('view').innerHTML=page(esc(d.name),'ЛИЧНОЕ ДЕЛО ДРАКОНА',`
 <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap"><div style="width:180px;height:130px">${dragonSvg(d,id)}</div><div><h2 style="font:700 22px Cinzel;color:#ffedc1;margin:0">${esc(d.name)}</h2><p class="muted">Уровень ${d.level||1} · Сила ${d.power||40}</p><p class="muted">Общей редкости нет — каждый ген уникален.</p></div></div>
 <div class="gene-row">${['head','tail','wings'].map(k=>`<div class="gene-slot" style="--rarity-color:${rc(rarityOf(d,k))}"><small>${partNames[k]}</small><b>${esc(partValue(d,k))}</b><small style="color:var(--rarity-color);margin-top:6px">${rarityOf(d,k)}</small></div>`).join('')}</div>
 <h3 style="font:700 14px Cinzel;color:#ffedc1;margin:22px 0 6px">СЕМЕЙНОЕ ДРЕВО</h3>
 <div class="tree-wrap"><div class="family-tree">${parents.length?parents.map(p=>`<div class="family-node"><strong>${esc(p.name)}</strong><small>Родитель</small></div>`).join(''):'<div class="family-node"><strong>Неизвестный род</strong><small>Старшие поколения</small></div>'}</div><div class="family-child"><div class="family-node" style="border-color:#f1d58b"><strong>${esc(d.name)}</strong><small>Потомок · это поколение</small></div></div></div>
 <div class="actions"><button class="btn secondary" onclick="showTab('nursery')">← Назад к драконам</button></div>`);}
window.showTab=function(tab){
 document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===tab));
 const v=document.getElementById('view');
 if(tab==='home'){v.innerHTML=landscape();}
 if(tab==='nursery'){v.innerHTML=page('Питомник','ДРАКОНЫ ЖИВУТ СВОЕЙ ЖИЗНЬЮ',`<div class="dragon-grid">${state.dragons.map(card).join('')}</div>`);}
 if(tab==='breed'){v.innerHTML=page('Инкубатор','ЗДЕСЬ НАЧИНАЕТСЯ НОВАЯ ЖИЗНЬ',`
 <div class="egg-stage"><div class="egg-glow"></div><div class="egg-shell" id="egg">🥚</div></div><div class="incubation-result" id="incubationResult">Выбери двух драконов-родителей и запусти инкубацию</div>
 <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr));margin-top:12px"><label class="muted">Первый родитель<select id="parentA" style="display:block;width:100%;margin-top:6px;padding:12px;border-radius:12px;background:#173126;color:white;border:1px solid #ffffff35">${state.dragons.map(d=>`<option value="${d.id}" ${d.id===selectedA?'selected':''}>${esc(d.name)}</option>`).join('')}</select></label><label class="muted">Второй родитель<select id="parentB" style="display:block;width:100%;margin-top:6px;padding:12px;border-radius:12px;background:#173126;color:white;border:1px solid #ffffff35">${state.dragons.map(d=>`<option value="${d.id}" ${d.id===selectedB?'selected':''}>${esc(d.name)}</option>`).join('')}</select></label></div>
 <div class="actions" style="justify-content:center;margin-top:15px"><button class="btn" onclick="incubate()">Начать выведение · 15 ✦ / 10 ◈</button></div>
 <p class="muted" style="text-align:center;font-size:10px;margin-top:12px">Каждая часть мутирует независимо с шансом 35%. Цвет гена показывает его собственную редкость.</p><div id="newDragon"></div>`);}
 if(tab==='arena'){v.innerHTML=page('Арена искр','КОРОТКИЕ ПОЕДИНКИ · ТРИ КНОПКИ · МНОГО ДРАМЫ',`
 <div class="arena-board"><div style="display:flex;justify-content:space-between;color:#fff0c8;font-size:11px"><b id="heroLabel">Твой дракон</b><b id="enemyLabel">Дикий соперник</b></div><div class="arena-duel"><div class="arena-fighter" id="heroSprite">🐉</div><div style="font:800 18px Cinzel;color:#ffe4a0">VS</div><div class="arena-fighter enemy" id="enemySprite">🐲</div></div><div style="font-size:10px">ТВОЁ ЗДОРОВЬЕ <span id="heroHpText">100</span></div><div class="hp"><i id="heroHp" style="width:100%"></i></div><div style="font-size:10px">СОПЕРНИК <span id="enemyHpText">100</span></div><div class="hp"><i id="enemyHp" style="width:100%"></i></div><div class="battle-log" id="battleLog">Выбери дракона и нажми «Вызов».</div><div class="arena-actions"><button class="btn secondary" onclick="battleAction('dodge')">Уклониться ↝</button><button class="btn" onclick="battleAction('attack')">Удар ✦</button><button class="btn secondary" onclick="battleAction('special')">Суперприём ★</button></div><div class="actions" style="justify-content:center"><select id="arenaDragon" style="padding:10px;border-radius:20px;background:#193528;color:white;border:1px solid #ffffff44">${state.dragons.map(d=>`<option value="${d.id}">${esc(d.name)}</option>`).join('')}</select><button class="btn" onclick="startBattle()">Новый вызов</button></div></div>
 <p class="muted" style="font-size:10px;text-align:center;margin-top:12px">Уклонение спасает от следующего удара. Суперприём заряжается после двух обычных атак. Побеждает не редкость, а твоя тактика!</p>`);}
 if(tab==='collection'){v.innerHTML=page('Галерея генов','СОБИРАЙ РЕДКИЕ ЧАСТИ И СОЗДАВАЙ СВОИ КОМБИНАЦИИ',`
 <div class="dragon-grid">${rarityMeta.map(([n,c])=>`<div class="living-card" style="border-color:${c}66"><span class="part-chip" style="--rarity-color:${c}">${n}</span><p style="font:700 12px Cinzel;color:#fff0c6">${n==='Обычная'?'Начало истории':n==='Божественная'?'Гены древних богов':'Особая мутация'}</p><small class="muted">Шанс при мутации: ${String(c===rc(n)?rarityMeta.find(x=>x[0]===n)[2]:0).replace('.',',')}%</small></div>`).join('')}</div><h3 style="font:700 14px Cinzel;color:#fff0c6;margin-top:20px">ТВОИ НАЙДЕННЫЕ МУТАЦИИ</h3><div class="dragon-grid">${state.dragons.map((d,i)=>card(d,i)).join('')}</div>`);}
 save();
};
window.incubate=function(){
 const a=state.dragons.find(d=>d.id===+(document.getElementById('parentA')?.value||0)),b=state.dragons.find(d=>d.id===+(document.getElementById('parentB')?.value||0));
 if(!a||!b||a.id===b.id){document.getElementById('incubationResult').textContent='Нужны два разных родителя.';return}
 if(state.gems<15||state.food<10){document.getElementById('incubationResult').textContent='Не хватает ресурсов для инкубации.';return}
 state.gems-=15;state.food-=10;save();
 const egg=document.getElementById('egg'),msg=document.getElementById('incubationResult');egg.classList.add('hatch');msg.textContent='Яйцо пульсирует… внутри просыпается новая жизнь';
 setTimeout(()=>{egg.textContent='🐣';msg.textContent='Скорлупа трескается! Ещё мгновение…'},850);
 setTimeout(()=>{
 const child={id:state.next++,name:names[Math.floor(Math.random()*names.length)],level:1,power:36+Math.floor(Math.random()*15),parents:[a.id,b.id],genes:[],partRarities:{}};
 const setsLocal=[['Пепельный венец','Хвост феникса','Крылья лавы'],['Корона инея','Хвост ледяного змея','Крылья метели'],['Звёздный лик','Хвост кометы','Крылья созвездий'],['Маска бездны','Шипастый хвост','Крылья сумрака']];
 ['head','tail','wings'].forEach((k,i)=>{
 let value,rarity;
 if(Math.random()<.35){const set=setsLocal[Math.floor(Math.random()*setsLocal.length)];value=set[i];let roll=Math.random()*100;rarity=rarityMeta[0][0];for(const rr of rarityMeta){roll-=rr[2];if(roll<=0){rarity=rr[0];break}}child.genes.push({slot:k,name:value,rarity});}
 else {const parent=Math.random()<.5?a:b;value=parent[k]||(['Юный гребень','Гибкий хвост','Малые крылья'][i]);rarity=rarityOf(parent,k);}
 child[k]=value;child.partRarities[k]=rarity;
 });
 const sets=[['Пепельный венец','Хвост феникса','Крылья лавы'],['Корона инея','Хвост ледяного змея','Крылья метели'],['Звёздный лик','Хвост кометы','Крылья созвездий'],['Маска бездны','Шипастый хвост','Крылья сумрака']];
 const match=sets.find(s=>s.every(p=>[child.head,child.tail,child.wings].includes(p)));if(match)child.power+=22;
 state.dragons.push(child);save();egg.textContent='🐲';egg.classList.remove('hatch');msg.textContent='Вылупился дракон '+child.name+'!';
 document.getElementById('newDragon').innerHTML=`<div class="living-card" style="margin-top:12px;text-align:center"><div class="living-art">${dragonSvg(child,child.id)}</div><h3>${esc(child.name)}</h3><div class="gene-row">${['head','tail','wings'].map(k=>`<div class="gene-slot" style="--rarity-color:${rc(rarityOf(child,k))}"><small>${partNames[k]}</small><b>${esc(child[k])}</b><small style="color:var(--rarity-color)">${rarityOf(child,k)}</small></div>`).join('')}</div><button class="mini-btn" onclick="openDragon(${child.id})">Посмотреть семейное древо</button></div>`;
 },1700);
};
let battle=null;
window.startBattle=function(){const d=state.dragons.find(x=>x.id===+(document.getElementById('arenaDragon')?.value||state.dragons[0]?.id));if(!d)return;battle={dragon:d,hero:100,enemy:100,streak:0,guard:false,done:false};document.getElementById('heroLabel').textContent=d.name;document.getElementById('heroSprite').innerHTML=dragonSvg(d,d.id);document.getElementById('enemySprite').textContent='🐲';document.getElementById('battleLog').textContent='Соперник рычит и готовится к атаке. Твой ход!';paintBattle();};
function paintBattle(){if(!battle)return;document.getElementById('heroHp').style.width=battle.hero+'%';document.getElementById('enemyHp').style.width=battle.enemy+'%';document.getElementById('heroHpText').textContent=battle.hero;document.getElementById('enemyHpText').textContent=battle.enemy;}
window.battleAction=function(action){if(!battle||battle.done){document.getElementById('battleLog').textContent='Сначала начни новый вызов.';return}
 let log='',damage=10+Math.floor(Math.random()*9);
 if(action==='dodge'){battle.guard=true;log='Ты приготовился к уклонению. Соперник промахнётся!';}
 if(action==='attack'){battle.enemy=Math.max(0,battle.enemy-damage);battle.streak++;log='Точный удар! Соперник теряет '+damage+' здоровья.';}
 if(action==='special'){if(battle.streak<2){log='Суперприём ещё не заряжен: нанеси два удара!';}else{damage=30+Math.floor(Math.random()*12);battle.enemy=Math.max(0,battle.enemy-damage);battle.streak=0;log='✨ ДРАКОНЬЯ ВСПЫШКА! '+damage+' урона!';}}
 if(battle.enemy<=0){battle.done=true;state.wins++;state.gems+=15;state.food+=8;save();log+=' Победа! +15 ✦ и +8 ◈';}
 else {const enemyHit=9+Math.floor(Math.random()*12);if(battle.guard){log+=' Ты ловко ушёл от ответного удара.';battle.guard=false;}else{battle.hero=Math.max(0,battle.hero-enemyHit);log+=' Соперник отвечает: −'+enemyHit+' здоровья.';}}
 if(battle.hero<=0){battle.done=true;log+=' Ты проиграл, но получил опыт. Попробуй другую тактику!';state.food+=2;save();}
 document.getElementById('battleLog').textContent=log;paintBattle();
};
const originalInit=window.onload;
window.addEventListener('load',()=>{window.showTab('home');});
window.showTab('home');
})();