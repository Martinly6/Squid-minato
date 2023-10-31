/* -----------------------
FASE DI PREPARAZIONE
------------------------ */

/* -----------------------
FASE DI PREPARAZIONE
------------------------ */

// Recuperare dalla pagina tutti gli elementi di interesse
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

// Preparo delle informazioni utili alla logica di gioco
const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;
let gameEnded = false;

// Generare TOT bombe casuali
while (bombsList.length < totalBombs) {
  const number = Math.floor(Math.random() * totalCells) + 1;
  if (!bombsList.includes(number)) bombsList.push(number);
}

// Aggiungi una cella del tesoro in una posizione diversa dalle celle delle bombe
let treasureLocation;
do {
  treasureLocation = Math.floor(Math.random() * totalCells) + 1;
} while (bombsList.includes(treasureLocation));

console.log(bombsList);
console.log(treasureLocation);

/* -----------------------
GRIGLIA E LOGICA DI GIOCO
----------------------- */
let isCellEven = false;
let isRowEven = false;

for (let i = 1; i <= totalCells; i++) {
  // Creo un elemento e gli do la classe 'cell'
  const cell = document.createElement('div');
  cell.classList.add('cell');

  isCellEven = i % 2 === 0;

  if (isRowEven && isCellEven) cell.classList.add('cell-dark');
  else if (!isRowEven && !isCellEven) cell.classList.add('cell-dark');

  if (i % 10 === 0) isRowEven = !isRowEven;

  // Gestiamo il click della cella
  cell.addEventListener('click', function () {
    if (gameEnded) return;
    if (cell.classList.contains('cell-clicked')) return;

    if (bombsList.includes(i)) {
      cell.classList.add('cell-bomb');
      revealAllBombsAndTreasure();
      endGame(false); 
    } else if (i === treasureLocation) {
      cell.classList.add('cell-treasure');
      updateScore();
      endGame(true);
    } else {
      cell.classList.add('cell-clicked');
      updateScore();
    }
  });

  grid.appendChild(cell);
}

/* -------------------
FUNZIONI
------------------- */
// Funzione per aggiornare il punteggio
function updateScore() {
  score++;
  scoreCounter.innerText = String(score).padStart(5, '0');

  if (score === maxScore) endGame(true);
}

// Funzione per decretare la fine del gioco
function endGame(isVictory) {
  gameEnded = true;
  if (isVictory === true) {
    endGameScreen.classList.remove('hidden');
    endGameScreen.classList.add('win');
    endGameText.innerHTML = 'YOU<br>WIN';
  } else {
    endGameScreen.classList.remove('hidden');
    endGameText.innerHTML = 'YOU<br>LOSE';
  }
}

// Funzione per ricaricare la pagina
function playAgain() {
  location.reload();
}

// Funzione per rivelare tutte le bombe e il tesoro
function revealAllBombsAndTreasure() {
  const cells = document.querySelectorAll('.cell');
  for (let i = 1; i <= cells.length; i++) {
    const cellToReveal = cells[i - 1];
    if (bombsList.includes(i)) {
      cellToReveal.classList.add('cell-bomb');
    }
    if (i === treasureLocation) {
      cellToReveal.classList.add('cell-treasure');
    }
  }
}

/* ---------------------
EVENTI
----------------------- */
playAgainButton.addEventListener('click', playAgain);