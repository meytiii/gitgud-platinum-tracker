const mainHeader = document.getElementById('main-header');
const homeViewContainer = document.getElementById('home-view-container');
const sidebarBrandBtn = document.getElementById('sidebar-brand-btn');
const gameTitle = document.getElementById('game-title');
const trackerContainer = document.getElementById('tracker-container');
const globalProgress = document.getElementById('global-progress');
const progressContainer = document.getElementById('progress-container');
const guideBadge = document.getElementById('guide-badge');
const plannerBadge = document.getElementById('planner-badge');
const searchFilterSection = document.getElementById('search-filter-section');
const saveDisclaimer = document.getElementById('save-disclaimer');
const walkthroughToolbar = document.getElementById('walkthrough-toolbar');
const quickJumpContainer = document.getElementById('quick-jump-container');
const chapterJumpGrid = document.getElementById('chapter-jump-grid');
const btnBackToTop = document.getElementById('btn-back-to-top');

const modePlatinumBtn = document.getElementById('mode-platinum');
const modeWalkthroughBtn = document.getElementById('mode-walkthrough');
const modePlannerBtn = document.getElementById('mode-planner');
const listPlatinum = document.getElementById('list-platinum');
const listWalkthrough = document.getElementById('list-walkthrough');
const listPlanner = document.getElementById('list-planner');
const brandSubtitle = document.getElementById('brand-subtitle');

const profileSelect = document.getElementById('profile-select');
const btnAddProfile = document.getElementById('btn-add-profile');
const btnDeleteProfile = document.getElementById('btn-delete-profile');

const btnOpenMastery = document.getElementById('btn-open-mastery');
const btnOpenBackup = document.getElementById('btn-open-backup');
const accentThemeSelect = document.getElementById('accent-theme-select');

const globalSearchInput = document.getElementById('global-search-input');
const searchClearBtn = document.getElementById('search-clear-btn');
const filterChips = document.querySelectorAll('.filter-chip');
const filterChipsContainer = document.getElementById('filter-chips-container');
const quickJumpTitle = document.getElementById('quick-jump-title');
const quickJumpHint = document.getElementById('quick-jump-hint');
const searchStatusBar = document.getElementById('search-status-bar');
const searchResultCount = document.getElementById('search-result-count');

const plannerStudioContainer = document.getElementById('planner-studio-container');
const plannerSaveStatus = document.getElementById('planner-save-status');
const buildSlotBtns = document.querySelectorAll('.build-slot-btn');
const buildNameInput = document.getElementById('build-name-input');
const classSelect = document.getElementById('class-select');
const targetSlInput = document.getElementById('target-sl-input');
const calcCurrentLevelEl = document.getElementById('calc-current-level');
const calcPointsRemainingEl = document.getElementById('calc-points-remaining');
const pointsRemainingPill = document.getElementById('points-remaining-pill');
const calcRollGaugeEl = document.getElementById('calc-roll-gauge');
const rollRatioPill = document.getElementById('roll-ratio-pill');
const plannerStatsGrid = document.getElementById('planner-stats-grid');
const derivedHpEl = document.getElementById('derived-hp');
const derivedFpEl = document.getElementById('derived-fp');
const derivedStaminaEl = document.getElementById('derived-stamina');
const derivedMaxEquipEl = document.getElementById('derived-max-equip');
const derivedPvpEl = document.getElementById('derived-pvp');
const derivedRuneCostEl = document.getElementById('derived-rune-cost');
const plannerNotesInput = document.getElementById('planner-notes-input');
const weaponReqStatus = document.getElementById('weapon-req-status');
const btnResetStats = document.getElementById('btn-reset-stats');
const btnCopyBuild = document.getElementById('btn-copy-build');
const btnClearGear = document.getElementById('btn-clear-gear');
const calcRollBadgeEl = document.getElementById('calc-roll-badge');
const rollMeterFillEl = document.getElementById('roll-meter-fill');
const rollTickLight = document.getElementById('roll-tick-light');
const rollTickMed = document.getElementById('roll-tick-med');
const rollTickHeavy = document.getElementById('roll-tick-heavy');
const barHpFill = document.getElementById('bar-hp-fill');
const barFpFill = document.getElementById('bar-fp-fill');
const barStaminaFill = document.getElementById('bar-stamina-fill');
const deckTabTalismans = document.getElementById('deck-tab-talismans');

const eqWeaponRh1 = document.getElementById('eq-weapon-rh1');
const eqUpgradeRh1 = document.getElementById('eq-upgrade-rh1');
const reqRh1 = document.getElementById('req-rh1');
const eqWeaponRh2 = document.getElementById('eq-weapon-rh2');
const eqUpgradeRh2 = document.getElementById('eq-upgrade-rh2');
const reqRh2 = document.getElementById('req-rh2');
const eqWeaponRh3 = document.getElementById('eq-weapon-rh3');
const eqUpgradeRh3 = document.getElementById('eq-upgrade-rh3');
const reqRh3 = document.getElementById('req-rh3');

const eqWeaponLh1 = document.getElementById('eq-weapon-lh1');
const eqUpgradeLh1 = document.getElementById('eq-upgrade-lh1');
const reqLh1 = document.getElementById('req-lh1');
const eqWeaponLh2 = document.getElementById('eq-weapon-lh2');
const eqUpgradeLh2 = document.getElementById('eq-upgrade-lh2');
const reqLh2 = document.getElementById('req-lh2');
const eqWeaponLh3 = document.getElementById('eq-weapon-lh3');
const eqUpgradeLh3 = document.getElementById('eq-upgrade-lh3');
const reqLh3 = document.getElementById('req-lh3');

const rhSlot1Card = document.getElementById('rh-slot-1-card');
const rhSlot2Card = document.getElementById('rh-slot-2-card');
const rhSlot3Card = document.getElementById('rh-slot-3-card');
const lhSlot1Card = document.getElementById('lh-slot-1-card');
const lhSlot2Card = document.getElementById('lh-slot-2-card');
const lhSlot3Card = document.getElementById('lh-slot-3-card');

const eqArmorHead = document.getElementById('eq-armor-head');
const bonusHead = document.getElementById('bonus-head');
const eqArmorChest = document.getElementById('eq-armor-chest');
const bonusChest = document.getElementById('bonus-chest');
const eqArmorArms = document.getElementById('eq-armor-arms');
const bonusArms = document.getElementById('bonus-arms');
const eqArmorLegs = document.getElementById('eq-armor-legs');
const bonusLegs = document.getElementById('bonus-legs');
const eqRing1 = document.getElementById('eq-ring-1');
const bonusRing1 = document.getElementById('bonus-ring-1');
const eqRing2 = document.getElementById('eq-ring-2');
const bonusRing2 = document.getElementById('bonus-ring-2');
const eqRing3 = document.getElementById('eq-ring-3');
const bonusRing3 = document.getElementById('bonus-ring-3');
const eqRing4 = document.getElementById('eq-ring-4');
const bonusRing4 = document.getElementById('bonus-ring-4');
const ringSlot3Card = document.getElementById('ring-slot-3-card');
const ringSlot4Card = document.getElementById('ring-slot-4-card');
const ringTalismanSectionTitle = document.getElementById('ring-talisman-section-title');

const modalMastery = document.getElementById('modal-mastery');
const modalBackup = document.getElementById('modal-backup');
const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

const btnExportJson = document.getElementById('btn-export-json');
const btnCopyBackupCode = document.getElementById('btn-copy-backup-code');
const btnTriggerImportFile = document.getElementById('btn-trigger-import-file');
const backupFileInput = document.getElementById('backup-file-input');
const backupPasteArea = document.getElementById('backup-paste-area');
const btnImportPastedCode = document.getElementById('btn-import-pasted-code');

const tbJumpToggle = document.getElementById('tb-jump-toggle');
const tbExpandAll = document.getElementById('tb-expand-all');
const tbCollapseAll = document.getElementById('tb-collapse-all');
const tbFilterCompleted = document.getElementById('tb-filter-completed');

const celebrationCanvas = document.getElementById('celebration-canvas');
const celebrationCtx = celebrationCanvas ? celebrationCanvas.getContext('2d') : null;

let currentMode = 'platinum';
let currentPlatinumGame = 'ds1';
let currentWalkthroughGame = 'ds1';
let currentGameData = null;
let currentWalkthroughData = null;
let hideCompleted = false;
let activeFilterTag = 'all';
let searchQuery = '';
let activeAccentTheme = localStorage.getItem('gitgud_accent_theme') || 'gold';
let celebrationParticles = [];
let celebrationAnimId = null;

// ========================================================
// 1. HAPTICS ENGINE
// ========================================================
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
        p.vy += 0.35;
        p.vx *= 0.98;
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
    loadPlannerData();
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

// ========================================================
// 5. ADVANCED CHARACTER BUILD & EQUIPMENT STUDIO ENGINE
// ========================================================
let activeBuildSlot = 1;
let currentPlannerState = null;
let currentPlannerGame = 'eldenring';
let plannerDebounceTimer = null;
const equipmentCache = {};

async function fetchEquipmentData(gameId) {
    if (equipmentCache[gameId]) return equipmentCache[gameId];
    try {
        const res = await fetch(`data/equipment/${gameId}_equipment.json`);
        if (res.ok) {
            const data = await res.json();
            equipmentCache[gameId] = data;
            return data;
        }
    } catch (e) {
        console.warn('Could not load equipment json for', gameId);
    }
    return null;
}

function getPlannerStorageKey(game = currentPlannerGame, slot = activeBuildSlot) {
    const profile = getActiveProfile();
    return `planner_studio_${profile}__${game}__slot${slot}`;
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

async function loadPlannerStudioData(game = currentPlannerGame, slot = activeBuildSlot) {
    currentPlannerGame = game;
    activeBuildSlot = slot;

    document.body.className = document.body.className.replace(/theme-(?!accent-)\S+/g, '').trim();
    document.body.classList.add(`theme-${game}`);

    if (listPlanner) {
        listPlanner.querySelectorAll('.game-select').forEach(btn => {
            btn.style.borderLeft = '';
            btn.classList.remove('active-game');
        });
        const activeBtn = listPlanner.querySelector(`[data-game="${game}"]`);
        if (activeBtn) {
            activeBtn.style.borderLeft = '3px solid var(--gold)';
            activeBtn.classList.add('active-game');
            try {
                activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
            } catch (e) {}
        }
    }

    const config = GAME_PLANNER_CONFIG[game] || GAME_PLANNER_CONFIG.eldenring;

    buildSlotBtns.forEach(btn => {
        const btnSlot = parseInt(btn.getAttribute('data-slot'));
        btn.classList.toggle('active', btnSlot === activeBuildSlot);
    });

    if (currentMode === 'planner') {
        const titles = {
            ds1: "Dark Souls 1",
            ds2: "Dark Souls 2",
            ds3: "Dark Souls 3",
            bloodborne: "Bloodborne",
            eldenring: "Elden Ring"
        };
        gameTitle.textContent = titles[game] || config.title;
        if (typeof updatePageSEO === 'function') updatePageSEO(game, 'planner');
    }

    if (classSelect) {
        classSelect.innerHTML = '';
        Object.keys(config.classes).forEach(cName => {
            const opt = document.createElement('option');
            opt.value = cName;
            opt.textContent = `${cName} (Base SL ${config.classes[cName].lvl})`;
            classSelect.appendChild(opt);
        });
    }

    const key = getPlannerStorageKey(game, slot);
    let saved = null;
    try {
        const raw = localStorage.getItem(key);
        if (raw) saved = JSON.parse(raw);
    } catch (e) {}

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

    const initialEquipment = {
        rh1: saved && saved.equipment && saved.equipment.rh1 ? saved.equipment.rh1 : { name: 'None', upgrade: '25' },
        rh2: saved && saved.equipment && saved.equipment.rh2 ? saved.equipment.rh2 : { name: 'None', upgrade: '25' },
        rh3: saved && saved.equipment && saved.equipment.rh3 ? saved.equipment.rh3 : { name: 'None', upgrade: '25' },
        lh1: saved && saved.equipment && saved.equipment.lh1 ? saved.equipment.lh1 : { name: 'None', upgrade: '25' },
        lh2: saved && saved.equipment && saved.equipment.lh2 ? saved.equipment.lh2 : { name: 'None', upgrade: '25' },
        lh3: saved && saved.equipment && saved.equipment.lh3 ? saved.equipment.lh3 : { name: 'None', upgrade: '25' },
        head: saved && saved.equipment && saved.equipment.head ? saved.equipment.head : 'None',
        chest: saved && saved.equipment && saved.equipment.chest ? saved.equipment.chest : 'None',
        arms: saved && saved.equipment && saved.equipment.arms ? saved.equipment.arms : 'None',
        legs: saved && saved.equipment && saved.equipment.legs ? saved.equipment.legs : 'None',
        ring1: saved && saved.equipment && saved.equipment.ring1 ? saved.equipment.ring1 : 'None',
        ring2: saved && saved.equipment && saved.equipment.ring2 ? saved.equipment.ring2 : 'None',
        ring3: saved && saved.equipment && saved.equipment.ring3 ? saved.equipment.ring3 : 'None',
        ring4: saved && saved.equipment && saved.equipment.ring4 ? saved.equipment.ring4 : 'None'
    };

    currentPlannerState = {
        className: chosenClass,
        targetLevel: saved && saved.targetLevel ? parseInt(saved.targetLevel) : 125,
        buildName: saved && saved.buildName ? saved.buildName : '',
        notes: saved && saved.notes ? saved.notes : '',
        stats: initialStats,
        equipment: initialEquipment
    };

    if (buildNameInput) buildNameInput.value = currentPlannerState.buildName;
    if (targetSlInput) targetSlInput.value = currentPlannerState.targetLevel;
    if (plannerNotesInput) plannerNotesInput.value = currentPlannerState.notes;

    const eqData = await fetchEquipmentData(game);
    populateEquipmentDropdowns(eqData);

    renderArchetypePresetChips();
    renderPlannerStatsGrid();
    updateEquipmentAndStatCalculations();
}

function populateEquipmentDropdowns(eqData) {
    if (!eqData) return;
    const game = currentPlannerGame;

    if (ringTalismanSectionTitle) {
        if (game === 'eldenring') ringTalismanSectionTitle.textContent = '💍 TALISMANS (4 SLOTS)';
        else if (game === 'bloodborne') ringTalismanSectionTitle.textContent = '👁️ CARYLL RUNES (4 SLOTS)';
        else if (game === 'ds1') ringTalismanSectionTitle.textContent = '💍 RINGS (2 SLOTS)';
        else ringTalismanSectionTitle.textContent = '💍 RINGS (4 SLOTS)';
    }

    if (ringSlot3Card && ringSlot4Card) {
        if (game === 'ds1') {
            ringSlot3Card.style.display = 'none';
            ringSlot4Card.style.display = 'none';
        } else {
            ringSlot3Card.style.display = '';
            ringSlot4Card.style.display = '';
        }
    }

    if (rhSlot3Card && lhSlot3Card) {
        if (game === 'ds1' || game === 'bloodborne') {
            rhSlot3Card.style.display = 'none';
            lhSlot3Card.style.display = 'none';
        } else {
            rhSlot3Card.style.display = '';
            lhSlot3Card.style.display = '';
        }
    }

    const weapons = [{ name: "None", weight: 0.0, req: {} }, ...(eqData.weapons || [])];
    const armor = eqData.armor || {};
    const rings = [{ name: "None", weight: 0.0, bonus: {} }, ...(eqData.talismans || eqData.rings || eqData.caryll_runes || [])];

    const slotConfigs = [
        { sel: eqWeaponRh1, list: weapons, val: currentPlannerState.equipment.rh1 ? currentPlannerState.equipment.rh1.name : 'None' },
        { sel: eqWeaponRh2, list: weapons, val: currentPlannerState.equipment.rh2 ? currentPlannerState.equipment.rh2.name : 'None' },
        { sel: eqWeaponRh3, list: weapons, val: currentPlannerState.equipment.rh3 ? currentPlannerState.equipment.rh3.name : 'None' },
        { sel: eqWeaponLh1, list: weapons, val: currentPlannerState.equipment.lh1 ? currentPlannerState.equipment.lh1.name : 'None' },
        { sel: eqWeaponLh2, list: weapons, val: currentPlannerState.equipment.lh2 ? currentPlannerState.equipment.lh2.name : 'None' },
        { sel: eqWeaponLh3, list: weapons, val: currentPlannerState.equipment.lh3 ? currentPlannerState.equipment.lh3.name : 'None' },
        { sel: eqArmorHead, list: armor.head || [{ name: "None", weight: 0.0 }], val: currentPlannerState.equipment.head || 'None' },
        { sel: eqArmorChest, list: armor.chest || [{ name: "None", weight: 0.0 }], val: currentPlannerState.equipment.chest || 'None' },
        { sel: eqArmorArms, list: armor.arms || [{ name: "None", weight: 0.0 }], val: currentPlannerState.equipment.arms || 'None' },
        { sel: eqArmorLegs, list: armor.legs || [{ name: "None", weight: 0.0 }], val: currentPlannerState.equipment.legs || 'None' },
        { sel: eqRing1, list: rings, val: currentPlannerState.equipment.ring1 || 'None' },
        { sel: eqRing2, list: rings, val: currentPlannerState.equipment.ring2 || 'None' },
        { sel: eqRing3, list: rings, val: currentPlannerState.equipment.ring3 || 'None' },
        { sel: eqRing4, list: rings, val: currentPlannerState.equipment.ring4 || 'None' }
    ];

    slotConfigs.forEach(({ sel, list, val }) => {
        if (!sel) return;
        sel._fullItemList = list;
        renderSelectOptions(sel, list, val);
    });

    if (eqUpgradeRh1 && currentPlannerState.equipment.rh1) eqUpgradeRh1.value = currentPlannerState.equipment.rh1.upgrade || '25';
    if (eqUpgradeRh2 && currentPlannerState.equipment.rh2) eqUpgradeRh2.value = currentPlannerState.equipment.rh2.upgrade || '25';
    if (eqUpgradeRh3 && currentPlannerState.equipment.rh3) eqUpgradeRh3.value = currentPlannerState.equipment.rh3.upgrade || '25';
    if (eqUpgradeLh1 && currentPlannerState.equipment.lh1) eqUpgradeLh1.value = currentPlannerState.equipment.lh1.upgrade || '25';
    if (eqUpgradeLh2 && currentPlannerState.equipment.lh2) eqUpgradeLh2.value = currentPlannerState.equipment.lh2.upgrade || '25';
    if (eqUpgradeLh3 && currentPlannerState.equipment.lh3) eqUpgradeLh3.value = currentPlannerState.equipment.lh3.upgrade || '25';

    document.querySelectorAll('.equip-search-filter').forEach(inp => {
        inp.value = '';
    });
}

function renderSelectOptions(sel, items, selectedVal) {
    if (!sel) return;
    sel.innerHTML = '';
    items.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.name;
        opt.textContent = `${item.name} (${item.weight !== undefined ? item.weight : 0} wt)`;
        sel.appendChild(opt);
    });
    if (selectedVal && items.some(i => i.name === selectedVal)) {
        sel.value = selectedVal;
    } else if (items.length > 0) {
        sel.value = items[0].name;
    }
}

function renderPlannerStatsGrid() {
    const game = currentPlannerGame;
    const config = GAME_PLANNER_CONFIG[game] || GAME_PLANNER_CONFIG.eldenring;
    const baseClassData = config.classes[currentPlannerState.className];

    if (!plannerStatsGrid) return;
    plannerStatsGrid.innerHTML = '';

    config.stats.forEach(st => {
        const baseFloor = baseClassData.stats[st.id] !== undefined ? baseClassData.stats[st.id] : 10;
        const currentVal = currentPlannerState.stats[st.id] !== undefined ? currentPlannerState.stats[st.id] : baseFloor;
        const isSoftCapped = currentVal >= st.softCap;
        const pct = Math.min(100, Math.max(0, (currentVal / 99) * 100));

        const card = document.createElement('div');
        card.className = `planner-stat-card ${isSoftCapped ? 'soft-capped' : ''}`;
        card.id = `stat-card-${st.id}`;
        card.title = st.desc;

        card.innerHTML = `
            <div class="stat-card-header">
                <span class="stat-card-label">${st.label} <span id="stat-bonus-${st.id}" class="stat-gear-bonus" style="display: none;"></span></span>
                <span class="soft-cap-badge ${isSoftCapped ? 'active' : ''}" id="soft-badge-${st.id}">⚡ ${st.softCap}</span>
            </div>
            <div class="stat-progress-track">
                <div id="stat-bar-fill-${st.id}" class="stat-bar-fill" style="width: ${pct.toFixed(1)}%;"></div>
            </div>
            <div class="stat-btn-group">
                <button type="button" class="stat-adj-btn btn-dec" data-stat="${st.id}" title="Decrease stat (Hold to repeat)">−</button>
                <input type="number" class="stat-input-field" id="stat-input-${st.id}" data-stat="${st.id}" min="${baseFloor}" max="99" value="${currentVal}">
                <button type="button" class="stat-adj-btn btn-inc" data-stat="${st.id}" title="Increase stat (Hold to repeat)">+</button>
            </div>
            <span class="stat-floor-text">Base: ${baseFloor} | Cap: ${st.hardCap}</span>
        `;

        plannerStatsGrid.appendChild(card);
    });

    function attachHoldListener(btn, isInc) {
        let timer = null;
        let interval = null;
        const statId = btn.getAttribute('data-stat');

        function step() {
            const baseFloor = baseClassData.stats[statId] !== undefined ? baseClassData.stats[statId] : 10;
            const current = currentPlannerState.stats[statId] || (isInc ? 10 : baseFloor);
            if (isInc && current < 99) {
                currentPlannerState.stats[statId] = current + 1;
                updateSingleStatInput(statId);
                updateEquipmentAndStatCalculations();
                triggerPlannerAutoSave();
            } else if (!isInc && current > baseFloor) {
                currentPlannerState.stats[statId] = current - 1;
                updateSingleStatInput(statId);
                updateEquipmentAndStatCalculations();
                triggerPlannerAutoSave();
            }
        }

        btn.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            step();
            timer = setTimeout(() => {
                interval = setInterval(step, 75);
            }, 240);
        });

        const stop = () => {
            if (timer) clearTimeout(timer);
            if (interval) clearInterval(interval);
            timer = null;
            interval = null;
        };

        btn.addEventListener('mouseup', stop);
        btn.addEventListener('mouseleave', stop);
        btn.addEventListener('touchstart', () => {
            step();
            timer = setTimeout(() => {
                interval = setInterval(step, 75);
            }, 240);
        }, { passive: true });
        btn.addEventListener('touchend', stop);
    }

    plannerStatsGrid.querySelectorAll('.btn-dec').forEach(btn => attachHoldListener(btn, false));
    plannerStatsGrid.querySelectorAll('.btn-inc').forEach(btn => attachHoldListener(btn, true));

    plannerStatsGrid.querySelectorAll('.stat-input-field').forEach(input => {
        input.addEventListener('change', (e) => {
            const statId = e.currentTarget.getAttribute('data-stat');
            const baseFloor = baseClassData.stats[statId] !== undefined ? baseClassData.stats[statId] : 10;
            let val = parseInt(e.currentTarget.value);
            if (isNaN(val) || val < baseFloor) val = baseFloor;
            if (val > 99) val = 99;
            currentPlannerState.stats[statId] = val;
            e.currentTarget.value = val;
            updateEquipmentAndStatCalculations();
            triggerPlannerAutoSave();
        });
    });
}

function updateSingleStatInput(statId) {
    const input = document.getElementById(`stat-input-${statId}`);
    if (input) input.value = currentPlannerState.stats[statId];
    const bar = document.getElementById(`stat-bar-fill-${statId}`);
    if (bar) {
        const val = currentPlannerState.stats[statId] || 10;
        bar.style.width = `${Math.min(100, Math.max(0, (val / 99) * 100)).toFixed(1)}%`;
    }
}

function updateEquipmentAndStatCalculations() {
    if (!currentPlannerState) return;
    const game = currentPlannerGame;
    const config = GAME_PLANNER_CONFIG[game] || GAME_PLANNER_CONFIG.eldenring;
    const baseClassData = config.classes[currentPlannerState.className];
    if (!baseClassData) return;

    const eqData = equipmentCache[game];

    function findWeapon(name) {
        if (!eqData || !eqData.weapons || !name || name === 'None') return null;
        return eqData.weapons.find(w => w.name === name) || null;
    }
    function findArmor(slot, name) {
        if (!eqData || !eqData.armor || !eqData.armor[slot] || !name || name === 'None') return null;
        return eqData.armor[slot].find(a => a.name === name) || null;
    }
    function findRing(name) {
        if (!eqData || !name || name === 'None') return null;
        const list = eqData.talismans || eqData.rings || eqData.caryll_runes || [];
        return list.find(r => r.name === name) || null;
    }

    const isDualHandOnly = game === 'ds1' || game === 'bloodborne';

    const rh1 = findWeapon(currentPlannerState.equipment.rh1 ? currentPlannerState.equipment.rh1.name : 'None');
    const rh2 = findWeapon(currentPlannerState.equipment.rh2 ? currentPlannerState.equipment.rh2.name : 'None');
    const rh3 = !isDualHandOnly ? findWeapon(currentPlannerState.equipment.rh3 ? currentPlannerState.equipment.rh3.name : 'None') : null;

    const lh1 = findWeapon(currentPlannerState.equipment.lh1 ? currentPlannerState.equipment.lh1.name : 'None');
    const lh2 = findWeapon(currentPlannerState.equipment.lh2 ? currentPlannerState.equipment.lh2.name : 'None');
    const lh3 = !isDualHandOnly ? findWeapon(currentPlannerState.equipment.lh3 ? currentPlannerState.equipment.lh3.name : 'None') : null;

    const head = findArmor('head', currentPlannerState.equipment.head);
    const chest = findArmor('chest', currentPlannerState.equipment.chest);
    const arms = findArmor('arms', currentPlannerState.equipment.arms);
    const legs = findArmor('legs', currentPlannerState.equipment.legs);
    const ring1 = findRing(currentPlannerState.equipment.ring1);
    const ring2 = findRing(currentPlannerState.equipment.ring2);
    const ring3 = game !== 'ds1' ? findRing(currentPlannerState.equipment.ring3) : null;
    const ring4 = game !== 'ds1' ? findRing(currentPlannerState.equipment.ring4) : null;

    function updateBonusBadge(badgeEl, item) {
        if (!badgeEl) return;
        if (item && item.desc) {
            badgeEl.textContent = item.desc;
            badgeEl.title = item.desc;
            badgeEl.className = 'equip-bonus-badge bonus-active';
        } else if (item && item.bonus && Object.keys(item.bonus).length > 0) {
            const bonuses = Object.entries(item.bonus).map(([k, v]) => `+${v} ${k.toUpperCase()}`).join(', ');
            badgeEl.textContent = bonuses;
            badgeEl.title = bonuses;
            badgeEl.className = 'equip-bonus-badge bonus-active';
        } else {
            badgeEl.textContent = 'No Bonus';
            badgeEl.title = 'No active stat or passive bonuses on this gear piece';
            badgeEl.className = 'equip-bonus-badge';
        }
    }

    updateBonusBadge(bonusHead, head);
    updateBonusBadge(bonusChest, chest);
    updateBonusBadge(bonusArms, arms);
    updateBonusBadge(bonusLegs, legs);
    updateBonusBadge(bonusRing1, ring1);
    updateBonusBadge(bonusRing2, ring2);
    updateBonusBadge(bonusRing3, ring3);
    updateBonusBadge(bonusRing4, ring4);

    const gearBonuses = {};
    [head, chest, arms, legs, ring1, ring2, ring3, ring4].forEach(item => {
        if (item && item.bonus) {
            Object.keys(item.bonus).forEach(statId => {
                gearBonuses[statId] = (gearBonuses[statId] || 0) + item.bonus[statId];
            });
        }
    });

    const effectiveStats = {};
    let investedPoints = 0;

    config.stats.forEach(st => {
        const baseFloor = baseClassData.stats[st.id] !== undefined ? baseClassData.stats[st.id] : 10;
        const currentVal = currentPlannerState.stats[st.id] !== undefined ? currentPlannerState.stats[st.id] : baseFloor;
        const bonus = gearBonuses[st.id] || 0;
        const effective = currentVal + bonus;
        effectiveStats[st.id] = effective;

        if (currentVal > baseFloor) {
            investedPoints += (currentVal - baseFloor);
        }

        const card = document.getElementById(`stat-card-${st.id}`);
        const badge = document.getElementById(`soft-badge-${st.id}`);
        const bonusTag = document.getElementById(`stat-bonus-${st.id}`);
        const barFill = document.getElementById(`stat-bar-fill-${st.id}`);
        const isCapped = effective >= st.softCap;

        if (card) card.classList.toggle('soft-capped', isCapped);
        if (badge) badge.classList.toggle('active', isCapped);
        if (barFill) barFill.style.width = `${Math.min(100, Math.max(0, (effective / 99) * 100)).toFixed(1)}%`;
        if (bonusTag) {
            if (bonus > 0) {
                bonusTag.textContent = `(+${bonus} ➔ ${effective})`;
                bonusTag.style.display = 'inline';
            } else {
                bonusTag.style.display = 'none';
            }
        }
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

    let estHp = 1000;
    let estFp = 100;
    let estStam = 100;
    let baseEquipLoad = 45.0;
    let equipLoadMult = 1.0;

    const vig = effectiveStats.vig || effectiveStats.vit || effectiveStats.vgr || 10;
    const end = effectiveStats.end || effectiveStats.sta || 10;
    const att = effectiveStats.att || effectiveStats.atn || effectiveStats.mnd || effectiveStats.int || 10;
    const vit = effectiveStats.vit || 10;

    if (game === 'ds1') {
        if (vig <= 30) estHp = 400 + vig * 17;
        else if (vig <= 50) estHp = 910 + (vig - 30) * 29.5;
        else estHp = 1500 + (vig - 50) * 8;

        estStam = Math.min(160, 80 + end * 2.0);

        if (att < 10) estFp = 0; // 0 slots
        else if (att < 12) estFp = 1;
        else if (att < 14) estFp = 2;
        else if (att < 16) estFp = 3;
        else if (att < 19) estFp = 4;
        else if (att < 23) estFp = 5;
        else if (att < 28) estFp = 6;
        else if (att < 34) estFp = 7;
        else if (att < 41) estFp = 8;
        else if (att < 50) estFp = 9;
        else estFp = 10;

        baseEquipLoad = 40.0 + end * 1.0;

        const ringNames = [ring1?.name || '', ring2?.name || ''];
        if (ringNames.some(n => n.includes("Havel's Ring"))) equipLoadMult *= 1.50;
        if (ringNames.some(n => n.includes("Favor and Protection"))) {
            equipLoadMult *= 1.20;
            estHp *= 1.20;
            estStam *= 1.20;
        }
        if (head && head.name && head.name.includes("Father")) equipLoadMult *= 1.05;

    } else if (game === 'ds2') {
        if (vig <= 20) estHp = 500 + vig * 30;
        else if (vig <= 50) estHp = 1100 + (vig - 20) * 20;
        else estHp = 1700 + (vig - 50) * 5;

        if (end <= 20) estStam = 80 + end * 2;
        else estStam = 120 + (end - 20) * 1;

        if (vit <= 29) baseEquipLoad = 38.5 + (vit - 1) * 1.5;
        else if (vit <= 70) baseEquipLoad = 80.5 + (vit - 29) * 1.0;
        else baseEquipLoad = 121.5 + (vit - 70) * 0.5;

        const ringNames = [ring1?.name || '', ring2?.name || '', ring3?.name || '', ring4?.name || ''];
        if (ringNames.some(n => n.includes("Royal Soldier") && n.includes("+2"))) equipLoadMult *= 1.20;
        else if (ringNames.some(n => n.includes("Royal Soldier") && n.includes("+1"))) equipLoadMult *= 1.15;
        else if (ringNames.some(n => n.includes("Royal Soldier"))) equipLoadMult *= 1.10;
        if (ringNames.some(n => n.includes("Third Dragon"))) {
            equipLoadMult *= 1.125;
            estHp *= 1.05;
            estStam *= 1.125;
        } else if (ringNames.some(n => n.includes("Second Dragon"))) {
            equipLoadMult *= 1.10;
            estHp *= 1.03;
            estStam *= 1.10;
        } else if (ringNames.some(n => n.includes("First Dragon"))) {
            equipLoadMult *= 1.05;
        }

    } else if (game === 'ds3') {
        if (vig <= 27) estHp = 400 + vig * 22.2;
        else if (vig <= 40) estHp = 1000 + (vig - 27) * 16.4;
        else estHp = 1213 + (vig - 40) * 6.5;

        estFp = Math.round(50 + att * 6.5);

        estStam = Math.min(160, 75 + end * 2.15);

        baseEquipLoad = 40.0 + vit * 1.0;

        const ringNames = [ring1?.name || '', ring2?.name || '', ring3?.name || '', ring4?.name || ''];
        if (ringNames.some(n => n.includes("Havel") && n.includes("+3"))) equipLoadMult *= 1.19;
        else if (ringNames.some(n => n.includes("Havel") && n.includes("+2"))) equipLoadMult *= 1.18;
        else if (ringNames.some(n => n.includes("Havel") && n.includes("+1"))) equipLoadMult *= 1.17;
        else if (ringNames.some(n => n.includes("Havel"))) equipLoadMult *= 1.15;

        if (ringNames.some(n => n.includes("Favor") && n.includes("+3"))) equipLoadMult *= 1.08;
        else if (ringNames.some(n => n.includes("Favor") && n.includes("+2"))) equipLoadMult *= 1.07;
        else if (ringNames.some(n => n.includes("Favor") && n.includes("+1"))) equipLoadMult *= 1.06;
        else if (ringNames.some(n => n.includes("Favor"))) equipLoadMult *= 1.05;

    } else if (game === 'bloodborne') {
        if (vig <= 30) estHp = 500 + vig * 20;
        else if (vig <= 50) estHp = 1100 + (vig - 30) * 20;
        else estHp = 1500 + (vig - 50) * 8;

        estStam = Math.min(170, 80 + end * 2.5);
        estFp = 20;
        baseEquipLoad = 100.0;

    } else {
        // Elden Ring
        if (vig <= 40) estHp = 400 + (vig - 1) * 27;
        else if (vig <= 60) estHp = 1450 + (vig - 40) * 22.5;
        else estHp = 1900 + (vig - 60) * 5.1;

        if (att <= 38) estFp = 50 + att * 4.5;
        else estFp = 221 + (att - 38) * 5.8;

        if (end <= 50) estStam = 80 + end * 1.5;
        else estStam = 155 + (end - 50) * 0.3;

        if (end <= 25) baseEquipLoad = 45.0 + (end - 8) * 1.6;
        else if (end <= 60) baseEquipLoad = 72.0 + (end - 25) * 1.4;
        else baseEquipLoad = 121.0 + (end - 60) * 1.0;

        const ringNames = [ring1?.name || '', ring2?.name || '', ring3?.name || '', ring4?.name || ''];
        if (ringNames.some(n => n.includes("Great-Jar"))) equipLoadMult *= 1.19;
        else if (ringNames.some(n => n.includes("Arsenal Charm +1"))) equipLoadMult *= 1.17;
        else if (ringNames.some(n => n.includes("Arsenal Charm"))) equipLoadMult *= 1.15;

        if (ringNames.some(n => n.includes("Erdtree's Favor +2"))) equipLoadMult *= 1.08;
        else if (ringNames.some(n => n.includes("Erdtree's Favor +1"))) equipLoadMult *= 1.065;
        else if (ringNames.some(n => n.includes("Erdtree's Favor"))) equipLoadMult *= 1.05;
    }

    const maxEquipLoad = baseEquipLoad * equipLoadMult;

    if (derivedHpEl) derivedHpEl.textContent = `${Math.round(estHp).toLocaleString()} HP`;
    if (derivedFpEl) {
        if (game === 'ds1') derivedFpEl.textContent = `${estFp} Spell Slots`;
        else if (game === 'bloodborne') derivedFpEl.textContent = `${estFp} Max Bullets`;
        else derivedFpEl.textContent = `${Math.round(estFp).toLocaleString()} FP`;
    }
    if (derivedStaminaEl) derivedStaminaEl.textContent = `${Math.round(estStam).toLocaleString()} Stamina`;
    if (derivedMaxEquipEl) derivedMaxEquipEl.textContent = `${maxEquipLoad.toFixed(1)} Weight`;

    if (barHpFill) barHpFill.style.width = `${Math.min(100, Math.max(5, (estHp / 2100) * 100)).toFixed(1)}%`;
    if (barFpFill) barFpFill.style.width = `${Math.min(100, Math.max(5, (estFp / 350) * 100)).toFixed(1)}%`;
    if (barStaminaFill) barStaminaFill.style.width = `${Math.min(100, Math.max(5, (estStam / 180) * 100)).toFixed(1)}%`;

    const totalWeight = 
        (rh1?.weight || 0) + 
        (rh2?.weight || 0) + 
        (rh3?.weight || 0) + 
        (lh1?.weight || 0) + 
        (lh2?.weight || 0) + 
        (lh3?.weight || 0) + 
        (head?.weight || 0) + 
        (chest?.weight || 0) + 
        (arms?.weight || 0) + 
        (legs?.weight || 0) + 
        (ring1?.weight || 0) + 
        (ring2?.weight || 0) + 
        (ring3?.weight || 0) + 
        (ring4?.weight || 0);

    const rollRatio = maxEquipLoad > 0 ? (totalWeight / maxEquipLoad) * 100 : 0;

    if (rollMeterFillEl) rollMeterFillEl.style.width = `${Math.min(100, Math.max(0, rollRatio)).toFixed(1)}%`;

    if (calcRollGaugeEl && rollRatioPill) {
        if (game === 'bloodborne') {
            if (calcRollBadgeEl) calcRollBadgeEl.textContent = '⚡ Quickstep';
            calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} Wt (Quickstep)`;
            rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-light';
            if (rollTickLight) rollTickLight.style.display = 'none';
            if (rollTickMed) rollTickMed.style.display = 'none';
        } else if (game === 'ds1') {
            if (rollTickLight) { rollTickLight.style.display = 'block'; rollTickLight.style.left = '25%'; rollTickLight.title = 'Fast Roll (25%)'; }
            if (rollTickMed) { rollTickMed.style.display = 'block'; rollTickMed.style.left = '50%'; rollTickMed.title = 'Mid Roll (50%)'; }

            const ringNames = [ring1?.name || '', ring2?.name || ''];
            const hasNinjaRing = ringNames.some(n => n.includes("Dark Wood Grain Ring"));

            if (rollRatio <= 25.0) {
                if (hasNinjaRing) {
                    if (calcRollBadgeEl) calcRollBadgeEl.textContent = '🤸 Ninja Flip';
                    calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Ninja Flip)`;
                } else {
                    if (calcRollBadgeEl) calcRollBadgeEl.textContent = '🪶 Fast Roll';
                    calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Fast Roll)`;
                }
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-light';
            } else if (rollRatio <= 50.0) {
                if (calcRollBadgeEl) calcRollBadgeEl.textContent = '🏃 Mid Roll';
                calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Mid Roll)`;
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-medium';
            } else if (rollRatio <= 100.0) {
                if (calcRollBadgeEl) calcRollBadgeEl.textContent = '🛡️ Fat Roll';
                calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Fat Roll)`;
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-heavy';
            } else {
                if (calcRollBadgeEl) calcRollBadgeEl.textContent = '⚠️ Overburdened';
                calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Overburdened)`;
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-over';
            }
        } else if (game === 'ds2') {
            if (rollTickLight) rollTickLight.style.display = 'none';
            if (rollTickMed) { rollTickMed.style.display = 'block'; rollTickMed.style.left = '70%'; rollTickMed.title = 'Fat Roll Threshold (70%)'; }

            if (rollRatio <= 70.0) {
                if (calcRollBadgeEl) calcRollBadgeEl.textContent = '🏃 Normal Roll';
                calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Normal Roll)`;
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-light';
            } else if (rollRatio <= 100.0) {
                if (calcRollBadgeEl) calcRollBadgeEl.textContent = '🛡️ Fat Roll';
                calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Fat Roll)`;
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-heavy';
            } else {
                if (calcRollBadgeEl) calcRollBadgeEl.textContent = '⚠️ Overburdened';
                calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Overburdened)`;
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-over';
            }
        } else {
            if (rollTickLight) { rollTickLight.style.display = 'block'; rollTickLight.style.left = '30%'; rollTickLight.title = 'Light Roll (30%)'; }
            if (rollTickMed) { rollTickMed.style.display = 'block'; rollTickMed.style.left = '70%'; rollTickMed.title = 'Med Roll (70%)'; }

            if (rollRatio < 30.0) {
                if (calcRollBadgeEl) calcRollBadgeEl.textContent = '🪶 Light Roll';
                calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Light Roll)`;
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-light';
            } else if (rollRatio <= 70.0) {
                if (calcRollBadgeEl) calcRollBadgeEl.textContent = '🏃 Med Roll';
                calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Med Roll)`;
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-medium';
            } else if (rollRatio <= 100.0) {
                if (calcRollBadgeEl) calcRollBadgeEl.textContent = '🛡️ Heavy Roll';
                calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Heavy Roll)`;
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-heavy';
            } else {
                if (calcRollBadgeEl) calcRollBadgeEl.textContent = '⚠️ Overburdened';
                calcRollGaugeEl.textContent = `${totalWeight.toFixed(1)} / ${maxEquipLoad.toFixed(1)} Wt (${rollRatio.toFixed(1)}% Overburdened)`;
                rollRatioPill.className = 'planner-stat-pill roll-hud-card roll-pill-over';
            }
        }
    }

    if (deckTabTalismans) {
        if (game === 'bloodborne') deckTabTalismans.textContent = '🌿 Caryll Runes';
        else if (game === 'eldenring') deckTabTalismans.textContent = '💍 Talismans';
        else deckTabTalismans.textContent = '💍 Rings';
    }

    // Check Weapon Requirements
    function checkRequirements(reqBadge, weapon) {
        if (!reqBadge) return true;
        if (!weapon || !weapon.req || Object.keys(weapon.req).length === 0) {
            reqBadge.textContent = '✓ No Stat Requirements';
            reqBadge.className = 'equip-req-badge req-met';
            return true;
        }

        const missing = [];
        const reqStrings = [];
        let allMet = true;

        Object.entries(weapon.req).forEach(([stId, reqVal]) => {
            const hasVal = effectiveStats[stId] || 10;
            reqStrings.push(`${reqVal} ${stId.toUpperCase()}`);
            if (hasVal < reqVal) {
                allMet = false;
                missing.push(`+${reqVal - hasVal} ${stId.toUpperCase()}`);
            }
        });

        if (allMet) {
            reqBadge.textContent = `✓ Req: ${reqStrings.join(', ')}`;
            reqBadge.className = 'equip-req-badge req-met';
            return true;
        } else {
            reqBadge.textContent = `⚠️ Need: ${missing.join(', ')}`;
            reqBadge.className = 'equip-req-badge req-unmet';
            return false;
        }
    }

    const rh1Met = checkRequirements(reqRh1, rh1);
    const rh2Met = checkRequirements(reqRh2, rh2);
    const rh3Met = isDualHandOnly ? true : checkRequirements(reqRh3, rh3);

    const lh1Met = checkRequirements(reqLh1, lh1);
    const lh2Met = checkRequirements(reqLh2, lh2);
    const lh3Met = isDualHandOnly ? true : checkRequirements(reqLh3, lh3);

    if (weaponReqStatus) {
        if (rh1Met && rh2Met && rh3Met && lh1Met && lh2Met && lh3Met) {
            weaponReqStatus.textContent = '✓ All Weapons Wieldable';
            weaponReqStatus.style.color = '#4ecdc4';
        } else {
            weaponReqStatus.textContent = '⚠️ Stat Requirements Unmet';
            weaponReqStatus.style.color = '#e63946';
        }
    }

    const minInvade = Math.max(1, Math.floor(calculatedLevel * 0.9));
    const maxInvade = Math.floor(calculatedLevel * 1.1 + 20);
    if (derivedPvpEl) derivedPvpEl.textContent = `SL ${minInvade} — ${maxInvade}`;

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
    const key = getPlannerStorageKey(currentPlannerGame, activeBuildSlot);
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

buildSlotBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const slot = parseInt(e.currentTarget.getAttribute('data-slot'));
        savePlannerData();
        loadPlannerStudioData(currentPlannerGame, slot);
    });
});

if (classSelect) {
    classSelect.addEventListener('change', (e) => {
        const chosenClass = e.target.value;
        const game = currentPlannerGame;
        const config = GAME_PLANNER_CONFIG[game] || GAME_PLANNER_CONFIG.eldenring;
        const baseClassData = config.classes[chosenClass];

        currentPlannerState.className = chosenClass;
        config.stats.forEach(st => {
            const baseFloor = baseClassData.stats[st.id] !== undefined ? baseClassData.stats[st.id] : 10;
            currentPlannerState.stats[st.id] = Math.max(baseFloor, currentPlannerState.stats[st.id] || baseFloor);
        });

        renderPlannerStatsGrid();
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}

if (targetSlInput) {
    targetSlInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1;
        currentPlannerState.targetLevel = val;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}

if (buildNameInput) {
    buildNameInput.addEventListener('input', (e) => {
        currentPlannerState.buildName = e.target.value;
        triggerPlannerAutoSave();
    });
}

if (plannerNotesInput) {
    plannerNotesInput.addEventListener('input', (e) => {
        currentPlannerState.notes = e.target.value;
        triggerPlannerAutoSave();
    });
}

if (eqWeaponRh1) {
    eqWeaponRh1.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.rh1) currentPlannerState.equipment.rh1 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.rh1.name = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqUpgradeRh1) {
    eqUpgradeRh1.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.rh1) currentPlannerState.equipment.rh1 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.rh1.upgrade = e.target.value;
        triggerPlannerAutoSave();
    });
}
if (eqWeaponRh2) {
    eqWeaponRh2.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.rh2) currentPlannerState.equipment.rh2 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.rh2.name = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqUpgradeRh2) {
    eqUpgradeRh2.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.rh2) currentPlannerState.equipment.rh2 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.rh2.upgrade = e.target.value;
        triggerPlannerAutoSave();
    });
}
if (eqWeaponRh3) {
    eqWeaponRh3.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.rh3) currentPlannerState.equipment.rh3 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.rh3.name = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqUpgradeRh3) {
    eqUpgradeRh3.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.rh3) currentPlannerState.equipment.rh3 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.rh3.upgrade = e.target.value;
        triggerPlannerAutoSave();
    });
}

if (eqWeaponLh1) {
    eqWeaponLh1.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.lh1) currentPlannerState.equipment.lh1 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.lh1.name = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqUpgradeLh1) {
    eqUpgradeLh1.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.lh1) currentPlannerState.equipment.lh1 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.lh1.upgrade = e.target.value;
        triggerPlannerAutoSave();
    });
}
if (eqWeaponLh2) {
    eqWeaponLh2.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.lh2) currentPlannerState.equipment.lh2 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.lh2.name = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqUpgradeLh2) {
    eqUpgradeLh2.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.lh2) currentPlannerState.equipment.lh2 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.lh2.upgrade = e.target.value;
        triggerPlannerAutoSave();
    });
}
if (eqWeaponLh3) {
    eqWeaponLh3.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.lh3) currentPlannerState.equipment.lh3 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.lh3.name = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqUpgradeLh3) {
    eqUpgradeLh3.addEventListener('change', (e) => {
        if (!currentPlannerState.equipment.lh3) currentPlannerState.equipment.lh3 = { name: 'None', upgrade: '25' };
        currentPlannerState.equipment.lh3.upgrade = e.target.value;
        triggerPlannerAutoSave();
    });
}

if (eqArmorHead) {
    eqArmorHead.addEventListener('change', (e) => {
        currentPlannerState.equipment.head = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqArmorChest) {
    eqArmorChest.addEventListener('change', (e) => {
        currentPlannerState.equipment.chest = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqArmorArms) {
    eqArmorArms.addEventListener('change', (e) => {
        currentPlannerState.equipment.arms = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqArmorLegs) {
    eqArmorLegs.addEventListener('change', (e) => {
        currentPlannerState.equipment.legs = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}

if (eqRing1) {
    eqRing1.addEventListener('change', (e) => {
        currentPlannerState.equipment.ring1 = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqRing2) {
    eqRing2.addEventListener('change', (e) => {
        currentPlannerState.equipment.ring2 = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqRing3) {
    eqRing3.addEventListener('change', (e) => {
        currentPlannerState.equipment.ring3 = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}
if (eqRing4) {
    eqRing4.addEventListener('change', (e) => {
        currentPlannerState.equipment.ring4 = e.target.value;
        updateEquipmentAndStatCalculations();
        triggerPlannerAutoSave();
    });
}

if (btnResetStats) {
    btnResetStats.addEventListener('click', () => {
        if (!currentPlannerState) return;
        const config = GAME_PLANNER_CONFIG[currentPlannerGame] || GAME_PLANNER_CONFIG.eldenring;
        const baseClassData = config.classes[currentPlannerState.className];
        if (!baseClassData) return;

        config.stats.forEach(st => {
            const baseFloor = baseClassData.stats[st.id] !== undefined ? baseClassData.stats[st.id] : 10;
            currentPlannerState.stats[st.id] = baseFloor;
        });

        renderPlannerStatsGrid();
        updateEquipmentAndStatCalculations();
        savePlannerData();
        if (plannerSaveStatus) {
            plannerSaveStatus.textContent = 'Stats Reset!';
            plannerSaveStatus.style.color = 'var(--gold)';
        }
    });
}

const ARCHETYPE_TEMPLATES = {
    eldenring: {
        strength: { label: '⚡ Pure Strength', desc: 'Heavy Colossal / Guts Greatsword (Vig 60, Str 66, End 35)', stats: { vig: 60, mnd: 15, end: 35, str: 66, dex: 18, int: 9, fai: 15, arc: 8 } },
        dexterity: { label: '🗡️ Keen / Bleed Dex', desc: 'Katanas / Twinblades (Vig 60, Dex 70, End 25)', stats: { vig: 60, mnd: 15, end: 25, str: 18, dex: 70, int: 9, fai: 15, arc: 8 } },
        quality: { label: '⚖️ Quality 50/50', desc: 'Balanced Stance Master (Vig 55, Str 50, Dex 50, End 30)', stats: { vig: 55, mnd: 15, end: 30, str: 50, dex: 50, int: 9, fai: 15, arc: 7 } },
        sorcery: { label: '🔮 Carian Sorcerer', desc: 'Lusat / Dark Moon Ranni (Vig 50, Mnd 35, Int 80)', stats: { vig: 50, mnd: 35, end: 20, str: 12, dex: 18, int: 80, fai: 7, arc: 9 } },
        faith: { label: '✝️ Erdtree Paladin', desc: 'Blasphemous Blade / Incantations (Vig 55, Fai 70, Mnd 25)', stats: { vig: 55, mnd: 25, end: 30, str: 25, dex: 18, int: 9, fai: 70, arc: 9 } },
        arcane: { label: '🩸 Lord of Blood', desc: 'Rivers of Blood / Occult Seppuku (Vig 60, Arc 60, Dex 45)', stats: { vig: 60, mnd: 20, end: 25, str: 18, dex: 45, int: 9, fai: 15, arc: 60 } }
    },
    ds1: {
        giantdad: { label: '🗿 Giant Dad (SL99)', desc: 'Chaos Zweihander + Giant Set + FaP/Havel (Vit 48, End 66, Str 16, Dex 10)', stats: { vit: 48, att: 12, end: 66, str: 16, dex: 10, res: 11, int: 8, fai: 10 } },
        strength: { label: '⚡ Pure Strength', desc: 'Great Club / Demon Greataxe (Vit 50, Str 50, End 40)', stats: { vit: 50, att: 10, end: 40, str: 50, dex: 18, res: 11, int: 9, fai: 9 } },
        dexterity: { label: '🗡️ Dex / Pyro 45', desc: 'Great Scythe / Falchion / Max Cast Speed (Vit 50, Dex 45, Att 14)', stats: { vit: 50, att: 14, end: 40, str: 16, dex: 45, res: 11, int: 9, fai: 9 } },
        quality: { label: '⚖️ Quality 40/40', desc: 'Claymore / Halberd / Longsword (Vit 50, Str 40, Dex 40, End 40)', stats: { vit: 50, att: 10, end: 40, str: 40, dex: 40, res: 11, int: 9, fai: 9 } },
        sorcery: { label: '🔮 Logan Sorcerer', desc: 'Moonlight Greatsword / Crystal Spells (Vit 40, Int 50, Att 23)', stats: { vit: 40, att: 23, end: 35, str: 16, dex: 14, res: 11, int: 50, fai: 8 } },
        faith: { label: '✝️ Sunlight Cleric', desc: 'Sunlight Blade / Wrath of Gods (Vit 50, Fai 50, Str 28)', stats: { vit: 50, att: 16, end: 40, str: 28, dex: 14, res: 11, int: 9, fai: 50 } }
    },
    ds2: {
        strength: { label: '⚡ Ultra Strength', desc: 'Greatsword / Large Club / 105 AGI (Vig 50, Str 50, Adp 32, Vit 29)', stats: { vig: 50, end: 30, vit: 29, att: 4, str: 50, dex: 18, adp: 32, int: 3, fai: 6 } },
        dexterity: { label: '🗡️ Pure Dexterity', desc: 'Chaos Blade / Rapier / Warped Sword (Vig 50, Dex 50, Adp 32)', stats: { vig: 50, end: 30, vit: 20, att: 4, str: 20, dex: 50, adp: 32, int: 3, fai: 6 } },
        quality: { label: '⚖️ Quality 40/40', desc: 'Sun Sword / Claymore / Mastodon (Vig 50, Str 40, Dex 40, Adp 30)', stats: { vig: 50, end: 30, vit: 25, att: 4, str: 40, dex: 40, adp: 30, int: 3, fai: 6 } },
        hexer: { label: '🔮 Abyss Hexer 30/30', desc: 'Sunset Staff / Dark Orb / Resonant Weapon (Vig 40, Int 30, Fai 30, Att 30)', stats: { vig: 40, end: 20, vit: 10, att: 30, str: 12, dex: 15, adp: 20, int: 30, fai: 30 } },
        sorcery: { label: '🧙 Pure Sorcerer', desc: 'Staff of Wisdom / Soul Spear (Vig 40, Int 50, Att 40)', stats: { vig: 40, end: 20, vit: 10, att: 40, str: 10, dex: 15, adp: 18, int: 50, fai: 4 } },
        faith: { label: '✝️ Lightning Cleric', desc: 'Dragon Chime / Sunlight Spear / Defender GS (Vig 40, Fai 50, Att 30)', stats: { vig: 40, end: 20, vit: 15, att: 30, str: 20, dex: 12, adp: 20, int: 4, fai: 50 } }
    },
    ds3: {
        strength: { label: '⚡ Heavy Strength', desc: 'Ledo Hammer / Greatsword / Splitleaf (Vig 40, Str 66, End 35, Vit 25)', stats: { vig: 40, att: 10, end: 35, vit: 25, str: 66, dex: 16, int: 9, fai: 9, lck: 7 } },
        dexterity: { label: '🗡️ Sharp Dexterity', desc: 'Sellsword Winblades / Frayed Blade (Vig 40, Dex 70, End 35)', stats: { vig: 40, att: 10, end: 35, vit: 18, str: 18, dex: 70, int: 9, fai: 9, lck: 7 } },
        quality: { label: '⚖️ Quality Refined', desc: 'Lothric Knight Sword / Black Knight GS (Vig 40, Str 40, Dex 40, End 35)', stats: { vig: 40, att: 10, end: 35, vit: 20, str: 40, dex: 40, int: 9, fai: 9, lck: 7 } },
        pyromancy: { label: '🔥 Chaos / Dark Pyro', desc: 'Demon Scar / Chaos Bed / Dark Claymore (Vig 35, Int 40, Fai 40, Att 24)', stats: { vig: 35, att: 24, end: 30, vit: 15, str: 16, dex: 18, int: 40, fai: 40, lck: 7 } },
        sorcery: { label: '🔮 Court Sorcerer', desc: 'Court Sorcerer Staff / Crystal Soul Spear (Vig 35, Int 60, Att 30)', stats: { vig: 35, att: 30, end: 25, vit: 12, str: 12, dex: 18, int: 60, fai: 7, lck: 12 } },
        faith: { label: '✝️ Lightning Miracle', desc: 'Yorshka Chime / Lightning Arrow (Vig 35, Fai 60, Att 24, End 30)', stats: { vig: 35, att: 24, end: 30, vit: 15, str: 20, dex: 16, int: 9, fai: 60, lck: 7 } },
        hollow: { label: '🩸 Hollow / Bleed', desc: 'Onikiri & Ubadachi / Warden Twinblades (Vig 40, Lck 40, Dex 40, Str 27)', stats: { vig: 40, att: 10, end: 30, vit: 15, str: 27, dex: 40, int: 9, fai: 9, lck: 40 } }
    },
    bloodborne: {
        strength: { label: '🪓 Heavy Strength', desc: 'Whirligig Saw / Kirkhammer / Beast Cutter (Vit 50, End 20, Str 50, Skl 25, Arc 15)', stats: { vit: 50, end: 20, str: 50, skl: 25, blt: 5, arc: 15 } },
        skill: { label: '🗡️ Visceral Skill', desc: 'Rakuyo / Threaded Cane / Blade of Mercy (Vit 50, End 20, Skl 50, Str 25)', stats: { vit: 50, end: 20, str: 25, skl: 50, blt: 5, arc: 10 } },
        quality: { label: '⚖️ Quality Cleaver', desc: 'Saw Cleaver / Ludwig Holy Blade (Vit 50, End 20, Str 45, Skl 45)', stats: { vit: 50, end: 20, str: 45, skl: 45, blt: 5, arc: 5 } },
        bloodtinge: { label: '🩸 Pure Bloodtinge', desc: 'Chikage / Evelyn / Bloodletter (Vit 50, End 20, Blt 50, Skl 25)', stats: { vit: 50, end: 20, str: 14, skl: 25, blt: 50, arc: 6 } },
        arcane: { label: '🌌 99 Arcane Spells', desc: 'A Call Beyond / Kos Parasite / Executioner Gloves (Vit 40, Arc 99)', stats: { vit: 40, end: 15, str: 16, skl: 12, blt: 5, arc: 99 } },
        str_arc: { label: '⚡ Moonlight / Wheel', desc: 'Holy Moonlight Sword / Logarius Wheel (Vit 50, Str 50, Arc 50)', stats: { vit: 50, end: 20, str: 50, skl: 12, blt: 5, arc: 50 } }
    },
    demonssouls: {
        strength: { label: '⚡ Crushing Smasher', desc: 'Dragon Bone Smasher / Crushing Great Axe (Vit 50, End 40, Str 50, Fai 16)', stats: { vit: 50, int: 15, end: 40, str: 50, dex: 18, mag: 6, fai: 16, luk: 7 } },
        dexterity: { label: '🗡️ Sharp Kilij / Uchi', desc: 'Sharp Kilij / Hiltless / Sticky Longbow (Vit 50, End 40, Dex 50, Fai 16)', stats: { vit: 50, int: 15, end: 40, str: 18, dex: 50, mag: 6, fai: 16, luk: 7 } },
        quality: { label: '⚖️ Quality Balanced', desc: 'Quality Claymore / Knight Sword (Vit 50, End 40, Str 35, Dex 35)', stats: { vit: 50, int: 15, end: 40, str: 35, dex: 35, mag: 6, fai: 16, luk: 7 } },
        magic: { label: '🔮 Royalty Sorcerer', desc: 'Crescent Falchion / Insanity Catalyst / Firestorm (Vit 40, Mag 50, Int 30)', stats: { vit: 40, int: 30, end: 25, str: 12, dex: 12, mag: 50, fai: 16, luk: 7 } },
        faith: { label: '✝️ Blessed Moonlight', desc: 'Blessed Mirdan Hammer / Large Sword of Moonlight (Vit 50, Fai 50, End 40)', stats: { vit: 50, int: 15, end: 40, str: 20, dex: 12, mag: 6, fai: 50, luk: 7 } },
        blueblood: { label: '🌟 Blueblood Luck', desc: 'Blueblood Sword + Light Weapon (Vit 40, Luk 30, Str 18, Dex 18, Mag 18, Fai 18)', stats: { vit: 40, int: 15, end: 30, str: 18, dex: 18, mag: 18, fai: 18, luk: 30 } }
    },
    sekiro: {
        early: { label: '🥷 Early Ashina', desc: 'Early progression milestone (AP 3, Vit 12, Gourd 4)', stats: { ap: 3, vit: 12, beads: 8, gourd: 4, emblems: 16, sen: 500 } },
        mid: { label: '⚔️ Mid Game Shinobi', desc: 'Ashina Castle / Senpou Temple (AP 7, Vit 15, Gourd 7)', stats: { ap: 7, vit: 15, beads: 20, gourd: 7, emblems: 18, sen: 2000 } },
        endgame: { label: '🏆 Master Shinobi', desc: 'Fountainhead / Sword Saint (AP 14, Vit 20, Gourd 9, Beads 40)', stats: { ap: 14, vit: 20, beads: 40, gourd: 9, emblems: 20, sen: 9999 } },
        ngplus: { label: '🔥 NG+ Veteran', desc: 'High NG+ / Gauntlets of Strength (AP 40, Vit 20, Gourd 9, Beads 40)', stats: { ap: 40, vit: 20, beads: 40, gourd: 9, emblems: 20, sen: 50000 } }
    },
    eldenringnightreign: {
        nightblade: { label: '🗡️ Nightblade Striker', desc: 'Agile void striker (Vig 45, Agi 50, Mgt 40, Arc 20)', stats: { vig: 45, foc: 20, sta: 30, mgt: 40, agi: 50, sor: 9, inc: 9, arc: 20 } },
        voidmage: { label: '🌌 Void Sorcerer', desc: 'Night sorceries mastery (Vig 40, Sor 60, Foc 40, Arc 40)', stats: { vig: 40, foc: 40, sta: 20, mgt: 10, agi: 20, sor: 60, inc: 9, arc: 40 } },
        duskknight: { label: '🛡️ Dusk Templar', desc: 'Heavy might & night incantations (Vig 50, Mgt 50, Inc 50, Sta 35)', stats: { vig: 50, foc: 25, sta: 35, mgt: 50, agi: 15, sor: 9, inc: 50, arc: 10 } },
        outcast: { label: '⚖️ Balanced Outcast', desc: 'Jack-of-all-trades nightwalker (Vig 45, Mgt 35, Agi 35, Sor 25, Inc 25)', stats: { vig: 45, foc: 25, sta: 30, mgt: 35, agi: 35, sor: 25, inc: 25, arc: 25 } }
    }
};

function renderArchetypePresetChips() {
    const container = document.getElementById('preset-chips-scroll');
    if (!container) return;
    container.innerHTML = '';
    const game = currentPlannerGame;
    const gameTemplates = ARCHETYPE_TEMPLATES[game] || ARCHETYPE_TEMPLATES.eldenring;

    Object.keys(gameTemplates).forEach(presetKey => {
        const item = gameTemplates[presetKey];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'preset-chip';
        btn.setAttribute('data-preset', presetKey);
        btn.title = item.desc || item.label;
        btn.textContent = item.label;
        btn.addEventListener('click', () => {
            applyArchetypePreset(presetKey);
        });
        container.appendChild(btn);
    });
}

function applyArchetypePreset(presetKey) {
    if (!currentPlannerState) return;
    const game = currentPlannerGame;
    const config = GAME_PLANNER_CONFIG[game] || GAME_PLANNER_CONFIG.eldenring;
    const baseClassData = config.classes[currentPlannerState.className];
    if (!baseClassData) return;

    const gameTemplates = ARCHETYPE_TEMPLATES[game] || ARCHETYPE_TEMPLATES.eldenring;
    const templateObj = gameTemplates[presetKey];
    if (!templateObj) return;
    const targetStats = templateObj.stats || templateObj;

    let invested = 0;
    config.stats.forEach(st => {
        const baseFloor = baseClassData.stats[st.id] !== undefined ? baseClassData.stats[st.id] : 10;
        const targetVal = targetStats[st.id] !== undefined ? targetStats[st.id] : baseFloor;
        const finalVal = Math.max(baseFloor, targetVal);
        currentPlannerState.stats[st.id] = finalVal;
        if (finalVal > baseFloor) {
            invested += (finalVal - baseFloor);
        }
    });

    const calculatedLevel = baseClassData.lvl + invested;
    currentPlannerState.targetLevel = calculatedLevel;
    if (targetSlInput) targetSlInput.value = calculatedLevel;

    renderPlannerStatsGrid();
    updateEquipmentAndStatCalculations();
    savePlannerData();
    if (plannerSaveStatus) {
        plannerSaveStatus.textContent = `Template Applied (${config.levelName || 'SL'} ${calculatedLevel})!`;
        plannerSaveStatus.style.color = 'var(--gold)';
    }
}

document.querySelectorAll('.deck-tab-btn').forEach(tabBtn => {
    tabBtn.addEventListener('click', (e) => {
        const targetDeck = e.currentTarget.getAttribute('data-deck');
        document.querySelectorAll('.deck-tab-btn').forEach(btn => btn.classList.toggle('active', btn === e.currentTarget));
        document.querySelectorAll('.deck-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `deck-pane-${targetDeck}`);
        });
    });
});

if (btnClearGear) {
    btnClearGear.addEventListener('click', () => {
        if (!currentPlannerState) return;
        currentPlannerState.equipment = {
            rh1: { name: 'None', upgrade: '25' },
            rh2: { name: 'None', upgrade: '25' },
            rh3: { name: 'None', upgrade: '25' },
            lh1: { name: 'None', upgrade: '25' },
            lh2: { name: 'None', upgrade: '25' },
            lh3: { name: 'None', upgrade: '25' },
            head: 'None', chest: 'None', arms: 'None', legs: 'None',
            ring1: 'None', ring2: 'None', ring3: 'None', ring4: 'None'
        };

        const eqSelects = [
            eqWeaponRh1, eqWeaponRh2, eqWeaponRh3,
            eqWeaponLh1, eqWeaponLh2, eqWeaponLh3,
            eqArmorHead, eqArmorChest, eqArmorArms, eqArmorLegs,
            eqRing1, eqRing2, eqRing3, eqRing4
        ];
        eqSelects.forEach(sel => {
            if (sel) sel.value = 'None';
        });

        updateEquipmentAndStatCalculations();
        savePlannerData();
        if (plannerSaveStatus) {
            plannerSaveStatus.textContent = 'Gear Cleared!';
            plannerSaveStatus.style.color = 'var(--gold)';
        }
    });
}

document.querySelectorAll('.slot-clear-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-target');
        const sel = document.getElementById(targetId);
        if (!sel || !currentPlannerState) return;

        sel.value = 'None';
        sel.dispatchEvent(new Event('change'));
    });
});

if (btnCopyBuild) {
    btnCopyBuild.addEventListener('click', () => {
        if (!currentPlannerState) return;
        const game = currentPlannerGame;
        const config = GAME_PLANNER_CONFIG[game] || GAME_PLANNER_CONFIG.eldenring;
        const lvl = calcCurrentLevelEl ? calcCurrentLevelEl.textContent : '125';
        const buildTitle = currentPlannerState.buildName.trim() || 'Custom Build';

        let statLines = [];
        config.stats.forEach(st => {
            const val = currentPlannerState.stats[st.id] || 10;
            statLines.push(`${st.label}: ${val}`);
        });

        const eq = currentPlannerState.equipment || {};
        const summaryText = [
            `⚔️ **GitGud Build Snapshot: ${buildTitle}**`,
            `🎮 Game: ${config.title} | Starting Class: ${currentPlannerState.className} | Calculated Level: ${lvl}`,
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            `📊 **Attributes**:`,
            `• ${statLines.join(' | ')}`,
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            `🛡️ **Armaments & Loadout**:`,
            `• RH: ${eq.rh1?.name || 'None'} (+${eq.rh1?.upgrade || 25}), ${eq.rh2?.name || 'None'}, ${eq.rh3?.name || 'None'}`,
            `• LH: ${eq.lh1?.name || 'None'} (+${eq.lh1?.upgrade || 25}), ${eq.lh2?.name || 'None'}, ${eq.lh3?.name || 'None'}`,
            `• Armor: Head: ${eq.head || 'None'} | Chest: ${eq.chest || 'None'} | Arms: ${eq.arms || 'None'} | Legs: ${eq.legs || 'None'}`,
            `• Accessories: ${eq.ring1 || 'None'}, ${eq.ring2 || 'None'}, ${eq.ring3 || 'None'}, ${eq.ring4 || 'None'}`,
            `• Combat Ratings: HP: ${derivedHpEl?.textContent || ''} | FP: ${derivedFpEl?.textContent || ''} | Stamina: ${derivedStaminaEl?.textContent || ''}`,
            `• Mobility: ${calcRollGaugeEl?.textContent || ''}`,
            `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            currentPlannerState.notes ? `📜 **Notes**: ${currentPlannerState.notes}` : ''
        ].filter(Boolean).join('\n');

        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(summaryText).then(() => {
                if (plannerSaveStatus) {
                    plannerSaveStatus.textContent = '✨ Build Copied to Clipboard!';
                    plannerSaveStatus.style.color = '#4ecdc4';
                }
            }).catch(() => {
                alert('Build summary:\n\n' + summaryText);
            });
        } else {
            alert('Build summary:\n\n' + summaryText);
        }
    });
}

document.querySelectorAll('.equip-search-filter').forEach(filterInput => {
    filterInput.addEventListener('input', (e) => {
        const targetId = e.target.getAttribute('data-target');
        const sel = document.getElementById(targetId);
        if (!sel || !sel._fullItemList) return;

        const query = e.target.value.trim().toLowerCase();
        const currentVal = sel.value;

        if (!query) {
            renderSelectOptions(sel, sel._fullItemList, currentVal);
        } else {
            const matches = sel._fullItemList.filter(item => 
                item.name.toLowerCase().includes(query) || item.name === 'None' || item.name === currentVal
            );
            renderSelectOptions(sel, matches, currentVal);
            if (matches.length > 0 && !matches.some(m => m.name === currentVal)) {
                const topMatch = matches.find(m => m.name !== 'None') || matches[0];
                sel.value = topMatch.name;
                sel.dispatchEvent(new Event('change'));
            }
        }
    });
});

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

        let queryMatch = true;
        if (query) {
            queryMatch = fullContent.includes(query);
        }

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

function openModal(modal) {
    if (modal) modal.style.display = 'flex';
}

function closeAllModals() {
    if (modalMastery) modalMastery.style.display = 'none';
    if (modalBackup) modalBackup.style.display = 'none';
    if (modalJournal) modalJournal.style.display = 'none';
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
    if (e.target === modalMastery || e.target === modalBackup || e.target === modalJournal) {
        closeAllModals();
    }
});

// ========================================================
// 8.5 HOMEPAGE CONTROLLER & GAME SELECTION HUB
// ========================================================
const HOME_GAMES = [
    {
        id: 'eldenring',
        name: 'Elden Ring',
        subtitle: '+ Shadow of the Erdtree',
        icon: 'img/eldenring.png',
        bg: 'img/bg-eldenring.jpg',
        trophies: 42,
        hasWalkthrough: true,
        hasPlanner: true,
        desc: 'The Lands Between · All Shardbearers, Legendary Armaments, Talismans & Questlines.'
    },
    {
        id: 'ds1',
        name: 'Dark Souls Remastered',
        subtitle: 'Lordran Classic',
        icon: 'img/ds1.png',
        bg: 'img/bg-ds1.jpg',
        trophies: 41,
        hasWalkthrough: true,
        hasPlanner: true,
        desc: "Knight's Honor rare weapons, all sorceries, pyromancies, miracles & covenants."
    },
    {
        id: 'ds2',
        name: 'Dark Souls 2: SotFS',
        subtitle: 'Scholar of the First Sin',
        icon: 'img/ds2.png',
        bg: 'img/bg-ds2.jpg',
        trophies: 38,
        hasWalkthrough: true,
        hasPlanner: true,
        desc: 'Master of Hexes, sorceries, miracles, pyromancies, gestures & DLC bonfires.'
    },
    {
        id: 'ds3',
        name: 'Dark Souls 3',
        subtitle: 'The Fire Fades',
        icon: 'img/ds3.png',
        bg: 'img/bg-ds3.jpg',
        trophies: 43,
        hasWalkthrough: true,
        hasPlanner: true,
        desc: 'Master of Rings (+1/+2/+3), covenants, spell masteries & Usurpation of Fire.'
    },
    {
        id: 'bloodborne',
        name: 'Bloodborne',
        subtitle: '+ The Old Hunters',
        icon: 'img/bloodborne.png',
        bg: 'img/bg-bloodborne.jpg',
        trophies: 34,
        hasWalkthrough: true,
        hasPlanner: true,
        desc: "Hunter's Essence trick weapons, hunter craft tools, chalice bosses & 3 cords."
    },
    {
        id: 'sekiro',
        name: 'Sekiro: Shadows Die Twice',
        subtitle: 'GOTY Edition',
        icon: 'img/sekiro.png',
        bg: 'img/bg-sekiro.jpg',
        trophies: 34,
        hasWalkthrough: true,
        hasPlanner: false,
        desc: 'Prosthetic tools, skills, prayer beads, gourd seeds & all 4 story endings.'
    },
    {
        id: 'demonssouls',
        name: "Demon's Souls",
        subtitle: 'PS5 / Classic',
        icon: 'img/demonssouls.png',
        bg: 'img/bg-demonssouls.jpg',
        trophies: 37,
        hasWalkthrough: true,
        hasPlanner: false,
        desc: "Sage's Trophy, Saint's Trophy, King of Rings, Bladestone & World Tendency."
    },
    {
        id: 'liesofp',
        name: 'Lies of P',
        subtitle: 'Pinocchio Soulslike',
        icon: 'img/liesofp.png',
        bg: 'img/bg-liesofp.jpg',
        trophies: 43,
        hasWalkthrough: false,
        hasPlanner: false,
        desc: 'Special weapons, normal weapons, cryptic vessels, records, gestures & endings.'
    },
    {
        id: 'eldenringnightreign',
        name: 'Elden Ring Nightreign',
        subtitle: 'Co-op Survival',
        icon: 'img/eldenring_nightreign.png',
        bg: 'img/bg-nightreign.jpg',
        trophies: 36,
        hasWalkthrough: false,
        hasPlanner: false,
        desc: 'Nightfall expeditions, Night Sovereigns, hero archetypes & survival milestones.'
    }
];

function renderHomeGamesGrid() {
    const grid = document.getElementById('home-games-grid');
    if (!grid) return;
    grid.innerHTML = '';

    HOME_GAMES.forEach(game => {
        const card = document.createElement('div');
        card.className = 'home-game-card';
        card.id = `home-card-${game.id}`;

        const bannerStyle = `background-image: url('${game.bg}');`;

        card.innerHTML = `
            <div class="home-game-banner" style="${bannerStyle}">
                <div class="home-game-header-content">
                    <img src="${game.icon}" alt="${game.name}" class="home-game-icon">
                    <div class="home-game-title-box">
                        <h3 class="home-game-name">${game.name}</h3>
                        ${game.subtitle ? `<span class="home-game-subtitle">${game.subtitle}</span>` : ''}
                    </div>
                    <span class="home-game-trophy-badge">🏆 ${game.trophies}</span>
                </div>
            </div>
            <div class="home-game-body">
                <p class="home-game-desc">${game.desc}</p>
                <div class="home-game-actions">
                    <button type="button" class="btn-game-launch launch-plat" data-action="platinum" data-game="${game.id}">
                        <span>🏆 Platinum</span>
                    </button>
                    ${game.hasWalkthrough ? `
                    <button type="button" class="btn-game-launch" data-action="walkthrough" data-game="${game.id}">
                        <span>📜 Guide</span>
                    </button>` : ''}
                    ${game.hasPlanner ? `
                    <button type="button" class="btn-game-launch" data-action="planner" data-game="${game.id}">
                        <span>⚔️ Build</span>
                    </button>` : ''}
                </div>
            </div>
        `;

        card.querySelectorAll('.btn-game-launch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = e.currentTarget.getAttribute('data-action');
                const gId = e.currentTarget.getAttribute('data-game');
                launchGameFromHome(gId, action);
            });
        });

        card.addEventListener('click', () => {
            launchGameFromHome(game.id, 'platinum');
        });

        grid.appendChild(card);
    });
}

function launchGameFromHome(gameId, mode = 'platinum') {
    if (mode === 'walkthrough') {
        currentWalkthroughGame = gameId;
        currentPlatinumGame = gameId;
        setMode('walkthrough');
        loadWalkthroughData(gameId);
    } else if (mode === 'planner') {
        currentPlannerGame = gameId;
        setMode('planner');
        loadPlannerStudioData(gameId, activeBuildSlot);
    } else {
        currentPlatinumGame = gameId;
        setMode('platinum');
        loadGameData(gameId);
    }
    triggerHaptic('light');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadHomeView() {
    currentMode = 'home';

    // Clear active selections on sidebar
    document.querySelectorAll('.sidebar .game-select').forEach(btn => {
        btn.style.borderLeft = '';
        btn.classList.remove('active-game');
    });

    modePlatinumBtn.classList.remove('active');
    modeWalkthroughBtn.classList.remove('active');
    if (modePlannerBtn) modePlannerBtn.classList.remove('active');

    // Sidebar lists
    listPlatinum.classList.add('hidden-list');
    listWalkthrough.classList.add('hidden-list');
    if (listPlanner) listPlanner.classList.add('hidden-list');
    listPlatinum.style.display = 'none';
    listWalkthrough.style.display = 'none';
    if (listPlanner) listPlanner.style.display = 'none';

    // Main header and tracker sections visibility
    if (mainHeader) mainHeader.style.display = 'none';
    if (quickJumpContainer) quickJumpContainer.style.display = 'none';
    if (trackerContainer) trackerContainer.style.display = 'none';
    if (plannerStudioContainer) plannerStudioContainer.style.display = 'none';
    if (walkthroughToolbar) walkthroughToolbar.style.display = 'none';
    if (saveDisclaimer) saveDisclaimer.style.display = 'none';

    if (homeViewContainer) {
        homeViewContainer.style.display = 'block';
        renderHomeGamesGrid();
    }

    // Set background theme
    document.body.className = document.body.className.replace(/theme-(?!accent-)\S+/g, '').trim();
    document.body.classList.add('theme-home');

    brandSubtitle.textContent = 'Soulsborne Assistant';
    document.title = 'GitGud | Soulsborne Platinum Tracker, Walkthroughs & Build Planner';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', 'GitGud - Your ultimate Soulsborne companion: 100% Platinum trophy checklists, step-by-step missable walkthroughs, and character build planner for Elden Ring, Dark Souls 1-3, Bloodborne, Sekiro, Demon\'s Souls & Lies of P.');
    }

    handleBackToTopVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================================
// 9. 3-MODE SWITCHING (Platinum vs Guide vs Planner)
// ========================================================
function setMode(mode) {
    currentMode = mode;

    if (homeViewContainer) homeViewContainer.style.display = 'none';
    if (mainHeader) mainHeader.style.display = 'block';

    if (mode === 'platinum') {
        modePlatinumBtn.classList.add('active');
        modeWalkthroughBtn.classList.remove('active');
        if (modePlannerBtn) modePlannerBtn.classList.remove('active');

        listPlatinum.classList.remove('hidden-list');
        listWalkthrough.classList.add('hidden-list');
        if (listPlanner) listPlanner.classList.add('hidden-list');

        listPlatinum.style.display = '';
        listWalkthrough.style.display = 'none';
        if (listPlanner) listPlanner.style.display = 'none';

        brandSubtitle.textContent = 'Platinum Tracker';
        guideBadge.style.display = 'none';
        if (plannerBadge) plannerBadge.style.display = 'none';

        progressContainer.style.display = 'block';
        searchFilterSection.style.display = 'block';
        if (saveDisclaimer) saveDisclaimer.style.display = 'block';
        trackerContainer.style.display = '';
        if (plannerStudioContainer) plannerStudioContainer.style.display = 'none';

        if (filterChipsContainer) filterChipsContainer.style.display = 'none';
        if (globalSearchInput) globalSearchInput.placeholder = 'Search trophies, bosses, weapons, spells, items...';
        activeFilterTag = 'all';

        walkthroughToolbar.style.display = 'flex';
        if (tbJumpToggle) {
            tbJumpToggle.textContent = '⚡ Trophy Jump';
            tbJumpToggle.title = 'Toggle Quick Trophy Jump list';
            tbJumpToggle.classList.add('active');
        }
        if (quickJumpContainer) quickJumpContainer.style.display = 'block';
        if (quickJumpTitle) quickJumpTitle.textContent = '🏆 QUICK TROPHY JUMP';
        if (quickJumpHint) quickJumpHint.textContent = 'Click any trophy to jump directly to requirements';

        if (hideCompleted) {
            trackerContainer.classList.add('hide-completed');
        } else {
            trackerContainer.classList.remove('hide-completed');
        }
        handleBackToTopVisibility();

        loadGameData(currentPlatinumGame);
    } else if (mode === 'walkthrough') {
        modePlatinumBtn.classList.remove('active');
        modeWalkthroughBtn.classList.add('active');
        if (modePlannerBtn) modePlannerBtn.classList.remove('active');

        listPlatinum.classList.add('hidden-list');
        listWalkthrough.classList.remove('hidden-list');
        if (listPlanner) listPlanner.classList.add('hidden-list');

        listPlatinum.style.display = 'none';
        listWalkthrough.style.display = '';
        if (listPlanner) listPlanner.style.display = 'none';

        brandSubtitle.textContent = 'Playthrough Guide';
        guideBadge.style.display = 'inline-block';
        if (plannerBadge) plannerBadge.style.display = 'none';

        progressContainer.style.display = 'block';
        searchFilterSection.style.display = 'block';
        if (saveDisclaimer) saveDisclaimer.style.display = 'block';
        trackerContainer.style.display = '';
        if (plannerStudioContainer) plannerStudioContainer.style.display = 'none';

        // Show filter chips in Walkthrough mode
        if (filterChipsContainer) filterChipsContainer.style.display = 'flex';
        if (globalSearchInput) globalSearchInput.placeholder = 'Search walkthrough steps, items, bosses, locations...';

        walkthroughToolbar.style.display = 'flex';
        if (tbJumpToggle) {
            tbJumpToggle.textContent = '⚡ Chapters Jump';
            tbJumpToggle.title = 'Toggle Quick Chapter Jump list';
            tbJumpToggle.classList.add('active');
        }
        if (quickJumpContainer) quickJumpContainer.style.display = 'block';
        if (quickJumpTitle) quickJumpTitle.textContent = '⚡ QUICK CHAPTER JUMP';
        if (quickJumpHint) quickJumpHint.textContent = 'Click any chapter to jump directly';

        if (hideCompleted) {
            trackerContainer.classList.add('hide-completed');
        } else {
            trackerContainer.classList.remove('hide-completed');
        }
        handleBackToTopVisibility();

        const availableWalkthroughs = ['ds1', 'ds2', 'ds3', 'sekiro', 'bloodborne', 'eldenring', 'demonssouls'];
        if (availableWalkthroughs.includes(currentPlatinumGame)) {
            currentWalkthroughGame = currentPlatinumGame;
        } else {
            currentWalkthroughGame = 'ds1';
        }
        loadWalkthroughData(currentWalkthroughGame);
    } else if (mode === 'planner') {
        modePlatinumBtn.classList.remove('active');
        modeWalkthroughBtn.classList.remove('active');
        if (modePlannerBtn) modePlannerBtn.classList.add('active');

        listPlatinum.classList.add('hidden-list');
        listWalkthrough.classList.add('hidden-list');
        if (listPlanner) listPlanner.classList.remove('hidden-list');

        listPlatinum.style.display = 'none';
        listWalkthrough.style.display = 'none';
        if (listPlanner) listPlanner.style.display = '';

        brandSubtitle.textContent = 'Character Build Studio';
        guideBadge.style.display = 'none';
        if (plannerBadge) plannerBadge.style.display = 'inline-block';

        progressContainer.style.display = 'none';
        searchFilterSection.style.display = 'none';
        if (saveDisclaimer) saveDisclaimer.style.display = 'none';
        trackerContainer.style.display = 'none';
        if (plannerStudioContainer) plannerStudioContainer.style.display = 'block';

        walkthroughToolbar.style.display = 'none';
        quickJumpContainer.style.display = 'none';
        handleBackToTopVisibility();

        const supportedPlannerGames = ['ds1', 'ds2', 'ds3', 'bloodborne', 'eldenring'];
        if (supportedPlannerGames.includes(currentPlatinumGame)) {
            currentPlannerGame = currentPlatinumGame;
        } else {
            currentPlannerGame = 'eldenring';
        }

        if (listPlanner) {
            listPlanner.querySelectorAll('.game-select').forEach(btn => {
                btn.style.borderLeft = '';
                btn.classList.remove('active-game');
            });
            const activeBtn = listPlanner.querySelector(`[data-game="${currentPlannerGame}"]`);
            if (activeBtn) {
                activeBtn.style.borderLeft = '3px solid var(--gold)';
                activeBtn.classList.add('active-game');
            }
        }

        loadPlannerStudioData(currentPlannerGame, activeBuildSlot);
    }
}

modePlatinumBtn.addEventListener('click', () => setMode('platinum'));
modeWalkthroughBtn.addEventListener('click', () => setMode('walkthrough'));
if (modePlannerBtn) modePlannerBtn.addEventListener('click', () => setMode('planner'));

// Sidebar Logo / Title Home button
if (sidebarBrandBtn) {
    sidebarBrandBtn.addEventListener('click', () => {
        loadHomeView();
    });
}

// Home Hero & CTA action buttons
const btnHeroMastery = document.getElementById('btn-hero-mastery');
if (btnHeroMastery) {
    btnHeroMastery.addEventListener('click', () => {
        if (modalMastery) {
            modalMastery.style.display = 'flex';
            loadMasteryDashboard();
        }
    });
}

const btnHomeOpenBackup = document.getElementById('btn-home-open-backup');
if (btnHomeOpenBackup) {
    btnHomeOpenBackup.addEventListener('click', () => {
        if (modalBackup) {
            modalBackup.style.display = 'flex';
        }
    });
}

// ========================================================
// 10. GAME SELECTION EVENT LISTENERS
// ========================================================
listPlatinum.querySelectorAll('.game-select').forEach(button => {
    button.addEventListener('click', (e) => {
        const gameId = e.currentTarget.getAttribute('data-game') || e.currentTarget.id.replace('btn-', '');
        currentPlatinumGame = gameId;
        loadGameData(gameId);
    });
});

listWalkthrough.querySelectorAll('.game-select').forEach(button => {
    button.addEventListener('click', (e) => {
        const gameId = e.currentTarget.getAttribute('data-game');
        currentWalkthroughGame = gameId;
        loadWalkthroughData(gameId);
    });
});

if (listPlanner) {
    listPlanner.querySelectorAll('.game-select').forEach(button => {
        button.addEventListener('click', (e) => {
            const gameId = e.currentTarget.getAttribute('data-game');
            currentPlannerGame = gameId;
            listPlanner.querySelectorAll('.game-select').forEach(btn => {
                btn.style.borderLeft = '';
                btn.classList.remove('active-game');
            });
            e.currentTarget.style.borderLeft = '3px solid var(--gold)';
            e.currentTarget.classList.add('active-game');
            loadPlannerStudioData(gameId, activeBuildSlot);
        });
    });
}

// ========================================================
// 11. PLATINUM TRACKER DATA & RENDER
// ========================================================
const TROPHY_CATEGORY_NAMES = {
    // Dark Souls 1
    category_bosses: '⚔️ All Bosses',
    category_covenants: '🤝 Discover All Covenants',
    category_rare_weapons_knights_honor: "🗡️ Knight's Honor (Rare Weapons)",
    category_sorceries: '🔮 Wisdom of a Sage (Sorceries)',
    category_sorceries_wisdom_of_a_sage: '🔮 Wisdom of a Sage (Sorceries)',
    category_pyromancies: '🔥 Bond of a Pyromancer (Pyromancies)',
    category_pyromancies_bond_of_a_pyromancer: '🔥 Bond of a Pyromancer',
    category_miracles: '✝️ Prayer of a Maiden (Miracles)',
    category_miracles_prayer_of_a_maiden: '✝️ Prayer of a Maiden (Miracles)',
    category_quests: '🗣️ NPC Quests & Stories',
    category_endings: '🏆 All Endings',
    category_story: '📜 Story Milestones',
    category_story_and_bosses: '⚔️ Story & Bosses',
    category_weapon_ascensions: '⚒️ Weapon Ascensions',
    category_reinforcement_trophies: '⚒️ Weapon Reinforcements',

    // Dark Souls 2
    category_hexes: '🌑 Master of Hexes',
    category_primal_bonfires: '🔥 Primal Bonfires',
    category_npc_and_misc: '🗣️ NPCs & Miscellaneous',
    category_gestures: '🙌 Master of Gestures',

    // Dark Souls 3
    category_rings: '💍 Master of Rings',
    category_miscellaneous: '✨ Miscellaneous Trophies',

    // Bloodborne
    category_story_and_chalice_bosses: '⚔️ Story & Chalice Bosses',
    category_optional_bosses: '💀 Optional Bosses',
    category_hunter_craft_tools: "🛠️ Hunter's Craft (Special Tools)",
    category_trick_weapons_hunters_essence: "🗡️ Hunter's Essence (Trick Weapons)",
    category_firearms_hunters_essence: "🔫 Hunter's Essence (Firearms)",
    category_chalice_and_upgrades: '🏆 Chalice & Blood Gem Master',

    // Elden Ring
    category_shardbearers: '👑 Shardbearers',
    category_trophy_bosses: '⚔️ Trophy Bosses',
    category_legendary_armaments: '🗡️ Legendary Armaments',
    category_legendary_ashen_remains: '👻 Legendary Ashen Remains',
    category_legendary_sorceries_incantations: '✨ Legendary Spells & Incantations',
    category_legendary_talismans: '💍 Legendary Talismans',

    // Sekiro
    category_prosthetic_tools: '🦾 Master of the Prosthetic',
    category_skills_and_ninjutsu: '🥷 Master of the Arts (Skills)',
    category_gourd_seeds: '🍶 Ultimate Healing Gourd',
    category_prayer_beads: '📿 Peak Physical Strength (Beads)',
    category_exploration_and_milestones: '🗺️ Exploration & Milestones',

    // Demon's Souls
    category_sorceries_sages_trophy: "🔮 Sage's Trophy (All Sorceries)",
    category_miracles_saints_trophy: "✝️ Saint's Trophy (All Miracles)",
    category_rings_king_of_rings: '💍 King of Rings (All Rings)',
    category_miscellaneous_milestones: '✨ World Tendency & Milestones',

    // Lies of P
    category_story_bosses: '⚔️ Story Bosses',
    category_combat_and_exploration: '⚡ Combat & Exploration',
    category_collections_and_milestones: '📜 Collections & Records',
    category_upgrades_and_quests: '🔧 Upgrades & Special Quests',

    // Elden Ring Nightreign
    category_nightfall_expeditions: '🌑 Nightfall Expeditions',
    category_night_sovereigns_and_bosses: '👑 Night Sovereigns & Bosses',
    category_hero_archetypes_and_mastery: '⚔️ Hero Mastery',
    category_legendary_night_relics: '💍 Legendary Night Relics',
    category_night_armaments_and_forge: '🗡️ Night Armaments & Forge',
    category_refuge_and_survival_milestones: '🛡️ Refuge & Survival'
};

// ========================================================
// DYNAMIC SEO & SEARCH METADATA MANAGER
// ========================================================
const GAME_SEO_METADATA = {
    ds1: {
        name: 'Dark Souls Remastered',
        platinum: "Dark Souls Remastered 100% Platinum Checklist & Rare Weapons | GitGud",
        walkthrough: "Dark Souls Remastered Step-by-Step Missable Walkthrough Guide | GitGud",
        planner: "Dark Souls Remastered Character Build Studio & Stat Planner | GitGud",
        desc: "Complete Dark Souls 100% platinum checklist: Knight's Honor rare weapons, all sorceries, pyromancies, miracles, covenants, and missable NPC quests."
    },
    ds2: {
        name: 'Dark Souls 2: Scholar of the First Sin',
        platinum: "Dark Souls 2: SotFS All Spells, Hexes & Platinum Checklist | GitGud",
        walkthrough: "Dark Souls 2 Scholar of the First Sin Step-by-Step Guide | GitGud",
        planner: "Dark Souls 2 Character Build Studio & Agility Calculator | GitGud",
        desc: "Dark Souls 2 100% completion tracker: all hexes, gestures, NPC questlines, primal bonfires, and trophy requirements."
    },
    ds3: {
        name: 'Dark Souls 3',
        platinum: "Dark Souls 3 Master of Rings, Spells & 100% Platinum Checklist | GitGud",
        walkthrough: "Dark Souls 3 Step-by-Step Playthrough & Missables Guide | GitGud",
        planner: "Dark Souls 3 Character Build Studio & Stat Planner | GitGud",
        desc: "Dark Souls 3 100% achievement tracker: Master of Rings (+1, +2, +3 rings), all gestures, covenants, sorceries, miracles, and pyromancies."
    },
    bloodborne: {
        name: 'Bloodborne',
        platinum: "Bloodborne 100% Platinum Checklist, Weapons & Chalice Dungeons | GitGud",
        walkthrough: "Bloodborne Step-by-Step Playthrough & NPC Questlines Guide | GitGud",
        planner: "Bloodborne Trick Weapon & Character Build Studio | GitGud",
        desc: "Bloodborne trophy tracker: Hunter's Essence all trick weapons & firearms, Hunter's Craft special tools, chalice dungeon bosses, and all endings."
    },
    sekiro: {
        name: 'Sekiro: Shadows Die Twice',
        platinum: "Sekiro: Shadows Die Twice 100% Achievement & Ending Checklist | GitGud",
        walkthrough: "Sekiro Step-by-Step Missable Walkthrough & Prayer Beads Guide | GitGud",
        desc: "Sekiro 100% checklist: all prosthetic tools & upgrades, skills, gourd seeds, prayer beads, bosses, and all 4 story endings."
    },
    eldenring: {
        name: 'Elden Ring',
        platinum: "Elden Ring 100% Platinum Checklist, Legendary Armaments & Talismans | GitGud",
        walkthrough: "Elden Ring Step-by-Step Questlines & Boss Walkthrough Guide | GitGud",
        planner: "Elden Ring Character Build Calculator & Armor Optimizer | GitGud",
        desc: "Elden Ring completion companion: all legendary armaments, ashes, talismans, spells, shardbearers, and complete NPC questline trackers."
    },
    eldenringnightreign: {
        name: 'Elden Ring Nightreign',
        platinum: "Elden Ring Nightreign Checklist, Expeditions & Boss Tracker | GitGud",
        desc: "Elden Ring Nightreign checklist: Nightfall expeditions, Night Sovereigns, hero mastery, legendary relics, and survival milestones."
    },
    demonssouls: {
        name: "Demon's Souls",
        platinum: "Demon's Souls 100% Platinum Checklist, Spells & World Tendency | GitGud",
        walkthrough: "Demon's Souls Step-by-Step Playthrough & Tendency Guide | GitGud",
        desc: "Demon's Souls trophy companion: Sage's Trophy (all spells), Saint's Trophy (all miracles), King of Rings, Pure Bladestone, and World Tendency tracker."
    },
    liesofp: {
        name: 'Lies of P',
        platinum: "Lies of P 100% Platinum Trophy Checklist, Records & Weapons | GitGud",
        desc: "Lies of P achievement guide: all special weapons, normal weapons, cryptic vessels, records, gestures, trinity keys, and truth/lie endings."
    }
};

function updatePageSEO(gameId, mode = 'platinum') {
    const meta = GAME_SEO_METADATA[gameId] || GAME_SEO_METADATA.ds1;
    const title = meta[mode] || meta.platinum || 'GitGud | Soulsborne Platinum Tracker, Walkthroughs & Build Planner';
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && meta.desc) {
        metaDesc.setAttribute('content', meta.desc);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);
}

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
        updatePageSEO(gameId, 'platinum');
        applySearchAndFilter();
    } catch (error) {
        trackerContainer.innerHTML = '<h2>Data not found. Please check data files.</h2>';
    }
}

function renderTracker(gameId) {
    if (chapterJumpGrid) {
        chapterJumpGrid.innerHTML = '';
        Object.keys(currentGameData).forEach(key => {
            if (key === 'game') return;

            const displayName = TROPHY_CATEGORY_NAMES[key] || ('🏆 ' + key.replace('category_', '').replace(/_/g, ' ').toUpperCase());
            const totalCount = currentGameData[key].reduce((acc, item) => acc + (item.steps ? item.steps.length : 1), 0);

            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'chapter-pill';
            pill.id = `pill-cat-${key}`;
            pill.innerHTML = `
                <span>${displayName}</span>
                <span class="pill-count" id="pill-count-${key}">[ 0/${totalCount} ]</span>
            `;

            pill.addEventListener('click', () => {
                const target = document.getElementById(`category-${key}`);
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
    }

    trackerContainer.innerHTML = '';
    
    Object.keys(currentGameData).forEach(key => {
        if (key === 'game') return;
        
        const categoryBlock = document.createElement('div');
        categoryBlock.id = `category-${key}`;
        categoryBlock.className = 'category-block chapter-card';
        
        const headerRow = document.createElement('div');
        headerRow.className = 'category-header-row';

        const title = document.createElement('h3');
        title.className = 'category-title collapsible';
        const displayName = TROPHY_CATEGORY_NAMES[key] || ('🏆 ' + key.replace('category_', '').replace(/_/g, ' ').toUpperCase());
        title.innerHTML = `${displayName} <span class="toggle-icon">▼</span>`;
        
        const checkAllBtn = document.createElement('button');
        checkAllBtn.type = 'button';
        checkAllBtn.className = 'category-check-all-btn';
        checkAllBtn.id = `btn-checkall-${key}`;
        checkAllBtn.title = 'Complete or reset all requirements in this section';
        checkAllBtn.innerHTML = '✓ Complete All';

        checkAllBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCategoryComplete(gameId, key);
        });

        headerRow.appendChild(title);
        headerRow.appendChild(checkAllBtn);

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
        
        categoryBlock.appendChild(headerRow);
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

function toggleCategoryComplete(gameId, key) {
    if (!currentGameData || !currentGameData[key]) return;

    let total = 0;
    let completed = 0;
    const itemsToToggle = [];

    currentGameData[key].forEach(item => {
        if (item.steps) {
            item.steps.forEach(step => {
                total++;
                const storageKey = `${gameId}_${step.id}`;
                if (getSavedState(storageKey)) completed++;
                itemsToToggle.push({ id: step.id, storageKey });
            });
        } else {
            total++;
            const storageKey = `${gameId}_${item.id}`;
            if (getSavedState(storageKey)) completed++;
            itemsToToggle.push({ id: item.id, storageKey });
        }
    });

    const targetState = completed < total;

    itemsToToggle.forEach(({ id, storageKey }) => {
        setSavedState(storageKey, targetState);
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.checked = targetState;
            const parentDiv = checkbox.closest('.tracker-item, .walkthrough-item');
            if (parentDiv) {
                parentDiv.classList.toggle('item-completed', targetState);
            }
        }
    });

    if (targetState) {
        triggerHaptic('light');
    }

    updateProgress(gameId);
    if (activeFilterTag === 'incomplete') applySearchAndFilter();
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
            triggerHaptic('light');
        } else {
            itemDiv.classList.remove('item-completed');
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

        const pill = document.getElementById(`pill-cat-${key}`);
        const pillCount = document.getElementById(`pill-count-${key}`);
        if (pillCount) {
            pillCount.textContent = `[ ${catCompleted}/${catTotal} ]`;
        }
        if (pill) {
            if (catPercentage === 100) {
                pill.classList.add('completed');
            } else {
                pill.classList.remove('completed');
            }
        }

        const checkAllBtn = document.getElementById(`btn-checkall-${key}`);
        if (checkAllBtn) {
            if (catPercentage === 100) {
                checkAllBtn.innerHTML = '↺ Reset All';
                checkAllBtn.classList.add('completed');
            } else {
                checkAllBtn.innerHTML = '✓ Complete All';
                checkAllBtn.classList.remove('completed');
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
        updatePageSEO(gameId, 'walkthrough');
        applySearchAndFilter();
    } catch (error) {
        trackerContainer.innerHTML = '<h2>Walkthrough data not found. Please check data files.</h2>';
    }
}

function renderWalkthrough(gameId) {
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

    trackerContainer.innerHTML = '';
    
    currentWalkthroughData.chapters.forEach((chapter, idx) => {
        const chapterBlock = document.createElement('div');
        chapterBlock.className = 'category-block chapter-card';
        chapterBlock.id = `chapter-${chapter.id}`;
        
        const headerRow = document.createElement('div');
        headerRow.className = 'category-header-row';

        const title = document.createElement('h3');
        title.className = 'category-title collapsible';
        title.innerHTML = `
            <span>${idx + 1}. ${chapter.title}</span>
            <span class="toggle-icon">▼</span>
        `;

        const checkAllBtn = document.createElement('button');
        checkAllBtn.type = 'button';
        checkAllBtn.className = 'category-check-all-btn';
        checkAllBtn.id = `btn-checkall-ch-${chapter.id}`;
        checkAllBtn.title = 'Complete or reset all steps in this chapter';
        checkAllBtn.innerHTML = '✓ Complete All';

        checkAllBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWalkthroughChapterComplete(gameId, chapter);
        });

        headerRow.appendChild(title);
        headerRow.appendChild(checkAllBtn);
        
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
        
        chapterBlock.appendChild(headerRow);
        chapterBlock.appendChild(catProgressContainer);
        
        chapter.items.forEach(item => {
            contentInner.appendChild(createWalkthroughItem(gameId, item, chapter.id));
        });
        
        contentWrapper.appendChild(contentInner);
        chapterBlock.appendChild(contentWrapper);
        trackerContainer.appendChild(chapterBlock);
    });
}

function toggleWalkthroughChapterComplete(gameId, chapter) {
    if (!chapter || !chapter.items) return;

    let total = 0;
    let completed = 0;
    const itemsToToggle = [];

    chapter.items.forEach(item => {
        total++;
        const storageKey = item.id;
        if (getSavedState(storageKey)) completed++;
        itemsToToggle.push({ id: item.id, storageKey });
    });

    const targetState = completed < total;

    itemsToToggle.forEach(({ id, storageKey }) => {
        setSavedState(storageKey, targetState);
        const checkbox = document.getElementById(`wt_${id}`);
        if (checkbox) {
            checkbox.checked = targetState;
            const parentDiv = checkbox.closest('.tracker-item, .walkthrough-item');
            if (parentDiv) {
                parentDiv.classList.toggle('item-completed', targetState);
            }
        }
    });

    if (targetState) {
        triggerHaptic('light');
    }

    updateWalkthroughProgress(gameId);
    if (activeFilterTag === 'incomplete') applySearchAndFilter();
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
            triggerHaptic('light');
        } else {
            itemDiv.classList.remove('item-completed');
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

        const checkAllBtn = document.getElementById(`btn-checkall-ch-${chapter.id}`);
        if (checkAllBtn) {
            if (chPercentage === 100) {
                checkAllBtn.innerHTML = '↺ Reset All';
                checkAllBtn.classList.add('completed');
            } else {
                checkAllBtn.innerHTML = '✓ Complete All';
                checkAllBtn.classList.remove('completed');
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

const mainContentElement = document.querySelector('.content');

function scrollToTop() {
    if (mainContentElement) {
        mainContentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (document.documentElement) {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (document.body) {
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function handleBackToTopVisibility() {
    if (!btnBackToTop) return;
    const contentScroll = mainContentElement ? mainContentElement.scrollTop : 0;
    const windowScroll = (typeof window !== 'undefined' ? window.scrollY : 0) || (document.documentElement ? document.documentElement.scrollTop : 0) || (document.body ? document.body.scrollTop : 0) || 0;
    const currentScroll = Math.max(contentScroll, windowScroll);

    if (currentScroll > 200) {
        btnBackToTop.style.display = 'flex';
    } else {
        btnBackToTop.style.display = 'none';
    }
}

if (btnBackToTop) {
    btnBackToTop.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    document.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    if (mainContentElement) {
        mainContentElement.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    }
}

// ========================================================
// 14. INITIALIZE COMPLETION BADGES ON STARTUP
// ========================================================
async function initTracker() {
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
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            refreshing = true;
            window.location.reload();
        }
    });

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then(reg => {
            reg.update();
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            newWorker.postMessage({ type: 'SKIP_WAITING' });
                        }
                    });
                }
            });
            console.log('GitGud PWA ServiceWorker active & updated:', reg.scope);
        }).catch(err => {
            console.log('PWA ServiceWorker registration failed:', err);
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            navigator.serviceWorker.getRegistration().then(reg => {
                if (reg) reg.update();
            });
        }
    });
}

renderProfileSelect();
loadPlannerStudioData(currentPlannerGame, activeBuildSlot);
loadHomeView();
initTracker();