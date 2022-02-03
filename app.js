const boxes = document.querySelectorAll('.box');
const player1 = document.querySelector('.player.one');
const player2 = document.querySelector('.player.two');
const welcomePopUp = document.querySelector('.welcome-message');
const congrats = document.querySelector('.who-won');
const whoWon = document.querySelector('.won-or-lose');
const dice = document.querySelector('.dice-roll');
const diceFont = document.querySelector('.dice');
const letsRoll = document.querySelector('.lets-roll');
const welcomeBack = document.querySelector('.welcome-background')

let isGameEnded = false;
const lastBox = 25;

const store = {
  player1: {x:0, y:0, currentBox:0},
  player2: {x:0, y:0, currentBox:0},
  diceNumber: 0,
  currentPlayer: player1,
};

const snakesLadders = {
  // Ladders
  3: 7,
  14: 18,
  // Snakes
  11:8,
  21:19,
  24:17,
};

const diceRollNum = {
  1: '<i class="fas fa-dice-one"></i>',
  2: '<i class="fas fa-dice-two"></i>',
  3: '<i class="fas fa-dice-three"></i>',
  4: '<i class="fas fa-dice-four"></i>',
  5: '<i class="fas fa-dice-five"></i>',
  6: '<i class="fas fa-dice-six"></i>',
}

// Random number from 1 to 6
const throwDice = () => {
  const diceNum = Math.floor(Math.random() * 6) + 1;
  diceFont.innerHTML = diceRollNum[diceNum];
  return diceNum;
}

// Moves box by that number
// Find the current box of the player
const calculateNewBox = (diceNumber, currentBox) => {
  const newBox = diceNumber + currentBox;

  // If in the box with ladder go up to the box number where ladder ends
  // If in the box with snake go down to the box number where snake ends
  if (snakesLadders[newBox]) {
    return snakesLadders[newBox];
  }

  if (newBox >= lastBox) {
    isGameEnded = true;
    movePlayerToBox(lastBox, player1);  
    welcomePopUp.style.display = 'none';
    whoWon.innerHTML = store.currentPlayer.id === 'player1' ? 'You Won' : 'Computer Won';
    congrats.style.display = 'block';
    return 
  }

  return newBox;
}

const findBoxPosition = (boxNumber) => {
  const box = document.getElementById(`${boxNumber}`);
  return box
}

const movePlayerToBox = (newBox, player) => {
  const box = findBoxPosition(newBox);

  box.appendChild(player);
}

const startGame = () => {
  // Role dice
  store.diceNumber = throwDice();
  const currentPlayer = store.currentPlayer

  store[currentPlayer.id].currentBox = calculateNewBox(store.diceNumber, store[currentPlayer.id].currentBox);

  movePlayerToBox(store[currentPlayer.id].currentBox, store.currentPlayer);

  if (currentPlayer.id === 'player1') {
    store.currentPlayer = player2;
    player1.style.display = 'block';
  } else if (currentPlayer.id === 'player2') {
    store.currentPlayer = player1;
    player2.style.display = 'block';
  }

  console.log(store);
  console.log(currentPlayer.id);  
}

dice.addEventListener('click', (event) => {
  
  startGame()
});

letsRoll.addEventListener('click', (event) => {
  welcomePopUp.style.display = 'none';
  welcomeBack.style.display = 'none';
});


// Pop up of congratulations
// Play again resets the game to start