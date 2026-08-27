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

// Tarnished Journal DOM elements
const journalCard = document.getElementById('tarnished-journal-card');
const btnCloseJournal = document.getElementById('btn-close-journal');
const journalSaveStatus = document.getElementById('journal-save-status');
const journalNotesInput = document.getElementById('journal-notes-input');
const journalHeadingText = document.getElementById('journal-heading-text');
const journalStatsGrid = document.getElementById('journal-stats-grid');

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
// 5. TARNISHED JOURNAL & BUILD NOTES ENGINE
// ========================================================
let journalDebounceTimer = null;

function getActiveGameId() {
    return currentMode === 'platinum' ? currentPlatinumGame : currentWalkthroughGame;
}

function getJournalStorageKey() {
    const profile = getActiveProfile();
    const game = getActiveGameId();
    return `journal_${profile}__${game}`;
}

function loadJournalData() {
    const key = getJournalStorageKey();
    let data = { notes: '', stats: {} };
    try {
        const raw = localStorage.getItem(key);
        if (raw) data = JSON.parse(raw);
    } catch (e) {}

    if (journalNotesInput) journalNotesInput.value = data.notes || '';
    Object.keys(statInputs).forEach(stat => {
        if (statInputs[stat]) {
            statInputs[stat].value = data.stats && data.stats[stat] ? data.stats[stat] : '';
        }
    });
}

function saveJournalData() {
    const key = getJournalStorageKey();
    const statsObj = {};
    Object.keys(statInputs).forEach(stat => {
        if (statInputs[stat]) statsObj[stat] = statInputs[stat].value;
    });

    const data = {
        notes: journalNotesInput ? journalNotesInput.value : '',
        stats: statsObj
    };

    localStorage.setItem(key, JSON.stringify(data));
    if (journalSaveStatus) {
        journalSaveStatus.textContent = 'Saved';
        journalSaveStatus.style.color = 'var(--gold)';
    }
}

function triggerJournalAutoSave() {
    if (journalSaveStatus) {
        journalSaveStatus.textContent = 'Saving...';
        journalSaveStatus.style.color = '#e0c896';
    }
    clearTimeout(journalDebounceTimer);
    journalDebounceTimer = setTimeout(saveJournalData, 500);
}

if (journalNotesInput) {
    journalNotesInput.addEventListener('input', triggerJournalAutoSave);
}
Object.values(statInputs).forEach(input => {
    if (input) input.addEventListener('input', triggerJournalAutoSave);
});

if (btnToggleJournal) {
    btnToggleJournal.addEventListener('click', () => {
        if (!journalCard) return;
        const isHidden = journalCard.style.display === 'none';
        journalCard.style.display = isHidden ? 'block' : 'none';
        btnToggleJournal.classList.toggle('active', isHidden);
        if (isHidden) {
            loadJournalData();
            journalCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
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
        if (key && (key.startsWith('profile_') || key.startsWith('journal_') || key.includes('_'))) {
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
    loadJournalData();
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
    { id: 'ds1', name: 'Dark Souls 1', icon: 'img/ds1.png' },
    { id: 'ds2', name: 'Dark Souls 2', icon: 'img/ds2.png' },
    { id: 'ds3', name: 'Dark Souls 3', icon: 'img/ds3.png' },
    { id: 'sekiro', name: 'Sekiro', icon: 'img/sekiro.png' },
    { id: 'bloodborne', name: 'Bloodborne', icon: 'img/bloodborne.png' },
    { id: 'eldenring', name: 'Elden Ring', icon: 'img/eldenring.png' },
    { id: 'eldenringnightreign', name: 'ER Nightreign', icon: 'img/eldenring_nightreign.png' },
    { id: 'demonssouls', name: "Demon's Souls", icon: 'img/demonssouls.png' },
    { id: 'liesofp', name: 'Lies of P', icon: 'img/liesofp.png' }
];

async function loadMasteryDashboard() {
    const trophyGrid = document.getElementById('mastery-trophy-grid');
    const globalPctEl = document.getElementById('mastery-global-pct');
    const globalCountEl = document.getElementById('mastery-global-count');
    const platCountEl = document.getElementById('mastery-plat-count');

    if (!trophyGrid) return;
    trophyGrid.innerHTML = '<div style="color: var(--gold); padding: 20px;">Gathering Soulsborne archives...</div>';

    let totalUniverseItems = 0;
    let completedUniverseItems = 0;
    let platinumEarnedCount = 0;
    const gameStats = [];

    for (const g of GAME_METADATA) {
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
            if (pct === 100) platinumEarnedCount++;
            totalUniverseItems += gTotal;
            completedUniverseItems += gCompleted;

            gameStats.push({ ...g, total: gTotal, completed: gCompleted, pct });
        } catch (e) {}
    }

    const universalPct = totalUniverseItems === 0 ? 0 : Math.round((completedUniverseItems / totalUniverseItems) * 100);
    if (globalPctEl) globalPctEl.textContent = `${universalPct}%`;
    if (globalCountEl) globalCountEl.textContent = `${completedUniverseItems.toLocaleString()} / ${totalUniverseItems.toLocaleString()}`;
    if (platCountEl) platCountEl.textContent = `${platinumEarnedCount} / ${GAME_METADATA.length}`;

    trophyGrid.innerHTML = '';
    gameStats.forEach(g => {
        const card = document.createElement('div');
        card.className = `mastery-game-card ${g.pct === 100 ? 'completed' : ''}`;
        card.innerHTML = `
            <img src="${g.icon}" alt="${g.name}" class="mastery-game-icon">
            <div class="mastery-game-info">
                <span class="mastery-game-name">${g.name}</span>
                <span class="mastery-game-pct">${g.pct === 100 ? '🏆 100% PLATINUM' : `${g.pct}% (${g.completed}/${g.total})`}</span>
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

        const availableWalkthroughs = ['ds1', 'ds2', 'ds3', 'eldenring'];
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
        const target = quickJumpContainer.style.display !== 'none' ? quickJumpContainer : document.querySelector('.content header');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const walkthroughGames = ['ds1', 'ds2', 'ds3', 'eldenring'];
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