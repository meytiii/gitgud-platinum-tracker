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
    try {
        const response = await fetch(`data/${gameId}.json`);
        if (!response.ok) throw new Error('Network response was not ok');
        currentGameData = await response.json();
        gameTitle.textContent = currentGameData.game;
        renderTracker(gameId);
        updateProgress(gameId);
    } catch (error) {
        trackerContainer.innerHTML = '<p>Data not found. Please create the JSON file.</p>';
    }
}

function renderTracker(gameId) {
    trackerContainer.innerHTML = '';
    
    Object.keys(currentGameData).forEach(key => {
        if (key === 'game') return;
        
        const categoryBlock = document.createElement('div');
        categoryBlock.className = 'category-block';
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.textContent = key.replace('category_', '').toUpperCase();
        categoryBlock.appendChild(title);
        
        currentGameData[key].forEach(item => {
            if (item.steps) {
                const questTitle = document.createElement('h4');
                questTitle.textContent = item.name;
                questTitle.style.color = '#d4af37';
                questTitle.style.marginTop = '15px';
                questTitle.style.marginBottom = '5px';
                categoryBlock.appendChild(questTitle);
                
                item.steps.forEach(step => {
                    categoryBlock.appendChild(createCheckboxItem(gameId, step));
                });
            } else {
                categoryBlock.appendChild(createCheckboxItem(gameId, item));
            }
        });
        
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
    let total = 0;
    let completed = 0;
    
    Object.keys(currentGameData).forEach(key => {
        if (key === 'game') return;
        currentGameData[key].forEach(item => {
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
    globalProgress.style.width = `${percentage}%`;
    globalProgress.textContent = `${percentage}% Platinum`;
}