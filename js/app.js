/**
 * GitGud Soulsborne Assistant & Platinum Tracker
 * Comprehensive Companion Application Logic
 * Architecture: Clean Vanilla ES6+ Modular State Management
 */

// Lucide Icons Render Utility
function refreshLucideIcons() {
    if (typeof lucide !== 'undefined' && lucide && typeof lucide.createIcons === 'function') {
        try {
            lucide.createIcons();
        } catch (e) {
            console.warn('Lucide icon render notice:', e);
        }
    }
}

// ========================================================
// 1. GLOBAL GAME REGISTRY & METADATA
// ========================================================
const GAMES_REGISTRY = [
    {
        id: 'eldenring',
        name: 'Elden Ring',
        subtitle: 'Shadow of the Erdtree Edition',
        icon: 'img/eldenring.png',
        bg: 'img/bg-eldenring.jpg',
        trophies: 42,
        hasWalkthrough: true,
        hasPlanner: true,
        desc: 'Legendary Armaments, Talismans, Spells, Ashen Remains, Boss Remembrances and Endings.'
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
        desc: "Knight's Honor rare weapons, all sorceries, pyromancies, miracles and covenants."
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
        desc: 'Master of Hexes, sorceries, miracles, pyromancies, gestures and DLC bonfires.'
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
        desc: 'Master of Rings (+1/+2/+3), covenants, spell masteries and Usurpation of Fire.'
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
        desc: "Hunter's Essence trick weapons, hunter craft tools, chalice bosses and 3 cords."
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
        desc: 'Prosthetic tools, skills, prayer beads, gourd seeds and all 4 story endings.'
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
        desc: "Sage's Trophy, Saint's Trophy, King of Rings, Bladestone and World Tendency."
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
        desc: 'Special weapons, normal weapons, cryptic vessels, records, gestures and endings.'
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
        desc: 'Nightfall expeditions, Night Sovereigns, hero archetypes and survival milestones.'
    }
];

// ========================================================
// 1.5. THEME MODE MANAGEMENT (Light / Dark)
// ========================================================
let currentThemeMode = localStorage.getItem('gitgud_theme_mode') || 'dark';

function applyThemeMode(mode) {
    currentThemeMode = mode;
    localStorage.setItem('gitgud_theme_mode', mode);

    const isLight = mode === 'light';
    document.body.classList.toggle('theme-mode-light', isLight);
    document.body.classList.toggle('theme-mode-dark', !isLight);

    // Update Mobile Drawer Label & Icon
    const mobLabel = document.getElementById('mobile-theme-label');
    const mobBtn = document.getElementById('mobile-theme-toggle-btn');
    if (mobLabel) {
        mobLabel.textContent = isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme';
    }
    if (mobBtn) {
        const icon = mobBtn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isLight ? 'moon' : 'sun-medium');
        }
    }

    // Update background image overlay if currently in game view
    if (document.body.classList.contains('game-view-active') && currentActiveGame) {
        const game = GAMES_REGISTRY.find(g => g.id === currentActiveGame) || GAMES_REGISTRY[0];
        const overlay = isLight
            ? 'radial-gradient(circle at 50% 0%, rgba(247, 245, 240, 0.85) 0%, rgba(247, 245, 240, 0.96) 80%)'
            : 'radial-gradient(circle at 50% 0%, rgba(12, 11, 10, 0.76) 0%, rgba(12, 11, 10, 0.94) 80%)';
        document.body.style.backgroundImage = `${overlay}, url('${game.bg}')`;
    }

    refreshLucideIcons();
}

function toggleThemeMode() {
    const nextMode = currentThemeMode === 'dark' ? 'light' : 'dark';
    applyThemeMode(nextMode);
    triggerHaptic('light');
}

function initThemeMode() {
    applyThemeMode(currentThemeMode);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleThemeMode);
    }

    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', () => {
            toggleThemeMode();
            closeMobileDrawer();
        });
    }
}

// ========================================================
// 2. STATE MANAGEMENT & PROFILE STORAGE
// ========================================================
let currentMode = 'home'; // 'home' | 'platinum' | 'walkthrough' | 'planner'
let currentActiveGame = 'eldenring';
let activeBuildSlot = '0';
let activeProfile = localStorage.getItem('gitgud_active_profile') || 'Default';
let hideCompleted = localStorage.getItem('gitgud_hide_completed') === 'true';
let activeFilterTag = 'all';
let currentSearchQuery = '';

// Multi-Character Profile Management & Staggered Menu Engine
function getProfilesList() {
    try {
        const stored = localStorage.getItem('gitgud_profiles_list');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {}
    return ['Default'];
}

function saveProfilesList(list) {
    localStorage.setItem('gitgud_profiles_list', JSON.stringify(list));
}

function renderProfileDropdown() {
    const listEl = document.getElementById('profile-items-list');
    const nameEl = document.getElementById('nav-active-profile-name');
    const countEl = document.getElementById('profile-menu-count');
    const deleteBtn = document.getElementById('btn-action-delete-profile');

    const profiles = getProfilesList();
    if (!profiles.includes(activeProfile)) {
        activeProfile = profiles[0] || 'Default';
        localStorage.setItem('gitgud_active_profile', activeProfile);
    }

    if (nameEl) nameEl.textContent = activeProfile;
    if (countEl) countEl.textContent = `${profiles.length} ${profiles.length === 1 ? 'Profile' : 'Profiles'}`;
    updateMobileProfileDisplay();

    if (deleteBtn) {
        deleteBtn.style.display = (activeProfile === 'Default' || profiles.length <= 1) ? 'none' : 'flex';
    }

    if (listEl) {
        listEl.innerHTML = '';
        profiles.forEach((prof, idx) => {
            const isActive = prof === activeProfile;
            const li = document.createElement('li');
            li.className = `profile-option-item ${isActive ? 'active' : ''}`;
            li.setAttribute('role', 'menuitem');
            li.setAttribute('tabindex', '0');
            li.style.setProperty('--item-index', idx);

            li.innerHTML = `
                <div class="profile-option-left">
                    <span class="profile-option-avatar">
                        <i data-lucide="user" class="profile-avatar-glyph"></i>
                    </span>
                    <span class="profile-option-name">${prof}</span>
                </div>
                ${isActive ? '<i data-lucide="check" class="profile-check-icon"></i>' : ''}
            `;

            li.addEventListener('click', (e) => {
                e.stopPropagation();
                switchProfile(prof);
            });

            li.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    switchProfile(prof);
                }
            });

            listEl.appendChild(li);
        });
    }

    refreshLucideIcons();
}

function closeProfileDropdown() {
    const dropdown = document.getElementById('nav-profile-dropdown');
    const trigger = document.getElementById('btn-profile-trigger');
    if (dropdown) dropdown.classList.remove('open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
}

function toggleProfileDropdown() {
    const dropdown = document.getElementById('nav-profile-dropdown');
    const trigger = document.getElementById('btn-profile-trigger');
    if (!dropdown) return;
    const isOpen = dropdown.classList.toggle('open');
    if (trigger) trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
        refreshLucideIcons();
    }
}

function switchProfile(newProfileName) {
    if (activeProfile === newProfileName) {
        closeProfileDropdown();
        return;
    }
    activeProfile = newProfileName;
    localStorage.setItem('gitgud_active_profile', activeProfile);
    closeProfileDropdown();
    renderProfileDropdown();
    triggerHaptic('success');

    // Reload active game data under new profile scope
    if (currentMode === 'platinum') {
        loadPlatinumGameData(currentActiveGame);
    } else if (currentMode === 'walkthrough') {
        loadWalkthroughGameData(currentActiveGame);
    } else if (currentMode === 'planner') {
        loadPlannerData(currentActiveGame);
    }
}

function createNewProfile() {
    const name = prompt('Enter a name for your new character profile:', `Hunter ${getProfilesList().length + 1}`);
    if (!name || !name.trim()) return;
    const cleanName = name.trim().slice(0, 24);
    const profiles = getProfilesList();
    if (!profiles.includes(cleanName)) {
        profiles.push(cleanName);
        saveProfilesList(profiles);
    }
    switchProfile(cleanName);
}

function renameActiveProfile() {
    if (activeProfile === 'Default') {
        alert('The Default profile name cannot be renamed.');
        return;
    }
    const newName = prompt(`Enter a new name for profile "${activeProfile}":`, activeProfile);
    if (!newName || !newName.trim() || newName.trim() === activeProfile) return;
    const cleanName = newName.trim().slice(0, 24);
    const profiles = getProfilesList();

    if (profiles.includes(cleanName)) {
        alert(`A profile named "${cleanName}" already exists.`);
        return;
    }

    // Migrate storage keys from old name to new name
    const oldPrefix = `gitgud_prof_${activeProfile}__`;
    const newPrefix = `gitgud_prof_${cleanName}__`;
    const keysToMigrate = [];
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(oldPrefix)) keysToMigrate.push(k);
    }
    keysToMigrate.forEach(k => {
        const val = localStorage.getItem(k);
        const newKey = k.replace(oldPrefix, newPrefix);
        localStorage.setItem(newKey, val);
        localStorage.removeItem(k);
    });

    const idx = profiles.indexOf(activeProfile);
    if (idx !== -1) profiles[idx] = cleanName;
    saveProfilesList(profiles);
    switchProfile(cleanName);
}

function deleteActiveProfile() {
    if (activeProfile === 'Default') {
        alert('The Default profile cannot be deleted.');
        return;
    }
    const profiles = getProfilesList();
    if (profiles.length <= 1) {
        alert('You must have at least one profile.');
        return;
    }
    if (confirm(`Are you sure you want to delete profile "${activeProfile}" and all its saved progress?`)) {
        const prefix = `gitgud_prof_${activeProfile}__`;
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith(prefix)) keysToRemove.push(k);
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));

        const updated = profiles.filter(p => p !== activeProfile);
        saveProfilesList(updated);
        switchProfile('Default');
    }
}

function initProfileDropdown() {
    renderProfileDropdown();

    const trigger = document.getElementById('btn-profile-trigger');
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleProfileDropdown();
        });
    }

    const addBtn = document.getElementById('btn-action-add-profile');
    if (addBtn) {
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeProfileDropdown();
            createNewProfile();
        });
    }

    const renameBtn = document.getElementById('btn-action-rename-profile');
    if (renameBtn) {
        renameBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeProfileDropdown();
            renameActiveProfile();
        });
    }

    const deleteBtn = document.getElementById('btn-action-delete-profile');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeProfileDropdown();
            deleteActiveProfile();
        });
    }

    // Dismiss on click outside
    document.addEventListener('click', (e) => {
        closeAllCustomDropdowns();
    });
}

// ========================================================
// 1.8. REUSABLE UNIVERSAL CUSTOM STAGGERED SELECT ENGINE
// ========================================================
function closeAllCustomDropdowns() {
    closeProfileDropdown();
    document.querySelectorAll('.custom-staggered-select.open').forEach(sel => {
        sel.classList.remove('open');
        const trig = sel.querySelector('.custom-staggered-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
    });
}

function createStaggeredCustomSelect({
    container,
    id,
    icon = 'shield',
    options = [],
    selectedValue = '',
    placeholder = 'Select option...',
    onChange = () => {}
}) {
    if (!container) return null;
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 'custom-staggered-select';
    if (id) root.id = `custom-select-${id}`;

    let currentVal = selectedValue !== undefined ? selectedValue : (options[0]?.value ?? '');
    let selectedOption = options.find(o => String(o.value) === String(currentVal)) || options[0] || { label: placeholder, value: '' };

    // Trigger Button
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'custom-staggered-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    trigger.innerHTML = `
        <div class="custom-staggered-trigger-left">
            <i data-lucide="${icon}" class="custom-staggered-icon"></i>
            <span class="custom-staggered-trigger-label">${selectedOption.label}</span>
            ${selectedOption.extra ? `<span class="custom-staggered-trigger-extra">${selectedOption.extra}</span>` : ''}
        </div>
        <i data-lucide="chevron-down" class="custom-staggered-chevron"></i>
    `;

    // Dropdown Menu Card
    const menu = document.createElement('div');
    menu.className = 'custom-staggered-menu';

    // Sticky Realtime Gear Search Header
    const searchWrap = document.createElement('div');
    searchWrap.className = 'custom-dropdown-search-wrap';
    searchWrap.innerHTML = `
        <i data-lucide="search" class="custom-dropdown-search-icon"></i>
        <input type="text" class="custom-dropdown-search-input" placeholder="Search gear..." autocomplete="off" spellcheck="false" aria-label="Search gear options">
        <button type="button" class="custom-dropdown-search-clear" style="display: none;" aria-label="Clear gear search">✕</button>
    `;
    searchWrap.addEventListener('click', (e) => e.stopPropagation());
    menu.appendChild(searchWrap);

    const searchInput = searchWrap.querySelector('.custom-dropdown-search-input');
    const searchClear = searchWrap.querySelector('.custom-dropdown-search-clear');

    const optionsList = document.createElement('ul');
    optionsList.className = 'custom-dropdown-options-list';
    optionsList.setAttribute('role', 'listbox');
    menu.appendChild(optionsList);

    const emptyFeedback = document.createElement('div');
    emptyFeedback.className = 'custom-dropdown-empty-state';
    emptyFeedback.style.display = 'none';
    emptyFeedback.textContent = 'No matching gear found';
    menu.appendChild(emptyFeedback);

    function filterOptions() {
        const query = (searchInput.value || '').toLowerCase().trim();
        searchClear.style.display = query ? 'flex' : 'none';
        let visibleCount = 0;

        optionsList.querySelectorAll('.custom-staggered-option').forEach(li => {
            const name = (li.querySelector('.custom-option-name')?.textContent || '').toLowerCase();
            const extra = (li.querySelector('.custom-option-extra')?.textContent || '').toLowerCase();
            const matches = !query || name.includes(query) || extra.includes(query);
            li.style.display = matches ? 'flex' : 'none';
            if (matches) visibleCount++;
        });

        emptyFeedback.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    searchInput.addEventListener('input', filterOptions);

    searchClear.addEventListener('click', (e) => {
        e.stopPropagation();
        searchInput.value = '';
        searchInput.focus();
        filterOptions();
    });

    searchInput.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Escape') {
            closeAllCustomDropdowns();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const firstVisible = Array.from(optionsList.querySelectorAll('.custom-staggered-option')).find(el => el.style.display !== 'none');
            if (firstVisible) firstVisible.click();
        }
    });

    // Populate Options
    options.forEach((opt, idx) => {
        const isSelected = String(opt.value) === String(currentVal);
        const li = document.createElement('li');
        li.className = `custom-staggered-option ${isSelected ? 'active' : ''}`;
        li.setAttribute('role', 'option');
        li.setAttribute('tabindex', '0');
        li.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        li.style.setProperty('--item-index', Math.min(idx, 15));

        li.innerHTML = `
            <div class="custom-option-left">
                <span class="custom-option-name">${opt.label}</span>
                ${opt.extra ? `<span class="custom-option-extra">${opt.extra}</span>` : ''}
            </div>
            ${isSelected ? '<i data-lucide="check" class="custom-check-icon"></i>' : ''}
        `;

        li.addEventListener('click', (e) => {
            e.stopPropagation();
            currentVal = opt.value;
            selectedOption = opt;

            const labelEl = trigger.querySelector('.custom-staggered-trigger-label');
            if (labelEl) labelEl.textContent = opt.label;

            let extraEl = trigger.querySelector('.custom-staggered-trigger-extra');
            if (opt.extra) {
                if (!extraEl) {
                    extraEl = document.createElement('span');
                    extraEl.className = 'custom-staggered-trigger-extra';
                    trigger.querySelector('.custom-staggered-trigger-left').appendChild(extraEl);
                }
                extraEl.textContent = opt.extra;
            } else if (extraEl) {
                extraEl.remove();
            }

            optionsList.querySelectorAll('.custom-staggered-option').forEach(item => {
                item.classList.remove('active');
                item.setAttribute('aria-selected', 'false');
                const check = item.querySelector('.custom-check-icon');
                if (check) check.remove();
            });
            li.classList.add('active');
            li.setAttribute('aria-selected', 'true');
            li.insertAdjacentHTML('beforeend', '<i data-lucide="check" class="custom-check-icon"></i>');

            closeAllCustomDropdowns();
            refreshLucideIcons();
            triggerHaptic('light');
            onChange(opt.value, opt);
        });

        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                li.click();
            }
        });

        optionsList.appendChild(li);
    });

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasOpen = root.classList.contains('open');
        closeAllCustomDropdowns();
        if (!wasOpen) {
            root.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
            searchInput.value = '';
            filterOptions();
            setTimeout(() => {
                searchInput.focus();
            }, 60);
            refreshLucideIcons();
        }
    });

    root.appendChild(trigger);
    root.appendChild(menu);
    container.appendChild(root);
    refreshLucideIcons();

    return {
        getValue: () => currentVal,
        setValue: (val) => {
            const opt = options.find(o => String(o.value) === String(val));
            if (opt) {
                currentVal = val;
                selectedOption = opt;
                const labelEl = trigger.querySelector('.custom-staggered-trigger-label');
                if (labelEl) labelEl.textContent = opt.label;
                let extraEl = trigger.querySelector('.custom-staggered-trigger-extra');
                if (opt.extra) {
                    if (!extraEl) {
                        extraEl = document.createElement('span');
                        extraEl.className = 'custom-staggered-trigger-extra';
                        trigger.querySelector('.custom-staggered-trigger-left').appendChild(extraEl);
                    }
                    extraEl.textContent = opt.extra;
                } else if (extraEl) {
                    extraEl.remove();
                }
            }
        }
    };
}

// Helper: Scoped LocalStorage Key for Active Profile
function getStorageKey(key) {
    return `gitgud_prof_${activeProfile}__${key}`;
}

function getSavedState(key) {
    return localStorage.getItem(getStorageKey(key)) === 'true';
}

function setSavedState(key, val) {
    if (val) {
        localStorage.setItem(getStorageKey(key), 'true');
    } else {
        localStorage.removeItem(getStorageKey(key));
    }
}

// Haptic feedback for tactile satisfaction
function triggerHaptic(type = 'light') {
    if ('vibrate' in navigator) {
        if (type === 'success') navigator.vibrate([15, 40, 20]);
        else navigator.vibrate(10);
    }
}

// Universal Game Data Normalizer: converts category_* keys into standard categories array
function normalizeGameData(rawData) {
    if (!rawData) return { game: '', categories: [] };
    if (Array.isArray(rawData.categories)) return rawData;

    const categories = [];
    Object.keys(rawData).forEach(key => {
        if (key.startsWith('category_') && Array.isArray(rawData[key])) {
            const rawCatName = key.replace('category_', '').replace(/_/g, ' ');
            const formattedName = rawCatName
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');

            categories.push({
                id: key,
                name: formattedName,
                items: rawData[key]
            });
        }
    });

    return {
        game: rawData.game || '',
        categories: categories
    };
}

let lastCelebratedGame = null;

function showMasteryToast(gameName) {
    const toast = document.getElementById('toast-mastery-banner');
    const toastGame = document.getElementById('toast-mastery-game');
    if (!toast) return;

    if (toastGame) toastGame.textContent = `${gameName} — 100% Codex Mastery Acquired`;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3600);
}

// ========================================================
// 3. NAVIGATION & MODE SWITCHING
// ========================================================
const tabHome = document.getElementById('tab-mode-home');
const tabPlatinum = document.getElementById('tab-mode-platinum');
const tabWalkthrough = document.getElementById('tab-mode-walkthrough');
const tabPlanner = document.getElementById('tab-mode-planner');
const headerGlassNav = document.getElementById('header-glass-nav');

const navCenterTitle = document.getElementById('nav-center-title');
const navModesTabs = document.getElementById('nav-modes-tabs');

const viewHome = document.getElementById('view-home');
const viewPlatinum = document.getElementById('view-platinum');
const viewWalkthrough = document.getElementById('view-walkthrough');
const viewPlanner = document.getElementById('view-planner');

function setAppMode(mode, targetGameId = null) {
    if (targetGameId) {
        currentActiveGame = targetGameId;
    }

    currentMode = mode;

    // Update views
    [viewHome, viewPlatinum, viewWalkthrough, viewPlanner].forEach(v => {
        if (v) {
            v.style.display = 'none';
            v.classList.remove('page-enter-slide');
        }
    });

    closeMobileDrawer();

    let targetView = null;

    if (mode === 'home') {
        targetView = viewHome;
        document.body.classList.add('state-mode-home');
        document.body.classList.remove('state-mode-game');

        // Reset fullscreen background to home ambient radial gradient
        document.body.classList.remove('game-view-active');
        document.body.style.backgroundImage = '';

        document.title = 'GitGud | Soulsborne Platinum Tracker, Walkthroughs & Build Planner';
        renderElasticGallery();
    } else {
        // Active Game Mode
        document.body.classList.remove('state-mode-home');
        document.body.classList.add('state-mode-game');

        const game = GAMES_REGISTRY.find(g => g.id === currentActiveGame) || GAMES_REGISTRY[0];

        // Apply Fullscreen Atmospheric Game Background with Light/Dark adaptive overlay
        document.body.classList.add('game-view-active');
        const isLight = document.body.classList.contains('theme-mode-light');
        const overlay = isLight
            ? 'radial-gradient(circle at 50% 0%, rgba(247, 245, 240, 0.85) 0%, rgba(247, 245, 240, 0.96) 80%)'
            : 'radial-gradient(circle at 50% 0%, rgba(12, 11, 10, 0.76) 0%, rgba(12, 11, 10, 0.94) 80%)';
        document.body.style.backgroundImage = `${overlay}, url('${game.bg}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center top';
        document.body.style.backgroundAttachment = 'fixed';

        // Configure mode tabs availability based on game capabilities
        const availableTabsCount = 1 + (game.hasWalkthrough ? 1 : 0) + (game.hasPlanner ? 1 : 0);

        if (tabWalkthrough) {
            tabWalkthrough.style.display = game.hasWalkthrough ? 'flex' : 'none';
        }
        if (tabPlanner) {
            tabPlanner.style.display = game.hasPlanner ? 'flex' : 'none';
        }
        if (headerGlassNav) {
            headerGlassNav.classList.toggle('single-tab', availableTabsCount === 1);
            headerGlassNav.classList.toggle('two-tabs', availableTabsCount === 2);
            headerGlassNav.classList.toggle('three-tabs', availableTabsCount === 3);
        }

        // Configure mobile sub-header mode tabs
        const mobTabWalkthrough = document.getElementById('mob-tab-walkthrough');
        const mobTabPlanner = document.getElementById('mob-tab-planner');
        if (mobTabWalkthrough) {
            mobTabWalkthrough.style.display = game.hasWalkthrough ? 'inline-flex' : 'none';
        }
        if (mobTabPlanner) {
            mobTabPlanner.style.display = game.hasPlanner ? 'inline-flex' : 'none';
        }

        // Synchronize Glass Radio Group
        const radio = document.getElementById(`glass-mode-${mode}`);
        if (radio) radio.checked = true;

        [tabPlatinum, tabWalkthrough, tabPlanner].forEach(lbl => {
            if (lbl) {
                const forInput = lbl.getAttribute('for');
                const isCurrent = forInput === `glass-mode-${mode}`;
                lbl.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
            }
        });

        document.querySelectorAll('.mobile-mode-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
        });

        if (mode === 'platinum') {
            targetView = viewPlatinum;
            loadPlatinumGameData(currentActiveGame);
        } else if (mode === 'walkthrough') {
            targetView = viewWalkthrough;
            loadWalkthroughGameData(currentActiveGame);
        } else if (mode === 'planner') {
            targetView = viewPlanner;
            loadPlannerData(currentActiveGame);
        }
    }

    // Update active mode in mobile drawer
    document.querySelectorAll('.mobile-nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    renderMobileGamesList();

    if (targetView) {
        targetView.style.display = 'flex';
        // Force reflow and add slide-in class
        void targetView.offsetWidth;
        targetView.classList.add('page-enter-slide');
    }

    handleBackToTopVisibility();
    window.scrollTo({ top: 0, behavior: 'instant' });
    refreshLucideIcons();
}

// Nav mode clicks via Glass Radio Group
document.querySelectorAll('input[name="app-mode-radio"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.checked) {
            setAppMode(e.target.value, currentActiveGame);
            triggerHaptic('light');
        }
    });
});

if (tabHome) tabHome.addEventListener('click', () => setAppMode('home'));

// Mobile sub-header mode clicks
document.querySelectorAll('.mobile-mode-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetMode = e.currentTarget.getAttribute('data-mode');
        setAppMode(targetMode, currentActiveGame);
    });
});

const navBrandBtn = document.getElementById('nav-brand-btn');
if (navBrandBtn) navBrandBtn.addEventListener('click', () => setAppMode('home'));

// ========================================================
// 4. MOBILE DRAWER NAVIGATION
// ========================================================
const mobileDrawer = document.getElementById('mobile-drawer');
const btnMobileMenu = document.getElementById('btn-mobile-menu');
const btnCloseMobileDrawer = document.getElementById('btn-close-mobile-drawer');

function updateMobileProfileDisplay() {
    const nameEl = document.getElementById('mobile-drawer-profile-name');
    if (nameEl) {
        nameEl.textContent = activeProfile || 'Default';
    }
}

function openMobileDrawer() {
    updateMobileProfileDisplay();
    renderMobileGamesList();
    if (mobileDrawer) mobileDrawer.classList.add('open');
    refreshLucideIcons();
}
function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
}

if (btnMobileMenu) btnMobileMenu.addEventListener('click', openMobileDrawer);
if (btnCloseMobileDrawer) btnCloseMobileDrawer.addEventListener('click', closeMobileDrawer);

const mobileBtnMastery = document.getElementById('mobile-btn-mastery');
if (mobileBtnMastery) {
    mobileBtnMastery.addEventListener('click', () => {
        closeMobileDrawer();
        openMasteryModal();
    });
}

const mobileBtnBackup = document.getElementById('mobile-btn-backup');
if (mobileBtnBackup) {
    mobileBtnBackup.addEventListener('click', () => {
        closeMobileDrawer();
        openBackupModal();
    });
}

const mobileBtnNewProfile = document.getElementById('mobile-btn-new-profile');
if (mobileBtnNewProfile) {
    mobileBtnNewProfile.addEventListener('click', () => {
        closeMobileDrawer();
        createNewProfile();
    });
}

document.querySelectorAll('.mobile-nav-item[data-mode]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-mode');
        setAppMode(mode, currentActiveGame);
        closeMobileDrawer();
    });
});

function renderMobileGamesList() {
    const list = document.getElementById('mobile-games-list');
    if (!list) return;
    list.innerHTML = '';
    GAMES_REGISTRY.forEach(game => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `mobile-game-item ${game.id === currentActiveGame && currentMode !== 'home' ? 'active' : ''}`;
        btn.innerHTML = `
            <img src="${game.icon}" alt="${game.name}" style="width: 24px; height: 24px; object-fit: contain; border-radius: 4px; flex-shrink: 0;">
            <span>${game.name}</span>
        `;
        btn.addEventListener('click', () => {
            currentActiveGame = game.id;
            setAppMode('platinum', game.id);
            closeMobileDrawer();
        });
        list.appendChild(btn);
    });
}

// ========================================================
// 5. HOME VIEW & ELASTIC ACCORDION GALLERY
// ========================================================
function renderElasticGallery() {
    const grid = document.getElementById('home-games-grid');
    if (!grid) return;
    grid.innerHTML = '';

    GAMES_REGISTRY.forEach((game) => {
        const card = document.createElement('div');
        card.className = 'elastic-card';
        card.id = `elastic-card-${game.id}`;
        card.setAttribute('data-game', game.id);

        card.innerHTML = `
            <div class="elastic-bg" style="background-image: url('${game.bg}');"></div>
            <div class="elastic-overlay"></div>
            <div class="elastic-content">
                <!-- Active Expanded State -->
                <div class="elastic-active-info">
                    <div class="elastic-tag-row">
                        <span class="elastic-category-tag">${game.subtitle}</span>
                        <span class="elastic-trophy-tag">${game.trophies} Requirements</span>
                    </div>
                    <h3 class="elastic-title">${game.name}</h3>
                    <p class="elastic-desc">${game.desc}</p>
                    <div class="elastic-actions-deck">
                        <button type="button" class="btn-elastic-launch btn-plat" data-action="platinum" data-game="${game.id}">
                            <i data-lucide="trophy" class="lucide-sm"></i>
                            <span>Platinum Tracker</span>
                        </button>
                        ${game.hasWalkthrough ? `
                        <button type="button" class="btn-elastic-launch btn-sub" data-action="walkthrough" data-game="${game.id}">
                            <i data-lucide="map" class="lucide-sm"></i>
                            <span>Walkthrough Guide</span>
                        </button>` : ''}
                        ${game.hasPlanner ? `
                        <button type="button" class="btn-elastic-launch btn-sub" data-action="planner" data-game="${game.id}">
                            <i data-lucide="shield" class="lucide-sm"></i>
                            <span>Build Studio</span>
                        </button>` : ''}
                    </div>
                </div>

                <!-- Inactive Accordion State -->
                <div class="elastic-inactive-info">
                    <span class="elastic-inactive-title">${game.name}</span>
                    <span class="elastic-inactive-mobile-badge">${game.name}</span>
                </div>
            </div>
        `;

        card.addEventListener('mouseenter', () => {
            grid.querySelectorAll('.elastic-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });

        // Clicking anywhere on the card opens the game into the platinum tracker
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-elastic-launch')) {
                launchGameFromHome(game.id, 'platinum');
            }
        });

        // Specific launch buttons inside the card
        card.querySelectorAll('.btn-elastic-launch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = e.currentTarget.getAttribute('data-action') || 'platinum';
                const gId = e.currentTarget.getAttribute('data-game') || game.id;
                launchGameFromHome(gId, action);
            });
        });

        grid.appendChild(card);
    });

    // When mouse leaves the entire gallery area, squeeze all cards back to uniform compact state
    grid.addEventListener('mouseleave', () => {
        grid.querySelectorAll('.elastic-card').forEach(c => c.classList.remove('active'));
    });

    refreshLucideIcons();
}

function launchGameFromHome(gameId, mode = 'platinum') {
    currentActiveGame = gameId;
    setAppMode(mode, gameId);
    triggerHaptic('light');
}

// Hero CTAs
const btnHeroExplore = document.getElementById('btn-hero-explore');
const btnHeroMastery = document.getElementById('btn-hero-mastery');
if (btnHeroMastery) {
    btnHeroMastery.addEventListener('click', () => {
        openMasteryModal();
    });
}

// ========================================================
// 6. PLATINUM CHECKLIST TRACKER ENGINE
// ========================================================
let currentPlatinumData = null;

async function loadPlatinumGameData(gameId) {
    const game = GAMES_REGISTRY.find(g => g.id === gameId);
    if (!game) return;

    // Update banner metadata
    const bannerIcon = document.getElementById('banner-game-icon');
    const bannerTitle = document.getElementById('banner-game-title');
    const bannerSub = document.getElementById('banner-game-sub');

    if (bannerIcon) bannerIcon.src = game.icon;
    if (bannerTitle) bannerTitle.textContent = game.name;
    if (bannerSub) bannerSub.textContent = game.subtitle;

    // Fetch and Normalize JSON data
    try {
        const response = await fetch(`data/${gameId}.json`);
        const rawJson = await response.json();
        currentPlatinumData = normalizeGameData(rawJson);
        renderPlatinumCategories();
        renderPlatinumFilterChips();
        renderQuickTrophyJump();
        updatePlatinumProgress();
    } catch (e) {
        console.error('Failed to load platinum game data:', e);
    }
}

function renderPlatinumFilterChips() {
    const rail = document.getElementById('tracker-filter-chips');
    if (!rail || !currentPlatinumData) return;
    rail.innerHTML = '';

    const allChip = document.createElement('button');
    allChip.type = 'button';
    allChip.className = `filter-chip ${activeFilterTag === 'all' ? 'active' : ''}`;
    allChip.textContent = 'All Categories';
    allChip.addEventListener('click', () => {
        activeFilterTag = 'all';
        rail.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        allChip.classList.add('active');
        filterChecklistItems();
    });
    rail.appendChild(allChip);

    currentPlatinumData.categories.forEach(cat => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = `filter-chip ${activeFilterTag === cat.id ? 'active' : ''}`;
        chip.textContent = cat.name;
        chip.addEventListener('click', () => {
            activeFilterTag = cat.id;
            rail.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            filterChecklistItems();
        });
        rail.appendChild(chip);
    });
}

function renderQuickTrophyJump() {
    const grid = document.getElementById('quick-jump-grid');
    if (!grid || !currentPlatinumData) return;
    grid.innerHTML = '';

    currentPlatinumData.categories.forEach(cat => {
        let total = cat.items.length;
        let completed = cat.items.filter(item => getSavedState(item.id)).length;

        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'quick-jump-item';
        item.innerHTML = `
            <span>${cat.name}</span>
            <span class="quick-jump-counter" id="jump-cnt-${cat.id}">${completed}/${total}</span>
        `;
        item.addEventListener('click', () => {
            const targetEl = document.getElementById(`cat-card-${cat.id}`);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        grid.appendChild(item);
    });
}

function renderPlatinumCategories() {
    const container = document.getElementById('tracker-items-container');
    if (!container || !currentPlatinumData) return;
    container.innerHTML = '';

    currentPlatinumData.categories.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.className = 'category-accordion-card';
        catCard.id = `cat-card-${cat.id}`;
        catCard.setAttribute('data-category', cat.id);

        let total = cat.items.length;
        let completed = cat.items.filter(item => getSavedState(item.id)).length;

        catCard.innerHTML = `
            <div class="category-header">
                <div class="category-header-left">
                    <h3 class="category-name">${cat.name}</h3>
                    <span class="category-badge" id="cat-badge-${cat.id}">${completed} / ${total}</span>
                </div>
                <div class="category-header-right">
                    <button type="button" class="category-quick-btn btn-cat-all" data-cat="${cat.id}">Complete All</button>
                    <button type="button" class="category-quick-btn btn-cat-reset" data-cat="${cat.id}">Reset</button>
                </div>
            </div>
            <div class="category-items-grid" id="cat-grid-${cat.id}"></div>
        `;

        const grid = catCard.querySelector(`#cat-grid-${cat.id}`);

        cat.items.forEach(item => {
            const isDone = getSavedState(item.id);
            const isMissable = item.missable || item.isMissable;

            const itemEl = document.createElement('div');
            itemEl.className = `tracker-item-card ${isDone ? 'completed' : ''} ${isMissable ? 'is-missable' : ''}`;
            itemEl.id = `item-card-${item.id}`;
            itemEl.setAttribute('data-item-name', (item.name || '').toLowerCase());
            itemEl.setAttribute('data-item-loc', (item.location || '').toLowerCase());

            itemEl.innerHTML = `
                <div class="stamped-checkbox-wrap">
                    <input type="checkbox" class="stamped-checkbox" data-id="${item.id}" ${isDone ? 'checked' : ''} tabindex="-1">
                </div>
                <div class="item-card-body">
                    <div class="item-name-row">
                        <span class="item-name">${item.name}</span>
                        ${isMissable ? '<span class="item-missable-badge">MISSABLE LOCKOUT</span>' : ''}
                    </div>
                    ${item.location ? `<p class="item-location-note">Location: ${item.location}</p>` : ''}
                    ${item.notes ? `<p class="item-lore-note">Note: ${item.notes}</p>` : ''}
                </div>
            `;

            const chk = itemEl.querySelector('input[type="checkbox"]');

            function toggleItemState() {
                const isChecked = !chk.checked;
                chk.checked = isChecked;
                setSavedState(item.id, isChecked);
                itemEl.classList.toggle('completed', isChecked);
                triggerHaptic(isChecked ? 'success' : 'light');
                updateCategoryCounts(cat.id);
                updatePlatinumProgress();
            }

            itemEl.addEventListener('click', (e) => {
                if (e.target === chk) {
                    const checked = chk.checked;
                    setSavedState(item.id, checked);
                    itemEl.classList.toggle('completed', checked);
                    triggerHaptic(checked ? 'success' : 'light');
                    updateCategoryCounts(cat.id);
                    updatePlatinumProgress();
                    return;
                }
                toggleItemState();
            });

            grid.appendChild(itemEl);
        });

        // Quick Category complete all / reset
        catCard.querySelector('.btn-cat-all').addEventListener('click', (e) => {
            e.stopPropagation();
            cat.items.forEach(it => {
                setSavedState(it.id, true);
                const el = document.getElementById(`item-card-${it.id}`);
                if (el) {
                    el.classList.add('completed');
                    const chk = el.querySelector('input[type="checkbox"]');
                    if (chk) chk.checked = true;
                }
            });
            updateCategoryCounts(cat.id);
            updatePlatinumProgress();
            triggerHaptic('success');
        });

        catCard.querySelector('.btn-cat-reset').addEventListener('click', (e) => {
            e.stopPropagation();
            cat.items.forEach(it => {
                setSavedState(it.id, false);
                const el = document.getElementById(`item-card-${it.id}`);
                if (el) {
                    el.classList.remove('completed');
                    const chk = el.querySelector('input[type="checkbox"]');
                    if (chk) chk.checked = false;
                }
            });
            updateCategoryCounts(cat.id);
            updatePlatinumProgress();
            triggerHaptic('light');
        });

        container.appendChild(catCard);
    });

    refreshLucideIcons();
}

function updateCategoryCounts(catId) {
    if (!currentPlatinumData) return;
    const cat = currentPlatinumData.categories.find(c => c.id === catId);
    if (!cat) return;
    let total = cat.items.length;
    let completed = cat.items.filter(item => getSavedState(item.id)).length;

    const badge = document.getElementById(`cat-badge-${cat.id}`);
    if (badge) badge.textContent = `${completed} / ${total}`;

    const jumpCnt = document.getElementById(`jump-cnt-${cat.id}`);
    if (jumpCnt) jumpCnt.textContent = `${completed}/${total}`;
}

function updatePlatinumProgress() {
    if (!currentPlatinumData) return;
    let total = 0;
    let completed = 0;

    currentPlatinumData.categories.forEach(cat => {
        cat.items.forEach(item => {
            total++;
            if (getSavedState(item.id)) completed++;
        });
    });

    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    const bannerStatTrophies = document.getElementById('banner-stat-trophies');
    const bannerStatCompleted = document.getElementById('banner-stat-completed');
    const bannerFill = document.getElementById('banner-progress-fill');
    const bannerText = document.getElementById('banner-progress-text');

    if (bannerStatTrophies) bannerStatTrophies.textContent = `${total} Items`;
    if (bannerStatCompleted) bannerStatCompleted.textContent = `${completed} / ${total}`;
    if (bannerFill) bannerFill.style.width = `${pct}%`;
    if (bannerText) bannerText.textContent = `${pct}%`;

    const activeGameObj = GAMES_REGISTRY.find(g => g.id === currentActiveGame);
    if (pct === 100 && total > 0 && lastCelebratedGame !== currentActiveGame) {
        lastCelebratedGame = currentActiveGame;
        showMasteryToast(activeGameObj ? activeGameObj.name : 'Codex Complete');
    } else if (pct < 100 && lastCelebratedGame === currentActiveGame) {
        lastCelebratedGame = null;
    }
}

// ========================================================
// 7.5. ANIMATED GOOEY SEARCH SYSTEM (From animated-search-1)
// ========================================================
let platinumSearchDebounceTimer = null;
const globalSearchInput = document.getElementById('global-search-input');
const btnClearSearch = document.getElementById('btn-clear-search');
const platinumSearchBar = document.getElementById('platinum-search-bar');
const platinumSearchBubble = document.getElementById('platinum-search-bubble');
const platinumSearchSpinner = document.getElementById('platinum-search-spinner');
const platinumBubbleIcon = document.getElementById('platinum-bubble-search-icon');
const platinumSearchResults = document.getElementById('platinum-search-results');
const platinumGooeySearch = document.getElementById('platinum-gooey-search');

if (platinumSearchBar && globalSearchInput) {
    platinumSearchBar.addEventListener('click', (e) => {
        if (platinumGooeySearch && !platinumGooeySearch.classList.contains('is-expanded')) {
            platinumGooeySearch.classList.add('is-expanded');
            setTimeout(() => {
                globalSearchInput.focus();
            }, 60);
        }
    });

    globalSearchInput.addEventListener('focus', () => {
        if (platinumGooeySearch) platinumGooeySearch.classList.add('is-expanded');
        if (currentSearchQuery) updatePlatinumSuggestions(currentSearchQuery);
    });

    globalSearchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        currentSearchQuery = val.toLowerCase().trim();

        if (btnClearSearch) btnClearSearch.style.display = currentSearchQuery ? 'flex' : 'none';

        // Show loading spinner during query processing
        if (platinumSearchSpinner) platinumSearchSpinner.style.display = 'block';
        if (platinumBubbleIcon) platinumBubbleIcon.style.display = 'none';

        clearTimeout(platinumSearchDebounceTimer);
        platinumSearchDebounceTimer = setTimeout(() => {
            if (platinumSearchSpinner) platinumSearchSpinner.style.display = 'none';
            if (platinumBubbleIcon) platinumBubbleIcon.style.display = 'block';

            filterChecklistItems();
            updatePlatinumSuggestions(currentSearchQuery);
        }, 160);
    });
}

if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
        if (globalSearchInput) {
            globalSearchInput.value = '';
            globalSearchInput.focus();
        }
        currentSearchQuery = '';
        btnClearSearch.style.display = 'none';
        if (platinumSearchResults) platinumSearchResults.style.display = 'none';
        filterChecklistItems();
    });
}

function updatePlatinumSuggestions(query) {
    if (!platinumSearchResults) return;
    if (!query || query.length < 1) {
        platinumSearchResults.style.display = 'none';
        platinumSearchResults.innerHTML = '';
        return;
    }

    const container = document.getElementById('tracker-items-container');
    if (!container) return;

    const matches = [];
    const itemCards = container.querySelectorAll('.tracker-item-card');

    for (let i = 0; i < itemCards.length; i++) {
        const item = itemCards[i];
        const name = item.getAttribute('data-item-name') || '';
        const loc = item.getAttribute('data-item-loc') || '';
        const catCard = item.closest('.category-accordion-card');
        const catName = catCard?.querySelector('.category-title')?.textContent?.trim() || 'Item';

        if (name.includes(query) || loc.includes(query)) {
            matches.push({
                element: item,
                name: item.querySelector('.item-title')?.textContent?.trim() || name,
                category: catName,
                location: loc
            });
            if (matches.length >= 6) break;
        }
    }

    if (matches.length === 0) {
        platinumSearchResults.innerHTML = `
            <div style="padding: 10px 14px; font-size: 0.84rem; color: var(--text-muted); text-align: center;">
                No matches found in codex
            </div>
        `;
        platinumSearchResults.style.display = 'flex';
        return;
    }

    platinumSearchResults.innerHTML = '';
    matches.forEach((m, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'gooey-result-item';
        itemEl.style.setProperty('--item-index', idx);
        itemEl.innerHTML = `
            <div class="gooey-result-left">
                <i data-lucide="award" class="gooey-result-icon"></i>
                <span class="gooey-result-title">${m.name}</span>
            </div>
            <span class="gooey-result-cat">${m.category}</span>
        `;

        itemEl.addEventListener('click', () => {
            const accordionCard = m.element.closest('.category-accordion-card');
            if (accordionCard) {
                accordionCard.style.display = 'block';
                const body = accordionCard.querySelector('.category-content');
                if (body && !accordionCard.classList.contains('open')) {
                    accordionCard.classList.add('open');
                    body.style.display = 'block';
                }
            }
            m.element.style.display = 'flex';
            m.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            m.element.classList.remove('highlight-target-pulse');
            void m.element.offsetWidth;
            m.element.classList.add('highlight-target-pulse');

            platinumSearchResults.style.display = 'none';
        });

        platinumSearchResults.appendChild(itemEl);
    });

    if (window.lucide) window.lucide.createIcons();
    platinumSearchResults.style.display = 'flex';
}

function filterChecklistItems() {
    const container = document.getElementById('tracker-items-container');
    const emptyState = document.getElementById('tracker-empty-state');
    if (!container) return;

    let totalVisibleAcrossCategories = 0;

    container.querySelectorAll('.category-accordion-card').forEach(card => {
        const catId = card.getAttribute('data-category');
        const matchesCategory = (activeFilterTag === 'all' || activeFilterTag === catId);

        if (!matchesCategory) {
            card.style.display = 'none';
            return;
        }

        let visibleItems = 0;
        card.querySelectorAll('.tracker-item-card').forEach(item => {
            const name = item.getAttribute('data-item-name') || '';
            const loc = item.getAttribute('data-item-loc') || '';
            const isCompleted = item.classList.contains('completed');

            const matchesSearch = !currentSearchQuery || name.includes(currentSearchQuery) || loc.includes(currentSearchQuery);
            const matchesHideCompleted = !hideCompleted || !isCompleted;

            if (matchesSearch && matchesHideCompleted) {
                item.style.display = 'flex';
                visibleItems++;
            } else {
                item.style.display = 'none';
            }
        });

        card.style.display = visibleItems > 0 ? 'block' : 'none';
        if (visibleItems > 0) totalVisibleAcrossCategories += visibleItems;
    });

    if (emptyState) {
        emptyState.style.display = totalVisibleAcrossCategories === 0 ? 'flex' : 'none';
    }
}

const btnToggleHideCompleted = document.getElementById('btn-toggle-hide-completed');
const hideCompletedText = document.getElementById('hide-completed-text');
if (btnToggleHideCompleted) {
    btnToggleHideCompleted.addEventListener('click', () => {
        hideCompleted = !hideCompleted;
        localStorage.setItem('gitgud_hide_completed', hideCompleted ? 'true' : 'false');
        if (hideCompletedText) {
            hideCompletedText.textContent = hideCompleted ? 'Show All' : 'Hide Completed';
        }
        btnToggleHideCompleted.classList.toggle('active', hideCompleted);
        filterChecklistItems();
    });
}

// ========================================================
// 8. WALKTHROUGH GUIDE ENGINE
// ========================================================
let currentWalkthroughData = null;

async function loadWalkthroughGameData(gameId) {
    const game = GAMES_REGISTRY.find(g => g.id === gameId);
    if (!game) return;

    const bannerIcon = document.getElementById('wt-banner-game-icon');
    const bannerTitle = document.getElementById('wt-banner-game-title');

    if (bannerIcon) bannerIcon.src = game.icon;
    if (bannerTitle) bannerTitle.textContent = game.name;

    try {
        const response = await fetch(`data/walkthroughs/${gameId}_walkthrough.json`);
        currentWalkthroughData = await response.json();
        renderWalkthroughChapters();
        renderQuickChapterJump();
        updateWalkthroughProgress();
    } catch (e) {
        console.error('Failed to load walkthrough data:', e);
    }
}

function renderQuickChapterJump() {
    const grid = document.getElementById('wt-chapters-grid');
    if (!grid || !currentWalkthroughData) return;
    grid.innerHTML = '';

    currentWalkthroughData.chapters.forEach((ch, idx) => {
        let total = ch.items.length;
        let completed = ch.items.filter(it => getSavedState(it.id)).length;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quick-jump-item';
        btn.innerHTML = `
            <span>${ch.title}</span>
            <span class="quick-jump-counter" id="wt-jump-cnt-${idx}">${completed}/${total}</span>
        `;
        btn.addEventListener('click', () => {
            const target = document.getElementById(`wt-ch-card-${idx}`);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        grid.appendChild(btn);
    });
}

function renderWalkthroughChapters() {
    const container = document.getElementById('walkthrough-items-container');
    if (!container || !currentWalkthroughData) return;
    container.innerHTML = '';

    currentWalkthroughData.chapters.forEach((ch, idx) => {
        const chCard = document.createElement('div');
        chCard.className = 'category-accordion-card';
        chCard.id = `wt-ch-card-${idx}`;

        let total = ch.items.length;
        let completed = ch.items.filter(it => getSavedState(it.id)).length;

        chCard.innerHTML = `
            <div class="category-header">
                <div class="category-header-left">
                    <h3 class="category-name">${ch.title}</h3>
                    <span class="category-badge" id="wt-badge-${idx}">${completed} / ${total}</span>
                </div>
            </div>
            <div class="category-items-grid" id="wt-ch-grid-${idx}"></div>
        `;

        const grid = chCard.querySelector(`#wt-ch-grid-${idx}`);

        ch.items.forEach(step => {
            const isDone = getSavedState(step.id);
            const isMissable = step.missable || step.isMissable;

            const stepEl = document.createElement('div');
            stepEl.className = `walkthrough-step-card ${isDone ? 'completed' : ''} ${isMissable ? 'is-missable' : ''}`;
            stepEl.id = `wt-step-${step.id}`;

            stepEl.innerHTML = `
                <div class="stamped-checkbox-wrap">
                    <input type="checkbox" class="stamped-checkbox" data-id="${step.id}" ${isDone ? 'checked' : ''} tabindex="-1">
                </div>
                <div class="step-card-content">
                    <div class="step-title-row">
                        <span class="step-title">${step.title || 'Checkpoint'}</span>
                        ${isMissable ? '<span class="item-missable-badge">MISSABLE LOCKOUT</span>' : ''}
                        ${step.npc ? `<span class="step-tag-pill">NPC: ${step.npc}</span>` : ''}
                    </div>
                    <p class="step-body-text">${step.desc || step.text || ''}</p>
                </div>
            `;

            const chk = stepEl.querySelector('input[type="checkbox"]');

            function toggleStepState() {
                const isChecked = !chk.checked;
                chk.checked = isChecked;
                setSavedState(step.id, isChecked);
                stepEl.classList.toggle('completed', isChecked);
                triggerHaptic(isChecked ? 'success' : 'light');
                updateWalkthroughChapterCounts(idx);
                updateWalkthroughProgress();
            }

            stepEl.addEventListener('click', (e) => {
                if (e.target === chk) {
                    const checked = chk.checked;
                    setSavedState(step.id, checked);
                    stepEl.classList.toggle('completed', checked);
                    triggerHaptic(checked ? 'success' : 'light');
                    updateWalkthroughChapterCounts(idx);
                    updateWalkthroughProgress();
                    return;
                }
                toggleStepState();
            });

            grid.appendChild(stepEl);
        });

        container.appendChild(chCard);
    });

    refreshLucideIcons();
}

function updateWalkthroughChapterCounts(chIdx) {
    if (!currentWalkthroughData) return;
    const ch = currentWalkthroughData.chapters[chIdx];
    if (!ch) return;
    let total = ch.items.length;
    let completed = ch.items.filter(it => getSavedState(it.id)).length;

    const badge = document.getElementById(`wt-badge-${chIdx}`);
    if (badge) badge.textContent = `${completed} / ${total}`;

    const jump = document.getElementById(`wt-jump-cnt-${chIdx}`);
    if (jump) jump.textContent = `${completed}/${total}`;
}

function updateWalkthroughProgress() {
    if (!currentWalkthroughData) return;
    let total = 0;
    let completed = 0;

    currentWalkthroughData.chapters.forEach(ch => {
        ch.items.forEach(it => {
            total++;
            if (getSavedState(it.id)) completed++;
        });
    });

    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    const bannerChapters = document.getElementById('wt-banner-stat-chapters');
    const bannerSteps = document.getElementById('wt-banner-stat-steps');
    const bannerFill = document.getElementById('wt-banner-progress-fill');
    const bannerText = document.getElementById('wt-banner-progress-text');

    if (bannerChapters) bannerChapters.textContent = `${currentWalkthroughData.chapters.length} Chapters`;
    if (bannerSteps) bannerSteps.textContent = `${completed} / ${total}`;
    if (bannerFill) bannerFill.style.width = `${pct}%`;
    if (bannerText) bannerText.textContent = `${pct}%`;
}

// Walkthrough hide completed toggle
const btnWtToggleHideCompleted = document.getElementById('btn-wt-toggle-hide-completed');
const wtHideCompletedText = document.getElementById('wt-hide-completed-text');
if (btnWtToggleHideCompleted) {
    btnWtToggleHideCompleted.addEventListener('click', () => {
        hideCompleted = !hideCompleted;
        localStorage.setItem('gitgud_hide_completed', hideCompleted ? 'true' : 'false');
        if (wtHideCompletedText) {
            wtHideCompletedText.textContent = hideCompleted ? 'Show All' : 'Hide Completed';
        }
        btnWtToggleHideCompleted.classList.toggle('active', hideCompleted);
        filterWalkthroughItems();
    });
}

// ========================================================
// 8.5. ANIMATED GOOEY SEARCH SYSTEM (Walkthrough Guide)
// ========================================================
let wtSearchDebounceTimer = null;
let currentWtSearchQuery = '';
const wtSearchInput = document.getElementById('wt-search-input');
const btnWtClearSearch = document.getElementById('btn-wt-clear-search');
const wtSearchBar = document.getElementById('wt-search-bar');
const wtSearchBubble = document.getElementById('wt-search-bubble');
const wtSearchSpinner = document.getElementById('wt-search-spinner');
const wtBubbleIcon = document.getElementById('wt-bubble-search-icon');
const wtSearchResults = document.getElementById('wt-search-results');
const wtGooeySearch = document.getElementById('wt-gooey-search');

if (wtSearchBar && wtSearchInput) {
    wtSearchBar.addEventListener('click', (e) => {
        if (wtGooeySearch && !wtGooeySearch.classList.contains('is-expanded')) {
            wtGooeySearch.classList.add('is-expanded');
            setTimeout(() => {
                wtSearchInput.focus();
            }, 60);
        }
    });

    wtSearchInput.addEventListener('focus', () => {
        if (wtGooeySearch) wtGooeySearch.classList.add('is-expanded');
        if (currentWtSearchQuery) updateWalkthroughSuggestions(currentWtSearchQuery);
    });

    wtSearchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        currentWtSearchQuery = val.toLowerCase().trim();

        if (btnWtClearSearch) btnWtClearSearch.style.display = currentWtSearchQuery ? 'flex' : 'none';

        // Show loading spinner
        if (wtSearchSpinner) wtSearchSpinner.style.display = 'block';
        if (wtBubbleIcon) wtBubbleIcon.style.display = 'none';

        clearTimeout(wtSearchDebounceTimer);
        wtSearchDebounceTimer = setTimeout(() => {
            if (wtSearchSpinner) wtSearchSpinner.style.display = 'none';
            if (wtBubbleIcon) wtBubbleIcon.style.display = 'block';

            filterWalkthroughItems();
            updateWalkthroughSuggestions(currentWtSearchQuery);
        }, 160);
    });
}

// Global click-outside listener to collapse search if empty
document.addEventListener('click', (e) => {
    if (platinumGooeySearch && !platinumGooeySearch.contains(e.target)) {
        if (!globalSearchInput || !globalSearchInput.value.trim()) {
            platinumGooeySearch.classList.remove('is-expanded');
        }
        if (platinumSearchResults) platinumSearchResults.style.display = 'none';
    }
    if (wtGooeySearch && !wtGooeySearch.contains(e.target)) {
        if (!wtSearchInput || !wtSearchInput.value.trim()) {
            wtGooeySearch.classList.remove('is-expanded');
        }
        if (wtSearchResults) wtSearchResults.style.display = 'none';
    }
});

if (btnWtClearSearch) {
    btnWtClearSearch.addEventListener('click', () => {
        if (wtSearchInput) {
            wtSearchInput.value = '';
            wtSearchInput.focus();
        }
        currentWtSearchQuery = '';
        btnWtClearSearch.style.display = 'none';
        if (wtSearchResults) wtSearchResults.style.display = 'none';
        filterWalkthroughItems();
    });
}

function filterWalkthroughItems() {
    const container = document.getElementById('walkthrough-items-container');
    if (!container) return;

    container.querySelectorAll('.walkthrough-chapter-card').forEach(chapterCard => {
        let visibleSteps = 0;
        chapterCard.querySelectorAll('.walkthrough-step-card').forEach(stepCard => {
            const text = stepCard.textContent.toLowerCase();
            const isCompleted = stepCard.classList.contains('completed');
            const matchesSearch = !currentWtSearchQuery || text.includes(currentWtSearchQuery);
            const matchesHideCompleted = !hideCompleted || !isCompleted;

            if (matchesSearch && matchesHideCompleted) {
                stepCard.style.display = 'flex';
                visibleSteps++;
            } else {
                stepCard.style.display = 'none';
            }
        });
        chapterCard.style.display = visibleSteps > 0 ? 'block' : 'none';
    });
}

function updateWalkthroughSuggestions(query) {
    if (!wtSearchResults) return;
    if (!query || query.length < 1) {
        wtSearchResults.style.display = 'none';
        wtSearchResults.innerHTML = '';
        return;
    }

    const container = document.getElementById('walkthrough-items-container');
    if (!container) return;

    const matches = [];
    const stepCards = container.querySelectorAll('.walkthrough-step-card');

    for (let i = 0; i < stepCards.length; i++) {
        const step = stepCards[i];
        const text = step.textContent.trim();
        const chapterCard = step.closest('.walkthrough-chapter-card');
        const chapterTitle = chapterCard?.querySelector('.walkthrough-chapter-title')?.textContent?.trim() || 'Step';

        if (text.toLowerCase().includes(query)) {
            const shortText = text.length > 55 ? text.substring(0, 52) + '...' : text;
            matches.push({
                element: step,
                text: shortText,
                chapter: chapterTitle
            });
            if (matches.length >= 6) break;
        }
    }

    if (matches.length === 0) {
        wtSearchResults.innerHTML = `
            <div style="padding: 10px 14px; font-size: 0.84rem; color: var(--text-muted); text-align: center;">
                No walkthrough steps found
            </div>
        `;
        wtSearchResults.style.display = 'flex';
        return;
    }

    wtSearchResults.innerHTML = '';
    matches.forEach((m, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'gooey-result-item';
        itemEl.style.setProperty('--item-index', idx);
        itemEl.innerHTML = `
            <div class="gooey-result-left">
                <i data-lucide="compass" class="gooey-result-icon"></i>
                <span class="gooey-result-title">${m.text}</span>
            </div>
            <span class="gooey-result-cat">${m.chapter}</span>
        `;

        itemEl.addEventListener('click', () => {
            const chapterCard = m.element.closest('.walkthrough-chapter-card');
            if (chapterCard) {
                chapterCard.style.display = 'block';
                const body = chapterCard.querySelector('.walkthrough-chapter-body');
                if (body && !chapterCard.classList.contains('open')) {
                    chapterCard.classList.add('open');
                    body.style.display = 'block';
                }
            }
            m.element.style.display = 'flex';
            m.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            m.element.classList.remove('highlight-target-pulse');
            void m.element.offsetWidth;
            m.element.classList.add('highlight-target-pulse');

            wtSearchResults.style.display = 'none';
        });

        wtSearchResults.appendChild(itemEl);
    });

    if (window.lucide) window.lucide.createIcons();
    wtSearchResults.style.display = 'flex';
}

// ========================================================
// 9. CHARACTER BUILD & ARMORY STUDIO
// ========================================================
const STARTING_CLASSES = {
    eldenring: [
        { name: 'Vagabond', level: 9, vig: 15, mnd: 10, end: 11, str: 14, dex: 13, int: 9, fth: 9, arc: 7, baseWeight: 14.5 },
        { name: 'Warrior', level: 8, vig: 11, mnd: 12, end: 11, str: 10, dex: 16, int: 10, fth: 8, arc: 9, baseWeight: 10.2 },
        { name: 'Hero', level: 7, vig: 14, mnd: 9, end: 12, str: 16, dex: 9, int: 7, fth: 8, arc: 11, baseWeight: 15.0 },
        { name: 'Bandit', level: 5, vig: 10, mnd: 11, end: 10, str: 9, dex: 13, int: 9, fth: 8, arc: 14, baseWeight: 8.5 },
        { name: 'Astrologer', level: 6, vig: 9, mnd: 15, end: 9, str: 8, dex: 12, int: 16, fth: 7, arc: 9, baseWeight: 7.2 },
        { name: 'Prophet', level: 7, vig: 10, mnd: 14, end: 8, str: 11, dex: 10, int: 7, fth: 16, arc: 10, baseWeight: 8.0 },
        { name: 'Samurai', level: 9, vig: 12, mnd: 11, end: 13, str: 12, dex: 15, int: 9, fth: 8, arc: 8, baseWeight: 12.0 },
        { name: 'Prisoner', level: 9, vig: 11, mnd: 12, end: 11, str: 11, dex: 14, int: 14, fth: 6, arc: 9, baseWeight: 9.5 },
        { name: 'Confessor', level: 10, vig: 10, mnd: 13, end: 10, str: 12, dex: 12, int: 9, fth: 14, arc: 9, baseWeight: 13.0 },
        { name: 'Wretch', level: 1, vig: 10, mnd: 10, end: 10, str: 10, dex: 10, int: 10, fth: 10, arc: 10, baseWeight: 3.1 }
    ],
    ds3: [
        { name: 'Knight', level: 9, vig: 12, mnd: 10, end: 11, vit: 15, str: 13, dex: 12, int: 9, fth: 9, lck: 7, baseWeight: 16.0 },
        { name: 'Mercenary', level: 8, vig: 11, mnd: 12, end: 11, vit: 10, str: 10, dex: 16, int: 10, fth: 8, lck: 9, baseWeight: 11.5 },
        { name: 'Warrior', level: 7, vig: 14, mnd: 9, end: 12, vit: 11, str: 16, dex: 9, int: 8, fth: 9, lck: 11, baseWeight: 14.2 },
        { name: 'Herald', level: 9, vig: 12, mnd: 10, end: 9, vit: 12, str: 12, dex: 11, int: 8, fth: 16, lck: 11, baseWeight: 13.0 },
        { name: 'Thief', level: 5, vig: 10, mnd: 11, end: 10, vit: 9, str: 9, dex: 13, int: 10, fth: 8, lck: 14, baseWeight: 7.8 },
        { name: 'Assassin', level: 10, vig: 10, mnd: 14, end: 11, vit: 10, str: 10, dex: 14, int: 11, fth: 9, lck: 10, baseWeight: 8.5 },
        { name: 'Sorcerer', level: 6, vig: 9, mnd: 16, end: 9, vit: 7, str: 7, dex: 12, int: 16, fth: 7, lck: 12, baseWeight: 6.5 },
        { name: 'Pyromancer', level: 8, vig: 11, mnd: 12, end: 10, vit: 8, str: 12, dex: 9, int: 14, fth: 14, lck: 7, baseWeight: 9.0 },
        { name: 'Cleric', level: 7, vig: 10, mnd: 14, end: 9, vit: 7, str: 12, dex: 8, int: 7, fth: 16, lck: 13, baseWeight: 10.0 },
        { name: 'Deprived', level: 1, vig: 10, mnd: 10, end: 10, vit: 10, str: 10, dex: 10, int: 10, fth: 10, lck: 10, baseWeight: 3.0 }
    ],
    ds1: [
        { name: 'Warrior', level: 4, vig: 11, att: 8, end: 12, str: 13, dex: 13, res: 11, int: 9, fth: 9, baseWeight: 12.0 },
        { name: 'Knight', level: 5, vig: 14, att: 10, end: 10, str: 11, dex: 11, res: 10, int: 9, fth: 11, baseWeight: 18.0 },
        { name: 'Wanderer', level: 3, vig: 10, att: 11, end: 10, str: 10, dex: 14, res: 12, int: 11, fth: 8, baseWeight: 8.0 },
        { name: 'Thief', level: 5, vig: 9, att: 11, end: 9, str: 9, dex: 15, res: 10, int: 12, fth: 11, baseWeight: 6.0 },
        { name: 'Bandit', level: 4, vig: 12, att: 8, end: 14, str: 14, dex: 9, res: 11, int: 8, fth: 10, baseWeight: 14.0 },
        { name: 'Hunter', level: 4, vig: 11, att: 9, end: 11, str: 12, dex: 14, res: 11, int: 9, fth: 9, baseWeight: 10.0 },
        { name: 'Sorcerer', level: 3, vig: 8, att: 15, end: 8, str: 9, dex: 11, res: 8, int: 15, fth: 8, baseWeight: 5.0 },
        { name: 'Pyromancer', level: 1, vig: 10, att: 12, end: 11, str: 12, dex: 9, res: 12, int: 10, fth: 8, baseWeight: 8.0 },
        { name: 'Cleric', level: 2, vig: 11, att: 11, end: 9, str: 12, dex: 8, res: 11, int: 8, fth: 14, baseWeight: 9.0 },
        { name: 'Deprived', level: 6, vig: 11, att: 11, end: 11, str: 11, dex: 11, res: 11, int: 11, fth: 11, baseWeight: 4.0 }
    ],
    ds2: [
        { name: 'Warrior', level: 12, vig: 7, end: 6, vit: 6, att: 5, str: 15, dex: 11, adp: 5, int: 5, fth: 5, baseWeight: 14.0 },
        { name: 'Knight', level: 13, vig: 12, end: 6, vit: 7, att: 4, str: 11, dex: 8, adp: 9, int: 3, fth: 6, baseWeight: 16.0 },
        { name: 'Swordsman', level: 12, vig: 4, end: 8, vit: 4, att: 6, str: 9, dex: 16, adp: 6, int: 7, fth: 5, baseWeight: 9.0 },
        { name: 'Bandit', level: 11, vig: 9, end: 7, vit: 11, att: 2, str: 9, dex: 14, adp: 3, int: 1, fth: 8, baseWeight: 11.0 },
        { name: 'Cleric', level: 14, vig: 10, end: 3, vit: 8, att: 10, str: 11, dex: 5, adp: 4, int: 4, fth: 12, baseWeight: 10.0 },
        { name: 'Sorcerer', level: 11, vig: 5, end: 6, vit: 5, att: 12, str: 3, dex: 7, adp: 8, int: 14, fth: 4, baseWeight: 5.0 },
        { name: 'Explorer', level: 10, vig: 7, end: 6, vit: 9, att: 7, str: 6, dex: 6, adp: 12, int: 5, fth: 5, baseWeight: 8.0 },
        { name: 'Deprived', level: 1, vig: 6, end: 6, vit: 6, att: 6, str: 6, dex: 6, adp: 6, int: 6, fth: 6, baseWeight: 0 }
    ],
    bloodborne: [
        { name: 'Milquetoast', level: 10, vig: 11, end: 10, str: 12, dex: 10, bld: 9, arc: 8, baseWeight: 0 },
        { name: 'Lone Survivor', level: 10, vig: 14, end: 11, str: 11, dex: 10, bld: 7, arc: 7, baseWeight: 0 },
        { name: 'Troubled Childhood', level: 10, vig: 9, end: 14, str: 9, dex: 13, bld: 6, arc: 9, baseWeight: 0 },
        { name: 'Violent Past', level: 10, vig: 12, end: 11, str: 15, dex: 9, bld: 6, arc: 7, baseWeight: 0 },
        { name: 'Professional', level: 10, vig: 9, end: 12, str: 9, dex: 15, bld: 7, arc: 8, baseWeight: 0 },
        { name: 'Military Veteran', level: 10, vig: 10, end: 10, str: 14, dex: 13, bld: 7, arc: 6, baseWeight: 0 },
        { name: 'Noble Scion', level: 10, vig: 7, end: 8, str: 9, dex: 13, bld: 14, arc: 9, baseWeight: 0 },
        { name: 'Cruel Fate', level: 10, vig: 10, end: 12, str: 10, dex: 9, bld: 5, arc: 14, baseWeight: 0 },
        { name: 'Waste of Skin', level: 4, vig: 10, end: 9, str: 10, dex: 9, bld: 7, arc: 9, baseWeight: 0 }
    ],
    demonssouls: [
        { name: 'Soldier', level: 6, vig: 14, wil: 9, end: 12, str: 12, dex: 11, mag: 8, fth: 10, lck: 10, baseWeight: 14.0 },
        { name: 'Knight', level: 4, vig: 10, wil: 11, end: 11, str: 14, dex: 10, mag: 10, fth: 11, lck: 7, baseWeight: 16.5 },
        { name: 'Hunter', level: 6, vig: 12, wil: 10, end: 13, str: 11, dex: 12, mag: 8, fth: 8, lck: 12, baseWeight: 9.5 },
        { name: 'Priest', level: 6, vig: 13, wil: 11, end: 12, str: 13, dex: 8, mag: 8, fth: 13, lck: 8, baseWeight: 12.0 },
        { name: 'Magician', level: 6, vig: 9, wil: 15, end: 10, str: 9, dex: 11, mag: 15, fth: 9, lck: 8, baseWeight: 6.5 },
        { name: 'Wanderer', level: 6, vig: 10, wil: 10, end: 11, str: 11, dex: 15, mag: 9, fth: 8, lck: 12, baseWeight: 7.0 },
        { name: 'Barbarian', level: 9, vig: 15, wil: 7, end: 13, str: 15, dex: 9, mag: 11, fth: 8, lck: 11, baseWeight: 10.0 },
        { name: 'Thief', level: 9, vig: 10, wil: 13, end: 10, str: 9, dex: 14, mag: 10, fth: 8, lck: 15, baseWeight: 6.0 },
        { name: 'Temple Knight', level: 4, vig: 11, wil: 8, end: 13, str: 14, dex: 12, mag: 6, fth: 13, lck: 7, baseWeight: 15.0 },
        { name: 'Royalty', level: 1, vig: 8, wil: 12, end: 8, str: 9, dex: 12, mag: 13, fth: 12, lck: 7, baseWeight: 5.0 }
    ]
};

const GAME_LOADOUT_CONFIG = {
    eldenring: {
        weaponsTitle: 'WEAPONS & CATALYSTS (3 RH + 3 LH)',
        weaponSlots: [
            { id: 'rh1', label: 'Right Hand 1', icon: 'swords' },
            { id: 'rh2', label: 'Right Hand 2', icon: 'swords' },
            { id: 'rh3', label: 'Right Hand 3', icon: 'swords' },
            { id: 'lh1', label: 'Left Hand 1', icon: 'shield' },
            { id: 'lh2', label: 'Left Hand 2', icon: 'shield' },
            { id: 'lh3', label: 'Left Hand 3', icon: 'shield' }
        ],
        accessoriesTitle: 'TALISMANS (4 SLOTS)',
        accessorySlots: [
            { id: 'r1', label: 'Talisman 1', icon: 'sparkles' },
            { id: 'r2', label: 'Talisman 2', icon: 'sparkles' },
            { id: 'r3', label: 'Talisman 3', icon: 'sparkles' },
            { id: 'r4', label: 'Talisman 4', icon: 'sparkles' }
        ]
    },
    ds2: {
        weaponsTitle: 'WEAPONS & SHIELDS (3 RH + 3 LH)',
        weaponSlots: [
            { id: 'rh1', label: 'Right Hand 1', icon: 'swords' },
            { id: 'rh2', label: 'Right Hand 2', icon: 'swords' },
            { id: 'rh3', label: 'Right Hand 3', icon: 'swords' },
            { id: 'lh1', label: 'Left Hand 1', icon: 'shield' },
            { id: 'lh2', label: 'Left Hand 2', icon: 'shield' },
            { id: 'lh3', label: 'Left Hand 3', icon: 'shield' }
        ],
        accessoriesTitle: 'RINGS (4 SLOTS)',
        accessorySlots: [
            { id: 'r1', label: 'Ring 1', icon: 'sparkles' },
            { id: 'r2', label: 'Ring 2', icon: 'sparkles' },
            { id: 'r3', label: 'Ring 3', icon: 'sparkles' },
            { id: 'r4', label: 'Ring 4', icon: 'sparkles' }
        ]
    },
    ds3: {
        weaponsTitle: 'WEAPONS & CATALYSTS (3 RH + 3 LH)',
        weaponSlots: [
            { id: 'rh1', label: 'Right Hand 1', icon: 'swords' },
            { id: 'rh2', label: 'Right Hand 2', icon: 'swords' },
            { id: 'rh3', label: 'Right Hand 3', icon: 'swords' },
            { id: 'lh1', label: 'Left Hand 1', icon: 'shield' },
            { id: 'lh2', label: 'Left Hand 2', icon: 'shield' },
            { id: 'lh3', label: 'Left Hand 3', icon: 'shield' }
        ],
        accessoriesTitle: 'RINGS (4 SLOTS)',
        accessorySlots: [
            { id: 'r1', label: 'Ring 1', icon: 'sparkles' },
            { id: 'r2', label: 'Ring 2', icon: 'sparkles' },
            { id: 'r3', label: 'Ring 3', icon: 'sparkles' },
            { id: 'r4', label: 'Ring 4', icon: 'sparkles' }
        ]
    },
    ds1: {
        weaponsTitle: 'WEAPONS & SHIELDS (2 RH + 2 LH)',
        weaponSlots: [
            { id: 'rh1', label: 'Right Hand 1', icon: 'swords' },
            { id: 'rh2', label: 'Right Hand 2', icon: 'swords' },
            { id: 'lh1', label: 'Left Hand 1', icon: 'shield' },
            { id: 'lh2', label: 'Left Hand 2', icon: 'shield' }
        ],
        accessoriesTitle: 'RINGS (2 SLOTS)',
        accessorySlots: [
            { id: 'r1', label: 'Ring 1', icon: 'sparkles' },
            { id: 'r2', label: 'Ring 2', icon: 'sparkles' }
        ]
    },
    demonssouls: {
        weaponsTitle: 'WEAPONS & SHIELDS (2 RH + 2 LH)',
        weaponSlots: [
            { id: 'rh1', label: 'Right Hand 1', icon: 'swords' },
            { id: 'rh2', label: 'Right Hand 2', icon: 'swords' },
            { id: 'lh1', label: 'Left Hand 1', icon: 'shield' },
            { id: 'lh2', label: 'Left Hand 2', icon: 'shield' }
        ],
        accessoriesTitle: 'RINGS (2 SLOTS)',
        accessorySlots: [
            { id: 'r1', label: 'Ring 1', icon: 'sparkles' },
            { id: 'r2', label: 'Ring 2', icon: 'sparkles' }
        ]
    },
    bloodborne: {
        weaponsTitle: 'TRICK WEAPONS & FIREARMS (2 RH + 2 LH)',
        weaponSlots: [
            { id: 'rh1', label: 'Trick Weapon 1', icon: 'swords' },
            { id: 'rh2', label: 'Trick Weapon 2', icon: 'swords' },
            { id: 'lh1', label: 'Firearm 1', icon: 'shield' },
            { id: 'lh2', label: 'Firearm 2', icon: 'shield' }
        ],
        accessoriesTitle: 'CARYLL RUNES (4 SLOTS)',
        accessorySlots: [
            { id: 'r1', label: 'Caryll Rune 1', icon: 'sparkles' },
            { id: 'r2', label: 'Caryll Rune 2', icon: 'sparkles' },
            { id: 'r3', label: 'Caryll Rune 3', icon: 'sparkles' },
            { id: 'r4', label: 'Oath Rune', icon: 'sparkles' }
        ]
    },
    liesofp: {
        weaponsTitle: 'BLADES & LEGION ARMS',
        weaponSlots: [
            { id: 'rh1', label: 'Primary Weapon', icon: 'swords' },
            { id: 'rh2', label: 'Secondary Weapon', icon: 'swords' },
            { id: 'lh1', label: 'Legion Arm', icon: 'shield' }
        ],
        accessoriesTitle: 'AMULETS (4 SLOTS)',
        accessorySlots: [
            { id: 'r1', label: 'Amulet 1', icon: 'sparkles' },
            { id: 'r2', label: 'Amulet 2', icon: 'sparkles' },
            { id: 'r3', label: 'Amulet 3', icon: 'sparkles' },
            { id: 'r4', label: 'Amulet 4', icon: 'sparkles' }
        ]
    }
};

let currentAllocatedStats = {
    vig: 40, mnd: 20, end: 25, str: 40, dex: 40, int: 10, fth: 10, arc: 10
};
let selectedClassIndex = 0;
let currentEquipmentLoad = 0;
let currentEquipmentData = null;
let currentEquipmentSelection = {};

async function loadPlannerData(gameId) {
    const game = GAMES_REGISTRY.find(g => g.id === gameId) || GAMES_REGISTRY[0];
    const bannerIcon = document.getElementById('build-banner-game-icon');
    const bannerTitle = document.getElementById('build-banner-game-title');
    if (bannerIcon) bannerIcon.src = game.icon;
    if (bannerTitle) bannerTitle.textContent = game.name;

    // Render Build Slot Custom Staggered Select
    const slotWrapper = document.getElementById('planner-build-slot-wrapper');
    if (slotWrapper) {
        createStaggeredCustomSelect({
            container: slotWrapper,
            id: 'planner-build-slot',
            icon: 'layers',
            options: [
                { value: '0', label: 'Build Slot 1: Primary' },
                { value: '1', label: 'Build Slot 2: Secondary' },
                { value: '2', label: 'Build Slot 3: Experimental' }
            ],
            selectedValue: activeBuildSlot,
            onChange: (val) => {
                activeBuildSlot = val;
                triggerHaptic('light');
            }
        });
    }

    // Render Starting Class Custom Staggered Select
    const classWrapper = document.getElementById('class-select-wrapper');
    const classes = STARTING_CLASSES[gameId] || STARTING_CLASSES.eldenring;
    if (classWrapper) {
        const classOptions = classes.map((cls, idx) => ({
            value: idx,
            label: cls.name,
            extra: `Lvl ${cls.level}`
        }));
        createStaggeredCustomSelect({
            container: classWrapper,
            id: 'class-select',
            icon: 'user',
            options: classOptions,
            selectedValue: selectedClassIndex,
            onChange: (val) => {
                selectedClassIndex = parseInt(val, 10);
                syncBaseStatsWithClass();
            }
        });
    }

    // Fetch Full Equipment Dataset for Game
    try {
        const res = await fetch(`data/equipment/${gameId}_equipment.json`);
        currentEquipmentData = await res.json();
    } catch (e) {
        console.warn(`No equipment dataset for ${gameId}, using defaults...`);
        currentEquipmentData = null;
    }

    renderPlannerStatsGrid();
    renderEquipmentSlots();
    calculatePlannerMetrics();
}

function syncBaseStatsWithClass() {
    const classes = STARTING_CLASSES[currentActiveGame] || STARTING_CLASSES.eldenring;
    const base = classes[selectedClassIndex];
    if (!base) return;

    Object.keys(currentAllocatedStats).forEach(stat => {
        if (base[stat] !== undefined && currentAllocatedStats[stat] < base[stat]) {
            currentAllocatedStats[stat] = base[stat];
        }
    });
    renderPlannerStatsGrid();
    calculatePlannerMetrics();
}

function triggerHaptic(type = 'light') {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
            if (type === 'light') navigator.vibrate(12);
            else if (type === 'medium') navigator.vibrate(28);
            else if (type === 'error') navigator.vibrate([40, 30, 40, 30, 60]);
        } catch (e) {
            // Ignore vibration permission restrictions
        }
    }
}

function triggerStatLimitError(row, targetElement, slider) {
    triggerHaptic('error');

    if (targetElement) {
        targetElement.classList.remove('stat-step-error');
        void targetElement.offsetWidth;
        targetElement.classList.add('stat-step-error');
        setTimeout(() => {
            targetElement.classList.remove('stat-step-error');
        }, 400);
    }

    if (row) {
        row.classList.remove('stat-row-error');
        void row.offsetWidth;
        row.classList.add('stat-row-error');
        setTimeout(() => {
            row.classList.remove('stat-row-error');
        }, 400);
    }

    if (slider) {
        slider.classList.remove('stat-slider-error');
        void slider.offsetWidth;
        slider.classList.add('stat-slider-error');
        setTimeout(() => {
            slider.classList.remove('stat-slider-error');
        }, 400);
    }
}

function getCurrentSoulLevel() {
    const classes = STARTING_CLASSES[currentActiveGame] || STARTING_CLASSES.eldenring;
    const base = classes[selectedClassIndex] || classes[0];
    let totalStatPoints = 0;
    let baseStatPoints = 0;

    Object.keys(currentAllocatedStats).forEach(k => {
        totalStatPoints += currentAllocatedStats[k];
        baseStatPoints += (base[k] !== undefined ? base[k] : 10);
    });

    return base.level + (totalStatPoints - baseStatPoints);
}

function getTargetSoulLevel() {
    const targetInput = document.getElementById('target-sl-input');
    const val = targetInput ? parseInt(targetInput.value, 10) : 125;
    return isNaN(val) || val < 1 ? 125 : val;
}

function renderPlannerStatsGrid() {
    const grid = document.getElementById('planner-stats-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const classes = STARTING_CLASSES[currentActiveGame] || STARTING_CLASSES.eldenring;
    const base = classes[selectedClassIndex] || classes[0];

    const STAT_LABELS = {
        vig: 'Vigor (HP)',
        mnd: 'Mind (FP)',
        end: 'Endurance',
        str: 'Strength',
        dex: 'Dexterity',
        int: 'Intelligence',
        fth: 'Faith',
        arc: 'Arcane',
        vit: 'Vitality',
        att: 'Attunement',
        adp: 'Adaptability',
        res: 'Resistance',
        lck: 'Luck',
        bld: 'Bloodtinge',
        wil: 'Will / Attunement',
        mag: 'Magic'
    };

    // Attach target SL listener once
    const targetSlInput = document.getElementById('target-sl-input');
    const btnTargetSlMinus = document.getElementById('btn-target-sl-minus');
    const btnTargetSlPlus = document.getElementById('btn-target-sl-plus');

    if (targetSlInput && !targetSlInput.dataset.bound) {
        targetSlInput.dataset.bound = 'true';
        targetSlInput.addEventListener('input', () => {
            calculatePlannerMetrics();
        });
        targetSlInput.addEventListener('change', () => {
            calculatePlannerMetrics();
        });
    }

    if (btnTargetSlMinus && !btnTargetSlMinus.dataset.bound) {
        btnTargetSlMinus.dataset.bound = 'true';
        btnTargetSlMinus.addEventListener('click', () => {
            if (!targetSlInput) return;
            let current = parseInt(targetSlInput.value, 10) || 125;
            if (current > 1) {
                targetSlInput.value = current - 1;
                calculatePlannerMetrics();
                triggerHaptic('light');
            } else {
                triggerHaptic('error');
            }
        });
    }

    if (btnTargetSlPlus && !btnTargetSlPlus.dataset.bound) {
        btnTargetSlPlus.dataset.bound = 'true';
        btnTargetSlPlus.addEventListener('click', () => {
            if (!targetSlInput) return;
            let current = parseInt(targetSlInput.value, 10) || 125;
            if (current < 713) {
                targetSlInput.value = current + 1;
                calculatePlannerMetrics();
                triggerHaptic('light');
            } else {
                triggerHaptic('error');
            }
        });
    }

    Object.keys(currentAllocatedStats).forEach(statKey => {
        const val = currentAllocatedStats[statKey];
        const minVal = base[statKey] !== undefined ? base[statKey] : 1;
        const row = document.createElement('div');
        row.className = 'stat-allocation-row';

        row.innerHTML = `
            <span class="stat-row-name">${STAT_LABELS[statKey] || statKey.toUpperCase()}</span>
            <input type="range" class="stat-range-slider" min="${minVal}" max="99" value="${val}" data-stat="${statKey}">
            <span class="stat-value-badge" id="stat-val-${statKey}">${val}</span>
            <button type="button" class="btn-stat-step btn-stat-minus" data-stat="${statKey}">−</button>
            <button type="button" class="btn-stat-step btn-stat-plus" data-stat="${statKey}">＋</button>
        `;

        const slider = row.querySelector('.stat-range-slider');
        const plusBtn = row.querySelector('.btn-stat-plus');
        const minusBtn = row.querySelector('.btn-stat-minus');

        slider.addEventListener('input', (e) => {
            const requestedVal = parseInt(e.target.value, 10);
            const currentStatVal = currentAllocatedStats[statKey];
            const currentLevel = getCurrentSoulLevel();
            const targetLevel = getTargetSoulLevel();
            const minAllowed = base[statKey] !== undefined ? base[statKey] : 1;

            // Maximum allowable points for this stat without exceeding target soul level
            const pointsRemaining = Math.max(0, targetLevel - currentLevel);
            const maxAllowed = Math.min(99, currentStatVal + pointsRemaining);

            if (requestedVal > maxAllowed) {
                // Stop/clamp slider at maxAllowed and animate error
                currentAllocatedStats[statKey] = Math.max(minAllowed, maxAllowed);
                slider.value = currentAllocatedStats[statKey];
                const badge = document.getElementById(`stat-val-${statKey}`);
                if (badge) badge.textContent = currentAllocatedStats[statKey];
                calculatePlannerMetrics();
                triggerStatLimitError(row, slider, slider);
                return;
            }

            if (requestedVal < minAllowed) {
                currentAllocatedStats[statKey] = minAllowed;
                slider.value = minAllowed;
                const badge = document.getElementById(`stat-val-${statKey}`);
                if (badge) badge.textContent = minAllowed;
                calculatePlannerMetrics();
                triggerStatLimitError(row, minusBtn, slider);
                return;
            }

            currentAllocatedStats[statKey] = requestedVal;
            const badge = document.getElementById(`stat-val-${statKey}`);
            if (badge) badge.textContent = requestedVal;
            calculatePlannerMetrics();
        });

        minusBtn.addEventListener('click', () => {
            const minAllowed = base[statKey] !== undefined ? base[statKey] : 1;
            if (currentAllocatedStats[statKey] > minAllowed) {
                currentAllocatedStats[statKey]--;
                slider.value = currentAllocatedStats[statKey];
                const badge = document.getElementById(`stat-val-${statKey}`);
                if (badge) badge.textContent = currentAllocatedStats[statKey];
                calculatePlannerMetrics();
                triggerHaptic('light');
            } else {
                triggerStatLimitError(row, minusBtn, slider);
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentLevel = getCurrentSoulLevel();
            const targetLevel = getTargetSoulLevel();
            const currentStatVal = currentAllocatedStats[statKey];

            // Exceeds Soul Level OR exceeds max stat 99
            if (currentLevel >= targetLevel || currentStatVal >= 99) {
                triggerStatLimitError(row, plusBtn, slider);
                return;
            }

            currentAllocatedStats[statKey]++;
            slider.value = currentAllocatedStats[statKey];
            const badge = document.getElementById(`stat-val-${statKey}`);
            if (badge) badge.textContent = currentAllocatedStats[statKey];
            calculatePlannerMetrics();
            triggerHaptic('light');
        });

        grid.appendChild(row);
    });
}

function calculatePlannerMetrics() {
    const level = getCurrentSoulLevel();
    const targetLevel = getTargetSoulLevel();

    const calcCurrentLevel = document.getElementById('calc-current-level');
    const calcPointsRemaining = document.getElementById('calc-points-remaining');
    const derivedPvP = document.getElementById('derived-pvp');
    const buildBannerSl = document.getElementById('build-banner-sl');

    if (calcCurrentLevel) calcCurrentLevel.textContent = level;
    if (buildBannerSl) buildBannerSl.textContent = `SL ${level}`;
    if (calcPointsRemaining) {
        const diff = targetLevel - level;
        if (diff > 0) {
            calcPointsRemaining.textContent = `${diff} to spend`;
            calcPointsRemaining.className = 'metric-value';
        } else if (diff === 0) {
            calcPointsRemaining.textContent = `At Cap (0)`;
            calcPointsRemaining.className = 'metric-value text-accent';
        } else {
            calcPointsRemaining.textContent = `${Math.abs(diff)} over target`;
            calcPointsRemaining.className = 'metric-value text-accent';
        }
    }
    if (derivedPvP) {
        const minPvP = Math.max(1, Math.floor(level * 0.9 - 10));
        const maxPvP = Math.floor(level * 1.1 + 10);
        derivedPvP.textContent = `${minPvP} - ${maxPvP}`;
    }

    // Derived Ratings: HP, FP, Stamina, Max Equip Load
    const vig = currentAllocatedStats.vig || 10;
    const mnd = currentAllocatedStats.mnd || currentAllocatedStats.att || currentAllocatedStats.wil || 10;
    const end = currentAllocatedStats.end || 10;

    const hp = Math.floor(300 + (vig > 40 ? 1450 + (vig - 40) * 15 : vig * 35));
    const fp = Math.floor(50 + (mnd > 35 ? 200 + (mnd - 35) * 6 : mnd * 8));
    const stamina = Math.floor(80 + (end > 50 ? 155 + (end - 50) * 0.5 : end * 2.2));
    const maxEquip = (45 + end * 1.5).toFixed(1);

    const derivedHp = document.getElementById('derived-hp');
    const derivedFp = document.getElementById('derived-fp');
    const derivedStamina = document.getElementById('derived-stamina');
    const derivedMaxEquip = document.getElementById('derived-max-equip');

    if (derivedHp) derivedHp.textContent = hp;
    if (derivedFp) derivedFp.textContent = fp;
    if (derivedStamina) derivedStamina.textContent = stamina;
    if (derivedMaxEquip) derivedMaxEquip.textContent = maxEquip;

    // Roll Mobility Meter Calculation from real equipment load
    recalculateEquipmentLoad();
    const ratio = ((currentEquipmentLoad / parseFloat(maxEquip)) * 100).toFixed(1);
    const rollRatioPill = document.getElementById('roll-ratio-pill');
    const rollBadge = document.getElementById('calc-roll-badge');
    const rollMeterFill = document.getElementById('roll-meter-fill');
    const calcWeightText = document.getElementById('calc-weight-text');
    const buildBannerMobility = document.getElementById('build-banner-mobility');

    if (calcWeightText) calcWeightText.textContent = `Weight: ${currentEquipmentLoad.toFixed(1)} / ${maxEquip}`;
    if (rollRatioPill) rollRatioPill.textContent = `${ratio}%`;
    if (rollMeterFill) {
        rollMeterFill.style.width = `${Math.min(100, ratio)}%`;
    }

    if (rollBadge) {
        if (ratio <= 30.0) {
            rollBadge.className = 'roll-status-badge roll-badge-light';
            rollBadge.textContent = 'LIGHT ROLL (Fast)';
            if (buildBannerMobility) {
                buildBannerMobility.textContent = 'LIGHT ROLL';
                buildBannerMobility.style.color = '#2ecc71';
            }
            if (rollMeterFill) rollMeterFill.style.background = '#27ae60';
        } else if (ratio <= 70.0) {
            rollBadge.className = 'roll-status-badge roll-badge-med';
            rollBadge.textContent = 'MEDIUM ROLL (Standard)';
            if (buildBannerMobility) {
                buildBannerMobility.textContent = 'MEDIUM ROLL';
                buildBannerMobility.style.color = 'var(--accent)';
            }
            if (rollMeterFill) rollMeterFill.style.background = 'var(--accent)';
        } else if (ratio <= 100.0) {
            rollBadge.className = 'roll-status-badge roll-badge-heavy';
            rollBadge.textContent = 'HEAVY ROLL (Fat Roll)';
            if (buildBannerMobility) {
                buildBannerMobility.textContent = 'HEAVY ROLL';
                buildBannerMobility.style.color = '#f39c12';
            }
            if (rollMeterFill) rollMeterFill.style.background = '#f39c12';
        } else {
            rollBadge.className = 'roll-status-badge roll-badge-over';
            rollBadge.textContent = 'OVERBURDENED (No Roll)';
            if (buildBannerMobility) {
                buildBannerMobility.textContent = 'OVERBURDENED';
                buildBannerMobility.style.color = 'var(--danger-red-hover)';
            }
            if (rollMeterFill) rollMeterFill.style.background = 'var(--danger-red)';
        }
    }
}

function recalculateEquipmentLoad() {
    let totalWeight = 0;
    Object.keys(currentEquipmentSelection).forEach(slotKey => {
        const item = currentEquipmentSelection[slotKey];
        if (item && item.weight) {
            totalWeight += parseFloat(item.weight);
        }
    });
    currentEquipmentLoad = totalWeight;
}

function renderEquipmentSlots() {
    const loadout = GAME_LOADOUT_CONFIG[currentActiveGame] || GAME_LOADOUT_CONFIG.eldenring;
    const weaponGrid = document.getElementById('planner-weapon-slots');
    const armorGrid = document.getElementById('planner-armor-slots');
    const ringGrid = document.getElementById('planner-ring-slots');

    const weaponsTitleEl = document.getElementById('planner-weapons-title');
    const accessoriesTitleEl = document.getElementById('planner-accessories-title');
    if (weaponsTitleEl) weaponsTitleEl.textContent = loadout.weaponsTitle;
    if (accessoriesTitleEl) accessoriesTitleEl.textContent = loadout.accessoriesTitle;

    // Default Fallback Data if json not loaded
    const weaponsList = currentEquipmentData?.weapons || [
        { name: 'Moonveil +10', type: 'Katana', weight: 5.5 },
        { name: 'Rivers of Blood', type: 'Katana', weight: 5.5 },
        { name: 'Claymore +25', type: 'Greatsword', weight: 9.0 },
        { name: 'Dark Moon Greatsword', type: 'Greatsword', weight: 10.0 },
        { name: 'Brass Shield +25', type: 'Medium Shield', weight: 7.0 }
    ];

    const armorData = currentEquipmentData?.armor || {
        head: [{ name: 'Knight Helm', weight: 4.6 }, { name: 'Black Hood', weight: 2.2 }, { name: 'Radahn Helm', weight: 7.5 }],
        chest: [{ name: 'Knight Armor', weight: 10.6 }, { name: 'Black Robes', weight: 5.1 }, { name: "Veteran's Armor", weight: 18.9 }],
        arms: [{ name: 'Knight Gauntlets', weight: 3.5 }, { name: "Lionel's Gauntlets", weight: 5.6 }],
        legs: [{ name: 'Knight Greaves', weight: 6.6 }, { name: "Lionel's Greaves", weight: 10.8 }]
    };

    const ringsList = currentEquipmentData?.rings || currentEquipmentData?.caryll_runes || [
        { name: "Erdtree's Favor +2", weight: 1.5 },
        { name: 'Dragoncrest Greatshield', weight: 1.2 },
        { name: 'Shard of Alexander', weight: 0.9 },
        { name: 'Green Turtle Talisman', weight: 0.7 }
    ];

    function mapOptions(items) {
        const res = [{ value: '', label: 'None', extra: '0.0 wt', weight: 0 }];
        items.forEach(it => {
            if (!it || !it.name || it.name.trim().toLowerCase() === 'none') {
                return; // Skip duplicate "None" entries from dataset
            }
            const wt = it.weight !== undefined ? it.weight : 0;
            const extra = it.type ? `${it.type} · ${wt} wt` : `${wt} wt`;
            res.push({
                value: it.name,
                label: it.name,
                extra: extra,
                weight: wt
            });
        });
        return res;
    }

    const weaponOptions = mapOptions(weaponsList);
    const headOptions = mapOptions(Array.isArray(armorData) ? armorData : (armorData.head || []));
    const chestOptions = mapOptions(Array.isArray(armorData) ? armorData : (armorData.chest || []));
    const armsOptions = mapOptions(Array.isArray(armorData) ? armorData : (armorData.arms || []));
    const legsOptions = mapOptions(Array.isArray(armorData) ? armorData : (armorData.legs || []));
    const ringOptions = mapOptions(ringsList);

    // Render game-accurate weapon slots (3 RH + 3 LH for Elden Ring, DS2, DS3; 2 RH + 2 LH for DS1, DeS, BB)
    if (weaponGrid) {
        weaponGrid.innerHTML = '';
        loadout.weaponSlots.forEach(slot => {
            const card = document.createElement('div');
            card.className = 'equipment-slot-card';
            card.innerHTML = `
                <span class="slot-label">${slot.label}</span>
                <div id="slot-container-${slot.id}"></div>
            `;
            weaponGrid.appendChild(card);

            createStaggeredCustomSelect({
                container: card.querySelector(`#slot-container-${slot.id}`),
                id: `equip-${slot.id}`,
                icon: slot.icon || 'swords',
                options: weaponOptions,
                selectedValue: currentEquipmentSelection[slot.id]?.value || '',
                onChange: (val, opt) => {
                    currentEquipmentSelection[slot.id] = opt;
                    calculatePlannerMetrics();
                }
            });
        });
    }

    // Render armor slots
    if (armorGrid) {
        armorGrid.innerHTML = `
            <div class="equipment-slot-card"><span class="slot-label">Head Armor</span><div id="slot-container-head"></div></div>
            <div class="equipment-slot-card"><span class="slot-label">Chest Armor</span><div id="slot-container-chest"></div></div>
            <div class="equipment-slot-card"><span class="slot-label">Gauntlets</span><div id="slot-container-arms"></div></div>
            <div class="equipment-slot-card"><span class="slot-label">Leg Armor</span><div id="slot-container-legs"></div></div>
        `;
        createStaggeredCustomSelect({
            container: document.getElementById('slot-container-head'),
            id: 'equip-head',
            icon: 'shield',
            options: headOptions,
            selectedValue: currentEquipmentSelection.head?.value || '',
            onChange: (val, opt) => {
                currentEquipmentSelection.head = opt;
                calculatePlannerMetrics();
            }
        });
        createStaggeredCustomSelect({
            container: document.getElementById('slot-container-chest'),
            id: 'equip-chest',
            icon: 'shield',
            options: chestOptions,
            selectedValue: currentEquipmentSelection.chest?.value || '',
            onChange: (val, opt) => {
                currentEquipmentSelection.chest = opt;
                calculatePlannerMetrics();
            }
        });
        createStaggeredCustomSelect({
            container: document.getElementById('slot-container-arms'),
            id: 'equip-arms',
            icon: 'shield',
            options: armsOptions,
            selectedValue: currentEquipmentSelection.arms?.value || '',
            onChange: (val, opt) => {
                currentEquipmentSelection.arms = opt;
                calculatePlannerMetrics();
            }
        });
        createStaggeredCustomSelect({
            container: document.getElementById('slot-container-legs'),
            id: 'equip-legs',
            icon: 'shield',
            options: legsOptions,
            selectedValue: currentEquipmentSelection.legs?.value || '',
            onChange: (val, opt) => {
                currentEquipmentSelection.legs = opt;
                calculatePlannerMetrics();
            }
        });
    }

    // Render game-accurate ring / accessory slots (4 for ER/DS2/DS3/BB/LoP, 2 for DS1/DeS)
    if (ringGrid) {
        ringGrid.innerHTML = '';
        loadout.accessorySlots.forEach(slot => {
            const card = document.createElement('div');
            card.className = 'equipment-slot-card';
            card.innerHTML = `
                <span class="slot-label">${slot.label}</span>
                <div id="slot-container-${slot.id}"></div>
            `;
            ringGrid.appendChild(card);

            createStaggeredCustomSelect({
                container: card.querySelector(`#slot-container-${slot.id}`),
                id: `equip-${slot.id}`,
                icon: slot.icon || 'sparkles',
                options: ringOptions,
                selectedValue: currentEquipmentSelection[slot.id]?.value || '',
                onChange: (val, opt) => {
                    currentEquipmentSelection[slot.id] = opt;
                    calculatePlannerMetrics();
                }
            });
        });
    }
}

// Reset stats button
const btnResetStats = document.getElementById('btn-reset-stats');
if (btnResetStats) {
    btnResetStats.addEventListener('click', () => {
        const classes = STARTING_CLASSES[currentActiveGame] || STARTING_CLASSES.eldenring;
        const base = classes[selectedClassIndex] || classes[0];
        Object.keys(currentAllocatedStats).forEach(k => {
            currentAllocatedStats[k] = base[k] || 10;
        });
        renderPlannerStatsGrid();
        calculatePlannerMetrics();
        triggerHaptic('light');
    });
}

// ========================================================
// 10. MODALS & UNIVERSAL MASTERY OVERVIEW
// ========================================================
const modalMastery = document.getElementById('modal-mastery');
const btnOpenMastery = document.getElementById('btn-open-mastery');
const btnCloseMastery = document.getElementById('btn-close-mastery');

const modalBackup = document.getElementById('modal-backup');
const btnOpenBackup = document.getElementById('btn-open-backup');
const btnCloseBackup = document.getElementById('btn-close-backup');

function openMasteryModal() {
    if (modalMastery) {
        modalMastery.style.display = 'flex';
        renderMasteryList();
    }
}

if (btnOpenMastery) btnOpenMastery.addEventListener('click', openMasteryModal);
if (btnCloseMastery) btnCloseMastery.addEventListener('click', () => { if (modalMastery) modalMastery.style.display = 'none'; });

if (btnOpenBackup) btnOpenBackup.addEventListener('click', () => { if (modalBackup) modalBackup.style.display = 'flex'; });
if (btnCloseBackup) btnCloseBackup.addEventListener('click', () => { if (modalBackup) modalBackup.style.display = 'none'; });

async function renderMasteryList() {
    const list = document.getElementById('mastery-games-list');
    if (!list) return;
    list.innerHTML = '';

    let grandTotal = 0;
    let grandCompleted = 0;
    let platinumsEarned = 0;

    for (const game of GAMES_REGISTRY) {
        let total = game.trophies;
        let completed = 0;

        try {
            const resp = await fetch(`data/${game.id}.json`);
            const raw = await resp.json();
            const data = normalizeGameData(raw);
            let gameItemsCount = 0;
            data.categories.forEach(cat => {
                cat.items.forEach(it => {
                    gameItemsCount++;
                    if (getSavedState(it.id)) completed++;
                });
            });
            if (gameItemsCount > 0) total = gameItemsCount;
        } catch (e) {}

        const pct = Math.round((completed / total) * 100);
        grandTotal += total;
        grandCompleted += completed;
        if (pct === 100) platinumsEarned++;

        const row = document.createElement('div');
        row.className = 'mastery-game-row';
        row.innerHTML = `
            <img src="${game.icon}" alt="${game.name}" class="mastery-game-icon">
            <div class="mastery-game-info">
                <span class="mastery-game-name">${game.name}</span>
                <div class="mastery-game-bar"><div class="mastery-game-fill" style="width: ${pct}%;"></div></div>
            </div>
            <span class="mastery-game-pct">${completed}/${total} (${pct}%)</span>
        `;
        list.appendChild(row);
    }

    const overallPct = grandTotal > 0 ? Math.round((grandCompleted / grandTotal) * 100) : 0;
    const elOverallPct = document.getElementById('mastery-overall-percentage');
    const elTotalPlats = document.getElementById('mastery-total-platinums');

    if (elOverallPct) elOverallPct.textContent = `${overallPct}%`;
    if (elTotalPlats) elTotalPlats.textContent = `${platinumsEarned} / ${GAMES_REGISTRY.length}`;
    refreshLucideIcons();
}

// Data Backup Export / Import / Reset
const btnExportBackup = document.getElementById('btn-export-backup');
const inputImportBackup = document.getElementById('input-import-backup');
const btnResetAllData = document.getElementById('btn-reset-all-data');

if (btnExportBackup) {
    btnExportBackup.addEventListener('click', () => {
        const backupData = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('gitgud_')) {
                backupData[key] = localStorage.getItem(key);
            }
        }
        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gitgud_backup_${activeProfile}_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });
}

if (inputImportBackup) {
    inputImportBackup.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                Object.keys(data).forEach(k => {
                    localStorage.setItem(k, data[k]);
                });
                alert('Backup imported successfully!');
                window.location.reload();
            } catch (err) {
                alert('Invalid JSON backup file.');
            }
        };
        reader.readAsText(file);
    });
}

if (btnResetAllData) {
    btnResetAllData.addEventListener('click', () => {
        if (confirm(`Are you sure you want to reset all checklist data for profile "${activeProfile}"?`)) {
            const prefix = `gitgud_prof_${activeProfile}__`;
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(prefix)) keysToRemove.push(key);
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));
            alert('Profile data reset.');
            window.location.reload();
        }
    });
}

// ========================================================
// 11. PROFILE SWITCHER
// ========================================================
const profileSelect = document.getElementById('profile-select');
const btnAddProfile = document.getElementById('btn-add-profile');

function renderProfileSelect() {
    if (!profileSelect) return;
    profileSelect.innerHTML = '';

    const profiles = JSON.parse(localStorage.getItem('gitgud_profiles') || '["Default"]');
    profiles.forEach(prof => {
        const opt = document.createElement('option');
        opt.value = prof;
        opt.textContent = `Profile: ${prof}`;
        if (prof === activeProfile) opt.selected = true;
        profileSelect.appendChild(opt);
    });

    profileSelect.addEventListener('change', (e) => {
        activeProfile = e.target.value;
        localStorage.setItem('gitgud_active_profile', activeProfile);
        window.location.reload();
    });
}

if (btnAddProfile) {
    btnAddProfile.addEventListener('click', () => {
        const name = prompt('Enter name for new character profile:');
        if (name && name.trim()) {
            const profiles = JSON.parse(localStorage.getItem('gitgud_profiles') || '["Default"]');
            if (!profiles.includes(name.trim())) {
                profiles.push(name.trim());
                localStorage.setItem('gitgud_profiles', JSON.stringify(profiles));
                activeProfile = name.trim();
                localStorage.setItem('gitgud_active_profile', activeProfile);
                window.location.reload();
            }
        }
    });
}

// Floating back to top button
const btnBackToTop = document.getElementById('btn-back-to-top');
function handleBackToTopVisibility() {
    if (!btnBackToTop) return;
    btnBackToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
}
window.addEventListener('scroll', handleBackToTopVisibility);
if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================================
// 12. COMMUNITY CREDITS TICKER & ATTRIBUTIONS MODAL
// ========================================================
function initCreditsTicker() {
    const btnOpenCreditsBadge = document.getElementById('btn-open-credits-badge');
    const btnCloseCredits = document.getElementById('btn-close-credits');
    const modalCredits = document.getElementById('modal-credits');

    function openCreditsModal() {
        if (modalCredits) {
            modalCredits.style.display = 'flex';
            refreshLucideIcons();
        }
    }

    function closeCreditsModal() {
        if (modalCredits) {
            modalCredits.style.display = 'none';
        }
    }

    if (btnOpenCreditsBadge) {
        btnOpenCreditsBadge.addEventListener('click', openCreditsModal);
        btnOpenCreditsBadge.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCreditsModal();
            }
        });
    }

    if (btnCloseCredits) {
        btnCloseCredits.addEventListener('click', closeCreditsModal);
    }

    if (modalCredits) {
        modalCredits.addEventListener('click', (e) => {
            if (e.target === modalCredits) closeCreditsModal();
        });
    }
}

// ========================================================
// 13. PWA SERVICE WORKER REGISTRATION
// ========================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).catch(err => {
            console.log('PWA ServiceWorker registration failed:', err);
        });
    });
}

// ========================================================
// 14. WAYFINDER KEYBOARD SHORTCUTS
// ========================================================
window.addEventListener('keydown', (e) => {
    // If typing in input, textarea, or select, do not intercept
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        if (e.key === 'Escape') document.activeElement.blur();
        return;
    }

    if (e.key === '1') {
        setAppMode('home');
        triggerHaptic('light');
    } else if (e.key === '2' && currentActiveGame) {
        setAppMode('platinum', currentActiveGame);
        triggerHaptic('light');
    } else if (e.key === '3' && currentActiveGame) {
        const game = GAMES_REGISTRY.find(g => g.id === currentActiveGame);
        if (game && game.hasWalkthrough) {
            setAppMode('walkthrough', currentActiveGame);
            triggerHaptic('light');
        }
    } else if (e.key === '4' && currentActiveGame) {
        const game = GAMES_REGISTRY.find(g => g.id === currentActiveGame);
        if (game && game.hasPlanner) {
            setAppMode('planner', currentActiveGame);
            triggerHaptic('light');
        }
    } else if (e.key === '/') {
        const searchInput = document.getElementById('global-search-input');
        if (searchInput && viewPlatinum && viewPlatinum.style.display !== 'none') {
            e.preventDefault();
            searchInput.focus();
        }
    } else if (e.key.toLowerCase() === 'm') {
        openMasteryModal();
    } else if (e.key.toLowerCase() === 't') {
        toggleThemeMode();
    } else if (e.key === 'Escape') {
        if (modalMastery) modalMastery.style.display = 'none';
        if (modalBackup) modalBackup.style.display = 'none';
        const modalCredits = document.getElementById('modal-credits');
        if (modalCredits) modalCredits.style.display = 'none';
        closeAllCustomDropdowns();
        closeMobileDrawer();
    }
});

// ========================================================
// 15. INITIALIZATION
// ========================================================
initThemeMode();
initProfileDropdown();
initCreditsTicker();
initAppPreloader();
setAppMode('home');
refreshLucideIcons();

// ========================================================
// 16. ASSET PRELOADER DISMISSAL
// ========================================================
function initAppPreloader() {
    const preloader = document.getElementById('app-preloader');
    if (!preloader) return;

    let isDismissed = false;
    const startTime = Date.now();
    const minDisplayTime = 380;

    const dismissPreloader = () => {
        if (isDismissed) return;
        isDismissed = true;

        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDisplayTime - elapsed);

        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.style.display = 'none';
                }
            }, 650);
        }, remaining);
    };

    if (document.readyState === 'complete') {
        dismissPreloader();
    } else {
        window.addEventListener('load', dismissPreloader, { once: true });
    }

    // Safety fallback timeout in case CDN asset hangs
    setTimeout(dismissPreloader, 2800);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refreshLucideIcons);
} else {
    refreshLucideIcons();
}