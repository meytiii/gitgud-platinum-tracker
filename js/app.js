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
            
            categoryBlock.appendChild(itemDiv);
        });
        
        trackerContainer.appendChild(categoryBlock);
    });
}

function updateProgress(gameId) {
    let total = 0;
    let completed = 0;
    
    Object.keys(currentGameData).forEach(key => {
        if (key === 'game') return;
        currentGameData[key].forEach(item => {
            total++;
            if (localStorage.getItem(`${gameId}_${item.id}`) === 'true') {
                completed++;
            }
        });
    });
    
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    globalProgress.style.width = `${percentage}%`;
    globalProgress.textContent = `${percentage}% Platinum`;
}