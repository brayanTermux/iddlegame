/* =======================
   ESTADO DO JOGO
======================= */
const defaultState = {
  soulPoints: 0,
  soulPointsPerSecond: 0,
  clickPower: 1,
  autoClickers: 0,

  // Atributos base/derivados
  stats: {
    attack: 1,      // multiplica DPS/click
    defense: 0,     // (reserva p/ futuro)
    speed: 1,       // multiplica DPS
    critChance: 0.05,
    critMult: 1.5,
  },

  // Personagens (do teu projeto original)
  characters: [
    { id: 1, name: "Sakura Haruno", level: 0, cost: 25,   sps: 0.5,  unlocked: false, image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/98ee8f22-ed1f-4d51-8acd-217949b4999e.png", alt: "Female anime ninja pink hair" },
    { id: 2, name: "Naruto Uzumaki", level: 0, cost: 100,  sps: 2,    unlocked: false, image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/feb2de73-7315-4c7a-8f70-01e6e84cec03.png", alt: "Blonde male ninja" },
    { id: 3, name: "Levi Ackerman",  level: 0, cost: 500,  sps: 5,    unlocked: false, image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/19296824-d64e-4341-a2e4-dce2ea3c6a0f.png", alt: "Serious soldier" },
    { id: 4, name: "Nezuko Kamado",  level: 0, cost: 2000, sps: 12,   unlocked: false, image: "https://placehold.co/300x450", alt: "Demon girl" },
    { id: 5, name: "Gojo Satoru",    level: 0, cost: 10000,sps: 30,   unlocked: false, image: "https://placehold.co/300x450", alt: "White-haired sorcerer" }
  ],

  upgrades: {
    clickPower: { cost: 10,  multiplier: 1.15, level: 0 },
    autoClicker: { cost: 50, multiplier: 1.15, level: 0 }
  },

  // Equipamentos (18 itens) — cada um tem papel e progressão
  equipments: [
    // ataque
    { key:"espada",        name:"Espada",         level:0, baseCost:30,  scale:1.22, type:"attack",  perLvl:0.2 },
    { key:"adaga",         name:"Adaga",          level:0, baseCost:40,  scale:1.22, type:"attack",  perLvl:0.15 },
    { key:"machado",       name:"Machado",        level:0, baseCost:60,  scale:1.23, type:"attack",  perLvl:0.3 },
    { key:"lanca",         name:"Lança",          level:0, baseCost:70,  scale:1.23, type:"attack",  perLvl:0.25 },
    { key:"garra",         name:"Garra",          level:0, baseCost:45,  scale:1.22, type:"attack",  perLvl:0.18 },
    { key:"shuriken",      name:"Shuriken",       level:0, baseCost:50,  scale:1.22, type:"attack",  perLvl:0.16 },
    { key:"arco",          name:"Arco",           level:0, baseCost:80,  scale:1.25, type:"attack",  perLvl:0.35 },
    { key:"cajado",        name:"Cajado Mágico",  level:0, baseCost:90,  scale:1.25, type:"attack",  perLvl:0.4 },

    // defesa/velocidade/crit
    { key:"escudo",        name:"Escudo",         level:0, baseCost:35,  scale:1.2,  type:"defense", perLvl:0.3 },
    { key:"armadura",      name:"Armadura",       level:0, baseCost:70,  scale:1.22, type:"defense", perLvl:0.5 },
    { key:"elmo",          name:"Elmo",           level:0, baseCost:45,  scale:1.2,  type:"defense", perLvl:0.2 },
    { key:"botas",         name:"Botas",          level:0, baseCost:55,  scale:1.2,  type:"speed",   perLvl:0.05 },
    { key:"luvas",         name:"Luvas",          level:0, baseCost:40,  scale:1.2,  type:"speed",   perLvl:0.04 },
    { key:"capa",          name:"Capa",           level:0, baseCost:60,  scale:1.2,  type:"speed",   perLvl:0.06 },
    { key:"anel",          name:"Anel",           level:0, baseCost:80,  scale:1.23, type:"crit",    perLvl:0.01 },
    { key:"colar",         name:"Colar",          level:0, baseCost:85,  scale:1.23, type:"crit",    perLvl:0.012 },

    // utilidade (SP/s)
    { key:"livro",         name:"Livro de Magias",level:0, baseCost:120, scale:1.25, type:"sps",     perLvl:1.5 },
    { key:"espirito",      name:"Espírito",       level:0, baseCost:200, scale:1.28, type:"sps",     perLvl:3.5 },
  ],

  achievements: [
    { id: 1, name: "Novato",  description: "Ganhe 100 Soul Points",     requirement: 100,     achieved: false },
    { id: 2, name: "Genin",   description: "Ganhe 1,000 Soul Points",   requirement: 1000,    achieved: false },
    { id: 3, name: "Chunin",  description: "Ganhe 10,000 Soul Points",  requirement: 10000,   achieved: false },
    { id: 4, name: "Jonin",   description: "Ganhe 100,000 Soul Points", requirement: 100000,  achieved: false },
    { id: 5, name: "Kage",    description: "Ganhe 1,000,000 Soul Points", requirement: 1000000, achieved: false }
  ],

  // Torneio
  tournament: {
    stage: 1,
    inFight: false,
    enemyMaxHp: 0,
    enemyHp: 0,
    timeLeft: 30,     // segundos
    wonStage: false,
  },
};

let gameState = load() || structuredClone(defaultState);

/* =======================
   ELEMENTOS DOM
======================= */
const mainCharacter = document.getElementById('mainCharacter');
const clickPowerBar = document.getElementById('clickPowerBar');
const clickPowerCost = document.getElementById('clickPowerCost');
const autoClickerCost = document.getElementById('autoClickerCost');
const soulPointsDisplay = document.getElementById('soulPoints');
const spsDisplay = document.getElementById('sps');
const charactersContainer = document.getElementById('characters');
const achievementsContainer = document.getElementById('achievements');
const clickPwrLabel = document.getElementById('clickPwrLabel');

// Melhorias
const equipmentsContainer = document.getElementById('equipments');
const equipSpsBonus = document.getElementById('equipSpsBonus');
const equipClickMult = document.getElementById('equipClickMult');
const equipAttackTotal = document.getElementById('equipAttackTotal');
const equipDefenseTotal = document.getElementById('equipDefenseTotal');
const equipSpeedTotal = document.getElementById('equipSpeedTotal');
const equipCritTotal = document.getElementById('equipCritTotal');

// Torneio
const stageLabel = document.getElementById('stageLabel');
const stageRewardLabel = document.getElementById('stageRewardLabel');
const enemyHpNow = document.getElementById('enemyHpNow');
const enemyHpMax = document.getElementById('enemyHpMax');
const enemyHpBar = document.getElementById('enemyHpBar');
const fightTimeLabel = document.getElementById('fightTimeLabel');
const timeBar = document.getElementById('timeBar');
const btnStartFight = document.getElementById('btnStartFight');
const btnNextStage = document.getElementById('btnNextStage');
const playerDpsLabel = document.getElementById('playerDpsLabel');

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active','border-b-2','border-pink-500','text-white');
      b.classList.add('text-gray-400');
    });
    btn.classList.add('active','border-b-2','border-pink-500','text-white');
    btn.classList.remove('text-gray-400');

    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.add('hidden'); content.classList.remove('active');
    });
    const tabName = btn.getAttribute('data-tab');
    document.getElementById(`${tabName}-content`).classList.remove('hidden');
    document.getElementById(`${tabName}-content`).classList.add('active');
  });
});

/* =======================
   INICIALIZAÇÃO
======================= */
function initGame() {
  recalcFromEquipments();     // aplica bônus de itens nos stats/SP/s/click
  updateDisplay();
  renderCharacters();
  renderAchievements();
  renderEquipments();
  setupTournamentUI();

  setInterval(gameLoop, 1000);

  // Clique no personagem
  mainCharacter.addEventListener('click', (e) => {
    const clickEffect = document.createElement('div');
    clickEffect.classList.add('click-effect');
    const r = e.target.getBoundingClientRect();
    clickEffect.style.left = (e.clientX - r.left - 20) + 'px';
    clickEffect.style.top  = (e.clientY - r.top  - 20) + 'px';
    e.target.appendChild(clickEffect);
    setTimeout(() => clickEffect.remove(), 500);

    mainCharacter.style.transform = 'scale(0.95)';
    setTimeout(() => mainCharacter.style.transform = 'scale(1)', 100);

    // dano/click = clickPower * (1 + (attack-1)) * speed
    const clickMult = (1 + (gameState.stats.attack - 1)) * gameState.stats.speed;
    const gained = Math.max(1, Math.floor(gameState.clickPower * clickMult));
    gameState.soulPoints += gained;

    pulseClickBar();
    updateDisplay();
    save();
  });

  // Torneio botões
  btnStartFight.addEventListener('click', startFight);
  btnNextStage.addEventListener('click', nextStage);
}
window.onload = initGame;

/* =======================
   LOOP E DISPLAY
======================= */
function gameLoop() {
  // ganho passivo
  gameState.soulPoints += gameState.soulPointsPerSecond;

  // desbloqueia personagens com base no SP
  gameState.characters.forEach(c => {
    if (!c.unlocked && gameState.soulPoints >= c.cost / 2) { c.unlocked = true; renderCharacters(); }
  });

  // luta do torneio (se ativa)
  if (gameState.tournament.inFight) fightTick();

  // conquistas + display
  checkAchievements();
  updateDisplay();
  save();
}

function updateDisplay() {
  soulPointsDisplay.textContent = Math.floor(gameState.soulPoints).toLocaleString();
  spsDisplay.textContent = gameState.soulPointsPerSecond.toFixed(1);
  clickPowerCost.textContent = Math.floor(gameState.upgrades.clickPower.cost);
  autoClickerCost.textContent = Math.floor(gameState.upgrades.autoClicker.cost);
  clickPwrLabel.textContent = gameState.clickPower.toFixed(0);

  // imagens dinâmicas
  if (gameState.soulPoints > 10000) {
    mainCharacter.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8b2704c8-c40b-47c2-8e35-7a10a103ab96.png";
    mainCharacter.alt = "Celestial anime mountain";
  } else if (gameState.soulPoints > 1000) {
    mainCharacter.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7913c5b9-586c-4164-9303-f3829825883c.png";
    mainCharacter.alt = "Dramatic anime mountain";
  }
}

/* =======================
   PERSONAGENS
======================= */
function renderCharacters() {
  charactersContainer.innerHTML = '';
  gameState.characters.forEach(character => {
    if (!character.unlocked) return;

    const card = document.createElement('div');
    card.className = 'character-card bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition cursor-pointer';
    card.innerHTML = `
      <div class="flex items-center">
        <img src="${character.image}" alt="${character.alt}" class="w-16 h-16 rounded-full object-cover mr-4 border-2 border-pink-500">
        <div class="flex-1">
          <h3 class="font-bold">${character.name}</h3>
          <p class="text-sm text-gray-300">Nível ${character.level}</p>
          <p class="text-sm">Gera ${(character.sps * character.level).toFixed(1)} SP/s</p>
        </div>
      </div>
      <div class="mt-3">
        <button class="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded" onclick="buyCharacter(${character.id})">
          Melhorar (${Math.floor(character.cost)} SP)
        </button>
      </div>
    `;
    charactersContainer.appendChild(card);
  });
}

function buyCharacter(id) {
  const c = gameState.characters.find(x => x.id === id);
  if (!c) return;
  if (gameState.soulPoints < c.cost) return;

  gameState.soulPoints -= c.cost;
  c.level += 1;
  gameState.soulPointsPerSecond += c.sps;
  c.cost = Math.floor(c.cost * 1.35);

  updateDisplay();
  renderCharacters();
  save();
}

/* =======================
   UPGRADES BÁSICOS
======================= */
function buyUpgrade(type) {
  const u = gameState.upgrades[type];
  if (!u) return;
  if (gameState.soulPoints < u.cost) return;

  gameState.soulPoints -= u.cost;
  u.level += 1;

  if (type === 'clickPower') {
    gameState.clickPower = 1 + u.level * 2; // base do teu projeto
  } else if (type === 'autoClicker') {
    gameState.autoClickers = u.level;
    gameState.soulPointsPerSecond += 1;
  }

  u.cost = Math.floor(u.cost * u.multiplier);
  updateDisplay();
  save();
}

/* =======================
   CONQUISTAS
======================= */
function renderAchievements() {
  achievementsContainer.innerHTML = '';
  gameState.achievements.forEach(a => {
    const el = document.createElement('div');
    el.className = `achievement bg-gray-600 p-3 rounded-lg flex items-center ${a.achieved ? '' : 'opacity-50'}`;
    el.innerHTML = `
      <div class="w-10 h-10 ${a.achieved ? 'bg-yellow-500' : 'bg-gray-500'} rounded-full mr-3 flex items-center justify-center">
        <span class="text-lg">${a.achieved ? '🏆' : '?'}</span>
      </div>
      <div>
        <h3 class="font-bold">${a.name}</h3>
        <p class="text-sm text-gray-300">${a.description}</p>
      </div>
    `;
    achievementsContainer.appendChild(el);
  });
}

function checkAchievements() {
  let upd = false;
  gameState.achievements.forEach(a => {
    if (!a.achieved && gameState.soulPoints >= a.requirement) {
      a.achieved = true; upd = true;
      showNotification(`Conquista desbloqueada: ${a.name}`);
    }
  });
  if (upd) renderAchievements();
}

function showNotification(message) {
  const n = document.createElement('div');
  n.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce';
  n.textContent = message;
  document.body.appendChild(n);
  setTimeout(()=>n.remove(), 3000);
}

/* =======================
   MELHORIAS (EQUIPAMENTOS)
======================= */
function renderEquipments() {
  if (!equipmentsContainer) return;
  equipmentsContainer.innerHTML = '';

  gameState.equipments.forEach(eq => {
    const cost = Math.floor(eq.baseCost * Math.pow(eq.scale, eq.level));
    const bonusText = getEquipBonusText(eq);

    const card = document.createElement('div');
    card.className = 'equip-card';
    card.innerHTML = `
      <h4 class="mb-1">${eq.name}</h4>
      <div class="meta mb-2">Nível ${eq.level}</div>
      <div class="text-sm mb-3">${bonusText}</div>
      <button class="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded"
        onclick="buyEquipment('${eq.key}')" ${gameState.soulPoints < cost ? 'disabled' : ''}>
        Melhorar (Custo: ${cost} SP)
      </button>
    `;
    equipmentsContainer.appendChild(card);
  });

  // Resumo
  const derived = deriveFromEquipments();
  equipSpsBonus.textContent = derived.addSps.toFixed(1);
  equipClickMult.textContent = `x${(derived.clickMult).toFixed(2)}`;
  equipAttackTotal.textContent = (gameState.stats.attack).toFixed(2);
  equipDefenseTotal.textContent = (gameState.stats.defense).toFixed(2);
  equipSpeedTotal.textContent = (gameState.stats.speed).toFixed(2);
  equipCritTotal.textContent = `${Math.round(gameState.stats.critChance*100)}% / x${gameState.stats.critMult.toFixed(2)}`;
}

function getEquipBonusText(eq) {
  switch (eq.type) {
    case 'attack':  return `+${(eq.perLvl*100).toFixed(0)}% de Ataque por nível`;
    case 'defense': return `+${(eq.perLvl).toFixed(1)} Defesa por nível`;
    case 'speed':   return `+${(eq.perLvl*100).toFixed(0)}% Velocidade por nível`;
    case 'crit':    return `+${(eq.perLvl*100).toFixed(0)}% Chance de Crítico por nível`;
    case 'sps':     return `+${eq.perLvl.toFixed(1)} SP/s por nível`;
    default: return '';
  }
}

function buyEquipment(key) {
  const eq = gameState.equipments.find(e => e.key === key);
  if (!eq) return;
  const cost = Math.floor(eq.baseCost * Math.pow(eq.scale, eq.level));
  if (gameState.soulPoints < cost) return;

  gameState.soulPoints -= cost;
  eq.level += 1;

  // Recalcula bônus globais
  recalcFromEquipments();

  renderEquipments();
  updateDisplay();
  save();
}

function deriveFromEquipments() {
  let attack = 1;
  let defense = 0;
  let speed = 1;
  let critChance = 0.05;
  let critMult = 1.5;
  let addSps = 0;

  gameState.equipments.forEach(eq => {
    if (eq.level <= 0) return;
    if (eq.type === 'attack')  attack += eq.perLvl * eq.level;
    if (eq.type === 'defense') defense += eq.perLvl * eq.level;
    if (eq.type === 'speed')   speed  += eq.perLvl * eq.level;
    if (eq.type === 'crit')    critChance += eq.perLvl * eq.level;
    if (eq.type === 'sps')     addSps += eq.perLvl * eq.level;
  });

  const clickMult = attack * speed; // simplificado
  return { attack, defense, speed, critChance, critMult, addSps, clickMult };
}

function recalcFromEquipments() {
  const d = deriveFromEquipments();
  gameState.stats.attack = d.attack;
  gameState.stats.defense = d.defense;
  gameState.stats.speed = d.speed;
  gameState.stats.critChance = Math.min(0.75, d.critChance); // cap 75%
  gameState.stats.critMult = d.critMult;

  // Reaplica SP/s base dos personagens + bônus dos itens utilidade
  const baseSps = gameState.characters.reduce((sum,c)=> sum + c.sps * c.level, 0);
  gameState.soulPointsPerSecond = baseSps + d.addSps;
}

/* =======================
   TORNEIO
======================= */
let fightInterval = null;

function setupTournamentUI() {
  updateStageLabels();
  resetEnemyForStage();
  updateFightUI();
}

function stageReward(stage) {
  // recompensa cresce de forma leve/exponencial
  return Math.floor(50 * stage * Math.pow(1.12, stage-1));
}

function enemyHpForStage(stage) {
  const base = 150;
  const growth = Math.pow(1.18, stage-1);
  const bossMult = (stage % 10 === 0) ? 2.8 : 1; // chefão a cada 10
  return Math.floor(base * growth * bossMult);
}

function playerDpsEstimate() {
  // DPS ~ (SP/s * 0.6 + clickPower * 2) * attack * speed * (crit esperado)
  const expectedCrit = 1 + gameState.stats.critChance * (gameState.stats.critMult - 1);
  const base = (gameState.soulPointsPerSecond * 0.6) + (gameState.clickPower * 2);
  return Math.max(1, base * gameState.stats.attack * gameState.stats.speed * expectedCrit);
}

function updateStageLabels() {
  stageLabel && (stageLabel.textContent = gameState.tournament.stage);
  stageRewardLabel && (stageRewardLabel.textContent = stageReward(gameState.tournament.stage));
}

function resetEnemyForStage() {
  const hp = enemyHpForStage(gameState.tournament.stage);
  gameState.tournament.enemyMaxHp = hp;
  gameState.tournament.enemyHp = hp;
  gameState.tournament.timeLeft = 30;
  gameState.tournament.inFight = false;
  gameState.tournament.wonStage = false;
  updateFightUI();
}

function startFight() {
  if (gameState.tournament.inFight) return;
  gameState.tournament.inFight = true;
  gameState.tournament.timeLeft = 30;

  if (fightInterval) clearInterval(fightInterval);
  fightInterval = setInterval(()=>fightTick(), 100);
}

function fightTick() {
  const t = gameState.tournament;
  if (!t.inFight) return;

  // tempo
  t.timeLeft = Math.max(0, t.timeLeft - 0.1);

  // dano ao inimigo
  let dps = playerDpsEstimate();
  // variação leve + chance de crítico por tick
  const critNow = (Math.random() < gameState.stats.critChance);
  if (critNow) dps *= gameState.stats.critMult;
  const dmgThisTick = dps / 10; // 10 ticks/segundo
  t.enemyHp = Math.max(0, t.enemyHp - dmgThisTick);

  // fim de luta
  if (t.enemyHp <= 0) {
    endFight(true);
  } else if (t.timeLeft <= 0) {
    endFight(false);
  }

  updateFightUI();
}

function endFight(victory) {
  const t = gameState.tournament;
  t.inFight = false;
  if (fightInterval) { clearInterval(fightInterval); fightInterval = null; }

  if (victory) {
    const reward = stageReward(t.stage);
    gameState.soulPoints += reward;
    t.wonStage = true;
    showNotification(`Vitória! +${reward} SP`);
  } else {
    t.wonStage = false;
    showNotification(`Derrota! Tente aumentar seus equipamentos.`);
  }
  updateFightUI();
  save();
}

function nextStage() {
  const t = gameState.tournament;
  if (!t.wonStage || t.inFight) return;
  t.stage += 1;
  updateStageLabels();
  resetEnemyForStage();
  updateFightUI();
  save();
}

function updateFightUI() {
  const t = gameState.tournament;
  const hp = Math.floor(t.enemyHp);
  const hpMax = Math.floor(t.enemyMaxHp);
  if (enemyHpNow) enemyHpNow.textContent = hp;
  if (enemyHpMax) enemyHpMax.textContent = hpMax;
  if (enemyHpBar) {
    const pct = hpMax > 0 ? (hp / hpMax) * 100 : 0;
    enemyHpBar.style.width = Math.max(0, Math.min(100, pct)) + '%';
  }

  // tempo
  if (fightTimeLabel) fightTimeLabel.textContent = formatTime(t.timeLeft);
  if (timeBar) timeBar.style.width = (t.timeLeft/30)*100 + '%';

  // botões
  if (btnStartFight) btnStartFight.disabled = t.inFight;
  if (btnNextStage) {
    btnNextStage.disabled = !t.wonStage || t.inFight;
    btnNextStage.classList.toggle('opacity-50', btnNextStage.disabled);
    btnNextStage.classList.toggle('cursor-not-allowed', btnNextStage.disabled);
  }

  // DPS
  if (playerDpsLabel) playerDpsLabel.textContent = Math.floor(playerDpsEstimate());
}

function formatTime(sec) {
  const s = Math.ceil(sec);
  const mm = String(Math.floor(s/60)).padStart(2,'0');
  const ss = String(s%60).padStart(2,'0');
  return `${mm}:${ss}`;
}

/* =======================
   UTIL
======================= */
function pulseClickBar() {
  clickPowerBar.style.width = '100%';
  clickPowerBar.style.transition = 'width 0s';
  setTimeout(() => {
    clickPowerBar.style.transition = 'width 0.3s ease';
    clickPowerBar.style.width = '0%';
  }, 10);
}

/* =======================
   SALVAMENTO
======================= */
function save() {
  try {
    localStorage.setItem('anime-idle-save', JSON.stringify(gameState));
  } catch(e) {}
}
function load() {
  try {
    const raw = localStorage.getItem('anime-idle-save');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch(e) { return null; }
}
function resetSave() {
  localStorage.removeItem('anime-idle-save');
  gameState = structuredClone(defaultState);
  recalcFromEquipments();
  renderEquipments();
  renderCharacters();
  renderAchievements();
  setupTournamentUI();
  updateDisplay();
  showNotification('Progresso resetado!');
}

/* =======================
   INÍCIO
======================= */
