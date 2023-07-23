const Gameboard = (() => {
    let gameboard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

    const render = () => {
        let gameboardHTML = '';
        gameboard.forEach((cellValue, index) => {
            gameboardHTML += `<div class="cell" id="${index}">${cellValue}</div>`
        })
        document.querySelector('#gameBoard').innerHTML = gameboardHTML;
    }
    return {
        render
    }
})();

Gameboard.render() //temp auto start

const startGame = (() => {
    const players = [
        createPlayer(document.getElementById('player1').value, 'X'),
        createPlayer(document.getElementById('player2').value, 'O'),
    ]
    Gameboard.render();
})

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const GameFlow = (() => {
    //check player
    //check player mark
    //check player selection
    //check for win and display message
    //render
})();