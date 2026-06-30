/*------------------------ Cached Element References ------------------------*/
const btnSolo = document.querySelector('#btnSolo')
const btnVsComputer = document.querySelector('#btnVsComputer')
const startMenuElement = document.querySelector('#startMenu')
const gameElement = document.querySelector('#game')
const btnQuit = document.querySelector('#btnQuit')
const keyboardElement = document.querySelectorAll('.key')
const wordContainerElement = document.querySelector('#wordContainer')
const displayMessage = document.querySelector('#message')
const scrambleWordElement = document.querySelector('#scramble')
const btnHint = document.querySelector('#btnHint')
const timerElement = document.querySelector('#timer')
timerElement.textContent = '25s'
/*-------------------------------- Constants --------------------------------*/
const words = [
    { word: 'Botnet', definition: 'A network of compromised devices controlled by an attacker' },
    { word: 'Malware', definition: 'A malicious Software used to damage or infect a system' },
    { word: 'Phishing', definition: 'Tricking victims into revealing sensitive information' },
    { word: 'Ransomware', definition: 'A malware that encrypts files and blocks access until you send money to unlock them' },
    { word: 'Spoofing', definition: 'Pretending to be someone else to gain access to a system' },
    { word: 'BruteForce', definition: 'Guessing passwords or other credentials by trying every possible combination' },
    { word: 'Encryption', definition: 'Converting data into unreadable text to prevent unauthorized access' },
    { word: 'Decryption', definition: 'Converting encrypted data into its original readable text' },
    { word: 'Backdoor', definition: 'A hidden access attack to gain access without authentication' },
    { word: 'HoneyPot', definition: 'A trap used for attackers to detect and gather information about them' },
    { word: 'Ciphertext', definition: 'The encrypted output of the plaintext encryption process' },
    { word: 'Plaintext', definition: 'The readable original data before encryption' },
    { word: 'Exploit', definition: 'A methodology of using any vulnerability or flaw to cause damage to a system' },
    { word: 'Hashing', definition: 'A function used to convert data into fixed string of characters' },
    { word: 'Salting', definition: 'Adding a unique-random string to a password before hashing' }
]

/*---------------------------- Variables (state) ----------------------------*/
let letter
let currentWord
let currentDefinition

let scrambledWord
let cipherWord
let shift


let lives = 3
let gameOver = false

let hint
let seconds = 25
let timerInterval

let mode
let turn = ''
let computerChoice
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/*-------------------------------- Functions --------------------------------*/

// Game over, round lost: lost all 3 lives 
function checkGameOver() {

    if (lives <= 0) {
        gameOver = true
        clearInterval(timerInterval)
        displayMessage.textContent = `Game Over! ${currentWord} , ${currentDefinition}`
        displayMessage.style.display = 'inline-block'

    }

    if (seconds === 0) {
        gameOver = true
        clearInterval(timerInterval)
        displayMessage.textContent = `Game Over! ${currentWord} , ${currentDefinition}`
        displayMessage.style.display = 'inline-block'

    }
}

function displayTimer() {

    timerInterval = setInterval(() => {
        seconds--
        timerElement.textContent = seconds + 's'

        checkGameOver()


    }, 1000)

}


//reset 
function restartGame() {
    lives = 3
    gameOver = false
    displayMessage.textContent = ''
    displayMessage.style.display = 'none'
    seconds = 25
    clearInterval(timerInterval)



}

function checkForWinner() {
    let cellFull = true

    for (let oneCell of wordContainerElement.children) {
        if (oneCell.textContent === '') {
            cellFull = false
        }

    }
    if (cellFull) {
        clearInterval(timerInterval)
        displayMessage.textContent = `Word Cracked! ${currentWord} , ${currentDefinition}`
        displayMessage.style.display = 'inline-block'
        gameOver = true
    }


}


function handleClick(event) {
    if (gameOver) return
    const splitWord = currentWord.split('')
    letter = event.target.id
    console.log(`current word ${currentWord.split('')}`)


    console.log(letter)
    let correct = false

    splitWord.forEach((letterInWord, index) => {
        if (letter.toLowerCase() === letterInWord.toLowerCase()) {
            correct = true
            console.log('You picked right letter')
            console.log(wordContainerElement.children)
            wordContainerElement.children[index].textContent = letterInWord
        }
        console.log(letterInWord)
    })

    if (correct === false) {
        lives--

        if(mode === 'vsComputer'){
            getComputerChoice()
        }
    }

    checkGameOver()
    checkForWinner()

}

function startGame() {
    startMenuElement.style.display = 'none'
    gameElement.style.display = 'block'
    wordContainerElement.innerHTML = ''
    restartGame()
    displayWord()
    displayTimer()


}

function quitGame() {
    startMenuElement.style.display = 'flex'
    gameElement.style.display = 'none'
    clearInterval(timerInterval)

}

function displayWord() {
    const { word, definition } = words[Math.floor(Math.random() * words.length)]
    currentWord = word
    currentDefinition = definition
    wordContainerElement.innerHTML = word.split('').map(() => `<div class="cell"></div>`).join('')
    console.log(wordContainerElement)


    //scramble round:
    scrambledWord = currentWord
    scrambledWord = word.split('').sort(() => Math.random() - 0.5).join('')

    scrambleWordElement.textContent = scrambledWord.toLowerCase()
    console.log(scrambleWordElement)


   
}


function displayHint() {
    displayMessage.textContent = currentDefinition
    displayMessage.style.display = 'inline-block'

}




//picks random letter and check if its included in the current word
function singlePlayerGame(){
    mode = 'solo'
    startGame()
}

function vsComputerGame(){
    mode = 'vsComputer'
    startGame()
}

function getComputerChoice(){
    if (gameOver) return
    
    if (Math.random() < 0.8) { //computer player level: chance of being correct pick letters from the current word instead of random letters
    computerChoice = currentWord[Math.floor(Math.random() * currentWord.length)]
    }
    else{
    computerChoice = letters[Math.floor(Math.random() * 26)]
    }

    console.log('computer choice:', computerChoice)
    const splitWord = currentWord.split('')
    let correct = false

     splitWord.forEach((letterInWord, index) => {
        if (computerChoice.toLowerCase() === letterInWord.toLowerCase()) {
            correct = true
            console.log('Computer picked right letter!')
            console.log(wordContainerElement.children[index])
            wordContainerElement.children[index].textContent = letterInWord
        }
        console.log(letterInWord)
    })

     checkForWinner()

}





/*----------------------------- Event Listeners -----------------------------*/
btnSolo.addEventListener('click', singlePlayerGame)
btnVsComputer.addEventListener('click', vsComputerGame)
btnQuit.addEventListener('click', quitGame)
btnHint.addEventListener('click', displayHint)

for (let oneKeyboardElement of keyboardElement) {
    oneKeyboardElement.addEventListener('click', handleClick)
}

