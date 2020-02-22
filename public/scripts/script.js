const playersEl = document.querySelector('.players');
const btnEls = document.querySelectorAll('.btn');
const startEl = document.querySelector('.start');
const formEl = startEl.querySelector('form');
const inputEls = formEl.querySelectorAll('input');
const counter = document.querySelector('.counter');
const restartEl = document.querySelector('.restart');
const resetBtn = document.querySelector('.reset-score');
const newGameBtn = document.querySelector('.new-game');
const confirmEl = document.querySelector('.confirm');
const confirmBtns = document.querySelectorAll('.confirm__btn');
const playersBtns = document.querySelectorAll('.players-btn');

confirmEl.classList.add('hidden');
counter.classList.add('hidden');
let playerData = [];
let playerScore;
let activePlayer;
let storageArray = [];
let result;
let player;

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('players'));
};

const lsData = getFromLocalStorage();

for (let i = 2; i < inputEls.length; i++) {
  inputEls[i].classList.add('hidden');
}

const startGame = () => {
  formEl.addEventListener('submit', event => {
    event.preventDefault();
    inputEls.forEach(input => {
      if (input.value) {
        let player = {
          name: input.value,
          score: 0
        };
        playerData.push(player);
        startEl.classList.add('hidden');
        counter.classList.remove('hidden');
        addToLocalStorage(input.value);
        input.value = '';
      }
    });
    init();
  });
};

const choosePlayers = () => {
  playersBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      for (let i = 0; i < playersBtns.length; i++) {
        playersBtns[i].classList.remove('players-btn-active');
      }
      btn.classList.add('players-btn-active');
      const players = parseInt(btn.dataset.players);
      inputEls.forEach(input => input.classList.add('hidden'));
      for (let i = players - 1; i >= 0; i--) {
        inputEls[i].classList.remove('hidden');
      }
    });
  });
  startGame();
};

if (!lsData) {
  choosePlayers();
} else {
  playerData = lsData;
  startEl.classList.add('hidden');
  counter.classList.remove('hidden');
  storageArray = lsData;
  init();
}

function createPlayerHTML(player) {
  return `<div class="player">
          <p class="player__name">${player.name}</p>
          <span class="player__score ">${player.score}</span>
          </div>`;
}

function stringToHTML(str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.firstChild;
}

function generatePlayers() {
  playerData.forEach(player => {
    const element = createPlayerHTML(player);
    playersEl.appendChild(stringToHTML(element));
  });
}

const updateScore = player => {
  const playerScoreEl = player.querySelector('.player__score');
  const playerName = player.querySelector('.player__name').textContent;
  console.log(storageArray);
  const currentPlayer = storageArray.find(
    element => element.name === playerName
  );
  playerScore = parseInt(playerScoreEl.textContent);
  const modifier = event.target.dataset.key;

  switch (modifier) {
    case '+1':
      result = playerScore + 1;
      break;
    case '+5':
      result = playerScore + 5;
      break;
    case '-1':
      result = playerScore - 1;
      break;
    case '-5':
      result = playerScore - 5;
      break;
  }
  playerScoreEl.textContent = result;
  updateLocalStorage(currentPlayer, result);
};

const addToLocalStorage = username => {
  player = {
    name: username,
    score: 0
  };
  storageArray.push(player);
  localStorage.setItem('players', JSON.stringify(storageArray));
};

const updateLocalStorage = (player, score) => {
  player.score = score;

  localStorage.setItem('players', JSON.stringify(storageArray));
};

function eventListeners() {
  playersEl.addEventListener('click', () => {
    if (activePlayer) {
      activePlayer.classList.remove('active');
    }
    activePlayer = event.target.closest('.player');
    activePlayer.classList.add('active');
  });

  btnEls.forEach(btn => btn.addEventListener('click', handleClickEvent));
  resetBtn.addEventListener('click', isSure);
  newGameBtn.addEventListener('click', isSure);
}

function handleClickEvent() {
  if (activePlayer) {
    updateScore(activePlayer);
  }
}

function init() {
  generatePlayers();
  eventListeners();
  activePlayer = playersEl.querySelector('.player');
  if (activePlayer) {
    activePlayer.classList.add('active');
  }
}

const resetScore = () => {
  const playerScores = document.querySelectorAll('.player__score');
  playerScores.forEach(score => (score.textContent = 0));
  storageArray.forEach(player => {
    player.score = 0;
    updateLocalStorage(player, player.score);
  });
};

const newGame = () => {
  resetScore();
  playerData = [];
  delete activePlayer;
  playersEl.innerHTML = '';
  playerScore = '';
  result = 0;
  startEl.classList.remove('hidden');
  confirmEl.classList.add('hidden');
  counter.classList.add('hidden');
  restartEl.classList.remove('hidden');
  for (let i = 2; i < inputEls.length; i++) {
    inputEls[i].classList.add('hidden');
  }
  playersBtns.forEach(btn => btn.classList.remove('players-btn-active'));
  playersBtns[0].classList.add('players-btn-active');
  localStorage.removeItem('players');
  storageArray = [];
  init();
};

function isSure(event) {
  restartEl.classList.add('hidden');
  confirmEl.classList.remove('hidden');
  let currentEvent = event.target.dataset.restart;

  confirmBtns.forEach(btn => {
    btn.addEventListener('click', event => {
      if (event.target.dataset.confirm === 'yes') {
        if (currentEvent === 'new-game') {
          newGame();
        } else if (currentEvent === 'reset-score') {
          resetScore();
        }
      }
      restartEl.classList.remove('hidden');
      confirmEl.classList.add('hidden');
      currentEvent = '';
    });
  });
}
