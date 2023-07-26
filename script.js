const Gameboard = (() => {
  let _board = Array.from({length: 9}).fill('')
  let _gameboardHTML = '';
  let checkWinArray = _board.slice()

  const createBoard = () => {
    _board.forEach((cellValue, index) => {
      _gameboardHTML += `<div class="cell" data-index="${index}">${cellValue}</div>`
    })
    document.querySelector('#gameBoard').innerHTML = _gameboardHTML;
  }
  return {
      createBoard,
      checkWinArray
  }
})();

// function checkWin(cellIndex, checkArray) {
//   checkArray.push(cellIndex)
//   console.log(checkArray)
// }

function gameFlow(mark) {
  function updateBoard(event) {
    if (event.target.textContent != '') {return}
    event.target.textContent = `${mark}`
    console.log(event.target.dataset.index)
    Gameboard.checkWinArray[event.target.dataset.index] = mark;
    console.log(Gameboard.checkWinArray)
    mark = ['X', 'O'].filter(m => mark != m)[0]
  }
  
  const cellClick = document.querySelectorAll('.cell')
  cellClick.forEach((c) => c.addEventListener('click', updateBoard))
};

const startGame = () => {
  let mark = 'X'
  Gameboard.createBoard()
  gameFlow(mark)
}

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);