const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];

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

const players = (name, mark) => {
    return {
        name,
        mark
    }
}

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => {
    Gameboard.render();
})

const GameFlow = (() => {
    //check player
    //check player mark
    //check player selection
    //check for win and display message
    //render
})();