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
const displayTurnMessage = document.querySelector('#turnMessage')
const displayScore = document.querySelector('#score')
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

let lives = 3
let gameOver = false

let hint
let seconds = 25
let timerInterval

let correct
let mode
let turn = ''
let computerChoice
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

let score = 0
let correctLetterArray = []


/*-------------------------------- Functions --------------------------------*/

// Game over, round lost: lost all 3 lives or timer runs out 
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

//timer function
function displayTimer() {
    timerElement.textContent = seconds + 's'

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
    score = 0
    displayScore.textContent = 0
    displayMessage.textContent = ''
    displayMessage.style.display = 'none'
    correctLetterArray = []

    clearInterval(timerInterval)


    if (mode === 'vsComputer') {
        seconds = 60
    }
    if (mode === 'solo') {
        seconds = 25
    }
}

function checkForWinner() {
    let cellFull = true

    for (let oneCell of wordContainerElement.children) {
        if (oneCell.textContent === '') {
            cellFull = false
        }

    }
    if (cellFull && mode === 'solo') {
        clearInterval(timerInterval)
        displayMessage.textContent = ` Word Cracked! ${currentWord} , ${currentDefinition}`
        displayMessage.style.display = 'inline-block'
        score *= 20
        displayScore.textContent = score
        gameOver = true
        displayTurnMessage.textContent = ''
    }


    if (cellFull && turn === 'player') {
        clearInterval(timerInterval)
        displayMessage.textContent = ` Word Cracked! ${currentWord} , ${currentDefinition}`
        displayMessage.style.display = 'inline-block'
        gameOver = true
        displayTurnMessage.textContent = ''


    }
    else if (cellFull && turn === 'computerPlayer') {
        clearInterval(timerInterval)
        displayMessage.textContent = `computer Cracked! ${currentWord} , ${currentDefinition}`
        displayMessage.style.display = 'inline-block'
        gameOver = true
        displayTurnMessage.textContent = ''
    }


}


function handleClick(event) {
    console.log(mode)
    if (gameOver) return
    if (mode === 'vsComputer' && turn != 'player') {
        return
    }


    const splitWord = currentWord.split('')
    letter = event.target.id
    console.log(`current word ${currentWord.split('')}`)


    console.log(letter)
    let correct = false


    const isHere = correctLetterArray.find(
        let => {
            let === letter

        }
    )

    splitWord.forEach((letterInWord, index) => {
        if (letter.toLowerCase() === letterInWord.toLowerCase() ) {
            correct = true
           // event.currentTarget.disabled = true

            if (!isHere) {
                correctLetterArray.push(letter)
                score++
            }
            else {
                return
            }

            displayScore.textContent = score
            console.log('You picked right letter')
            console.log(wordContainerElement.children)
            event.target.removeEventListener('click',handleClick)
            wordContainerElement.children[index].textContent = letterInWord
        }
        console.log(letterInWord)
    })


    if (correct === false) {
        if (mode === "solo") {
            lives--
        }
    }

    if (mode === 'vsComputer') {
        console.log('TURN change if')
        //turn = 'computerPlayer'
        if (turn === 'computerPlayer') displayTurnMessage.textContent = `Its Computers turn`
        else displayTurnMessage.textContent = `Its Computers turn`
        setTimeout(() => {
            getComputerChoice()

        }, 1000)
    }


    checkGameOver()
    checkForWinner()

console.log( 'correct letters arr', correctLetterArray)
}

function startGame() {
    startMenuElement.style.display = 'none'
    gameElement.style.display = 'block'
    wordContainerElement.innerHTML = ''
    restartGame()
    displayWord()
    displayTimer()
    for (let oneKeyboardElement of keyboardElement) {
    oneKeyboardElement.addEventListener('click', handleClick)
}


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
function singlePlayerGame() {
    mode = 'solo'
    startGame()
}

function vsComputerGame() {
    mode = 'vsComputer'
    turn = 'player'
    
    startGame()
}

function getPlayerChoice() {
    displayTurnMessage.textContent = 'Its your turn'

    const splitWord = currentWord.split('')


    splitWord.forEach((letterInWord, index) => {
        if (letter.toLowerCase() === letterInWord.toLowerCase()) {
            correct = true
            keyboardElement.disabled = 'ture'
            console.log('You picked right letter')
            console.log(wordContainerElement.children)
            wordContainerElement.children[index].textContent = letterInWord
        }
        console.log(letterInWord)
    })


    if (correct === false) {
        turn = 'computerPlayer'
        getComputerChoice()
    }

    checkForWinner()


}

function getComputerChoice() {
    if (gameOver) return

    displayTurnMessage.textContent = 'Its computer turn'


    if (Math.random() < 0.8) { //computer player level: chance of being correct pick letters from the current word instead of random letters
        computerChoice = currentWord[Math.floor(Math.random() * currentWord.length)]
    }
    else {
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
        if (correct === false) {
            console.log('Computer picked wrong letter!')
            console.log(wordContainerElement.children[index])
            turn = 'player'
            getPlayerChoice()
        }

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

