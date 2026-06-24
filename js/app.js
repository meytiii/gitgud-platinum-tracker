const gameButtons = document.querySelectorAll('.game-select');
const gameTitle = document.getElementById('game-title');
const trackerContainer = document.getElementById('tracker-container');
const globalProgress = document.getElementById('global-progress');

let currentGameData = null;

gameButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const gameId = e.target.id.replace('btn-', '');
        loadGameData(gameId);
    });
});

async function loadGameData(gameId) {
    document.body.className = '';
    document.body.classList.add(`theme-${gameId}`);

    const wipGames = ['sekiro', 'eldenringnightreign'];
    if (wipGames.includes(gameId)) {
        const nameMap = { 'sekiro': 'Sekiro', 'eldenringnightreign': 'Elden Ring Nightreign' };
        showWIP(nameMap[gameId]);
        return; 
    }

    document.querySelectorAll('.game-select').forEach(btn => btn.style.borderLeft = '');
    const activeBtn = document.getElementById(`btn-${gameId}`);
    if(activeBtn) activeBtn.style.borderLeft = '3px solid var(--gold)';

    try {
        const response = await fetch(`data/${gameId}.json`);
        if (!response.ok) throw new Error('Data not found');
        
        currentGameData = await response.json();
        renderTracker(gameId);
        updateProgress(gameId);
        
        document.getElementById('game-title').textContent = currentGameData.game;
    } catch (error) {
        trackerContainer.innerHTML = '<h2>Data not found. Please create the JSON file.</h2>';
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
                questTitle.style.color = '#d4af37';
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
    
    const savedState = localStorage.getItem(`${gameId}_${item.id}`);
    checkbox.checked = savedState === 'true';
    
    checkbox.addEventListener('change', (e) => {
        localStorage.setItem(`${gameId}_${item.id}`, e.target.checked);
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
                    if (localStorage.getItem(`${gameId}_${step.id}`) === 'true') {
                        catCompleted++;
                        globalCompleted++;
                    }
                });
            } else {
                catTotal++;
                globalTotal++;
                if (localStorage.getItem(`${gameId}_${item.id}`) === 'true') {
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
    
    const gameButton = document.getElementById(`btn-${gameId}`);
    if (gameButton) {
        if (globalPercentage === 100) {
            gameButton.classList.add('game-completed');
            gameButton.style.color = '';
        } else {
            gameButton.classList.remove('game-completed');
            gameButton.style.color = '';
        }
    }
}

// =========================================
// WORK IN PROGRESS LOGIC
// =========================================
function showWIP(gameName) {
    const gameId = gameName.toLowerCase().replace(/ /g, '').replace(':', '');
    document.body.className = '';
    document.body.classList.add(`theme-${gameId}`);
    
    document.getElementById('game-title').textContent = gameName;
    
    const globalProgress = document.getElementById('global-progress');
    globalProgress.style.width = '0%';
    globalProgress.textContent = 'Coming Soon';
    globalProgress.classList.remove('completed-glow');
    
    const trackerContainer = document.getElementById('tracker-container');
    trackerContainer.innerHTML = `
        <div class="wip-banner">
            <h2>🚧 WORK IN PROGRESS 🚧</h2>
            <p>The archives for ${gameName} are currently being inscribed. Return later!</p>
            <div class="wip-emojis">⚔️ 🩸 🐺</div>
        </div>
    `;
    
    document.querySelectorAll('.game-select').forEach(btn => btn.style.borderLeft = '');
    const activeBtn = document.getElementById(`btn-${gameName.toLowerCase().replace(/ /g, '').replace(':', '')}`);
    if(activeBtn) activeBtn.style.borderLeft = '3px solid #d4af37';
}

document.getElementById('btn-sekiro').addEventListener('click', () => showWIP('Sekiro'));
document.getElementById('btn-bloodborne').addEventListener('click', () => loadGameData('bloodborne'));
document.getElementById('btn-eldenring').addEventListener('click', () => loadGameData('eldenring'));
document.getElementById('btn-eldenringnightreign').addEventListener('click', () => showWIP('Elden Ring Nightreign'));
document.getElementById('btn-demonssouls').addEventListener('click', () => loadGameData('demonssouls'));

loadGameData('ds1');

async function initTracker() {
    const games = ['ds1', 'ds2', 'ds3', 'eldenring', 'bloodborne', 'demonssouls'];
    for (const gameId of games) {
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
                            if (localStorage.getItem(`${gameId}_${step.id}`) === 'true') {
                                completed++;
                            }
                        });
                    } else {
                        total++;
                        if (localStorage.getItem(`${gameId}_${item.id}`) === 'true') {
                            completed++;
                        }
                    }
                });
            });
            const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
            const gameButton = document.getElementById(`btn-${gameId}`);
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
initTracker();