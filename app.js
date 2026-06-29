/*------------------------ Cached Element References ------------------------*/
const btnSolo = document.querySelector('#btnSolo')
const btnVsComputer = document.querySelector('#btnVsComputer')
const startMenuElement = document.querySelector('#startMenu')
const gameElement = document.querySelector('#game')
const btnQuit = document.querySelector('#btnQuit')
const keyboardElement = document.querySelectorAll('.key')
const wordContainerElement = document.querySelector('#wordContainer')
const displayMessage = document.querySelector('#message')

/*-------------------------------- Constants --------------------------------*/
const words = [
    {word: 'Botnet', definition: 'A network of compromised devices controlled by an attacker'},
    {word: 'Malware', definition: 'A malicious Software used to damage or infect a system'},
    {word: 'Phishing', definition: 'Tricking victims into revealing sensitive information'},
    {word: 'Ransomware', definition: 'A malware that encrypts files and blocks access until you send money to unlock them'},
    {word: 'Spoofing', definition: 'Pretending to be someone else to gain access to a system'},
    {word: 'BruteForce', definition: 'Guessing passwords or other credentials by trying every possible combination'},
    {word: 'Encryption', definition: 'Converting data into unreadable text to prevent unauthorized access'},
    {word: 'Decryption', definition: 'Converting encrypted data into its original readable text'},
    {word: 'Backdoor', definition: 'A hidden access attack to gain access without authentication'},
    {word: 'HoneyPot', definition: 'A trap used for attackers to detect and gather information about them'},
    {word: 'Ciphertext', definition: 'The encrypted output of the plaintext encryption process'},
    {word: 'Plaintext', definition: 'The readable original data before encryption'},
    {word: 'Exploit', definition: 'A methodology of using any vulnerability or flaw to cause damage to a system'},
    {word: 'Hashing', definition: 'A function used to convert data into fixed string of characters'},
    {word: 'Salting', definition: 'Adding a unique-random string to a password before hashing'}
]
/*---------------------------- Variables (state) ----------------------------*/
let letter
let currentWord
let currentDefinition
let lives = 3
let gameOver = false
/*-------------------------------- Functions --------------------------------*/

// write tomorrow
function checkGameOver(){
    if(lives <= 0){
        displayMessage.textContent = `Game Over! ${currentWord} , ${currentDefinition}`
        gameOver = true
    }

}

function restartGame(){
    lives = 3
    gameOver = false
    displayMessage.textContent = ''
   
}
function handleClick(event) {
    if (gameOver) return
    const splitWord = currentWord.split('')
    letter = event.target.id
    console.log(`current word ${currentWord.split('')}`)


    console.log(letter)
    let correct = false

    splitWord.forEach((letterInWord, index)=>{
        if(letter.toLowerCase() === letterInWord.toLowerCase()){
            correct = true
            console.log('You picked right letter')
            console.log(wordContainerElement.children)
            wordContainerElement.children[index].textContent = letterInWord
        }
        console.log(letterInWord)
    })

    if(correct === false) {lives--; console.log(lives)}

    checkGameOver()
    
}

function startGame() {
    startMenuElement.style.display = 'none'
    gameElement.style.display = 'block'

    restartGame()
    wordContainerElement.innerHTML = ''
    displayWord()
}

function quitGame (){
    startMenuElement.style.display = 'flex'
    gameElement.style.display = 'none'    
}

function displayWord() {
    const { word, definition } = words[Math.floor(Math.random()* words.length)]
    currentWord = word
    currentDefinition = definition
    wordContainerElement.innerHTML = word.split('').map(() => `<div class="cell"></div>`).join('')
    console.log(wordContainerElement)
}


  
/*----------------------------- Event Listeners -----------------------------*/
btnSolo.addEventListener('click', startGame)
btnVsComputer.addEventListener('click', startGame)
btnQuit.addEventListener('click', quitGame)

for(let oneKeyboardElement of keyboardElement){
     oneKeyboardElement.addEventListener('click', handleClick)
}

