'use strict';

// selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// starting conditions
let scores, currentScore, activePlayer, isPlaying;

// starting game conditions
const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');

  scores = [0, 0];
  isPlaying = true;
  currentScore = 0;
  activePlayer = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');

  isPlaying = true;
};
init();

// check for winner function
const changePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = !activePlayer ? 1 : 0;
};

// rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (isPlaying) {
    // generate a random roll
    const roll = Math.trunc(Math.random() * 6) + 1;

    // display dice
    dice.src = `dice-${roll}.png`;
    dice.classList.remove('hidden');

    // check if roll is one; if true switch player
    if (roll !== 1) {
      currentScore += roll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      changePlayer();
    }
  }
});

// add current player score to total and switch player
btnHold.addEventListener('click', () => {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      dice.classList.add('hidden');

      isPlaying = false;
    } else {
      changePlayer();
    }
  }
});

// resets board for new game
btnNew.addEventListener('click', () => {
  init();
});
