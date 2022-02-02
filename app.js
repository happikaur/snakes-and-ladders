const boxes = document.querySelectorAll('.box');
const player1 = document.querySelector('.player.one');
const player2 = document.querySelector('.player.two');
const welcomePopUp = document.querySelector('.welcome-message');
const congrats = document.querySelector('.who-won');
const whoWon = document.querySelector('.won-or-lose');
const dice = document.querySelector('.dice');

let isGameEnded = false;
const lastBox = 25;

const store = {
  player1: {x:0, y:0, currentBox:0},
  player2: {x:0, y:0, currentBox:0},
  diceNumber: 0,
  currentPlayer: player1,
};

const throwDice = () => {
 const diceNum = Math.floor(Math.random() * 6) + 1;
 return diceNum;
}

const calculateNewBox = (diceNumber, currentBox) => {
  // Find the current box of the player
  const newBox = diceNumber + currentBox;

  if (newBox >= lastBox) {
    isGameEnded = true;
    movePlayerToBox(lastBox, player1);  
    welcomePopUp.style.display = 'none';
    whoWon.innerHTML = store.currentPlayer.id === 'player1' ? 'You Won' : 'Computer Won';
    congrats.style.display = 'block';
  }

  return newBox;
}

dice.addEventListener ('click', (event) => {
  startGame()
})

const findBoxPosition = (boxNumber) => {
  const box = document.getElementById(`${boxNumber}`);
  // console.log('box', box);
  // const boxPos = box.getBoundingClientRect();
  // console.log(boxPos);
  // const x = boxPos.top + (boxPos.width / 2) - 25;
  // const y = boxPos.left + (boxPos.height / 2) - 25;
  return box
}

const movePlayerToBox = (newBox, player) => {
  const box = findBoxPosition(newBox);

  box.appendChild(player);
  // player.style.top = `${xyBox.y}px`;
  // player.style.left = `${xyBox.x}px`;

  // store[player.id].y = xyBox.y;
  // store[player.id].x = xyBox.x;
}

window.onload = () => startGame()

const startGame = () => {
  store.diceNumber = throwDice();
  const currentPlayer = store.currentPlayer

  store[currentPlayer.id].currentBox = calculateNewBox(store.diceNumber, store[currentPlayer.id].currentBox);

  movePlayerToBox(store[currentPlayer.id].currentBox, store.currentPlayer);

  if (currentPlayer.id === 'player1') {
    store.currentPlayer = player2
  } else if (currentPlayer.id === 'player2') {
    store.currentPlayer = player1
  }

  console.log(store);
  console.log(currentPlayer.id);  
}



// Boxes number need to flow and not break
// Person need to choose the avatar
// Enter the name
// choose who rolls first
// Role dice
  // Random number from 1 to 6
// Moves box by that number
// If in the box with ladder go up to the box number where ladder ends
// If in the box with snake go down to the box number where snake ends