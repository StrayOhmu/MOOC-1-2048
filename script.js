document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const gridSize = 4;
    const grid = [];

    // Initialiser la grille avec des valeurs nulles
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = null;
            const gridSquare = document.createElement('div');
            gridSquare.setAttribute('data-i', i);
            gridSquare.setAttribute('data-j', j);
            gridContainer.appendChild(gridSquare);
        }
    }

    // Défi 3
    // Fonction pour définir la valeur d'une case
    function setValue(i, j, value) {
        grid[i][j] = value;
        const square = document.querySelector(`div[data-i='${i}'][data-j='${j}']`);
        square.textContent = value;
    }

    // Défi 3
    // Fonction pour obtenir la valeur d'une case
    function getValue(i, j) {
        return grid[i][j];
    }

    // Défi 3
    // Fonction pour vérifier si une case est vide
    function isEmpty(i, j) {
        return grid[i][j] === null;
    }

    // Défi 4
    // Fonction pour démarrer une nouvelle partie
    function newGame() {
        // Choisir deux cases aléatoires
        let firstCell = getRandomEmptyCell();
        let secondCell = getRandomEmptyCell();

        // S'assurer que les deux cases sont différentes
        while (firstCell.i === secondCell.i && firstCell.j === secondCell.j) {
            secondCell = getRandomEmptyCell();
        }

        // Placer les valeurs dans les cases
        setValue(firstCell.i, firstCell.j, Math.random() < 0.85 ? 2 : 4);
        setValue(secondCell.i, secondCell.j, Math.random() < 0.60 ? 2 : 4);
    }

    // Défi 4
    // Fonction pour obtenir une case vide aléatoire
    function getRandomEmptyCell() {
        let emptyCells = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (isEmpty(i, j)) {
                    emptyCells.push({ i, j });
                }
            }
        }
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    // Fonction pour ajouter une nouvelle tuile
    function newTile() {
        let emptyCell = getRandomEmptyCell();
        if (emptyCell) {
            setValue(emptyCell.i, emptyCell.j, Math.random() < 0.85 ? 2 : 4);
        }
    }

    // Défi 5
    // Fonction pour déplacer les cases vers la droite
    function moveRight() {
        for (let i = 0; i < gridSize; i++) {
            let row = grid[i].filter(val => val !== null);
            let empty = Array(gridSize - row.length).fill(null);
            grid[i] = empty.concat(row);
        }
    }

    // Défi 5
    // Fonction pour déplacer les cases vers la gauche
    function moveLeft() {
        for (let i = 0; i < gridSize; i++) {
            let row = grid[i].filter(val => val !== null);
            let empty = Array(gridSize - row.length).fill(null);
            grid[i] = row.concat(empty);
        }
    }

    // Défi 5
    // Fonction pour déplacer les cases vers le haut
    function moveUp() {
        for (let j = 0; j < gridSize; j++) {
            let column = [];
            for (let i = 0; i < gridSize; i++) {
                if (grid[i][j] !== null) {
                    column.push(grid[i][j]);
                }
            }
            let empty = Array(gridSize - column.length).fill(null);
            for (let i = 0; i < gridSize; i++) {
                grid[i][j] = column.shift() || empty.shift();
            }
        }
    }

    // Défi 5
    // Fonction pour déplacer les cases vers le bas
    function moveDown() {
        for (let j = 0; j < gridSize; j++) {
            let column = [];
            for (let i = gridSize - 1; i >= 0; i--) {
                if (grid[i][j] !== null) {
                    column.push(grid[i][j]);
                }
            }
            let empty = Array(gridSize - column.length).fill(null);
            for (let i = gridSize - 1; i >= 0; i--) {
                grid[i][j] = column.pop() || empty.pop();
            }
        }
    }

    // Défi 6
    // Fonction pour fusionner les cases vers la droite
    function fusionRight() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = gridSize - 1; j > 0; j--) {
                if (grid[i][j] !== null && grid[i][j] === grid[i][j - 1]) {
                    grid[i][j] *= 2;
                    grid[i][j - 1] = null;
                }
            }
        }
    }

    // Défi 6
    // Fonction pour fusionner les cases vers la gauche
    function fusionLeft() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize - 1; j++) {
                if (grid[i][j] !== null && grid[i][j] === grid[i][j + 1]) {
                    grid[i][j] *= 2;
                    grid[i][j + 1] = null;
                }
            }
        }
    }

    // Défi 6
    // Fonction pour fusionner les cases vers le haut
    function fusionUp() {
        for (let j = 0; j < gridSize; j++) {
            for (let i = 0; i < gridSize - 1; i++) {
                if (grid[i][j] !== null && grid[i][j] === grid[i + 1][j]) {
                    grid[i][j] *= 2;
                    grid[i + 1][j] = null;
                }
            }
        }
    }

    // Défi 6
    // Fonction pour fusionner les cases vers le bas
    function fusionDown() {
        for (let j = 0; j < gridSize; j++) {
            for (let i = gridSize - 1; i > 0; i--) {
                if (grid[i][j] !== null && grid[i][j] === grid[i - 1][j]) {
                    grid[i][j] *= 2;
                    grid[i - 1][j] = null;
                }
            }
        }
    }

    // Défi 7
    function right() {
        moveRight();
        fusionRight();
        moveRight();
        newTile();
    }

    // Défi 7
    function left() {
        moveLeft();
        fusionLeft();
        moveLeft();
        newTile();
    }

    // Défi 7
    function up() {
        moveUp();
        fusionUp();
        moveUp();
        newTile();
    }

    // Défi 7
    function down() {
        moveDown();
        fusionDown();
        moveDown();
        newTile();
    }

    // Fonction pour mettre à jour l'affichage de la grille
    function updateGrid() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const square = document.querySelector(`div[data-i='${i}'][data-j='${j}']`);
                square.textContent = grid[i][j] !== null ? grid[i][j] : '';
            }
        }
    }
    
    // Fonction pour gérer les événements de touche
    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowRight':
                right();
                updateGrid();
                break;
            case 'ArrowLeft':
                left();
                updateGrid();
                break;
            case 'ArrowUp':
                up();
                updateGrid();
                break;
            case 'ArrowDown':
                down();
                updateGrid();
                break;
        }
    }

    // Ajouter un écouteur d'événements pour les touches du clavier
    document.addEventListener('keydown', handleKeyPress);

    // Démarrer une nouvelle partie
    newGame();

});