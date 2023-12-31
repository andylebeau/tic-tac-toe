const Gameboard = (() => {
  let currentBoard = Array.from({length: 9}).fill('');

  const render = () => {
    let _gameboardHTML = '';
    currentBoard.forEach((cellValue, index) => {
      _gameboardHTML += `<div id="${index}" class="cell">${cellValue}</div>`;
    })
    document.querySelector('#gameBoard').innerHTML = _gameboardHTML;

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', GameFlow.clickCell);
    })
  }

  const updateCells = (mark, index) => {
    currentBoard[index] = mark;
    render();
  }

  const getBoard = () => currentBoard;

  const getEmptyCells = () => {
    let array = [];
    Gameboard.getBoard().filter((value, i) => {
      if (!value) { array.push(i) }
    })
    return array
  }

  return {
      render,
      updateCells,
      getBoard,
      getEmptyCells
  }
})();

const createPlayer = (name, mark, num) => {
  if (!name) {name = `Player ${num}`}
  return {
    name,
    mark
  }
};

const GameFlow = (() => {
  let players = [];
  let currentPlayerIndex;
  let activeGame;
  let isPlayer2AI = false;

  const start = () => {
    players = [createPlayer(document.querySelector('#player1').value, 'X', 1),
               createPlayer(document.querySelector('#player2').value, 'O', 2)];
    currentPlayerIndex = 0;
    activeGame = true;

    if (players[1].name.toUpperCase() === 'AI') { isPlayer2AI = true }

    Gameboard.render();

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', clickCell);
    })

    messageText.textContent = `${players[0].name}'s turn`;
  }

  const clickCell = (e) => {
    if (!activeGame || e.target.textContent != '') { return };
    let index = +e.target.id;
    Gameboard.updateCells(players[currentPlayerIndex].mark, index);
    checkWinner();
  }

  function aiMove() {
    let emptyCells = Gameboard.getEmptyCells();
    let aiRandom;
    let aiMoveIndex;
    aiRandom = Math.floor(Math.random() * emptyCells.length);
    aiMoveIndex = emptyCells[aiRandom];
    Gameboard.updateCells(players[currentPlayerIndex].mark, aiMoveIndex);
  }

  function changePlayer() {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    messageText.textContent = `${players[currentPlayerIndex].name}'s turn`;
    if (isPlayer2AI && currentPlayerIndex === 1) {
      aiMove()
      checkWinner()
    }
  }

  function checkWinner() {
    const winningArrays = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let xS = [];
    let oS = [];
    let currentPlayerArray = [];

    Gameboard.getBoard().forEach((mark, i) => {
      if (mark === 'X') { xS.push(+i) }
      if (mark === 'O') { oS.push(+i) }
    })

    currentPlayerIndex == 0 ? currentPlayerArray = xS.slice() : currentPlayerArray = oS.slice();
    if (winningArrays.some(possibleWin => possibleWin
                     .every(cellIndex => currentPlayerArray.includes(cellIndex))))
                   { return messageWinner(`${players[currentPlayerIndex].name} Won!`) }
    else if (!Gameboard.getBoard().includes('')) { return messageWinner('Draw!') }
    else { changePlayer() }
  }

  function messageWinner(winnerIs) {
    messageText.textContent = winnerIs;
    multiBtn.textContent = "Play Again!";
    activeGame = false;
  }

  return{
    start,
    clickCell
  }
})();

const multiBtn = document.querySelector("#multiBtn");
multiBtn.addEventListener('click', () => {
  if (multiBtn.textContent === 'Restart' || multiBtn.textContent === 'Play Again!') {
    Gameboard.getBoard().forEach((_, index) => {
    Gameboard.updateCells('', index);
  })
    Gameboard.render();
    GameFlow.start();
  }
  else {
    GameFlow.start();
  }
  multiBtn.textContent = 'Restart';
})

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    GameFlow.start();
  }
})

function aiThinking(board, player) {
  let base = {
    X : -1,
    O : 1,
    Draw : 0
  }
  let bestScore = 0
  let score = 0
  const possibleMoves = Gameboard.getEmptyCells()
  console.log(possibleMoves)
}