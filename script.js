let userScore = 0;
let computerScore = 0;

const userScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const pageChoices = document.getElementById("page-choices");
const pageResult = document.getElementById("page-result");
const userPickedEl = document.getElementById("user-picked");
const pcPickedEl = document.getElementById("pc-picked");
const winnerText = document.getElementById("winner-text");
const playAgainBtn = document.getElementById("play-again");
const resetBtn = document.getElementById("reset");

const choices = ["rock", "paper", "scissors"];

// ✅ Load scores from localStorage
window.onload = () => {
  const storedUserScore = localStorage.getItem("userScore");
  const storedComputerScore = localStorage.getItem("computerScore");

  if (storedUserScore !== null) userScore = parseInt(storedUserScore);
  if (storedComputerScore !== null) computerScore = parseInt(storedComputerScore);

  updateScores();
};

// Handle user pick
document.querySelectorAll(".choice").forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.dataset.choice;
    const pcChoice = choices[Math.floor(Math.random() * choices.length)];
    playRound(userChoice, pcChoice);
  });
});

function playRound(userChoice, pcChoice) {
  // Switch to result page
  pageChoices.classList.add("hidden");
  pageResult.classList.remove("hidden");

  userPickedEl.textContent = getSymbol(userChoice);
  pcPickedEl.textContent = getSymbol(pcChoice);

  if (userChoice === pcChoice) {
    winnerText.textContent = "IT'S A DRAW";
  } else if (
    (userChoice === "rock" && pcChoice === "scissors") ||
    (userChoice === "scissors" && pcChoice === "paper") ||
    (userChoice === "paper" && pcChoice === "rock")
  ) {
    winnerText.textContent = "YOU WIN";
    userScore++;
  } else {
    winnerText.textContent = "YOU LOSE";
    computerScore++;
  }

  updateScores();
}

function getSymbol(choice) {
  if (choice === "rock") return "✊";
  if (choice === "paper") return "✋";
  if (choice === "scissors") return "✌️";
}

function updateScores() {
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;

  // ✅ Save scores in localStorage
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
}

// Play again → back to choices
playAgainBtn.addEventListener("click", () => {
  pageResult.classList.add("hidden");
  pageChoices.classList.remove("hidden");
});

// Reset → zero scores and back to choices
resetBtn.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;
  updateScores();

  // ✅ Clear localStorage scores
  localStorage.setItem("userScore", 0);
  localStorage.setItem("computerScore", 0);

  pageResult.classList.add("hidden");
  pageChoices.classList.remove("hidden");
});
// RULES popup handling
const rulesBtn = document.getElementById("rules-btn");
const rulesPopup = document.getElementById("rules-popup");
const closeRules = document.getElementById("close-rules");

rulesBtn.addEventListener("click", () => {
  rulesPopup.classList.remove("hidden");
});

closeRules.addEventListener("click", () => {
  rulesPopup.classList.add("hidden");
});
