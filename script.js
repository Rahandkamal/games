const board = document.getElementById('game-board');
const movesText = document.getElementById('moves');
const winMessage = document.getElementById('win-message');
const resetButton = document.getElementById('reset-btn');

const symbols = ['🍎', '🍌', '🍓', '🍇', '🍍', '🍉', '🍒', '🥝'];
let cardValues = [...symbols, ...symbols]; // 8 pairs
let flippedCards = [];
let matchedCount = 0;
let moves = 0;

// Shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create game board
function createBoard() {
  const shuffled = shuffle(cardValues);
  shuffled.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerText = '?';
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (card.classList.contains('flipped') || flippedCards.length === 2) return;

  card.classList.add('flipped');
  card.innerText = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesText.innerText = `Moves: ${moves}`;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    matchedCount += 2;
    flippedCards = [];
    if (matchedCount === cardValues.length) {
      winMessage.classList.remove('hidden');
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.innerText = '?';
      card2.innerText = '?';
      flippedCards = [];
    }, 1000);
  }
}

// Reset the game
function resetGame() {
  board.innerHTML = '';
  flippedCards = [];
  matchedCount = 0;
  moves = 0;
  movesText.innerText = 'Moves: 0';
  winMessage.classList.add('hidden');
  createBoard();
}

// Event listeners
board.addEventListener('click', (e) => {
  if (e.target.classList.contains('card')) {
    flipCard(e.target);
  }
});

resetButton.addEventListener('click', resetGame);

// Initialize game
createBoard();
