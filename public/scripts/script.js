'use strict';

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
let lsData;
for (let i = 2; i < inputEls.length; i++) {
  inputEls[i].classList.add('hidden');
}
