// Initial References
const letterContainer = document.getElementById("letter-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

// Counters
let winCount = 0;
let count = 0;

let chosenWord = "";

// Block all the Buttons
const blocker = () => {
  let letterButtons = document.querySelectorAll(".letters");
  // Disable all letters
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
};

// Event listener for submitting the opponent's word
document.getElementById("submit-word").addEventListener("click", () => {
  const word = document.getElementById("opponent-word").value.trim().toUpperCase();
  if (word && /^[A-Z]+$/i.test(word)) {
    chosenWord = word;
    document.getElementById("opponent-word").value = "";
    startGame();
    hideOpponentWordInput();
  } else {
    alert("Please enter a valid word (only letters).");
  }
});

// Start Game
const startGame = () => {
  // Hide the word input section and show the letter buttons
  document.getElementById("word-input-section").classList.add("hide");
  letterContainer.classList.remove("hide");

  // Set up the game with the chosen word
  userInputSection.innerHTML = "";
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;

  // Reset win and loss counts
  winCount = 0;
  count = 0;

  // Set up letter buttons
  letterContainer.innerHTML = "";
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    // Number to ASCII [A-Z]
    button.innerText = String.fromCharCode(i);
    // Character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      // If array contains clicked value, replace the matched dash with letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
        });
      } else {
        count += 1;
        drawMan(count);
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      button.disabled = true;
    });
    letterContainer.appendChild(button);
  }
};

// Initializer Function
const initializer = () => {
  // Hide letter buttons and show word input section
  letterContainer.classList.add("hide");
  document.getElementById("word-input-section").classList.remove("hide");

  // Clear the input field and previous content
  document.getElementById("opponent-word").value = "";
  userInputSection.innerHTML = "";
  newGameContainer.classList.add("hide");

  // Call to canvasCreator for clearing previous canvas and creating initial canvas
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};


//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;