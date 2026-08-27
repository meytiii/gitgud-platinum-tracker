// ========================================================
// GitGud Platinum Tracker & Walkthrough Companion Engine
// ========================================================

const gameTitle = document.getElementById('game-title');
const trackerContainer = document.getElementById('tracker-container');
const globalProgress = document.getElementById('global-progress');
const guideBadge = document.getElementById('guide-badge');
const walkthroughToolbar = document.getElementById('walkthrough-toolbar');
const quickJumpContainer = document.getElementById('quick-jump-container');
const chapterJumpGrid = document.getElementById('chapter-jump-grid');
const btnBackToTop = document.getElementById('btn-back-to-top');

const modePlatinumBtn = document.getElementById('mode-platinum');
const modeWalkthroughBtn = document.getElementById('mode-walkthrough');
const listPlatinum = document.getElementById('list-platinum');
const listWalkthrough = document.getElementById('list-walkthrough');
const brandSubtitle = document.getElementById('brand-subtitle');

// Profile DOM elements
const profileSelect = document.getElementById('profile-select');
const btnAddProfile = document.getElementById('btn-add-profile');
const btnDeleteProfile = document.getElementById('btn-delete-profile');

// Utilities Toolbar DOM elements
const btnOpenMastery = document.getElementById('btn-open-mastery');
const btnOpenBackup = document.getElementById('btn-open-backup');
const btnToggleJournal = document.getElementById('btn-toggle-journal');
const btnSoundToggle = document.getElementById('btn-sound-toggle');
const soundIcon = document.getElementById('sound-icon');
const accentThemeSelect = document.getElementById('accent-theme-select');

// Search & Filter DOM elements
const globalSearchInput = document.getElementById('global-search-input');
const searchClearBtn = document.getElementById('search-clear-btn');
const filterChips = document.querySelectorAll('.filter-chip');
const searchStatusBar = document.getElementById('search-status-bar');
const searchResultCount = document.getElementById('search-result-count');

// Dedicated Build Planner & Journal Modal Elements
const modalJournal = document.getElementById('modal-journal');
const plannerModalTitle = document.getElementById('planner-modal-title');
const plannerSaveStatus = document.getElementById('planner-save-status');
const buildSlotBtns = document.querySelectorAll('.build-slot-btn');
const buildNameInput = document.getElementById('build-name-input');
const classSelect = document.getElementById('class-select');
const targetSlInput = document.getElementById('target-sl-input');
const calcCurrentLevelEl = document.getElementById('calc-current-level');
const calcPointsRemainingEl = document.getElementById('calc-points-remaining');
const pointsRemainingPill = document.getElementById('points-remaining-pill');
const plannerStatsGrid = document.getElementById('planner-stats-grid');
const derivedHpEl = document.getElementById('derived-hp');
const derivedFpEl = document.getElementById('derived-fp');
const derivedStaminaEl = document.getElementById('derived-stamina');
const derivedPvpEl = document.getElementById('derived-pvp');
const derivedRuneCostEl = document.getElementById('derived-rune-cost');
const plannerNotesInput = document.getElementById('planner-notes-input');

// Modals DOM elements
const modalMastery = document.getElementById('modal-mastery');
const modalBackup = document.getElementById('modal-backup');
const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

// Backup & Restore DOM elements
const btnExportJson = document.getElementById('btn-export-json');
const btnCopyBackupCode = document.getElementById('btn-copy-backup-code');
const btnTriggerImportFile = document.getElementById('btn-trigger-import-file');
const backupFileInput = document.getElementById('backup-file-input');
const backupPasteArea = document.getElementById('backup-paste-area');
const btnImportPastedCode = document.getElementById('btn-import-pasted-code');

// Walkthrough Toolbar buttons
const tbJumpToggle = document.getElementById('tb-jump-toggle');
const tbExpandAll = document.getElementById('tb-expand-all');
const tbCollapseAll = document.getElementById('tb-collapse-all');
const tbFilterCompleted = document.getElementById('tb-filter-completed');

// Canvas for Celebrations
const celebrationCanvas = document.getElementById('celebration-canvas');
const celebrationCtx = celebrationCanvas ? celebrationCanvas.getContext('2d') : null;

// Application State
let currentMode = 'platinum'; // 'platinum' | 'walkthrough'
let currentPlatinumGame = 'ds1';
let currentWalkthroughGame = 'ds1';
let currentGameData = null;
let currentWalkthroughData = null;
let hideCompleted = false;
let activeFilterTag = 'all';
let searchQuery = '';
let soundEnabled = localStorage.getItem('gitgud_sound_enabled') !== 'false';
let activeAccentTheme = localStorage.getItem('gitgud_accent_theme') || 'gold';
let celebrationParticles = [];
let celebrationAnimId = null;

// ========================================================
// 1. WEB AUDIO API SYNTHESIZER & HAPTICS ENGINE
// ========================================================
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playCheckChime(isChecking = true) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const baseFreq = isChecking ? 587.33 : 440.00; // D5 on check, A4 on uncheck
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        if (isChecking) {
            osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.15); // Slide to A5
        }

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
    } catch (e) {}
}

function playCelebrationFanfare() {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const notes = [
            { f: 523.25, t: 0.0, d: 0.3 },  // C5
            { f: 659.25, t: 0.15, d: 0.3 }, // E5
            { f: 783.99, t: 0.3, d: 0.3 },  // G5
            { f: 1046.50, t: 0.45, d: 0.8 } // C6 (Grand bell chord)
        ];

        notes.forEach(n => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(n.f, now + n.t);

            gain.gain.setValueAtTime(0.18, now + n.t);
            gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + n.t);
            osc.stop(now + n.t + n.d);
        });
    } catch (e) {}
}

function triggerHaptic(type = 'light') {
    try {
        if ('vibrate' in navigator) {
            if (type === 'victory') {
                navigator.vibrate([30, 60, 30, 60, 50]);
            } else {
                navigator.vibrate(15);
            }
        }
    } catch (e) {}
}

// Sound toggle button setup
function updateSoundUI() {
    if (soundIcon) soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    if (btnSoundToggle) btnSoundToggle.title = soundEnabled ? 'Sound Effects Enabled (Click to Mute)' : 'Sound Effects Muted (Click to Enable)';
}
if (btnSoundToggle) {
    btnSoundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem('gitgud_sound_enabled', soundEnabled);
        updateSoundUI();
        if (soundEnabled) playCheckChime(true);
    });
}
updateSoundUI();

// ========================================================
// 2. CELEBRATION PARTICLES ENGINE
// ========================================================
function resizeCelebrationCanvas() {
    if (!celebrationCanvas) return;
    celebrationCanvas.width = window.innerWidth;
    celebrationCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCelebrationCanvas);
resizeCelebrationCanvas();

function triggerCelebration() {
    playCelebrationFanfare();
    triggerHaptic('victory');

    if (!celebrationCtx) return;
    resizeCelebrationCanvas();

    celebrationParticles = [];
    const colors = ['#c4a473', '#e0c896', '#ffd700', '#ffffff', '#ff9800', '#f5f5f5'];
    const count = 160;

    for (let i = 0; i < count; i++) {
        celebrationParticles.push({
            x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
            y: window.innerHeight * 0.45 + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 16,
            vy: (Math.random() - 0.8) * 18,
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.2,
            decay: Math.random() * 0.012 + 0.008
        });
    }

    if (celebrationAnimId) cancelAnimationFrame(celebrationAnimId);
    animateCelebration();
}

function animateCelebration() {
    if (!celebrationCtx) return;
    celebrationCtx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);

    for (let i = celebrationParticles.length - 1; i >= 0; i--) {
        const p = celebrationParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // Gravity
        p.vx *= 0.98; // Air resistance
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > window.innerHeight) {
            celebrationParticles.splice(i, 1);
            continue;
        }

        celebrationCtx.save();
        celebrationCtx.globalAlpha = p.alpha;
        celebrationCtx.translate(p.x, p.y);
        celebrationCtx.rotate(p.rotation);
        celebrationCtx.fillStyle = p.color;
        celebrationCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        celebrationCtx.restore();
    }

    if (celebrationParticles.length > 0) {
        celebrationAnimId = requestAnimationFrame(animateCelebration);
    } else {
        celebrationCtx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
    }
}

// ========================================================
// 3. ACCENT THEME COLOR ENGINE
// ========================================================
function applyAccentTheme(theme) {
    activeAccentTheme = theme;
    document.body.classList.remove(
        'theme-accent-gold',
        'theme-accent-crimson',
        'theme-accent-cyan',
        'theme-accent-vermilion',
        'theme-accent-purple'
    );
    document.body.classList.add(`theme-accent-${theme}`);
    if (accentThemeSelect) accentThemeSelect.value = theme;
    localStorage.setItem('gitgud_accent_theme', theme);
}

if (accentThemeSelect) {
    accentThemeSelect.value = activeAccentTheme;
    accentThemeSelect.addEventListener('change', (e) => {
        applyAccentTheme(e.target.value);
    });
}
applyAccentTheme(activeAccentTheme);

// ========================================================
// 4. MULTI-PROFILE STORAGE SYSTEM
// ========================================================
const PROFILE_STORAGE_KEY = 'gitgud_profiles';
const ACTIVE_PROFILE_KEY = 'gitgud_active_profile';

function getProfiles() {
    try {
        const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {}
    return ['Default'];
}

function saveProfiles(profiles) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
}

function getActiveProfile() {
    const active = localStorage.getItem(ACTIVE_PROFILE_KEY) || 'Default';
    const profiles = getProfiles();
    if (!profiles.includes(active)) {
        return profiles[0] || 'Default';
    }
    return active;
}

function setActiveProfile(name) {
    localStorage.setItem(ACTIVE_PROFILE_KEY, name);
    renderProfileSelect();
    loadJournalData();
    refreshCurrentView();
    initTracker();
}

function getProfileItemKey(key) {
    const profile = getActiveProfile();
    return `profile_${profile}__${key}`;
}

function getSavedState(key) {
    const profile = getActiveProfile();
    const profileKey = `profile_${profile}__${key}`;
    const val = localStorage.getItem(profileKey);
    if (val !== null) return val === 'true';
    
    // Backwards compatibility for legacy Default keys
    if (profile === 'Default') {
        const legacyVal = localStorage.getItem(key);
        if (legacyVal !== null) {
            localStorage.setItem(profileKey, legacyVal);
            return legacyVal === 'true';
        }
    }
    return false;
}

function setSavedState(key, isChecked) {
    const profileKey = getProfileItemKey(key);
    localStorage.setItem(profileKey, isChecked);
}

function renderProfileSelect() {
    if (!profileSelect) return;
    const profiles = getProfiles();
    const active = getActiveProfile();
    profileSelect.innerHTML = '';
    
    profiles.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p === 'Default' ? 'Default Profile' : p;
        if (p === active) opt.selected = true;
        profileSelect.appendChild(opt);
    });
}

if (profileSelect) {
    profileSelect.addEventListener('change', (e) => {
        setActiveProfile(e.target.value);
    });
}

if (btnAddProfile) {
    btnAddProfile.addEventListener('click', () => {
        const name = window.prompt('Enter new profile name (e.g. NG+, Mage Run, SL1 Run):');
        if (!name) return;
        const cleanName = name.trim();
        if (!cleanName) return;
        
        const profiles = getProfiles();
        if (profiles.map(p => p.toLowerCase()).includes(cleanName.toLowerCase())) {
            window.alert(`Profile "${cleanName}" already exists!`);
            return;
        }
        
        profiles.push(cleanName);
        saveProfiles(profiles);
        setActiveProfile(cleanName);
    });
}

if (btnDeleteProfile) {
    btnDeleteProfile.addEventListener('click', () => {
        const active = getActiveProfile();
        if (active === 'Default') {
            window.alert('The "Default" profile cannot be deleted.');
            return;
        }
        
        const confirmed = window.confirm(`Are you sure you want to delete profile "${active}" and all its saved progress?`);
        if (!confirmed) return;
        
        const prefix = `profile_${active}__`;
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
        
        let profiles = getProfiles().filter(p => p !== active);
        if (profiles.length === 0) profiles = ['Default'];
        saveProfiles(profiles);
        setActiveProfile(profiles[0]);
    });
}

function refreshCurrentView() {
    if (currentMode === 'platinum') {
        loadGameData(currentPlatinumGame);
    } else {
        loadWalkthroughData(currentWalkthroughGame);
    }
}

// ========================================================
// 5. ADVANCED CHARACTER BUILD PLANNER & CALCULATOR ENGINE
// ========================================================
const GAME_PLANNER_CONFIG = {
    eldenring: {
        title: "⚔️ ELDEN RING CHARACTER BUILD PLANNER",
        levelName: "Rune Level",
        currencyName: "Runes",
        stats: [
            { id: 'vig', label: 'Vigor', short: 'VIG', softCap: 40, hardCap: 60, desc: 'Increases Max HP' },
            { id: 'mnd', label: 'Mind', short: 'MND', softCap: 38, hardCap: 60, desc: 'Increases Max FP' },
            { id: 'end', label: 'Endurance', short: 'END', softCap: 40, hardCap: 50, desc: 'Stamina & Equip Load' },
            { id: 'str', label: 'Strength', short: 'STR', softCap: 40, hardCap: 80, desc: 'Heavy weapons damage' },
            { id: 'dex', label: 'Dexterity', short: 'DEX', softCap: 40, hardCap: 80, desc: 'Agile weapons damage & Casting speed' },
            { id: 'int', label: 'Intelligence', short: 'INT', softCap: 60, hardCap: 80, desc: 'Sorceries & Magic scaling' },
            { id: 'fai', label: 'Faith', short: 'FAI', softCap: 60, hardCap: 80, desc: 'Incantations & Holy scaling' },
            { id: 'arc', label: 'Arcane', short: 'ARC', softCap: 45, hardCap: 80, desc: 'Status build-up & Discovery' }
        ],
        classes: {
            "Vagabond": { lvl: 9, stats: { vig: 15, mnd: 10, end: 11, str: 14, dex: 13, int: 9, fai: 9, arc: 7 } },
            "Warrior": { lvl: 8, stats: { vig: 11, mnd: 12, end: 11, str: 10, dex: 16, int: 10, fai: 8, arc: 9 } },
            "Hero": { lvl: 7, stats: { vig: 14, mnd: 9, end: 12, str: 16, dex: 9, int: 7, fai: 8, arc: 11 } },
            "Bandit": { lvl: 5, stats: { vig: 10, mnd: 11, end: 10, str: 9, dex: 13, int: 9, fai: 8, arc: 14 } },
            "Astrologer": { lvl: 6, stats: { vig: 9, mnd: 15, end: 9, str: 8, dex: 12, int: 16, fai: 7, arc: 9 } },
            "Prophet": { lvl: 7, stats: { vig: 10, mnd: 14, end: 8, str: 11, dex: 10, int: 7, fai: 16, arc: 10 } },
            "Samurai": { lvl: 9, stats: { vig: 12, mnd: 11, end: 13, str: 12, dex: 15, int: 9, fai: 8, arc: 8 } },
            "Prisoner": { lvl: 9, stats: { vig: 11, mnd: 12, end: 11, str: 11, dex: 14, int: 14, fai: 6, arc: 9 } },
            "Confessor": { lvl: 10, stats: { vig: 10, mnd: 13, end: 10, str: 12, dex: 12, int: 9, fai: 14, arc: 9 } },
            "Wretch": { lvl: 1, stats: { vig: 10, mnd: 10, end: 10, str: 10, dex: 10, int: 10, fai: 10, arc: 10 } }
        }
    },
    ds1: {
        title: "⚔️ DARK SOULS 1 CHARACTER BUILD PLANNER",
        levelName: "Soul Level",
        currencyName: "Souls",
        stats: [
            { id: 'vit', label: 'Vitality', short: 'VIT', softCap: 30, hardCap: 50, desc: 'Increases Max HP' },
            { id: 'att', label: 'Attunement', short: 'ATT', softCap: 19, hardCap: 50, desc: 'Spell slots' },
            { id: 'end', label: 'Endurance', short: 'END', softCap: 40, hardCap: 40, desc: 'Max Stamina & Equip Load' },
            { id: 'str', label: 'Strength', short: 'STR', softCap: 40, hardCap: 40, desc: 'Strength scaling' },
            { id: 'dex', label: 'Dexterity', short: 'DEX', softCap: 40, hardCap: 45, desc: 'Dexterity scaling & Cast speed' },
            { id: 'res', label: 'Resistance', short: 'RES', softCap: 30, hardCap: 40, desc: 'Defense & Resistances' },
            { id: 'int', label: 'Intelligence', short: 'INT', softCap: 40, hardCap: 50, desc: 'Sorceries scaling' },
            { id: 'fai', label: 'Faith', short: 'FAI', softCap: 40, hardCap: 50, desc: 'Miracles scaling' }
        ],
        classes: {
            "Warrior": { lvl: 4, stats: { vit: 11, att: 8, end: 12, str: 13, dex: 13, res: 11, int: 9, fai: 9 } },
            "Knight": { lvl: 5, stats: { vit: 14, att: 10, end: 10, str: 11, dex: 11, res: 10, int: 9, fai: 11 } },
            "Wanderer": { lvl: 3, stats: { vit: 10, att: 11, end: 10, str: 10, dex: 14, res: 12, int: 11, fai: 8 } },
            "Thief": { lvl: 5, stats: { vit: 9, att: 11, end: 9, str: 9, dex: 15, res: 10, int: 12, fai: 11 } },
            "Bandit": { lvl: 4, stats: { vit: 12, att: 8, end: 14, str: 14, dex: 9, res: 11, int: 8, fai: 10 } },
            "Hunter": { lvl: 4, stats: { vit: 11, att: 9, end: 11, str: 12, dex: 14, res: 11, int: 9, fai: 9 } },
            "Sorcerer": { lvl: 3, stats: { vit: 8, att: 15, end: 8, str: 9, dex: 11, res: 8, int: 15, fai: 8 } },
            "Pyromancer": { lvl: 1, stats: { vit: 10, att: 12, end: 11, str: 12, dex: 9, res: 12, int: 10, fai: 8 } },
            "Cleric": { lvl: 2, stats: { vit: 11, att: 11, end: 9, str: 12, dex: 8, res: 11, int: 8, fai: 14 } },
            "Deprived": { lvl: 6, stats: { vit: 11, att: 11, end: 11, str: 11, dex: 11, res: 11, int: 11, fai: 11 } }
        }
    },
    ds2: {
        title: "⚔️ DARK SOULS 2 CHARACTER BUILD PLANNER",
        levelName: "Soul Level",
        currencyName: "Souls",
        stats: [
            { id: 'vig', label: 'Vigor', short: 'VIG', softCap: 20, hardCap: 50, desc: 'Increases Max HP' },
            { id: 'end', label: 'Endurance', short: 'END', softCap: 20, hardCap: 50, desc: 'Increases Max Stamina' },
            { id: 'vit', label: 'Vitality', short: 'VIT', softCap: 29, hardCap: 49, desc: 'Increases Equip Load' },
            { id: 'att', label: 'Attunement', short: 'ATT', softCap: 30, hardCap: 50, desc: 'Spell slots & Cast speed' },
            { id: 'str', label: 'Strength', short: 'STR', softCap: 40, hardCap: 50, desc: 'Strength scaling' },
            { id: 'dex', label: 'Dexterity', short: 'DEX', softCap: 40, hardCap: 50, desc: 'Dexterity scaling' },
            { id: 'adp', label: 'Adaptability', short: 'ADP', softCap: 32, hardCap: 38, desc: 'Agility & I-frames' },
            { id: 'int', label: 'Intelligence', short: 'INT', softCap: 40, hardCap: 50, desc: 'Sorceries & Magic' },
            { id: 'fai', label: 'Faith', short: 'FAI', softCap: 40, hardCap: 50, desc: 'Miracles & Lightning' }
        ],
        classes: {
            "Warrior": { lvl: 12, stats: { vig: 7, end: 6, vit: 6, att: 5, str: 15, dex: 11, adp: 5, int: 5, fai: 5 } },
            "Knight": { lvl: 13, stats: { vig: 12, end: 6, vit: 7, att: 4, str: 11, dex: 8, adp: 9, int: 3, fai: 6 } },
            "Swordsman": { lvl: 12, stats: { vig: 4, end: 8, vit: 4, att: 6, str: 9, dex: 16, adp: 6, int: 7, fai: 5 } },
            "Bandit": { lvl: 11, stats: { vig: 9, end: 7, vit: 11, att: 2, str: 9, dex: 14, adp: 3, int: 1, fai: 8 } },
            "Cleric": { lvl: 14, stats: { vig: 10, end: 3, vit: 8, att: 10, str: 11, dex: 5, adp: 4, int: 4, fai: 12 } },
            "Sorcerer": { lvl: 11, stats: { vig: 5, end: 6, vit: 5, att: 12, str: 3, dex: 7, adp: 8, int: 14, fai: 4 } },
            "Explorer": { lvl: 10, stats: { vig: 7, end: 6, vit: 9, att: 7, str: 6, dex: 6, adp: 12, int: 5, fai: 5 } },
            "Deprived": { lvl: 1, stats: { vig: 6, end: 6, vit: 6, att: 6, str: 6, dex: 6, adp: 6, int: 6, fai: 6 } }
        }
    },
    ds3: {
        title: "⚔️ DARK SOULS 3 CHARACTER BUILD PLANNER",
        levelName: "Soul Level",
        currencyName: "Souls",
        stats: [
            { id: 'vig', label: 'Vigor', short: 'VIG', softCap: 27, hardCap: 40, desc: 'Increases Max HP' },
            { id: 'att', label: 'Attunement', short: 'ATT', softCap: 30, hardCap: 35, desc: 'FP and Spell slots' },
            { id: 'end', label: 'Endurance', short: 'END', softCap: 40, hardCap: 40, desc: 'Increases Max Stamina' },
            { id: 'vit', label: 'Vitality', short: 'VIT', softCap: 40, hardCap: 50, desc: 'Equip Load & Physical Def' },
            { id: 'str', label: 'Strength', short: 'STR', softCap: 40, hardCap: 66, desc: 'Strength scaling' },
            { id: 'dex', label: 'Dexterity', short: 'DEX', softCap: 40, hardCap: 70, desc: 'Dexterity scaling & Cast speed' },
            { id: 'int', label: 'Intelligence', short: 'INT', softCap: 40, hardCap: 60, desc: 'Sorceries scaling' },
            { id: 'fai', label: 'Faith', short: 'FAI', softCap: 40, hardCap: 60, desc: 'Miracles scaling' },
            { id: 'lck', label: 'Luck', short: 'LCK', softCap: 40, hardCap: 50, desc: 'Bleed/Poison & Discovery' }
        ],
        classes: {
            "Knight": { lvl: 9, stats: { vig: 12, att: 10, end: 11, vit: 15, str: 13, dex: 12, int: 9, fai: 9, lck: 7 } },
            "Mercenary": { lvl: 8, stats: { vig: 11, att: 12, end: 11, vit: 10, str: 10, dex: 16, int: 10, fai: 8, lck: 9 } },
            "Warrior": { lvl: 7, stats: { vig: 14, att: 6, end: 12, vit: 11, str: 16, dex: 9, int: 8, fai: 9, lck: 11 } },
            "Herald": { lvl: 9, stats: { vig: 12, att: 10, end: 9, vit: 12, str: 12, dex: 11, int: 8, fai: 13, lck: 11 } },
            "Thief": { lvl: 5, stats: { vig: 10, att: 11, end: 10, vit: 9, str: 9, dex: 13, int: 10, fai: 8, lck: 14 } },
            "Assassin": { lvl: 10, stats: { vig: 10, att: 14, end: 11, vit: 10, str: 10, dex: 14, int: 11, fai: 9, lck: 10 } },
            "Sorcerer": { lvl: 6, stats: { vig: 9, att: 16, end: 9, vit: 7, str: 7, dex: 12, int: 16, fai: 7, lck: 12 } },
            "Pyromancer": { lvl: 8, stats: { vig: 11, att: 12, end: 10, vit: 8, str: 12, dex: 9, int: 14, fai: 14, lck: 7 } },
            "Cleric": { lvl: 7, stats: { vig: 10, att: 14, end: 9, vit: 7, str: 12, dex: 8, int: 7, fai: 16, lck: 13 } },
            "Deprived": { lvl: 1, stats: { vig: 10, att: 10, end: 10, vit: 10, str: 10, dex: 10, int: 10, fai: 10, lck: 10 } }
        }
    },
    bloodborne: {
        title: "⚔️ BLOODBORNE HUNTER BUILD PLANNER",
        levelName: "Blood Level",
        currencyName: "Blood Echoes",
        stats: [
            { id: 'vit', label: 'Vitality', short: 'VIT', softCap: 30, hardCap: 50, desc: 'Increases Max HP' },
            { id: 'end', label: 'Endurance', short: 'END', softCap: 40, hardCap: 40, desc: 'Stamina & Resistances' },
            { id: 'str', label: 'Strength', short: 'STR', softCap: 25, hardCap: 50, desc: 'Heavy weapons damage' },
            { id: 'skl', label: 'Skill', short: 'SKL', softCap: 25, hardCap: 50, desc: 'Visceral attack & agile weapons' },
            { id: 'blt', label: 'Bloodtinge', short: 'BLT', softCap: 25, hardCap: 50, desc: 'Firearms & blood weapons' },
            { id: 'arc', label: 'Arcane', short: 'ARC', softCap: 50, hardCap: 99, desc: 'Hunter tools & Elemental damage' }
        ],
        classes: {
            "Milquetoast": { lvl: 10, stats: { vit: 11, end: 10, str: 12, skl: 10, blt: 9, arc: 8 } },
            "Lone Survivor": { lvl: 10, stats: { vit: 14, end: 11, str: 11, skl: 10, blt: 7, arc: 7 } },
            "Troubled Childhood": { lvl: 10, stats: { vit: 9, end: 14, str: 9, skl: 13, blt: 6, arc: 9 } },
            "Violent Past": { lvl: 10, stats: { vit: 12, end: 11, str: 15, skl: 9, blt: 6, arc: 7 } },
            "Military Veteran": { lvl: 10, stats: { vit: 10, end: 10, str: 14, skl: 13, blt: 7, arc: 6 } },
            "Noble Scion": { lvl: 10, stats: { vit: 7, end: 8, str: 9, skl: 13, blt: 14, arc: 9 } },
            "Cruel Fate": { lvl: 10, stats: { vit: 10, end: 12, str: 10, skl: 9, blt: 5, arc: 14 } },
            "Professional": { lvl: 10, stats: { vit: 9, end: 12, str: 9, skl: 15, blt: 7, arc: 8 } },
            "Waste of Skin": { lvl: 4, stats: { vit: 10, end: 9, str: 10, skl: 9, blt: 7, arc: 6 } }
        }
    },
    demonssouls: {
        title: "⚔️ DEMON'S SOULS CHARACTER BUILD PLANNER",
        levelName: "Soul Level",
        currencyName: "Souls",
        stats: [
            { id: 'vit', label: 'Vitality', short: 'VIT', softCap: 30, hardCap: 50, desc: 'Increases Max HP & Item Burden' },
            { id: 'int', label: 'Intelligence', short: 'INT', softCap: 30, hardCap: 40, desc: 'Max MP & Magic Memory' },
            { id: 'end', label: 'Endurance', short: 'END', softCap: 40, hardCap: 40, desc: 'Max Stamina & Equip Burden' },
            { id: 'str', label: 'Strength', short: 'STR', softCap: 30, hardCap: 50, desc: 'Strength weapons scaling' },
            { id: 'dex', label: 'Dexterity', short: 'DEX', softCap: 30, hardCap: 50, desc: 'Dexterity weapons scaling' },
            { id: 'mag', label: 'Magic', short: 'MAG', softCap: 30, hardCap: 50, desc: 'Spell power scaling' },
            { id: 'fai', label: 'Faith', short: 'FAI', softCap: 30, hardCap: 50, desc: 'Miracles power & Miracle Memory' },
            { id: 'luk', label: 'Luck', short: 'LUK', softCap: 30, hardCap: 50, desc: 'Item drop rate & Plague resistance' }
        ],
        classes: {
            "Royalty": { lvl: 1, stats: { vit: 8, int: 12, end: 8, str: 9, dex: 12, mag: 13, fai: 12, luk: 7 } },
            "Knight": { lvl: 4, stats: { vit: 10, int: 11, end: 11, str: 14, dex: 10, mag: 10, fai: 11, luk: 7 } },
            "Priest": { lvl: 6, stats: { vit: 13, int: 11, end: 12, str: 13, dex: 8, mag: 8, fai: 13, luk: 8 } },
            "Thief": { lvl: 9, stats: { vit: 10, int: 13, end: 10, str: 9, dex: 15, mag: 10, fai: 8, luk: 14 } },
            "Magician": { lvl: 6, stats: { vit: 9, int: 15, end: 10, str: 9, dex: 11, mag: 15, fai: 6, luk: 11 } },
            "Temple Knight": { lvl: 4, stats: { vit: 11, int: 8, end: 13, str: 14, dex: 12, mag: 6, fai: 13, luk: 7 } },
            "Soldier": { lvl: 6, stats: { vit: 14, int: 9, end: 12, str: 12, dex: 11, mag: 8, fai: 10, luk: 10 } },
            "Wanderer": { lvl: 6, stats: { vit: 10, int: 10, end: 11, str: 11, dex: 15, mag: 9, fai: 8, luk: 12 } },
            "Barbarian": { lvl: 9, stats: { vit: 15, int: 7, end: 13, str: 15, dex: 9, mag: 11, fai: 8, luk: 11 } },
            "Hunter": { lvl: 6, stats: { vit: 12, int: 10, end: 13, str: 11, dex: 12, mag: 8, fai: 8, luk: 12 } }
        }
    },
    liesofp: {
        title: "⚔️ LIES OF P STALKER BUILD PLANNER",
        levelName: "Level",
        currencyName: "Ergo",
        stats: [
            { id: 'vit', label: 'Vitality', short: 'VIT', softCap: 30, hardCap: 50, desc: 'Increases Max HP & Guard Regain' },
            { id: 'vig', label: 'Vigor', short: 'VIG', softCap: 20, hardCap: 30, desc: 'Increases Max Stamina' },
            { id: 'cap', label: 'Capacity', short: 'CAP', softCap: 40, hardCap: 60, desc: 'Increases Weight Limit & Legion' },
            { id: 'mot', label: 'Motivity', short: 'MOT', softCap: 30, hardCap: 50, desc: 'Motivity (Strength) scaling' },
            { id: 'tec', label: 'Technique', short: 'TEC', softCap: 30, hardCap: 50, desc: 'Technique (Dexterity) scaling' },
            { id: 'adv', label: 'Advance', short: 'ADV', softCap: 30, hardCap: 50, desc: 'Elemental scaling & Legion' }
        ],
        classes: {
            "Path of the Cricket (Balance)": { lvl: 9, stats: { vit: 11, vig: 12, cap: 11, mot: 9, tec: 9, adv: 6 } },
            "Path of the Bastard (Dexterity)": { lvl: 10, stats: { vit: 10, vig: 12, cap: 10, mot: 7, tec: 11, adv: 9 } },
            "Path of the Sweeper (Strength)": { lvl: 11, stats: { vit: 11, vig: 11, cap: 11, mot: 11, tec: 5, adv: 6 } }
        }
    },
    sekiro: {
        title: "⚔️ SEKIRO SHINOBI PROGRESSION PLANNER",
        levelName: "Attack Power",
        currencyName: "Sen",
        stats: [
            { id: 'ap', label: 'Attack Power', short: 'AP', softCap: 14, hardCap: 99, desc: 'Vitality & Posture damage' },
            { id: 'vit', label: 'Vitality', short: 'VIT', softCap: 20, hardCap: 20, desc: 'Max Health (from Prayer Necklaces)' },
            { id: 'beads', label: 'Prayer Beads', short: 'BEADS', softCap: 40, hardCap: 40, desc: '4 Beads = 1 Necklace' },
            { id: 'gourd', label: 'Gourd Seeds', short: 'GOURD', softCap: 9, hardCap: 9, desc: 'Max 10 Uses' },
            { id: 'emblems', label: 'Spirit Emblems', short: 'EMBLEMS', softCap: 20, hardCap: 20, desc: 'Prosthetic ammo capacity' },
            { id: 'sen', label: 'Sen Coin', short: 'SEN', softCap: 9999, hardCap: 99999, desc: 'Currency & Sen Throw ammo' }
        ],
        classes: {
            "Shinobi Wolf": { lvl: 1, stats: { ap: 1, vit: 10, beads: 0, gourd: 1, emblems: 15, sen: 0 } }
        }
    },
    eldenringnightreign: {
        title: "⚔️ NIGHTREIGN CHARACTER BUILD PLANNER",
        levelName: "Night Level",
        currencyName: "Shadow Essences",
        stats: [
            { id: 'vig', label: 'Vigor', short: 'VIG', softCap: 40, hardCap: 60, desc: 'Increases Health' },
            { id: 'foc', label: 'Focus', short: 'FOC', softCap: 38, hardCap: 60, desc: 'Increases Focus Pool' },
            { id: 'sta', label: 'Stamina', short: 'STA', softCap: 40, hardCap: 50, desc: 'Increases Max Stamina' },
            { id: 'mgt', label: 'Might', short: 'MGT', softCap: 40, hardCap: 80, desc: 'Heavy weapons damage' },
            { id: 'agi', label: 'Agility', short: 'AGI', softCap: 40, hardCap: 80, desc: 'Agile weapons damage' },
            { id: 'sor', label: 'Sorcery', short: 'SOR', softCap: 60, hardCap: 80, desc: 'Night sorceries' },
            { id: 'inc', label: 'Incantation', short: 'INC', softCap: 60, hardCap: 80, desc: 'Night incantations' },
            { id: 'arc', label: 'Arcane', short: 'ARC', softCap: 45, hardCap: 80, desc: 'Void discovery' }
        ],
        classes: {
            "Nightblade": { lvl: 10, stats: { vig: 12, foc: 11, sta: 12, mgt: 14, agi: 13, sor: 9, inc: 9, arc: 9 } },
            "Void Mage": { lvl: 10, stats: { vig: 10, foc: 15, sta: 10, mgt: 8, agi: 10, sor: 16, inc: 8, arc: 12 } },
            "Dusk Knight": { lvl: 10, stats: { vig: 14, foc: 9, sta: 14, mgt: 15, agi: 10, sor: 8, inc: 13, arc: 6 } },
            "Outcast": { lvl: 1, stats: { vig: 10, foc: 10, sta: 10, mgt: 10, agi: 10, sor: 10, inc: 10, arc: 10 } }
        }
    }
};

let activeBuildSlot = 1;
let currentPlannerState = null;
let plannerDebounceTimer = null;

function getActiveGameId() {
    return currentMode === 'platinum' ? currentPlatinumGame : currentWalkthroughGame;
}

function getPlannerStorageKey(slot = activeBuildSlot) {
    const profile = getActiveProfile();
    const game = getActiveGameId();
    return `planner_v2_${profile}__${game}__slot${slot}`;
}

function calculateRuneCost(fromLvl, toLvl) {
    if (toLvl <= fromLvl) return 0;
    let total = 0;
    for (let l = fromLvl; l < toLvl; l++) {
        if (l < 1) continue;
        let c = Math.round(0.02 * Math.pow(l, 3) + 3.06 * Math.pow(l, 2) + 105.6 * l - 895);
        if (c < 100) c = Math.round(l * 100);
        total += c;
    }
    return total;
}

function loadPlannerData(slot = activeBuildSlot) {
    activeBuildSlot = slot;
    const game = getActiveGameId();
    const config = GAME_PLANNER_CONFIG[game] || GAME_PLANNER_CONFIG.eldenring;

    // Update active slot button
    buildSlotBtns.forEach(btn => {
        const btnSlot = parseInt(btn.getAttribute('data-slot'));
        btn.classList.toggle('active', btnSlot === activeBuildSlot);
    });

    if (plannerModalTitle) {
        plannerModalTitle.textContent = config.title;
    }

    const key = getPlannerStorageKey(slot);
    let saved = null;
    try {
        const raw = localStorage.getItem(key);
        if (raw) saved = JSON.parse(raw);
    } catch (e) {}

    // Populate Class Select
    if (classSelect) {
        classSelect.innerHTML = '';
        Object.keys(config.classes).forEach(cName => {
            const opt = document.createElement('option');
            opt.value = cName;
            opt.textContent = `${cName} (Base SL ${config.classes[cName].lvl})`;
            classSelect.appendChild(opt);
        });
    }

    const defaultClass = Object.keys(config.classes)[0];
    const chosenClass = (saved && config.classes[saved.className]) ? saved.className : defaultClass;
    if (classSelect) classSelect.value = chosenClass;

    const baseClassData = config.classes[chosenClass];
    const initialStats = {};
    config.stats.forEach(st => {
        const baseVal = baseClassData.stats[st.id] !== undefined ? baseClassData.stats[st.id] : 10;
        const savedVal = saved && saved.stats && saved.stats[st.id] !== undefined ? parseInt(saved.stats[st.id]) : baseVal;
        initialStats[st.id] = Math.max(baseVal, isNaN(savedVal) ? baseVal : savedVal);
    });

    currentPlannerState = {
        className: chosenClass,
        targetLevel: saved && saved.targetLevel ? parseInt(saved.targetLevel) : 125,
        buildName: saved && saved.buildName ? saved.buildName : '',
        notes: saved && saved.notes ? saved.notes : '',
        stats: initialStats
    };

    if (buildNameInput) buildNameInput.value = currentPlannerState.buildName;
    if (targetSlInput) targetSlInput.value = currentPlannerState.targetLevel;
    if (plannerNotesInput) plannerNotesInput.value = currentPlannerState.notes;

    renderPlannerStatsGrid();
    calculatePlannerStats();
}

function renderPlannerStatsGrid() {
    const game = getActiveGameId();
    const config = GAME_PLANNER_CONFIG[game] || GAME_PLANNER_CONFIG.eldenring;
    const baseClassData = config.classes[currentPlannerState.className];

    if (!plannerStatsGrid) return;
    plannerStatsGrid.innerHTML = '';

    config.stats.forEach(st => {
        const baseFloor = baseClassData.stats[st.id] !== undefined ? baseClassData.stats[st.id] : 10;
        const currentVal = currentPlannerState.stats[st.id] !== undefined ? currentPlannerState.stats[st.id] : baseFloor;
        const isSoftCapped = currentVal >= st.softCap;

        const card = document.createElement('div');
        card.className = `planner-stat-card ${isSoftCapped ? 'soft-capped' : ''}`;
        card.id = `stat-card-${st.id}`;
        card.title = st.desc;

        card.innerHTML = `
            <div class="stat-card-header">
                <span class="stat-card-label">${st.label} (${st.short})</span>
                <span class="soft-cap-badge ${isSoftCapped ? 'active' : ''}" id="soft-badge-${st.id}">⚡ ${st.softCap}</span>
            </div>
            <div class="stat-btn-group">
                <button type="button" class="stat-adj-btn btn-dec" data-stat="${st.id}">−</button>
                <input type="number" class="stat-input-field" id="stat-input-${st.id}" data-stat="${st.id}" min="${baseFloor}" max="99" value="${currentVal}">
                <button type="button" class="stat-adj-btn btn-inc" data-stat="${st.id}">+</button>
            </div>
            <span class="stat-floor-text">Base: ${baseFloor} | Cap: ${st.hardCap}</span>
        `;

        plannerStatsGrid.appendChild(card);
    });

    // Event Listeners for Buttons & Inputs
    plannerStatsGrid.querySelectorAll('.btn-dec').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const statId = e.currentTarget.getAttribute('data-stat');
            const baseFloor = baseClassData.stats[statId] !== undefined ? baseClassData.stats[statId] : 10;
            const current = currentPlannerState.stats[statId] || baseFloor;
            if (current > baseFloor) {
                currentPlannerState.stats[statId] = current - 1;
                updateSingleStatInput(statId);
                calculatePlannerStats();
                triggerPlannerAutoSave();
            }
        });
    });

    plannerStatsGrid.querySelectorAll('.btn-inc').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const statId = e.currentTarget.getAttribute('data-stat');
            const current = currentPlannerState.stats[statId] || 10;
            if (current < 99) {
                currentPlannerState.stats[statId] = current + 1;
                updateSingleStatInput(statId);
                calculatePlannerStats();
                triggerPlannerAutoSave();
            }
        });
    });

    plannerStatsGrid.querySelectorAll('.stat-input-field').forEach(input => {
        input.addEventListener('change', (e) => {
            const statId = e.currentTarget.getAttribute('data-stat');
            const baseFloor = baseClassData.stats[statId] !== undefined ? baseClassData.stats[statId] : 10;
            let val = parseInt(e.currentTarget.value);
            if (isNaN(val) || val < baseFloor) val = baseFloor;
            if (val > 99) val = 99;
            currentPlannerState.stats[statId] = val;
            e.currentTarget.value = val;
            calculatePlannerStats();
            triggerPlannerAutoSave();
        });
    });
}

function updateSingleStatInput(statId) {
    const input = document.getElementById(`stat-input-${statId}`);
    if (input) input.value = currentPlannerState.stats[statId];
}

function calculatePlannerStats() {
    if (!currentPlannerState) return;
    const game = getActiveGameId();
    const config = GAME_PLANNER_CONFIG[game] || GAME_PLANNER_CONFIG.eldenring;
    const baseClassData = config.classes[currentPlannerState.className];
    if (!baseClassData) return;

    // 1. Calculate Current Level based on invested points above base
    let investedPoints = 0;
    config.stats.forEach(st => {
        const baseFloor = baseClassData.stats[st.id] !== undefined ? baseClassData.stats[st.id] : 10;
        const currentVal = currentPlannerState.stats[st.id] !== undefined ? currentPlannerState.stats[st.id] : baseFloor;
        if (currentVal > baseFloor) {
            investedPoints += (currentVal - baseFloor);
        }

        // Update soft cap badge
        const badge = document.getElementById(`soft-badge-${st.id}`);
        const card = document.getElementById(`stat-card-${st.id}`);
        const isCapped = currentVal >= st.softCap;
        if (badge) badge.classList.toggle('active', isCapped);
        if (card) card.classList.toggle('soft-capped', isCapped);
    });

    const calculatedLevel = baseClassData.lvl + investedPoints;
    const targetLevel = currentPlannerState.targetLevel || 125;
    const pointsRemaining = targetLevel - calculatedLevel;

    if (calcCurrentLevelEl) calcCurrentLevelEl.textContent = calculatedLevel;

    if (calcPointsRemainingEl && pointsRemainingPill) {
        if (pointsRemaining > 0) {
            calcPointsRemainingEl.textContent = `+${pointsRemaining}`;
            pointsRemainingPill.className = 'planner-stat-pill status-available';
        } else if (pointsRemaining === 0) {
            calcPointsRemainingEl.textContent = `0 (Target Hit)`;
            pointsRemainingPill.className = 'planner-stat-pill status-exact';
        } else {
            calcPointsRemainingEl.textContent = `${pointsRemaining} (Over Cap!)`;
            pointsRemainingPill.className = 'planner-stat-pill status-over';
        }
    }

    // 2. Secondary Combat Stats Estimation
    const vig = currentPlannerState.stats.vig || currentPlannerState.stats.vit || 10;
    const mnd = currentPlannerState.stats.mnd || currentPlannerState.stats.att || currentPlannerState.stats.int || 10;
    const end = currentPlannerState.stats.end || currentPlannerState.stats.sta || 10;

    // HP curve estimation
    let estHp = 400 + vig * 25;
    if (vig > 40) estHp = 1450 + (vig - 40) * 26;
    if (vig > 60) estHp = 1900 + (vig - 60) * 6;

    // FP curve estimation
    let estFp = 50 + mnd * 5;
    if (mnd > 38) estFp = 220 + (mnd - 38) * 3;

    // Stamina curve estimation
    let estStam = 80 + end * 2;
    if (end > 40) estStam = 160 + (end - 40) * 0.5;

    if (derivedHpEl) derivedHpEl.textContent = `${Math.round(estHp).toLocaleString()} HP`;
    if (derivedFpEl) derivedFpEl.textContent = `${Math.round(estFp).toLocaleString()} FP`;
    if (derivedStaminaEl) derivedStaminaEl.textContent = `${Math.round(estStam).toLocaleString()} Stamina`;

    // 3. PvP Summon Bracket Estimation
    const minInvade = Math.max(1, Math.floor(calculatedLevel * 0.9));
    const maxInvade = Math.floor(calculatedLevel * 1.1 + 20);
    if (derivedPvpEl) derivedPvpEl.textContent = `SL ${minInvade} — ${maxInvade}`;

    // 4. Soul / Rune Level-up Cost to reach target
    const runeCost = calculateRuneCost(calculatedLevel, targetLevel);
    if (derivedRuneCostEl) {
        if (calculatedLevel >= targetLevel) {
            derivedRuneCostEl.textContent = `Target Reached`;
        } else {
            derivedRuneCostEl.textContent = `${runeCost.toLocaleString()} ${config.currencyName}`;
        }
    }
}

function savePlannerData() {
    if (!currentPlannerState) return;
    const key = getPlannerStorageKey(activeBuildSlot);
    localStorage.setItem(key, JSON.stringify(currentPlannerState));

    if (plannerSaveStatus) {
        plannerSaveStatus.textContent = 'Saved';
        plannerSaveStatus.style.color = 'var(--gold)';
    }
}

function triggerPlannerAutoSave() {
    if (plannerSaveStatus) {
        plannerSaveStatus.textContent = 'Saving...';
        plannerSaveStatus.style.color = '#e0c896';
    }
    clearTimeout(plannerDebounceTimer);
    plannerDebounceTimer = setTimeout(savePlannerData, 400);
}

// Build Slot Buttons Listener
buildSlotBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const slot = parseInt(e.currentTarget.getAttribute('data-slot'));
        savePlannerData();
        loadPlannerData(slot);
    });
});

// Class Select Change Listener
if (classSelect) {
    classSelect.addEventListener('change', (e) => {
        const chosenClass = e.target.value;
        const game = getActiveGameId();
        const config = GAME_PLANNER_CONFIG[game] || GAME_PLANNER_CONFIG.eldenring;
        const baseClassData = config.classes[chosenClass];

        currentPlannerState.className = chosenClass;
        config.stats.forEach(st => {
            const baseFloor = baseClassData.stats[st.id] !== undefined ? baseClassData.stats[st.id] : 10;
            currentPlannerState.stats[st.id] = Math.max(baseFloor, currentPlannerState.stats[st.id] || baseFloor);
        });

        renderPlannerStatsGrid();
        calculatePlannerStats();
        triggerPlannerAutoSave();
    });
}

// Target Level Input Listener
if (targetSlInput) {
    targetSlInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1;
        currentPlannerState.targetLevel = val;
        calculatePlannerStats();
        triggerPlannerAutoSave();
    });
}

// Build Name Input Listener
if (buildNameInput) {
    buildNameInput.addEventListener('input', (e) => {
        currentPlannerState.buildName = e.target.value;
        triggerPlannerAutoSave();
    });
}

// Planner Notes Textarea Listener
if (plannerNotesInput) {
    plannerNotesInput.addEventListener('input', (e) => {
        currentPlannerState.notes = e.target.value;
        triggerPlannerAutoSave();
    });
}

// Open Dedicated Planner Modal Handler
if (btnToggleJournal) {
    btnToggleJournal.addEventListener('click', () => {
        openModal(modalJournal);
        loadPlannerData(activeBuildSlot);
    });
}

if (btnCloseJournal) {
    btnCloseJournal.addEventListener('click', () => {
        if (journalCard) journalCard.style.display = 'none';
        if (btnToggleJournal) btnToggleJournal.classList.remove('active');
    });
}

// ========================================================
// 6. INSTANT SEARCH & TAG FILTER ENGINE
// ========================================================
function applySearchAndFilter() {
    const items = trackerContainer.querySelectorAll('.tracker-item');
    if (items.length === 0) return;

    const query = searchQuery.trim().toLowerCase();
    let matchCount = 0;
    let totalItems = items.length;

    items.forEach(itemDiv => {
        const label = itemDiv.querySelector('label');
        const locSpan = itemDiv.querySelector('.location');
        const checkbox = itemDiv.querySelector('input[type="checkbox"]');
        if (!label) return;

        const originalText = label.getAttribute('data-original-text') || label.innerHTML;
        if (!label.hasAttribute('data-original-text')) {
            label.setAttribute('data-original-text', originalText);
        }

        const plainText = label.textContent.toLowerCase();
        const locText = locSpan ? locSpan.textContent.toLowerCase() : '';
        const fullContent = plainText + ' ' + locText;

        // 1. Test Search Query
        let queryMatch = true;
        if (query) {
            queryMatch = fullContent.includes(query);
        }

        // 2. Test Tag Filter
        let tagMatch = true;
        if (activeFilterTag !== 'all') {
            const isCompleted = checkbox ? checkbox.checked : false;

            if (activeFilterTag === 'incomplete') {
                tagMatch = !isCompleted;
            } else if (activeFilterTag === 'missable') {
                tagMatch = fullContent.includes('missable') || fullContent.includes('warning') || fullContent.includes('fail') || fullContent.includes('lockout');
            } else if (activeFilterTag === 'boss') {
                tagMatch = fullContent.includes('boss') || fullContent.includes('slain') || fullContent.includes('defeat') || fullContent.includes('remembrance') || fullContent.includes('cinder') || fullContent.includes('radahn') || fullContent.includes('malenia');
            } else if (activeFilterTag === 'spell') {
                tagMatch = fullContent.includes('sorcer') || fullContent.includes('miracle') || fullContent.includes('pyroman') || fullContent.includes('incantation') || fullContent.includes('magic') || fullContent.includes('hex') || fullContent.includes('spell');
            } else if (activeFilterTag === 'item') {
                tagMatch = fullContent.includes('weapon') || fullContent.includes('ring') || fullContent.includes('talisman') || fullContent.includes('armor') || fullContent.includes('shield') || fullContent.includes('sword') || fullContent.includes('staff') || fullContent.includes('key');
            } else if (activeFilterTag === 'quest') {
                tagMatch = fullContent.includes('quest') || fullContent.includes('npc') || fullContent.includes('talk') || fullContent.includes('exhaust') || fullContent.includes('dialogue') || fullContent.includes('summon') || fullContent.includes('solaire') || fullContent.includes('ranni');
            }
        }

        const isVisible = queryMatch && tagMatch;

        if (isVisible) {
            itemDiv.style.display = '';
            matchCount++;

            // Highlight query in text
            if (query && queryMatch) {
                const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
                label.innerHTML = originalText.replace(regex, '<mark class="search-highlight">$1</mark>');
            } else {
                label.innerHTML = originalText;
            }
        } else {
            itemDiv.style.display = 'none';
            label.innerHTML = originalText;
        }
    });

    // Automatically manage category / chapter wrappers
    trackerContainer.querySelectorAll('.category-block').forEach(block => {
        const visibleChild = block.querySelectorAll('.tracker-item:not([style*="display: none"])');
        const wrapper = block.querySelector('.category-content-wrapper');
        const icon = block.querySelector('.toggle-icon');

        if (visibleChild.length > 0) {
            block.style.display = '';
            if (query || activeFilterTag !== 'all') {
                if (wrapper) wrapper.classList.remove('collapsed');
                if (icon) icon.textContent = '▼';
            }
        } else {
            if (query || activeFilterTag !== 'all') {
                block.style.display = 'none';
            } else {
                block.style.display = '';
            }
        }
    });

    // Update Status Bar
    if (searchStatusBar && searchResultCount) {
        if (query || activeFilterTag !== 'all') {
            searchStatusBar.style.display = 'block';
            searchResultCount.textContent = `Showing ${matchCount} of ${totalItems} items matching filters`;
        } else {
            searchStatusBar.style.display = 'none';
        }
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (searchClearBtn) searchClearBtn.style.display = searchQuery ? 'inline-block' : 'none';
        applySearchAndFilter();
    });
}

if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
        if (globalSearchInput) globalSearchInput.value = '';
        searchQuery = '';
        searchClearBtn.style.display = 'none';
        applySearchAndFilter();
    });
}

filterChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
        filterChips.forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeFilterTag = e.currentTarget.getAttribute('data-filter') || 'all';
        applySearchAndFilter();
    });
});

// ========================================================
// 7. BACKUP, EXPORT & IMPORT SAVE DATA ENGINE
// ========================================================
function createBackupObject() {
    const backup = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        profiles: getProfiles(),
        activeProfile: getActiveProfile(),
        data: {}
    };

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('profile_') || key.startsWith('journal_') || key.startsWith('planner_') || key.includes('_'))) {
            backup.data[key] = localStorage.getItem(key);
        }
    }
    return backup;
}

function exportBackupToJsonFile() {
    const backup = createBackupObject();
    const jsonStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().slice(0, 10);

    const a = document.createElement('a');
    a.href = url;
    a.download = `gitgud_tracker_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyBackupCodeToClipboard() {
    const backup = createBackupObject();
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(backup))));
    navigator.clipboard.writeText(code).then(() => {
        window.alert('Backup Code copied to clipboard! You can paste it on your phone or other browser.');
    }).catch(() => {
        window.alert('Failed to copy to clipboard automatically. You can export as a JSON file.');
    });
}

function restoreFromBackupObject(backup) {
    if (!backup || typeof backup !== 'object' || !backup.data) {
        throw new Error('Invalid backup file structure.');
    }

    if (Array.isArray(backup.profiles)) {
        saveProfiles(backup.profiles);
    }
    if (backup.activeProfile) {
        localStorage.setItem(ACTIVE_PROFILE_KEY, backup.activeProfile);
    }

    Object.keys(backup.data).forEach(key => {
        localStorage.setItem(key, backup.data[key]);
    });

    renderProfileSelect();
    loadPlannerData();
    refreshCurrentView();
    initTracker();
    closeAllModals();
    window.alert('✨ Backup restored successfully! All profiles and milestones updated.');
}

if (btnExportJson) btnExportJson.addEventListener('click', exportBackupToJsonFile);
if (btnCopyBackupCode) btnCopyBackupCode.addEventListener('click', copyBackupCodeToClipboard);

if (btnTriggerImportFile && backupFileInput) {
    btnTriggerImportFile.addEventListener('click', () => backupFileInput.click());
    backupFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                restoreFromBackupObject(parsed);
            } catch (err) {
                window.alert('Failed to parse backup file: ' + err.message);
            }
        };
        reader.readAsText(file);
    });
}

if (btnImportPastedCode && backupPasteArea) {
    btnImportPastedCode.addEventListener('click', () => {
        const code = backupPasteArea.value.trim();
        if (!code) return;
        try {
            let jsonStr = code;
            if (!code.startsWith('{')) {
                jsonStr = decodeURIComponent(escape(atob(code)));
            }
            const parsed = JSON.parse(jsonStr);
            restoreFromBackupObject(parsed);
        } catch (err) {
            window.alert('Invalid backup code. Please check the pasted text.');
        }
    });
}

// ========================================================
// 8. GLOBAL MASTERY DASHBOARD ENGINE
// ========================================================
const GAME_METADATA = [
    { id: 'ds1', name: 'Dark Souls 1', icon: 'img/ds1.png', trophies: 41 },
    { id: 'ds2', name: 'Dark Souls 2', icon: 'img/ds2.png', trophies: 38 },
    { id: 'ds3', name: 'Dark Souls 3', icon: 'img/ds3.png', trophies: 43 },
    { id: 'sekiro', name: 'Sekiro', icon: 'img/sekiro.png', trophies: 34 },
    { id: 'bloodborne', name: 'Bloodborne', icon: 'img/bloodborne.png', trophies: 34 },
    { id: 'eldenring', name: 'Elden Ring', icon: 'img/eldenring.png', trophies: 42 },
    { id: 'eldenringnightreign', name: 'ER Nightreign', icon: 'img/eldenring_nightreign.png', trophies: 36 },
    { id: 'demonssouls', name: "Demon's Souls", icon: 'img/demonssouls.png', trophies: 37 },
    { id: 'liesofp', name: 'Lies of P', icon: 'img/liesofp.png', trophies: 43 }
];

async function loadMasteryDashboard() {
    const trophyGrid = document.getElementById('mastery-trophy-grid');
    const globalPctEl = document.getElementById('mastery-global-pct');
    const globalCountEl = document.getElementById('mastery-global-count');
    const platCountEl = document.getElementById('mastery-plat-count');

    if (!trophyGrid) return;
    trophyGrid.innerHTML = '<div style="color: var(--gold); padding: 20px;">Gathering Soulsborne archives...</div>';

    let totalUniverseTrophies = 0;
    let totalEarnedTrophies = 0;
    let platinumEarnedCount = 0;
    const gameStats = [];

    for (const g of GAME_METADATA) {
        totalUniverseTrophies += g.trophies;
        try {
            const resp = await fetch(`data/${g.id}.json`);
            if (!resp.ok) continue;
            const data = await resp.json();
            let gTotal = 0;
            let gCompleted = 0;

            Object.keys(data).forEach(key => {
                if (key === 'game') return;
                data[key].forEach(item => {
                    if (item.steps) {
                        item.steps.forEach(step => {
                            gTotal++;
                            if (getSavedState(`${g.id}_${step.id}`)) gCompleted++;
                        });
                    } else {
                        gTotal++;
                        if (getSavedState(`${g.id}_${item.id}`)) gCompleted++;
                    }
                });
            });

            const pct = gTotal === 0 ? 0 : Math.round((gCompleted / gTotal) * 100);
            let earnedTrophies = 0;
            if (pct === 100) {
                earnedTrophies = g.trophies;
                platinumEarnedCount++;
            } else if (pct > 0) {
                earnedTrophies = Math.min(g.trophies - 1, Math.max(1, Math.round((pct / 100) * (g.trophies - 1))));
            }

            totalEarnedTrophies += earnedTrophies;
            gameStats.push({ ...g, pct, earnedTrophies, totalTrophies: g.trophies });
        } catch (e) {
            gameStats.push({ ...g, pct: 0, earnedTrophies: 0, totalTrophies: g.trophies });
        }
    }

    const universalPct = totalUniverseTrophies === 0 ? 0 : Math.round((totalEarnedTrophies / totalUniverseTrophies) * 100);
    if (globalPctEl) globalPctEl.textContent = `${universalPct}%`;
    if (globalCountEl) globalCountEl.textContent = `${totalEarnedTrophies} / ${totalUniverseTrophies}`;
    if (platCountEl) platCountEl.textContent = `${platinumEarnedCount} / ${GAME_METADATA.length}`;

    trophyGrid.innerHTML = '';
    gameStats.forEach(g => {
        const card = document.createElement('div');
        card.className = `mastery-game-card ${g.pct === 100 ? 'completed' : ''}`;
        card.innerHTML = `
            <img src="${g.icon}" alt="${g.name}" class="mastery-game-icon">
            <div class="mastery-game-info">
                <span class="mastery-game-name">${g.name}</span>
                <span class="mastery-game-pct">${g.pct === 100 ? `🏆 PLATINUM (${g.totalTrophies}/${g.totalTrophies})` : `${g.pct}% (${g.earnedTrophies} / ${g.totalTrophies} Trophies)`}</span>
            </div>
        `;
        trophyGrid.appendChild(card);
    });
}

// Modal Toggle Handlers
function openModal(modal) {
    if (modal) modal.style.display = 'flex';
}

function closeAllModals() {
    if (modalMastery) modalMastery.style.display = 'none';
    if (modalBackup) modalBackup.style.display = 'none';
}

if (btnOpenMastery) {
    btnOpenMastery.addEventListener('click', () => {
        openModal(modalMastery);
        loadMasteryDashboard();
    });
}

if (btnOpenBackup) {
    btnOpenBackup.addEventListener('click', () => {
        openModal(modalBackup);
    });
}

modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
});

window.addEventListener('click', (e) => {
    if (e.target === modalMastery || e.target === modalBackup) {
        closeAllModals();
    }
});

// ========================================================
// 9. MODE SWITCHING (Platinum vs Walkthrough)
// ========================================================
function setMode(mode) {
    currentMode = mode;
    if (mode === 'platinum') {
        modePlatinumBtn.classList.add('active');
        modeWalkthroughBtn.classList.remove('active');
        listPlatinum.classList.remove('hidden-list');
        listWalkthrough.classList.add('hidden-list');
        listPlatinum.style.display = '';
        listWalkthrough.style.display = 'none';
        brandSubtitle.textContent = 'Platinum Tracker';
        guideBadge.style.display = 'none';
        walkthroughToolbar.style.display = 'none';
        quickJumpContainer.style.display = 'none';
        btnBackToTop.style.display = 'none';
        trackerContainer.classList.remove('hide-completed');

        loadGameData(currentPlatinumGame);
    } else {
        modePlatinumBtn.classList.remove('active');
        modeWalkthroughBtn.classList.add('active');
        listPlatinum.classList.add('hidden-list');
        listWalkthrough.classList.remove('hidden-list');
        listPlatinum.style.display = 'none';
        listWalkthrough.style.display = '';
        brandSubtitle.textContent = 'Playthrough Guide';
        guideBadge.style.display = 'inline-block';
        walkthroughToolbar.style.display = 'flex';
        quickJumpContainer.style.display = 'block';
        btnBackToTop.style.display = 'flex';
        if (hideCompleted) {
            trackerContainer.classList.add('hide-completed');
        }

        const availableWalkthroughs = ['ds1', 'ds2', 'ds3', 'sekiro', 'bloodborne', 'eldenring', 'demonssouls'];
        if (availableWalkthroughs.includes(currentPlatinumGame)) {
            currentWalkthroughGame = currentPlatinumGame;
        } else {
            currentWalkthroughGame = 'ds1';
        }
        loadWalkthroughData(currentWalkthroughGame);
    }
    loadJournalData();
}

modePlatinumBtn.addEventListener('click', () => setMode('platinum'));
modeWalkthroughBtn.addEventListener('click', () => setMode('walkthrough'));

// ========================================================
// 10. GAME SELECTION EVENT LISTENERS
// ========================================================
listPlatinum.querySelectorAll('.game-select').forEach(button => {
    button.addEventListener('click', (e) => {
        const gameId = e.currentTarget.getAttribute('data-game') || e.currentTarget.id.replace('btn-', '');
        currentPlatinumGame = gameId;
        loadGameData(gameId);
        loadJournalData();
    });
});

listWalkthrough.querySelectorAll('.game-select').forEach(button => {
    button.addEventListener('click', (e) => {
        const gameId = e.currentTarget.getAttribute('data-game');
        currentWalkthroughGame = gameId;
        loadWalkthroughData(gameId);
        loadJournalData();
    });
});

// ========================================================
// 11. PLATINUM TRACKER DATA & RENDER
// ========================================================
async function loadGameData(gameId) {
    document.body.className = document.body.className.replace(/theme-(?!accent-)\S+/g, '').trim();
    document.body.classList.add(`theme-${gameId}`);

    listPlatinum.querySelectorAll('.game-select').forEach(btn => {
        btn.style.borderLeft = '';
        btn.classList.remove('active-game');
    });
    const activeBtn = listPlatinum.querySelector(`[data-game="${gameId}"]`) || document.getElementById(`btn-${gameId}`);
    if (activeBtn) {
        activeBtn.style.borderLeft = '3px solid var(--gold)';
        activeBtn.classList.add('active-game');
        try {
            activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
        } catch (e) {}
    }

    try {
        const response = await fetch(`data/${gameId}.json`);
        if (!response.ok) throw new Error('Data not found');
        
        currentGameData = await response.json();
        renderTracker(gameId);
        updateProgress(gameId);
        
        gameTitle.textContent = currentGameData.game;
        applySearchAndFilter();
    } catch (error) {
        trackerContainer.innerHTML = '<h2>Data not found. Please check data files.</h2>';
    }
}

function renderTracker(gameId) {
    trackerContainer.innerHTML = '';
    
    Object.keys(currentGameData).forEach(key => {
        if (key === 'game') return;
        
        const categoryBlock = document.createElement('div');
        categoryBlock.className = 'category-block';
        
        const title = document.createElement('h3');
        title.className = 'category-title collapsible';
        title.innerHTML = `${key.replace('category_', '').replace(/_/g, ' ').toUpperCase()} <span class="toggle-icon">▼</span>`;
        
        const catProgressContainer = document.createElement('div');
        catProgressContainer.className = 'category-progress-container';
        const catProgressBar = document.createElement('div');
        catProgressBar.className = 'category-progress-bar';
        catProgressBar.id = `progress-${key}`;
        catProgressContainer.appendChild(catProgressBar);
        
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'category-content-wrapper';
        
        const contentInner = document.createElement('div');
        contentInner.className = 'category-inner';
        
        title.addEventListener('click', () => {
            contentWrapper.classList.toggle('collapsed');
            const icon = title.querySelector('.toggle-icon');
            icon.textContent = contentWrapper.classList.contains('collapsed') ? '▶' : '▼';
        });
        
        categoryBlock.appendChild(title);
        categoryBlock.appendChild(catProgressContainer);
        
        currentGameData[key].forEach(item => {
            if (item.steps) {
                const questTitle = document.createElement('h4');
                questTitle.textContent = item.name;
                questTitle.style.color = 'var(--gold)';
                questTitle.style.marginTop = '15px';
                questTitle.style.marginBottom = '5px';
                contentInner.appendChild(questTitle);
                
                item.steps.forEach(step => {
                    contentInner.appendChild(createCheckboxItem(gameId, step));
                });
            } else {
                contentInner.appendChild(createCheckboxItem(gameId, item));
            }
        });
        
        contentWrapper.appendChild(contentInner);
        categoryBlock.appendChild(contentWrapper);
        trackerContainer.appendChild(categoryBlock);
    });
}

function createCheckboxItem(gameId, item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'tracker-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = item.id;
    
    const storageKey = `${gameId}_${item.id}`;
    checkbox.checked = getSavedState(storageKey);
    if (checkbox.checked) {
        itemDiv.classList.add('item-completed');
    }
    
    checkbox.addEventListener('change', (e) => {
        setSavedState(storageKey, e.target.checked);
        if (e.target.checked) {
            itemDiv.classList.add('item-completed');
            playCheckChime(true);
            triggerHaptic('light');
        } else {
            itemDiv.classList.remove('item-completed');
            playCheckChime(false);
        }
        updateProgress(gameId);
        if (activeFilterTag === 'incomplete') applySearchAndFilter();
    });
    
    const label = document.createElement('label');
    label.htmlFor = item.id;
    label.textContent = item.name;
    
    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(label);
    
    if (item.location) {
        const locationSpan = document.createElement('span');
        locationSpan.className = 'location';
        locationSpan.textContent = item.location;
        itemDiv.appendChild(locationSpan);
    }

    itemDiv.addEventListener('click', (e) => {
        if (e.target === checkbox || e.target.tagName.toLowerCase() === 'a') return;
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
    });
    
    return itemDiv;
}

function updateProgress(gameId) {
    let globalTotal = 0;
    let globalCompleted = 0;
    
    Object.keys(currentGameData).forEach(key => {
        if (key === 'game') return;
        
        let catTotal = 0;
        let catCompleted = 0;
        
        currentGameData[key].forEach(item => {
            if (item.steps) {
                item.steps.forEach(step => {
                    catTotal++;
                    globalTotal++;
                    if (getSavedState(`${gameId}_${step.id}`)) {
                        catCompleted++;
                        globalCompleted++;
                    }
                });
            } else {
                catTotal++;
                globalTotal++;
                if (getSavedState(`${gameId}_${item.id}`)) {
                    catCompleted++;
                    globalCompleted++;
                }
            }
        });
        
        const catPercentage = catTotal === 0 ? 0 : Math.round((catCompleted / catTotal) * 100);
        const catProgressBar = document.getElementById(`progress-${key}`);
        if (catProgressBar) {
            catProgressBar.style.width = `${catPercentage}%`;
            catProgressBar.textContent = `${catPercentage}%`;
            
            if (catPercentage === 100) {
                catProgressBar.classList.add('completed-glow');
            } else {
                catProgressBar.classList.remove('completed-glow');
            }
        }
    });
    
    const globalPercentage = globalTotal === 0 ? 0 : Math.round((globalCompleted / globalTotal) * 100);
    globalProgress.style.width = `${globalPercentage}%`;
    globalProgress.textContent = `${globalPercentage}% Platinum`;
    
    const gameButton = listPlatinum.querySelector(`[data-game="${gameId}"]`) || document.getElementById(`btn-${gameId}`);
    if (gameButton) {
        if (globalPercentage === 100) {
            if (!gameButton.classList.contains('game-completed')) {
                triggerCelebration();
            }
            gameButton.classList.add('game-completed');
        } else {
            gameButton.classList.remove('game-completed');
        }
    }
}

// ========================================================
// 12. PLAYTHROUGH WALKTHROUGH / CHEAT SHEET LOGIC
// ========================================================
async function loadWalkthroughData(gameId) {
    document.body.className = document.body.className.replace(/theme-(?!accent-)\S+/g, '').trim();
    document.body.classList.add(`theme-${gameId}`);

    listWalkthrough.querySelectorAll('.game-select').forEach(btn => {
        btn.style.borderLeft = '';
        btn.classList.remove('active-game');
    });
    const activeBtn = listWalkthrough.querySelector(`[data-game="${gameId}"]`);
    if (activeBtn) {
        activeBtn.style.borderLeft = '3px solid var(--gold)';
        activeBtn.classList.add('active-game');
        try {
            activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
        } catch (e) {}
    }

    try {
        const response = await fetch(`data/walkthroughs/${gameId}_walkthrough.json`);
        if (!response.ok) throw new Error('Walkthrough data not found');
        
        currentWalkthroughData = await response.json();
        renderWalkthrough(gameId);
        updateWalkthroughProgress(gameId);
        
        gameTitle.textContent = currentWalkthroughData.game;
        applySearchAndFilter();
    } catch (error) {
        trackerContainer.innerHTML = '<h2>Walkthrough data not found. Please check data files.</h2>';
    }
}

function renderWalkthrough(gameId) {
    // 1. Render Quick Chapter Jump Grid
    chapterJumpGrid.innerHTML = '';
    
    currentWalkthroughData.chapters.forEach((chapter, idx) => {
        const pill = document.createElement('button');
        pill.className = 'chapter-pill';
        pill.id = `pill-ch-${chapter.id}`;
        pill.innerHTML = `
            <span>${idx + 1}. ${chapter.title}</span>
            <span class="pill-count" id="pill-count-${chapter.id}">[ 0/${chapter.items.length} ]</span>
        `;
        
        pill.addEventListener('click', () => {
            const target = document.getElementById(`chapter-${chapter.id}`);
            if (target) {
                const wrapper = target.querySelector('.category-content-wrapper');
                if (wrapper && wrapper.classList.contains('collapsed')) {
                    wrapper.classList.remove('collapsed');
                    const icon = target.querySelector('.toggle-icon');
                    if (icon) icon.textContent = '▼';
                }
                
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                target.classList.remove('chapter-pulse');
                void target.offsetWidth;
                target.classList.add('chapter-pulse');
            }
        });
        
        chapterJumpGrid.appendChild(pill);
    });

    // 2. Render Chapter Blocks
    trackerContainer.innerHTML = '';
    
    currentWalkthroughData.chapters.forEach((chapter, idx) => {
        const chapterBlock = document.createElement('div');
        chapterBlock.className = 'category-block chapter-card';
        chapterBlock.id = `chapter-${chapter.id}`;
        
        const title = document.createElement('h3');
        title.className = 'category-title collapsible';
        title.innerHTML = `
            <span>${idx + 1}. ${chapter.title}</span>
            <span class="toggle-icon">▼</span>
        `;
        
        const catProgressContainer = document.createElement('div');
        catProgressContainer.className = 'category-progress-container';
        const catProgressBar = document.createElement('div');
        catProgressBar.className = 'category-progress-bar';
        catProgressBar.id = `progress-${chapter.id}`;
        catProgressContainer.appendChild(catProgressBar);
        
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'category-content-wrapper';
        
        const contentInner = document.createElement('div');
        contentInner.className = 'category-inner';
        
        title.addEventListener('click', () => {
            contentWrapper.classList.toggle('collapsed');
            const icon = title.querySelector('.toggle-icon');
            icon.textContent = contentWrapper.classList.contains('collapsed') ? '▶' : '▼';
        });
        
        chapterBlock.appendChild(title);
        chapterBlock.appendChild(catProgressContainer);
        
        chapter.items.forEach(item => {
            contentInner.appendChild(createWalkthroughItem(gameId, item, chapter.id));
        });
        
        contentWrapper.appendChild(contentInner);
        chapterBlock.appendChild(contentWrapper);
        trackerContainer.appendChild(chapterBlock);
    });
}

function createWalkthroughItem(gameId, item, chapterId) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'tracker-item walkthrough-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `wt_${item.id}`;
    
    checkbox.checked = getSavedState(item.id);
    if (checkbox.checked) {
        itemDiv.classList.add('item-completed');
    }
    
    checkbox.addEventListener('change', (e) => {
        setSavedState(item.id, e.target.checked);
        if (e.target.checked) {
            itemDiv.classList.add('item-completed');
            playCheckChime(true);
            triggerHaptic('light');
        } else {
            itemDiv.classList.remove('item-completed');
            playCheckChime(false);
        }
        updateWalkthroughProgress(gameId);
        if (activeFilterTag === 'incomplete') applySearchAndFilter();
    });
    
    const label = document.createElement('label');
    label.htmlFor = `wt_${item.id}`;
    label.innerHTML = item.html || item.text;
    
    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(label);

    itemDiv.addEventListener('click', (e) => {
        if (e.target === checkbox || e.target.tagName.toLowerCase() === 'a') return;
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
    });
    
    return itemDiv;
}

function updateWalkthroughProgress(gameId) {
    let globalTotal = 0;
    let globalCompleted = 0;
    
    currentWalkthroughData.chapters.forEach(chapter => {
        let chTotal = chapter.items.length;
        let chCompleted = 0;
        
        chapter.items.forEach(item => {
            globalTotal++;
            if (getSavedState(item.id)) {
                chCompleted++;
                globalCompleted++;
            }
        });
        
        const chPercentage = chTotal === 0 ? 0 : Math.round((chCompleted / chTotal) * 100);
        
        const chProgressBar = document.getElementById(`progress-${chapter.id}`);
        if (chProgressBar) {
            chProgressBar.style.width = `${chPercentage}%`;
            chProgressBar.textContent = `${chPercentage}% (${chCompleted}/${chTotal})`;
            
            if (chPercentage === 100) {
                chProgressBar.classList.add('completed-glow');
            } else {
                chProgressBar.classList.remove('completed-glow');
            }
        }
        
        const pill = document.getElementById(`pill-ch-${chapter.id}`);
        const pillCount = document.getElementById(`pill-count-${chapter.id}`);
        if (pillCount) {
            pillCount.textContent = `[ ${chCompleted}/${chTotal} ]`;
        }
        if (pill) {
            if (chPercentage === 100) {
                pill.classList.add('completed');
            } else {
                pill.classList.remove('completed');
            }
        }
    });
    
    const globalPercentage = globalTotal === 0 ? 0 : Math.round((globalCompleted / globalTotal) * 100);
    globalProgress.style.width = `${globalPercentage}%`;
    globalProgress.textContent = `${globalPercentage}% Walkthrough (${globalCompleted}/${globalTotal} Steps)`;
    
    const gameButton = listWalkthrough.querySelector(`[data-game="${gameId}"]`);
    if (gameButton) {
        if (globalPercentage === 100) {
            if (!gameButton.classList.contains('game-completed')) {
                triggerCelebration();
            }
            gameButton.classList.add('game-completed');
        } else {
            gameButton.classList.remove('game-completed');
        }
    }
}

// ========================================================
// 13. WALKTHROUGH TOOLBAR CONTROLS
// ========================================================
if (tbJumpToggle) {
    tbJumpToggle.addEventListener('click', () => {
        const isVisible = quickJumpContainer.style.display !== 'none';
        quickJumpContainer.style.display = isVisible ? 'none' : 'block';
        tbJumpToggle.classList.toggle('active', !isVisible);
    });
}

if (tbExpandAll) {
    tbExpandAll.addEventListener('click', () => {
        document.querySelectorAll('#tracker-container .category-content-wrapper').forEach(wrapper => {
            wrapper.classList.remove('collapsed');
        });
        document.querySelectorAll('#tracker-container .toggle-icon').forEach(icon => {
            icon.textContent = '▼';
        });
    });
}

if (tbCollapseAll) {
    tbCollapseAll.addEventListener('click', () => {
        document.querySelectorAll('#tracker-container .category-content-wrapper').forEach(wrapper => {
            wrapper.classList.add('collapsed');
        });
        document.querySelectorAll('#tracker-container .toggle-icon').forEach(icon => {
            icon.textContent = '▶';
        });
    });
}

if (tbFilterCompleted) {
    tbFilterCompleted.addEventListener('click', () => {
        hideCompleted = !hideCompleted;
        trackerContainer.classList.toggle('hide-completed', hideCompleted);
        tbFilterCompleted.classList.toggle('active', hideCompleted);
        tbFilterCompleted.textContent = hideCompleted ? '👁️ Show All' : '👁️ Hide Completed';
    });
}

if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 220) {
            btnBackToTop.style.display = 'flex';
        } else {
            if (currentMode === 'platinum') {
                btnBackToTop.style.display = 'none';
            }
        }
    });
}

// ========================================================
// 14. INITIALIZE COMPLETION BADGES ON STARTUP
// ========================================================
async function initTracker() {
    // 1. Check Platinum Games
    const platinumGames = ['ds1', 'ds2', 'ds3', 'sekiro', 'bloodborne', 'eldenring', 'eldenringnightreign', 'demonssouls', 'liesofp'];
    for (const gameId of platinumGames) {
        try {
            const response = await fetch(`data/${gameId}.json`);
            if (!response.ok) continue;
            const data = await response.json();
            let total = 0;
            let completed = 0;
            Object.keys(data).forEach(key => {
                if (key === 'game') return;
                data[key].forEach(item => {
                    if (item.steps) {
                        item.steps.forEach(step => {
                            total++;
                            if (getSavedState(`${gameId}_${step.id}`)) {
                                completed++;
                            }
                        });
                    } else {
                        total++;
                        if (getSavedState(`${gameId}_${item.id}`)) {
                            completed++;
                        }
                    }
                });
            });
            const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
            const gameButton = listPlatinum.querySelector(`[data-game="${gameId}"]`) || document.getElementById(`btn-${gameId}`);
            if (gameButton) {
                if (percentage === 100) {
                    gameButton.classList.add('game-completed');
                } else {
                    gameButton.classList.remove('game-completed');
                }
            }
        } catch (error) {}
    }

    // 2. Check Walkthrough Games
    const walkthroughGames = ['ds1', 'ds2', 'ds3', 'sekiro', 'bloodborne', 'eldenring', 'demonssouls'];
    for (const gameId of walkthroughGames) {
        try {
            const response = await fetch(`data/walkthroughs/${gameId}_walkthrough.json`);
            if (!response.ok) continue;
            const data = await response.json();
            let total = 0;
            let completed = 0;
            data.chapters.forEach(ch => {
                ch.items.forEach(item => {
                    total++;
                    if (getSavedState(item.id)) {
                        completed++;
                    }
                });
            });
            const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
            const gameButton = listWalkthrough.querySelector(`[data-game="${gameId}"]`);
            if (gameButton) {
                if (percentage === 100) {
                    gameButton.classList.add('game-completed');
                } else {
                    gameButton.classList.remove('game-completed');
                }
            }
        } catch (error) {}
    }
}

// ========================================================
// 15. PWA SERVICE WORKER REGISTRATION
// ========================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
            console.log('GitGud PWA ServiceWorker active:', reg.scope);
        }).catch(err => {
            console.log('PWA ServiceWorker registration failed:', err);
        });
    });
}

// Initial Boot
renderProfileSelect();
loadJournalData();
loadGameData('ds1');
initTracker();