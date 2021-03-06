'use strict';

const getFromLocalStorage = () => {
  lsData = JSON.parse(localStorage.getItem('players'));
  if (lsData) {
    playerData = lsData;
    storageArray = lsData;
    startEl.classList.add('hidden');
    counter.classList.remove('hidden');
  }
};

const startGame = () => {
  formEl.addEventListener('submit', event => {
    event.preventDefault();
    inputEls.forEach(input => {
      if (!input.value) {
        return;
      }
      const player = createPlayer(input.value);
      input.value = '';
      startEl.classList.add('hidden');
      counter.classList.remove('hidden');
      addToLocalStorage(player);
    });
    init();
  });
};

const createPlayer = userInput => {
  const player = {
    name: userInput,
    score: 0,
    active: false
  };
  playerData.push(player);
  return player;
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
choosePlayers();

const createPlayerHTML = player => {
  return `<div class="player ${player.active ? 'active' : ''}">
          <p class="player__name">${player.name}</p>
          <span class="player__score ">${player.score}</span>
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
  const playerName = player.querySelector('.player__name').textContent;
  const currentPlayer = storageArray.find(
    element => element.name === playerName
  );
  playerScore = parseInt(playerScoreEl.textContent);
  const modifier = parseInt(event.target.dataset.key);
  const result = playerScore + modifier;
  playerScoreEl.textContent = result;
  updateLocalStorage(currentPlayer, result);
};

const addToLocalStorage = player => {
  storageArray.push(player);
  localStorage.setItem('players', JSON.stringify(storageArray));
};

const updateLocalStorage = (player, score) => {
  player.score = score;
  localStorage.setItem('players', JSON.stringify(storageArray));
};

const updateLocalStorageActive = player => {
  storageArray.forEach(player => (player.active = false));
  player.active = true;
  localStorage.setItem('players', JSON.stringify(storageArray));
};

const eventListeners = () => {
  playersEl.addEventListener('click', currentPlayer);
  btnEls.forEach(btn => btn.addEventListener('click', handleClickEvent));
  resetBtn.addEventListener('click', chooseReset);
  newGameBtn.addEventListener('click', chooseReset);
};

const handleClickEvent = () => {
  if (activePlayer) {
    updateScore(activePlayer);
  }
};

const currentPlayer = () => {
  if (activePlayer) {
    activePlayer.classList.remove('active');
  }
  activePlayer = event.target.closest('.player');
  activePlayer.classList.add('active');
  const playerName = activePlayer.querySelector('.player__name').textContent;
  const currentPlayer = storageArray.find(
    element => element.name === playerName
  );
  updateLocalStorageActive(currentPlayer);
};

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
  playersEl.innerHTML = '';
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

const chooseReset = event => {
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
};

const setActivePlayer = () => {
  let lastActivePlayer = playersEl.querySelector('.active');
  if (lastActivePlayer) {
    activePlayer = lastActivePlayer;
  } else {
    activePlayer = playersEl.querySelector('.player');
    if (activePlayer) {
      activePlayer.classList.add('active');
    }
  }
};

const init = () => {
  getFromLocalStorage();
  generatePlayers();
  eventListeners();
  setActivePlayer();
};
init();
