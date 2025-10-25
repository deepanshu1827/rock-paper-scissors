const choices = ["rock", "paper", "scissors"];
const icons = { rock: "✊", paper: "✋", scissors: "✌️" };
const borders = { rock: "blue-border", paper: "orange-border", scissors: "purple-border" };

// Load scores from localStorage or initialize
let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

// Update score display if present
if (document.getElementById("user-score")) {
  document.getElementById("user-score").textContent = userScore;
  document.getElementById("computer-score").textContent = computerScore;
}

// ---------------------- PAGE 1 ----------------------
const gameChoices = document.querySelectorAll(".choice");
if (gameChoices.length > 0) {
  gameChoices.forEach(choice => {
    choice.addEventListener("click", () => {
      const userChoice = choice.dataset.choice;
      const pcChoice = choices[Math.floor(Math.random() * 3)];
      let result = "DRAW";

      // Determine result
      if (
        (userChoice === "rock" && pcChoice === "scissors") ||
        (userChoice === "paper" && pcChoice === "rock") ||
        (userChoice === "scissors" && pcChoice === "paper")
      ) {
        result = "YOU WIN";
        userScore++;
      } else if (userChoice !== pcChoice) {
        result = "YOU LOSE";
        computerScore++;
      }

      // Store data
      localStorage.setItem("userChoice", userChoice);
      localStorage.setItem("pcChoice", pcChoice);
      localStorage.setItem("result", result);
      localStorage.setItem("userScore", userScore);
      localStorage.setItem("computerScore", computerScore);

      // ✅ Check if either player reached 10
      if (userScore >= 10 || computerScore >= 10) {
        window.location.href = "hurray.html";
        return;
      }

      // Otherwise go to result page
      window.location.href = "result.html";
    });
  });
}

// ---------------------- PAGE 2 (RESULT) ----------------------
if (document.getElementById("result-text")) {
  const userChoice = localStorage.getItem("userChoice");
  const pcChoice = localStorage.getItem("pcChoice");
  const result = localStorage.getItem("result");

  const userChoiceEl = document.getElementById("user-choice");
  const pcChoiceEl = document.getElementById("pc-choice");
  const resultText = document.getElementById("result-text");

  userChoiceEl.innerHTML = `<div class="inner-circle ${borders[userChoice]}">${icons[userChoice]}</div>`;
  pcChoiceEl.innerHTML = `<div class="inner-circle ${borders[pcChoice]}">${icons[pcChoice]}</div>`;
  resultText.textContent = result;

  // Highlight winner
  if (result === "YOU WIN") {
    userChoiceEl.classList.add("win-glow");
  } else if (result === "YOU LOSE") {
    pcChoiceEl.classList.add("win-glow");
  }

  // Update displayed scores
  document.getElementById("user-score").textContent = userScore;
  document.getElementById("computer-score").textContent = computerScore;

  // PLAY AGAIN button (continue playing)
  document.getElementById("play-again").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// ---------------------- HURRAY PAGE ----------------------
const resetBtn = document.getElementById("reset-game");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    // Reset all scores and restart
    localStorage.setItem("userScore", 0);
    localStorage.setItem("computerScore", 0);
    window.location.href = "index.html";
  });
}

// ---------------------- RULES POPUP ----------------------
const rulesBtn = document.getElementById("rules-btn");
const rulesPopup = document.getElementById("rules-popup");
const closePopup = document.getElementById("close-popup");

if (rulesBtn && rulesPopup && closePopup) {
  rulesBtn.addEventListener("click", () => (rulesPopup.style.display = "block"));
  closePopup.addEventListener("click", () => (rulesPopup.style.display = "none"));
}
