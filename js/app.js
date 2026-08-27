// GitGud Platinum & Playthrough Walkthrough Tracker Logic

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

// Toolbar buttons
const tbJumpToggle = document.getElementById('tb-jump-toggle');
const tbExpandAll = document.getElementById('tb-expand-all');
const tbCollapseAll = document.getElementById('tb-collapse-all');
const tbFilterCompleted = document.getElementById('tb-filter-completed');

let currentMode = 'platinum'; // 'platinum' | 'walkthrough'
let currentPlatinumGame = 'ds1';
let currentWalkthroughGame = 'ds1';
let currentGameData = null;
let currentWalkthroughData = null;
let hideCompleted = false;

// =========================================
// 0. MULTI-PROFILE STORAGE SYSTEM
// =========================================
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
    
    // Backwards compatibility for Default Profile legacy keys
    if (profile === 'Default') {
        const legacyVal = localStorage.getItem(key);
        if (legacyVal !== null) {
            localStorage.setItem(profileKey, legacyVal); // migrate
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

profileSelect.addEventListener('change', (e) => {
    setActiveProfile(e.target.value);
});

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

btnDeleteProfile.addEventListener('click', () => {
    const active = getActiveProfile();
    if (active === 'Default') {
        window.alert('The "Default" profile cannot be deleted. You can create other profiles and delete them anytime.');
        return;
    }
    
    const confirmed = window.confirm(`Are you sure you want to delete profile "${active}" and all its saved progress?`);
    if (!confirmed) return;
    
    // Clean up local storage items for this profile
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

function refreshCurrentView() {
    if (currentMode === 'platinum') {
        loadGameData(currentPlatinumGame);
    } else {
        loadWalkthroughData(currentWalkthroughGame);
    }
}

// =========================================
// 1. MODE SWITCHING (Platinum vs Walkthrough)
// =========================================
function setMode(mode) {
    currentMode = mode;
    if (mode === 'platinum') {
        modePlatinumBtn.classList.add('active');
        modeWalkthroughBtn.classList.remove('active');
        listPlatinum.style.display = 'flex';
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
        listPlatinum.style.display = 'none';
        listWalkthrough.style.display = 'flex';
        brandSubtitle.textContent = 'Playthrough Guide';
        guideBadge.style.display = 'inline-block';
        walkthroughToolbar.style.display = 'flex';
        quickJumpContainer.style.display = 'block';
        btnBackToTop.style.display = 'flex';
        if (hideCompleted) {
            trackerContainer.classList.add('hide-completed');
        }

        // Map game if coming from platinum mode
        const availableWalkthroughs = ['ds1', 'ds2', 'ds3', 'eldenring'];
        if (availableWalkthroughs.includes(currentPlatinumGame)) {
            currentWalkthroughGame = currentPlatinumGame;
        } else {
            currentWalkthroughGame = 'ds1';
        }
        loadWalkthroughData(currentWalkthroughGame);
    }
}

modePlatinumBtn.addEventListener('click', () => setMode('platinum'));
modeWalkthroughBtn.addEventListener('click', () => setMode('walkthrough'));

// =========================================
// GAME SELECTION EVENT LISTENERS
// =========================================
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

// =========================================
// 2. PLATINUM TRACKER DATA & RENDER
// =========================================
async function loadGameData(gameId) {
    document.body.className = '';
    document.body.classList.add(`theme-${gameId}`);

    listPlatinum.querySelectorAll('.game-select').forEach(btn => btn.style.borderLeft = '');
    const activeBtn = listPlatinum.querySelector(`[data-game="${gameId}"]`) || document.getElementById(`btn-${gameId}`);
    if (activeBtn) activeBtn.style.borderLeft = '3px solid var(--gold)';

    try {
        const response = await fetch(`data/${gameId}.json`);
        if (!response.ok) throw new Error('Data not found');
        
        currentGameData = await response.json();
        renderTracker(gameId);
        updateProgress(gameId);
        
        gameTitle.textContent = currentGameData.game;
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
        } else {
            itemDiv.classList.remove('item-completed');
        }
        updateProgress(gameId);
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
            gameButton.classList.add('game-completed');
        } else {
            gameButton.classList.remove('game-completed');
        }
    }
}

// =========================================
// 3. PLAYTHROUGH WALKTHROUGH / CHEAT SHEET LOGIC
// =========================================
async function loadWalkthroughData(gameId) {
    document.body.className = '';
    document.body.classList.add(`theme-${gameId}`);

    listWalkthrough.querySelectorAll('.game-select').forEach(btn => btn.style.borderLeft = '');
    const activeBtn = listWalkthrough.querySelector(`[data-game="${gameId}"]`);
    if (activeBtn) activeBtn.style.borderLeft = '3px solid var(--gold)';

    try {
        const response = await fetch(`data/walkthroughs/${gameId}_walkthrough.json`);
        if (!response.ok) throw new Error('Walkthrough data not found');
        
        currentWalkthroughData = await response.json();
        renderWalkthrough(gameId);
        updateWalkthroughProgress(gameId);
        
        gameTitle.textContent = currentWalkthroughData.game;
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
        } else {
            itemDiv.classList.remove('item-completed');
        }
        updateWalkthroughProgress(gameId);
    });
    
    const label = document.createElement('label');
    label.htmlFor = `wt_${item.id}`;
    label.innerHTML = item.html || item.text;
    
    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(label);
    
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
        
        // Update Chapter Progress Bar
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
        
        // Update Chapter Pill Badge in Quick Jump TOC
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
            gameButton.classList.add('game-completed');
        } else {
            gameButton.classList.remove('game-completed');
        }
    }
}

// =========================================
// 4. WALKTHROUGH TOOLBAR CONTROLS
// =========================================
tbJumpToggle.addEventListener('click', () => {
    const isVisible = quickJumpContainer.style.display !== 'none';
    quickJumpContainer.style.display = isVisible ? 'none' : 'block';
    tbJumpToggle.classList.toggle('active', !isVisible);
});

tbExpandAll.addEventListener('click', () => {
    document.querySelectorAll('#tracker-container .category-content-wrapper').forEach(wrapper => {
        wrapper.classList.remove('collapsed');
    });
    document.querySelectorAll('#tracker-container .toggle-icon').forEach(icon => {
        icon.textContent = '▼';
    });
});

tbCollapseAll.addEventListener('click', () => {
    document.querySelectorAll('#tracker-container .category-content-wrapper').forEach(wrapper => {
        wrapper.classList.add('collapsed');
    });
    document.querySelectorAll('#tracker-container .toggle-icon').forEach(icon => {
        icon.textContent = '▶';
    });
});

tbFilterCompleted.addEventListener('click', () => {
    hideCompleted = !hideCompleted;
    trackerContainer.classList.toggle('hide-completed', hideCompleted);
    tbFilterCompleted.classList.toggle('active', hideCompleted);
    tbFilterCompleted.textContent = hideCompleted ? '👁️ Show All' : '👁️ Hide Completed';
});

btnBackToTop.addEventListener('click', () => {
    const target = quickJumpContainer.style.display !== 'none' ? quickJumpContainer : document.querySelector('.content header');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// =========================================
// 5. INITIALIZE ALL COMPLETION BADGES ON STARTUP
// =========================================
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

// Initial setup
renderProfileSelect();
loadGameData('ds1');
initTracker();