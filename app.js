/*------------------------ Cached Element References ------------------------*/
const btnStart = document.querySelector('#btnStart')
const btnSolo = document.querySelector('#btnSolo')
const btnVsComputer = document.querySelector('#btnVsComputer')
const startMenuElement = document.querySelector('#startMenu')
const gameElement = document.querySelector('#game')



/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/



/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/

function startGame() {
    startMenuElement.style.display = 'none';

}

/*----------------------------- Event Listeners -----------------------------*/
btnStart.addEventListener('click', startGame)


