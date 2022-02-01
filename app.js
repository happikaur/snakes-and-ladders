const boxes = document.querySelectorAll('.box');
const player1 = document.querySelector('.player.one');
const player2 = document.querySelector('.player.two');

const store = {
  player1: {x:0, y:0, currentBox:0},
  player2: {x:0, y:0, currentBox:0},
  diceNumber: 0,
};

const throwDice = () => {
  return Math.floor(Math.random() * 6) + 1;
}

const movePlayer = (diceNumber, currentBox) => {
  // Find the current box of the player
  const newBox = diceNumber + currentBox;
  return newBox;
}

const findBoxPosition = (boxNumber) => {
  const box = document.getElementById(`${boxNumber}`);
  const boxPos = box.getBoundingClientRect();
  return {x:boxPos.left, y:boxPos.top};
}

store.diceNumber = throwDice();

store.player1.currentBox = movePlayer(store.diceNumber, store.player1.currentBox);

const xyBox = findBoxPosition(store.player1.currentBox);
player1.style.top = xyBox.y;
player1.style.left = xyBox.x;
store.player1.x = xyBox.x;
store.player1.y = xyBox.y;

console.log(store);
console.log(player1);

// Boxes number need to flow and not break
// Person need to choose the avatar
// Enter the name
// choose who rolls first
// Role dice
  // Random number from 1 to 6
// Moves box by that number
// If in the box with ladder go up to the box number where ladder ends
// If in the box with snake go down to the box number where snake ends
