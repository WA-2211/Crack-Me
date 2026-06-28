/*------------------------ Cached Element References ------------------------*/
const btnStart = document.querySelector('#btnStart')
const btnSolo = document.querySelector('#btnSolo')
const btnVsComputer = document.querySelector('#btnVsComputer')
const startMenuElement = document.querySelector('#startMenu')
const gameElement = document.querySelector('#game')
const btnQuit = document.querySelector('#btnQuit')

/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/



/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/

function startGame() {
    startMenuElement.style.display = 'none'
    gameElement.style.display = 'block'

}

function quitGame (){
    startMenuElement.style.display = 'flex'
    gameElement.style.display = 'none'
}

/*----------------------------- Event Listeners -----------------------------*/
btnStart.addEventListener('click', startGame)
btnQuit.addEventListener('click', quitGame)

