const Gameboard = (() => {
  let currentBoard = Array.from({length: 9}).fill('');

  const render = () => {
    let _gameboardHTML = '';
    currentBoard.forEach((cellValue, index) => {
      _gameboardHTML += `<div id="${index}" class="cell">${cellValue}</div>`
    })
    document.querySelector('#gameBoard').innerHTML = _gameboardHTML;

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', GameFlow.clickCell)
    })
  }

  const updateCells = (mark, index) => {
    currentBoard[index] = mark;
    render();
  }

  const getBoard = () => currentBoard;

  return {
      render,
      updateCells,
      getBoard
  }
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark
  }
};

const GameFlow = (() => {
  let players = []
  let currentPlayerIndex;
  let activeGame;

  const start = () => {
    players = [
    createPlayer(document.querySelector('#player1').value, 'X'),
    createPlayer(document.querySelector('#player2').value, 'O')
   ]
    currentPlayerIndex = 0;
    activeGame = true;
    const board = Array.from({length: 9}).fill('');
    Gameboard.render(board);
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', clickCell)
    })
    messageText.textContent = `${players[0].name}'s turn`
  }

  const clickCell =(e) => {
    if (!activeGame) {return}
    let index = +e.target.id;
    Gameboard.updateCells(players[currentPlayerIndex].mark, index)
    checkWinner();
  }

  function changePlayer() {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    messageText.textContent = `${players[currentPlayerIndex].name}'s turn`;
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

    if (!Gameboard.getBoard().includes('')) { return messageWinner('Draw!') }
    let xS = [];
    let oS = [];
    Gameboard.getBoard().forEach((mark, i) => {
      if (mark === 'X') { xS.push(+i) }
      if (mark === 'O') { oS.push(+i) }
    })
    let currentPlayerArray = [];
    currentPlayerIndex == 0 ? currentPlayerArray = xS.slice() : currentPlayerArray = oS.slice();
    if (winningArrays.some(possibleWin => possibleWin
                     .every(cellIndex => currentPlayerArray.includes(cellIndex))))
                    { return messageWinner(`${players[currentPlayerIndex].name} Won!`) }
    else { changePlayer() }
  }

  function messageWinner(winnerIs) {
    messageText.textContent = winnerIs;
    multiBtn.textContent = "Play Again!"
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
      console.log('restart')
      Gameboard.getBoard().forEach((_, index) => {
        Gameboard.updateCells('', index)
      })
      Gameboard.render();
      GameFlow.start();
    }
    else {
      console.log('start')
      GameFlow.start();
    }
    multiBtn.textContent = 'Restart';
})