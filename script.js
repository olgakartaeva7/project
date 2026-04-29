"use strict";
const SoundFX = {
    ctx: null,
    init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
    play(type) {
        if (!this.ctx) this.init();
        if (this.ctx?.state === 'suspended') this.ctx.resume();
        if (!this.ctx) return;
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.connect(g); g.connect(this.ctx.destination);
        const now = this.ctx.currentTime;
        if (type === 'click') {
            o.frequency.setValueAtTime(420, now); o.frequency.exponentialRampToValueAtTime(180, now + 0.12);
            g.gain.setValueAtTime(0.12, now); g.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            o.start(now); o.stop(now + 0.15);
        } else if (type === 'catch') {
            o.type = 'sine'; o.frequency.setValueAtTime(523.25, now); o.frequency.exponentialRampToValueAtTime(1046.5, now + 0.18);
            g.gain.setValueAtTime(0.18, now); g.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            o.start(now); o.stop(now + 0.25);
        } else if (type === 'oops') {
            o.type = 'triangle'; o.frequency.setValueAtTime(220, now); o.frequency.linearRampToValueAtTime(110, now + 0.18);
            g.gain.setValueAtTime(0.08, now); g.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
            o.start(now); o.stop(now + 0.22);
        } else if (type === 'win') {
            [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
                const o2 = this.ctx.createOscillator(), g2 = this.ctx.createGain();
                o2.connect(g2); g2.connect(this.ctx.destination);
                const t = now + i * 0.12; o2.frequency.value = f;
                g2.gain.setValueAtTime(0.15, t); g2.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
                o2.start(t); o2.stop(t + 0.2);
            });
        }
    }
};
const alphabetData = [
    { letter: "А", term: "Акциз", desc: "Косвенный налог на товары массового потребления.", emoji: "🍷", fact: "Акцизы приносят в бюджет более 2 трлн рублей!" },
    { letter: "Б", term: "Бюджет", desc: "План доходов и расходов государства на год.", emoji: "📊", fact: "Слово «бюджет» от старонормандского «bougette» — кошелек." },
    { letter: "В", term: "Внебюджетные фонды", desc: "Пенсионный фонд, ФОМС, фонд соцстраха.", emoji: "🏥", fact: "Расходы ПФР превысили 11 трлн рублей." },
    { letter: "Г", term: "Госдолг", desc: "Задолженность государства перед кредиторами.", emoji: "📉", fact: "Госдолг РФ — около 15% ВВП, безопасный уровень." },
    { letter: "Д", term: "Доходы бюджета", desc: "Налоги, сборы, ненефтегазовые поступления.", emoji: "💰", fact: "НДПИ — важная часть доходов бюджета." },
    { letter: "Е", term: "Единый налоговый счет", desc: "Система упрощенной уплаты налогов с 2023 года.", emoji: "💻", fact: "ЕНС упростил администрирование для бизнеса." },
    { letter: "Ё", term: "Ёмкость бюджета", desc: "Способность бюджета финансировать расходы.", emoji: "🏺", fact: "Важна для устойчивости бюджетной системы." },
    { letter: "Ж", term: "ЖКХ", desc: "Жилищно-коммунальное хозяйство с дотациями.", emoji: "🏢", fact: "В каждом регионе свои тарифы ЖКХ." },
    { letter: "З", term: "Закон о бюджете", desc: "Федеральный закон, утверждающий бюджет.", emoji: "📜", fact: "Рассматривается Госдумой в трёх чтениях." },
    { letter: "И", term: "Инвестиции", desc: "Вложения в инфраструктуру, образование, технологии.", emoji: "🏗️", fact: "Нацпроекты — главный инвестиционный вектор." },
    { letter: "Й", term: "Йота-эффект", desc: "Малые изменения в налогах с большим эффектом.", emoji: "🔍", fact: "1% налога может принести миллиарды." },
    { letter: "К", term: "Казенное учреждение", desc: "Госорган, финансируемый из бюджета.", emoji: "🏛️", fact: "Казначейство следит за их расходами." },
    { letter: "Л", term: "Льготы", desc: "Налоговые преференции для граждан и бизнеса.", emoji: "🎁", fact: "Льготы стимулируют рождаемость и бизнес." },
    { letter: "М", term: "Межбюджетные трансферты", desc: "Дотации и субсидии регионам из федерального бюджета.", emoji: "🔄", fact: "Свыше 70 регионов получают поддержку." },
    { letter: "Н", term: "НДФЛ", desc: "Налог на доходы физлиц — 13% (15% для высоких).", emoji: "🧑", fact: "Главный налог, который виден в зарплате." },
    { letter: "О", term: "Обслуживание госдолга", desc: "Проценты по кредитам государства.", emoji: "💸", fact: "Расходы на обслуживание стабильны." },
    { letter: "П", term: "Программный бюджет", desc: "Бюджет, увязанный с госпрограммами.", emoji: "📋", fact: "Все расходы привязаны к результатам." },
    { letter: "Р", term: "Расходы бюджета", desc: "Средства на оборону, социалку, экономику.", emoji: "💸", fact: "Социальная сфера — более 30% расходов." },
    { letter: "С", term: "Субсидии", desc: "Деньги на поддержку отраслей и граждан.", emoji: "🤝", fact: "Субсидии на ЖКХ получают миллионы семей." },
    { letter: "Т", term: "Трансферты", desc: "Безвозмездные перечисления между бюджетами.", emoji: "🚚", fact: "Выравнивают бюджетную обеспеченность регионов." },
    { letter: "У", term: "Управление бюджетом", desc: "Планирование, исполнение и контроль бюджета.", emoji: "⚙️", fact: "Казначейство — главный оператор." },
    { letter: "Ф", term: "ФНС", desc: "Федеральная налоговая служба — сборщик налогов.", emoji: "🏢", fact: "Собирает больше 40 трлн рублей в год." },
    { letter: "Х", term: "Хозрасчет", desc: "Принцип самоокупаемости госпредприятий.", emoji: "⚖️", fact: "Важен для эффективности госпредприятий." },
    { letter: "Ц", term: "Целевые программы", desc: "Комплекс мероприятий на решение задач.", emoji: "🎯", fact: "Нацпроекты — крупнейшие целевые программы." },
    { letter: "Ч", term: "Чистый долг", desc: "Госдолг за вычетом ликвидных активов.", emoji: "🧮", fact: "Показатель долговой устойчивости страны." },
    { letter: "Ш", term: "Штрафы", desc: "Неналоговые доходы от нарушителей.", emoji: "🚔", fact: "Штрафы за ПДД пополняют региональные бюджеты." },
    { letter: "Щ", term: "Щит бюджета", desc: "Резервный фонд и ФНБ — защита от шоков.", emoji: "🛡️", fact: "ФНБ превышает 12 трлн рублей." },
    { letter: "Ъ", term: "—", desc: "Терминов на букву «Ъ» в бюджетной сфере нет.", emoji: "🧱", fact: "Твёрдый знак не начинает слов, но делает их устойчивее — как бюджетный резерв! 💪", special: true },
    { letter: "Ы", term: "—", desc: "Терминов на букву «Ы» в бюджетной сфере нет.", emoji: "❓", fact: "В русском языке почти нет слов на «Ы», а в экономике — и подавно! 😊", special: true },
    { letter: "Ь", term: "—", desc: "Терминов на букву «Ь» в бюджетной сфере нет.", emoji: "🕊️", fact: "Мягкий знак смягчает буквы, но терминов не начинает. Просто запоминай! ✨", special: true },
    
    { letter: "Э", term: "Эффективность бюджета", desc: "Соотношение результатов и затрат.", emoji: "📊", fact: "Оценка госпрограмм — ключевой тренд." },
    { letter: "Ю", term: "Юридические лица", desc: "Крупные налогоплательщики бюджета.", emoji: "🏢", fact: "Организации платят налог на прибыль 20%." },
    { letter: "Я", term: "Ясность бюджета", desc: "Прозрачность для граждан, «Бюджет для граждан».", emoji: "👁️", fact: "На budget.gov.ru есть наглядные инфографики." }
];
let gameState = {
    learned: new Array(33).fill(false), currentIndex: null, score: 0, streak: 0, caught: 0,
    gameMode: 'learn', huntTarget: 5, huntCaught: 0, huntTimer: null, huntTimeLeft: 60,
    letterMoveInterval: null, currentFlyingLetter: null, flyingLetterTimeout: null,
    termModal: null, factModal: null, quizModal: null
};
function createBubbles() {
    const c = document.getElementById('bgBubbles'); if (!c) return;
    for (let i = 0; i < 15; i++) {
        const b = document.createElement('div'); b.className = 'bubble';
        b.style.cssText = `width:${Math.random()*40+20}px;height:${Math.random()*40+20}px;left:${Math.random()*100}%;animation-delay:${Math.random()*15}s;animation-duration:${Math.random()*10+10}s`;
        c.appendChild(b);
    }
}
function createConfetti(x, y) {
    const colors = ['#f59e0b','#ea580c','#22c55e','#3b82f6','#8b5cf6','#ec4899'];
    for (let i = 0; i < 30; i++) {
        const c = document.createElement('div'); c.className = 'confetti';
        c.style.cssText = `left:${x||Math.random()*window.innerWidth}px;top:${y||-20}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?'50%':'0'};width:${Math.random()*8+4}px;height:${Math.random()*8+4}px;animation-duration:${Math.random()*2+2}s`;
        document.body.appendChild(c); setTimeout(() => c.remove(), 3000);
    }
}
function showToast(msg, type='success') {
    const t = document.createElement('div'); t.className = `toast-notification ${type}`;
    t.innerHTML = `<i class="bi ${type==='success'?'bi-check-circle-fill':'bi-x-circle-fill'}"></i> ${msg}`;
    document.body.appendChild(t); setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
}
function updateStats() {
    const count = gameState.learned.filter(v=>v).length, percent = (count/33)*100;
    document.getElementById('learnedCount').textContent = count;
    document.getElementById('progressBar').style.width = percent + '%';
    document.getElementById('scoreCount').textContent = gameState.score;
    document.getElementById('streakCount').textContent = gameState.streak;
    document.getElementById('caughtCount').textContent = gameState.caught;
    document.getElementById('caughtInRound').textContent = gameState.huntCaught;
    const m = document.getElementById('progressMessage');
    if (m) {
        if (count === 33) { m.innerHTML = '<i class="bi bi-trophy-fill text-warning"></i> 🎉 ПОБЕДА! Все буквы изучены! 🏆'; createConfetti(); }
        else if (count >= 25) m.innerHTML = '<i class="bi bi-star-fill text-warning"></i> Экспертный уровень! 💪';
        else if (count >= 15) m.innerHTML = '<i class="bi bi-emoji-smile-fill"></i> Отличный прогресс! 📚';
        else if (count >= 5) m.innerHTML = '<i class="bi bi-arrow-up-circle"></i> Хорошо начали! 🚀';
        else m.innerHTML = '<i class="bi bi-emoji-wink"></i> Нажми на карточку — БУКВА улетит! 🎮';
    }
}
function saveProgress() { localStorage.setItem('budgetAlphabet', JSON.stringify({learned: gameState.learned, score: gameState.score, streak: gameState.streak, caught: gameState.caught})); updateStats(); }
function loadProgress() {
    const s = localStorage.getItem('budgetAlphabet'); if (!s) return;
    try { const d = JSON.parse(s); if (d.learned?.length === 33) { gameState.learned = d.learned; gameState.score = d.score||0; gameState.streak = d.streak||0; gameState.caught = d.caught||0; }} catch(e){}
    updateStats();
}
function createFlyingLetter(d, x, y) {
    const c = document.getElementById('flyingLettersContainer'); if (!c) return null;
    removeFlyingLetter();
    const f = document.createElement('div'); f.className = 'flying-letter';
    f.textContent = d.letter; f.style.left = x+'px'; f.style.top = y+'px';
    f.dataset.letter = d.letter; f.dataset.idx = alphabetData.findIndex(i => i.letter === d.letter);
    c.appendChild(f); gameState.currentFlyingLetter = f; return f;
}
function removeFlyingLetter() { if (gameState.currentFlyingLetter) { gameState.currentFlyingLetter.remove(); gameState.currentFlyingLetter = null; } }
function launchFlyingLetter(d, card) {
    if (!card || !d) return;
    SoundFX.play('click'); 
    if (d.special) { showSpecialLetterModal(d); return; }
    const r = card.getBoundingClientRect();
    const f = createFlyingLetter(d, r.left + r.width/2, r.top + r.height/2); if (!f) return;
    const dirs = [{x:-300,y:-200},{x:300,y:-200},{x:-300,y:200},{x:300,y:200},{x:-400,y:0},{x:400,y:0},{x:0,y:-300},{x:0,y:300}];
    const dir = dirs[Math.floor(Math.random()*dirs.length)];
    let px = r.left + r.width/2, py = r.top + r.height/2, step = 20, dx = dir.x/step, dy = dir.y/step, cur = 0;
    const iv = setInterval(() => {
        cur++; px += dx; py += dy;
        f.style.left = px+'px'; f.style.top = py+'px'; f.style.transform = `rotate(${cur*15}deg) scale(1.2)`;
        if (cur >= step) { clearInterval(iv); setTimeout(() => { showTermModal(parseInt(f.dataset.idx)); removeFlyingLetter(); }, 300); }
    }, 30);
    f.onclick = e => { e.stopPropagation(); catchFlyingLetter(f, d); };
}

function catchFlyingLetter(f, d) {
    if (!f) return;
    SoundFX.play('catch');
    f.classList.add('caught');
    gameState.caught++; gameState.huntCaught++; gameState.score += 15; gameState.streak++;
    updateStats(); saveProgress();
    const rect = f.getBoundingClientRect(); createConfetti(rect.left, rect.top);
    const p = ["Ого, поймал! 🎯","Ловко! Буква твоя! ✨","Есть! +15 в копилку! 💰","Мастер поимки! 🔥"];
    showToast(`${p[Math.floor(Math.random()*p.length)]} Всего: ${gameState.caught}`, 'success');
    if (gameState.gameMode === 'hunt' && gameState.huntCaught >= gameState.huntTarget) setTimeout(() => endHuntRound(true), 500);
    setTimeout(() => { removeFlyingLetter(); showTermModal(parseInt(f.dataset.idx)); }, 400);
}

function startAutoLetterFlight() {
    if (gameState.letterMoveInterval) clearInterval(gameState.letterMoveInterval);
    gameState.letterMoveInterval = setInterval(() => {
        if (gameState.gameMode !== 'hunt' || gameState.huntCaught >= gameState.huntTarget) return;
        const avail = alphabetData.filter((it, idx) => !gameState.learned[idx] && !it.special);
        if (!avail.length) return;
        const d = avail[Math.floor(Math.random()*avail.length)];
        const x = Math.random()*(window.innerWidth-100)+50, y = Math.random()*(window.innerHeight-200)+100;
        const f = createFlyingLetter(d, x, y); if (!f) return;
        let px = x, py = y, dx = (Math.random()-0.5)*15, dy = (Math.random()-0.5)*15;
        const mv = setInterval(() => {
            if (!f.parentNode || gameState.gameMode !== 'hunt') { clearInterval(mv); return; }
            px += dx; py += dy;
            if (px <= 0 || px >= window.innerWidth-80) dx = -dx;
            if (py <= 0 || py >= window.innerHeight-80) dy = -dy;
            f.style.left = px+'px'; f.style.top = py+'px'; f.style.transform = `rotate(${px%360}deg)`;
        }, 50);
        if (gameState.flyingLetterTimeout) clearTimeout(gameState.flyingLetterTimeout);
        gameState.flyingLetterTimeout = setTimeout(() => { if (f.parentNode) removeFlyingLetter(); }, 5000);
        f.onclick = e => { e.stopPropagation(); clearInterval(mv); if (gameState.flyingLetterTimeout) clearTimeout(gameState.flyingLetterTimeout); catchFlyingLetter(f, d); };
    }, 3000);
}
function stopAutoLetterFlight() {
    if (gameState.letterMoveInterval) { clearInterval(gameState.letterMoveInterval); gameState.letterMoveInterval = null; }
    if (gameState.flyingLetterTimeout) { clearTimeout(gameState.flyingLetterTimeout); gameState.flyingLetterTimeout = null; }
    removeFlyingLetter();
}

function renderLetters(filter='') {
    const g = document.getElementById('lettersGrid'); if (!g) return; g.innerHTML = '';
    const f = filter.trim().toLowerCase();
    let list = alphabetData;
    if (f) list = alphabetData.filter(it => f.length===1 ? it.letter.toLowerCase()===f : it.term.toLowerCase().includes(f) || it.desc.toLowerCase().includes(f));
    if (!list.length && f) { g.innerHTML = '<div class="empty-result"><i class="bi bi-emoji-frown"></i><p><strong>Ничего не найдено</strong></p><p class="small text-muted">Попробуй ввести букву или термин</p></div>'; return; }
    list.forEach((it, idx) => {
        const real = alphabetData.findIndex(i => i.letter === it.letter);
        const c = document.createElement('div');
        c.className = `letter-card ${gameState.learned[real] ? 'learned' : ''} ${it.special ? 'special' : ''}`;
        c.style.setProperty('--i', idx);
        c.onclick = e => { e.stopPropagation(); if (gameState.gameMode==='hunt' && gameState.currentFlyingLetter) { showToast('🏃 Сначала поймай текущую букву!','error'); return; } launchFlyingLetter(it, c); };
        c.innerHTML = `<span class="letter-emoji">${it.emoji}</span><span class="letter-symbol">${it.letter}</span><small>${gameState.learned[real] ? 'изучено ✓' : it.special ? 'нет термина —' : 'кликни 🏃'}</small>`;
        g.appendChild(c);
    });
}
function setupSearch() {
    const i = document.getElementById('searchInput'), c = document.getElementById('clearSearch');
    if (i) i.addEventListener('input', e => renderLetters(e.target.value));
    if (c) c.addEventListener('click', () => { if (i) { i.value = ''; renderLetters(''); i.focus(); } });
}

function showTermModal(idx) {
    gameState.currentIndex = idx;
    const d = alphabetData[idx], body = document.getElementById('termModalBody'), btn = document.getElementById('markLearnedBtn'), btnT = document.getElementById('markBtnText');
    if (body) {
        body.innerHTML = `<div class="text-center mb-4"><span style="font-size:5rem;display:block">${d.emoji}</span></div><h4 class="text-center fw-bold mb-2">${d.letter}. ${d.term}</h4>
        <div class="text-center"><span class="term-badge"><i class="bi bi-book"></i> ${d.special ? 'Особая буква' : 'Бюджетный термин'}</span></div>
        <p class="mt-4 fs-5">${d.desc}</p><div class="fact-box ${d.special ? 'special-fact' : ''}"><i class="bi bi-lightbulb-fill"></i><strong>Интересно:</strong><br>${d.fact}</div>`;
    }
    if (btn && btnT) {
        if (d.special) { btnT.textContent = 'Понятно!'; btn.classList.replace('btn-warning', 'btn-outline-primary'); btn.onclick = () => { createConfetti(); SoundFX.play('catch'); if (gameState.termModal) gameState.termModal.hide(); }; }
        else if (!gameState.learned[idx]) { btnT.textContent = 'Я запомнил! +10 очков'; btn.classList.replace('btn-outline-primary', 'btn-warning'); btn.onclick = markLearned; }
        else { btnT.textContent = 'Уже изучено ✓'; btn.disabled = true; }
    }
    if (!gameState.termModal) gameState.termModal = new bootstrap.Modal(document.getElementById('termModal'));
    gameState.termModal.show();
}
function showSpecialLetterModal(d) { showTermModal(alphabetData.findIndex(i => i.letter === d.letter)); }

function markLearned() {
    const i = gameState.currentIndex;
    if (i !== null && !gameState.learned[i]) {
        gameState.learned[i] = true; gameState.score += 10; gameState.streak++;
        saveProgress(); renderLetters(document.getElementById('searchInput')?.value || '');
        createConfetti(); SoundFX.play('win');
        showToast('✅ Изучено! +10 очков! 🔥', 'success');
        if (gameState.termModal) gameState.termModal.hide();
    }
}

function toggleGameMode() {
    const b = document.getElementById('toggleMode'), t = document.getElementById('modeText'), g = document.getElementById('gameMode');
    if (gameState.gameMode === 'learn') {
        gameState.gameMode = 'hunt'; t.textContent = 'Охота'; g.classList.remove('d-none');
        b.classList.replace('btn-outline-secondary', 'btn-danger'); b.innerHTML = '<i class="bi bi-lightning-fill me-1"></i><span id="modeText">Охота</span>';
        startHuntRound(); showToast('🎮 ОХОТА! Буквы летают! Поймай 5!', 'success');
    } else {
        gameState.gameMode = 'learn'; t.textContent = 'Обучение'; g.classList.add('d-none');
        b.classList.replace('btn-danger', 'btn-outline-secondary'); b.innerHTML = '<i class="bi bi-controller me-1"></i><span id="modeText">Обучение</span>';
        endHuntRound(false); showToast('📚 Режим ОБУЧЕНИЯ', 'success');
    }
    renderLetters(document.getElementById('searchInput')?.value || '');
}

function startHuntRound() {
    gameState.huntCaught = 0; gameState.huntTimeLeft = 60;
    document.getElementById('caughtInRound').textContent = '0'; document.getElementById('timer').textContent = '60';
    if (gameState.huntTimer) clearInterval(gameState.huntTimer);
    gameState.huntTimer = setInterval(() => {
        gameState.huntTimeLeft--; document.getElementById('timer').textContent = gameState.huntTimeLeft;
        if (gameState.huntTimeLeft <= 10) document.getElementById('timer').parentElement.classList.add('text-danger', 'fw-bold');
        if (gameState.huntTimeLeft <= 0) endHuntRound(false);
    }, 1000);
    startAutoLetterFlight();
}
function endHuntRound(won) {
    if (gameState.huntTimer) clearInterval(gameState.huntTimer); stopAutoLetterFlight();
    document.getElementById('timer').parentElement.classList.remove('text-danger', 'fw-bold');
    if (won) { gameState.score += 50; gameState.streak += 3; createConfetti(); SoundFX.play('win'); showToast('🏆 Победа! +50 очков! 🎉', 'success'); }
    else { gameState.streak = 0; SoundFX.play('oops'); showToast('⏱️ Время вышло! Попробуй ещё! 💪', 'error'); }
    saveProgress(); renderLetters('');
}

function shuffleLetters() { alphabetData.sort(() => Math.random() - 0.5); renderLetters(document.getElementById('searchInput')?.value || ''); showToast('🔀 Перемешано!', 'success'); }
function resetProgress() { if (confirm('⚠️ Сбросить прогресс?')) { gameState.learned.fill(false); gameState.score = 0; gameState.streak = 0; gameState.caught = 0; gameState.huntCaught = 0; localStorage.removeItem('budgetAlphabet'); updateStats(); renderLetters(''); showToast('🔄 Сброшено!', 'success'); } }

const quizQ = [
    {q:"Какой налог чаще всего платят граждане?",o:[{t:"НДФЛ (13%)",c:true},{t:"Налог на прибыль (20%)",c:false},{t:"Транспортный налог",c:false}],e:"НДФЛ удерживается из зарплаты!"},
    {q:"Что такое дефицит бюджета?",o:[{t:"Доходов больше расходов",c:false},{t:"Расходы превышают доходы",c:true},{t:"Бюджет сбалансирован",c:false}],e:"Дефицит = Расходы > Доходов!"},
    {q:"Какой фонд защищает бюджет от кризисов?",o:[{t:"Пенсионный фонд",c:false},{t:"ФНБ",c:true},{t:"ФОМС",c:false}],e:"ФНБ — подушка безопасности!"}
];
let curQ = 0;
function loadQuiz() { const q = quizQ[curQ]; document.getElementById('quizQuestion').textContent = q.q; const c = document.getElementById('quizOptions'); c.innerHTML = ''; q.o.forEach(o => { const b = document.createElement('button'); b.className = 'quiz-opt'; b.innerHTML = `<i class="bi bi-circle me-2"></i>${o.t}`; b.onclick = () => checkQuiz(b, o.c, q.e); c.appendChild(b); }); document.getElementById('quizFeedback').style.display = 'none'; }
function checkQuiz(b, ok, e) {
    document.querySelectorAll('.quiz-opt').forEach(x => x.disabled = true);
    const f = document.getElementById('quizFeedback');
    if (ok) {
        b.classList.add('correct'); f.innerHTML = `<span class="text-success">✅ Правильно!</span><br><small>${e}</small>`; f.className = 'quiz-feedback show alert alert-success';
        gameState.score += 20; gameState.streak++; SoundFX.play('catch'); showToast('🧠 +20 очков!', 'success');
    } else {
        b.classList.add('wrong'); const ci = quizQ[curQ].o.findIndex(x => x.c); document.querySelectorAll('.quiz-opt')[ci]?.classList.add('correct');
        f.innerHTML = `<span class="text-danger">❌ Неверно!</span><br><small>${e}</small>`; f.className = 'quiz-feedback show alert alert-warning';
        gameState.streak = 0; SoundFX.play('oops'); showToast('😅 Попробуй ещё!', 'error');
    }
    f.style.display = 'block'; updateStats(); saveProgress();
}
function setupQuiz() {
    loadQuiz();
    document.getElementById('nextQuiz').onclick = () => { curQ = (curQ + 1) % quizQ.length; loadQuiz(); };
    document.getElementById('quizModal').addEventListener('show.bs.modal', () => { loadQuiz(); document.querySelectorAll('.quiz-opt').forEach(b => { b.disabled = false; b.classList.remove('correct', 'wrong'); }); });
}
function showFact() { const f = alphabetData[Math.floor(Math.random()*alphabetData.length)]; document.getElementById('factModalBody').innerHTML = `<div style="font-size:4rem">${f.emoji}</div><h5 class="fw-bold">${f.letter}. ${f.term}</h5><p class="mt-3">${f.fact}</p>`; }

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', () => SoundFX.init(), { once: true });
    createBubbles(); loadProgress(); renderLetters(); setupSearch(); setupQuiz();
    gameState.termModal = new bootstrap.Modal(document.getElementById('termModal'));
    gameState.factModal = new bootstrap.Modal(document.getElementById('factModal'));
    gameState.quizModal = new bootstrap.Modal(document.getElementById('quizModal'));
    document.getElementById('markLearnedBtn').addEventListener('click', markLearned);
    document.getElementById('resetProgress').addEventListener('click', resetProgress);
    document.getElementById('shuffleLetters').addEventListener('click', shuffleLetters);
    document.getElementById('toggleMode').addEventListener('click', toggleGameMode);
    document.getElementById('factModal').addEventListener('show.bs.modal', showFact);
    document.querySelectorAll('.modal').forEach(m => m.addEventListener('hidden.bs.modal', () => { const b = document.querySelector('.modal-backdrop'); if (b) b.remove(); document.body.classList.remove('modal-open'); document.body.style.overflow = ''; document.body.style.paddingRight = ''; }));
    setTimeout(() => { SoundFX.play('click'); showToast('👋 Кликни на карточку — БУКВА улетит! 🏃', 'success'); }, 1000);
});