const playersEl = document.querySelector('.players');
const btnEls = document.querySelectorAll('.btn');
const startEl = document.querySelector('.start');
const formEl = startEl.querySelector('form');
const inputEls = formEl.querySelectorAll('input');
const counter = document.querySelector('.counter');
const resetBtn = document.querySelector('.reset-score');
const newGameBtn = document.querySelector('.new-game');
counter.style.visibility = 'hidden';
let playerData = [];
let playerScore;
let activePlayer;
let result;

formEl.addEventListener('submit', event => {
  event.preventDefault();
  inputEls.forEach(input => {
    if (input.value) {
      playerData.push(input.value);
      startEl.style.visibility = 'hidden';
      counter.style.visibility = 'visible';
      input.value = '';
    }
  });
  init();
});

const createPlayerHTML = player => {
  return `<div class="player">
          <p class="player__name">${player}</p>
          <span class="player__score ">0</span>
          </div>`;
};

const stringToHTML = str => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.firstChild;
};

const generatePlayers = () => {
  playerData.forEach(player => {
    const element = createPlayerHTML(player);
    playersEl.appendChild(stringToHTML(element));
  });
};

const updateScore = player => {
  const playerScoreEl = player.querySelector('.player__score');
  playerScore = parseInt(playerScoreEl.textContent);
  const modifier = event.target.dataset.key;

  switch (modifier) {
    case '+1':
      result = playerScore + 1;
      break;
    case '+10':
      result = playerScore + 10;
      break;
    case '-1':
      result = playerScore - 1;
      break;
    case '-10':
      result = playerScore - 10;
      break;
  }
  playerScoreEl.textContent = result;
};

const eventListeners = () => {
  playersEl.addEventListener('click', () => {
    if (activePlayer) {
      activePlayer.classList.remove('active');
    }
    activePlayer = event.target.closest('.player');
    activePlayer.classList.add('active');
  });

  btnEls.forEach(btn => btn.addEventListener('click', handleClickEvent));
  resetBtn.addEventListener('click', resetScore);
  newGameBtn.addEventListener('click', newGame);
};

const handleClickEvent = () => {
  if (activePlayer) {
    updateScore(activePlayer);
  }
};

const init = () => {
  generatePlayers();
  eventListeners();
  activePlayer = playersEl.querySelector('.player');
  if (activePlayer) {
    activePlayer.classList.add('active');
  }
};

const resetScore = () => {
  const playerScores = document.querySelectorAll('.player__score');
  playerScores.forEach(score => {
    score.textContent = 0;
  });
};

const newGame = () => {
  resetScore();
  playerData = [];
  delete activePlayer;
  playersEl.innerHTML = '';
  playerScore = '';
  result = 0;
  startEl.style.visibility = 'visible';
  counter.style.visibility = 'hidden';
  init();
};
