document.addEventListener('DOMContentLoaded', () => {
    const n = 10;
    let score = 0;
    const rowSwitches = document.getElementById('row-switches');
    const colSwitches = document.getElementById('col-switches');
    const lampGrid = document.getElementById('lamp-grid');
    const scoreBoard = document.getElementById('score');

    // Create row switches
    for (let i = 0; i < n; i++) {
        const switchElem = document.createElement('div');
        switchElem.classList.add('switch');
        switchElem.textContent = 'ON';
        switchElem.addEventListener('click', () => toggleRow(i));
        rowSwitches.appendChild(switchElem);
    }

    // Create lamp grid with random initial states
    const lamps = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            const lamp = document.createElement('div');
            lamp.classList.add('lamp');
            if (Math.random() > 0.5) {
                lamp.classList.add('on');
            }
            lampGrid.appendChild(lamp);
            row.push(lamp);
        }
        lamps.push(row);
    }

    // Create column switches
    for (let i = 0; i < n; i++) {
        const switchElem = document.createElement('div');
        switchElem.classList.add('switch');
        switchElem.textContent = 'ON';
        switchElem.addEventListener('click', () => toggleColumn(i));
        colSwitches.appendChild(switchElem);
    }

    // Toggle row lamps
    function toggleRow(rowIndex) {
        for (let j = 0; j < n; j++) {
            lamps[rowIndex][j].classList.toggle('on');
        }
        updateScore();
    }

    // Toggle column lamps
    function toggleColumn(colIndex) {
        for (let i = 0; i < n; i++) {
            lamps[i][colIndex].classList.toggle('on');
        }
        updateScore();
    }

    // Update score
    function updateScore() {
        score = 0;
        lamps.forEach(row => {
            row.forEach(lamp => {
                if (lamp.classList.contains('on')) {
                    score++;
                }
            });
        });
        scoreBoard.textContent = score - (100 - score);
    }

    // Initial score calculation
    updateScore();
});
