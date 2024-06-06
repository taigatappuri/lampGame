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
        switchElem.classList.add('switch', 'on');
        switchElem.textContent = 'ON';
        switchElem.addEventListener('click', () => {
            toggleRow(i);
            toggleSwitch(switchElem);
        });
        rowSwitches.appendChild(switchElem);
    }

    // Create column switches
    for (let i = 0; i < n; i++) {
        const switchElem = document.createElement('div');
        switchElem.classList.add('switch', 'on');
        switchElem.textContent = 'ON';
        switchElem.addEventListener('click', () => {
            toggleColumn(i);
            toggleSwitch(switchElem);
        });
        colSwitches.appendChild(switchElem);
    }

    // Create lamp grid with initial states
    const lamps = [];
    const lampStates = Array.from({ length: n }, () => Array(n).fill(false));

    // Set exactly 5 lamps on in each row
    for (let i = 0; i < n; i++) {
        const indices = Array.from({ length: n }, (_, index) => index);
        shuffleArray(indices);
        for (let j = 0; j < 5; j++) {
            lampStates[i][indices[j]] = true;
        }
    }

    // Ensure each column has exactly 5 lamps on
    for (let j = 0; j < n; j++) {
        let count = lampStates.reduce((acc, row) => acc + row[j], 0);
        if (count < 5) {
            const offRows = lampStates.map((row, i) => row[j] ? -1 : i).filter(i => i >= 0);
            shuffleArray(offRows);
            for (let i = 0; i < 5 - count; i++) {
                lampStates[offRows[i]][j] = true;
            }
        } else if (count > 5) {
            const onRows = lampStates.map((row, i) => row[j] ? i : -1).filter(i => i >= 0);
            shuffleArray(onRows);
            for (let i = 0; i < count - 5; i++) {
                lampStates[onRows[i]][j] = false;
            }
        }
    }

    // Create lamps based on the calculated states
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            const lamp = document.createElement('div');
            lamp.classList.add('lamp');
            if (lampStates[i][j]) {
                lamp.classList.add('on');
            }
            lampGrid.appendChild(lamp);
            row.push(lamp);
        }
        lamps.push(row);
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

    // Toggle switch appearance
    function toggleSwitch(switchElem) {
        if (switchElem.classList.contains('on')) {
            switchElem.classList.remove('on');
            switchElem.classList.add('off');
            switchElem.textContent = 'OFF';
        } else {
            switchElem.classList.remove('off');
            switchElem.classList.add('on');
            switchElem.textContent = 'ON';
        }
    }

    // Shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
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
