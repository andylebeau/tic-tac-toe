const Gameboard = (() => {
  const _starterBoard = Array.from({length: 9}).fill('');
  let _gameboardHTML = '';

  const createBoard = () => {
    _starterBoard.forEach((cellValue, index) => {
      _gameboardHTML += `<div id="${index}" class="cell">${cellValue}</div>`
    })
    document.querySelector('#gameBoard').innerHTML = _gameboardHTML;
  }
  return {
      createBoard
  }
})();

Gameboard.createBoard() // temp quick start

const GameFlow = (() => {
  const cells = document.querySelectorAll('.cell');
  const messageText = document.querySelector('#messageText');
  const multiBtn = document.querySelector('#multiBtn');
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

  let currentBoard = Array.from({length: 9}).fill('');
  let currentPlayer = 'X';
  let xArray = []
  let oArray = []
  let activeGame = false;

  initializeGame();

  function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', clickCell));
    multiBtn.addEventListener('click', restartGame);
    messageText.textContent = `${currentPlayer}'s turn`;
    activeGame = true;
  }

  function clickCell() {
    const cellIndex = this.getAttribute('id');

    if(currentBoard[cellIndex] != '' || !activeGame) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
  }

  function updateCell(cell, index) {
    currentPlayer === 'X' ? xArray.push(+index) : oArray.push(+index)
    currentBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
  }

  function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    messageText.textContent = `${currentPlayer}'s turn`;
  }

  function checkWinner() {
    if (!currentBoard.includes('')) { return messageWinner('Draw!') }
    let currentPlayerArray = [];
    currentPlayer == 'X' ? currentPlayerArray = xArray.slice() : currentPlayerArray = oArray.slice();
    if (winningArrays.some(possibleWin => possibleWin
                     .every(cellIndex => currentPlayerArray.includes(cellIndex))))
                    {return messageWinner(`${currentPlayer} Wins!`)}
    else {changePlayer()}
  }

  function messageWinner(winnerIs) {
    activeGame = false;
    messageText.textContent = winnerIs;
  }

  function restartGame() {
    currentPlayer = "X";
    currentBoard = ['', '', '', '', '', '', '', '', ''];
    messageText.textContent = `${currentPlayer}'s turn`;
    multiBtn.textContent = 'Restart';
    cells.forEach(cell => cell.textContent = '');
    activeGame = true;
    xArray = [];
    oArray = [];
  }

})()