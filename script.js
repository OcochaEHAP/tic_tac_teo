let tiles = Array.from(document.querySelectorAll(".tile"));
let playerDisplay = document.querySelector(".display-player");
let resetButton = document.getElementById("reset");
let announcer = document.querySelector(".announcer");

let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let currentPlayer = "X";
let isGameActive = true;

const playerX_won = "playerX won";
const playerO_won = "playerO won";
const tie = "tie";

const winningConditions = [
  [0, 1, 3],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    announce(currentPlayer === "X" ? playerX_won : playerO_won);
    isGameActive = false;
    return;
  }
  if (!board.includes("")) {
    announce(tie);
  }
}

function announce(type) {
  switch (type) {
    case playerO_won:
      announcer.innerHTML = `player <span class="playerO">O</span> Won`;
      break;
    case playerX_won:
      announcer.innerHTML = `player <span class="playerO">O</span> Won`;
      break;
    case tie:
      announcer.innerHTML = `Tie`;
      break;
  }
  announcer.classList.remove("hide");
}

function isValidAction(tile) {
  if (tile.innerHTML === "X" || tile.innerHTML === "O") {
    return false;
  }
  return true;
}

function updateBoard(index) {
  board[index] = currentPlayer;
}

function changePlayer() {
  playerDisplay.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerDisplay.innerText = currentPlayer;
  playerDisplay.classList.add(`player${currentPlayer}`);
}

function userAction(tile, index) {
  if (isValidAction(tile) && isGameActive) {
    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
}

function resetBoard() {
  board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  isGameActive = true;
  announcer.classList.add("hide");
  if (currentPlayer === "O") {
    changePlayer();
  }
  tiles.forEach((tile) => {
    tile.innerHTML = "";
    tile.classList.remove("playerX");
    tile.classList.remove("playerO");
  });
}

tiles.forEach((tile, i) => {
  tile.addEventListener("click", () => userAction(tile, i));
});

resetButton.addEventListener("click", () => resetBoard());
