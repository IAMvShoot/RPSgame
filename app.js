const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const totalGamesDisplay = document.getElementById('total-games');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const drawsDisplay = document.getElementById('draws');
const timeSpentDisplay = document.getElementById('time-spent');
const currentDateDisplay = document.getElementById('current-date');
const currentTimeDisplay = document.getElementById('current-time');
const resetButton = document.getElementById('reset');

const possibleChoices = document.querySelectorAll('button:not(#reset)');

let userChoice;
let computerChoice;
let result;
let totalGames = 0;
let wins = 0;
let losses = 0;
let draws = 0;
let gameStartTime = Date.now();

// Event listener for user's choice
possibleChoices.forEach(choice => choice.addEventListener('click', (e) => {
  userChoice = e.target.id;
  userChoiceDisplay.innerHTML = userChoice;
  generateComputerChoice();
  getResult();
  updateStats();
}));

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Function to generate a random computer choice
function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3); // Generates 0, 1, or 2
  if (randomNumber === 0) {
    computerChoice = 'rock';
  } else if (randomNumber === 1) {
    computerChoice = 'paper';
  } else {
    computerChoice = 'scissors';
  }
  computerChoiceDisplay.innerHTML = computerChoice;
}

// Function to determine the result
function getResult() {
  if (computerChoice === userChoice) {
    result = "It's a draw!";
    resultDisplay.classList.remove("lost", "win");
    resultDisplay.classList.add("draw");
    draws++;
  } else if (
    (computerChoice === 'rock' && userChoice === 'paper') ||
    (computerChoice === 'paper' && userChoice === 'scissors') ||
    (computerChoice === 'scissors' && userChoice === 'rock')
  ) {
    result = "You win!";
    resultDisplay.classList.remove("lost", "draw");
    resultDisplay.classList.add("win");
    wins++;
  } else {
    result = "You lost!";
    resultDisplay.classList.remove("win", "draw");
    resultDisplay.classList.add("lost");
    losses++;
  }
  resultDisplay.innerHTML = result;
}

// Function to update game stats
function updateStats() {
  totalGames++;
  totalGamesDisplay.innerHTML = totalGames;
  winsDisplay.innerHTML = wins;
  lossesDisplay.innerHTML = losses;
  drawsDisplay.innerHTML = draws;

  // Calculate the time spent playing in seconds
  const currentTime = Date.now();
  const timeSpent = Math.floor((currentTime - gameStartTime) / 1000);
  timeSpentDisplay.innerHTML = timeSpent;
}

// Function to reset the game
function resetGame() {
  totalGames = 0;
  wins = 0;
  losses = 0;
  draws = 0;
  gameStartTime = Date.now();

  totalGamesDisplay.innerHTML = totalGames;
  winsDisplay.innerHTML = wins;
  lossesDisplay.innerHTML = losses;
  drawsDisplay.innerHTML = draws;
  timeSpentDisplay.innerHTML = 0;

  computerChoiceDisplay.innerHTML = '';
  userChoiceDisplay.innerHTML = '';
  resultDisplay.innerHTML = '';
  resultDisplay.classList.remove('win', 'lost', 'draw');
}

// Function to display the current date and time in Indian Standard Time
function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  currentDateDisplay.innerHTML = date;
  currentTimeDisplay.innerHTML = time;
}

// Update date and time every second
setInterval(updateDateTime, 1000);
