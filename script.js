//this function gets a random value from 1 to 3, and sets the strings value as Rock(1), Paper(2) or Scissors(3).
function getComputerChoice(){

    const index = Math.floor(Math.random() * 3)+ 1;
    let pc;


    switch(index){
        case 1:
            pc = "Rock";
            break;
        case 2:
            pc = "Paper";
            break;
        case 3:
            pc = "Scissors";
            break;
        }

  return pc;

}



//this function gets the players value from prompt and then, changes the input to be case sensitive, to have first Upper letter and the remaining letters to be lower
function getHumanChoice(){
    let input=prompt("Pick Rock Paper Scissors:");
   input=input.charAt(0).toUpperCase()+input.slice(1).toLowerCase();
    return input;
}

//this function "starts the round" and compares the inputs from the previous two functions, and declares a winner by comparing the values from Human and Computer
function playRound(){
    const human=getHumanChoice();
    const computer=getComputerChoice();
    console.log(`Human Chose: ${human}`);
    console.log(`Computer Chose: ${computer}.`);
    if((human=="Paper" && computer=="Rock") || (human=="Scissors" && computer=="Paper")||(human=="Rock"&& computer=="Scissors")){
        humanScore++;
         console.log(`Human WINS`);
        }
        else if(human===computer){
            console.log(`ITS A TIE!`);
        }
        else {
            computerScore++;
            console.log(`PC WINS`);
    }
  }

 //this function makes the game last 5 rounds, with the for loop, in which we call the playRound() function and get the results for each round, and at the end send a message who had how many Wins 
function playGame(){
    for( let i=0;i<5;i++)
    {

        playRound();
    }
    console.log(`Human won ${humanScore} times, and computer won ${computerScore} times.`);
}

let humanScore=0;
let computerScore=0;

//playGame();




const introDialog = [
  "Welcome to the rock paper scissors game Adventurer!▼",
  "Hit Start and Good luck!▼",
];

const startDialog = [
  "Choose wisely!▼",
  "This is just a game of rock paper scissors▼",
  "Or is it?▼",
  "Oh you like pressing the dialog box, looking for funny lines▼ ",
  "Keep on pressing...▼ ",
  "...▼"
];

const hatDialog = [
  "That's a magic hat!▼",
  "I found it in the magic cave▼",
  "You can stop pressing it now please!▼",
  "...▼"
];

const textBox = document.getElementById("dialog-text");
const dialog = document.querySelector(".dialog");
const hat = document.getElementById("hat");
const cat=document.getElementById("cat");
const startBtn = document.querySelector(".pushable");     // The START button itself
const startGame = document.querySelector(".start");       // The game container to show (display:flex)
const pressStart = document.querySelector(".press");
const battlefield=document.getElementById("battlefield");

const hands = {
  rock: "images/rockGame.png",
  paper: "images/paperGame.png",
  scissors: "images/scissorsGame.png"
};

const paws={
  rock: "images/catRock.png",
  paper:"images/catPaper.png",
  scissors:"images/catScissors.png"

};

// State variables
let btnPressed = false;

// Main dialog state
let mainDialog = introDialog;
let mainIndex = 0;
let mainTyping = false;

// Hat dialog state
let hatIndex = -1; // start at -1 because no dialog shown until click
let hatTyping = false;

// Which dialog is currently displayed? "main" or "hat"
let currentDialogType = "main";

// Timeout ID for typing animation
let typingTimeout = null;


let dialogLocked = false;

function typeLine(line, onComplete) {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }

  // Instantly show if line contains <br>
  if (line.includes("<br>")) {
    textBox.innerHTML = line;
    if (onComplete) onComplete();
    return;
  }

  textBox.innerHTML = "";
  let i = 0;

  function typeChar() {
    if (i >= line.length) {
      typingTimeout = null;
      if (onComplete) onComplete();
      return;
    }
    if (line[i] === "<") {
      const tagEnd = line.indexOf(">", i);
      if (tagEnd === -1) {
        textBox.innerHTML += "&lt;";
        i++;
      } else {
        const tag = line.substring(i, tagEnd + 1);
        textBox.innerHTML += tag;
        i = tagEnd + 1;
      }
      setTimeout(typeChar, 40);
    } else {
      const nextChar = line.charAt(i);
      const textNode = document.createTextNode(nextChar);
      textBox.appendChild(textNode);
      i++;
      typingTimeout = setTimeout(typeChar, 40);
    }
  }

  typeChar();
}
function advanceMainDialog() {
  if (mainTyping) {
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = null;
    textBox.innerHTML = mainDialog[mainIndex];
    mainTyping = false;
    return;
  }

  mainIndex++;

  // When reaching the end of finalDialog after game over
  if (mainIndex >= mainDialog.length && gameOver) {
    btnPressed = false;
    gameOver = false;
    playerScore = 0;
    enemyScore = 0;
    roundNumber = 0;

    // Show start button & hide game UI
    pressStart.style.display = "block";
    startGame.style.display = "none";
    battlefield.style.display = "none";

    // Reset dialog to intro
    mainDialog = introDialog;
    mainIndex = 0;
    currentDialogType = "main";

    mainTyping = true;
    typeLine(mainDialog[mainIndex], () => {
      mainTyping = false;
    });

    return;
  }

  if (mainIndex >= mainDialog.length) {
    if (!btnPressed) {
      mainDialog = [
        "You didn't hit start!▼",
        "What are you waiting for!▼",
        "We don't have the whole day lad!▼",
        "I will use my magic on you!▼",
        "I'm a magic cat you know!!▼"
      ];
      mainIndex = 0;
    } else {
      mainIndex = mainDialog.length - 1;
      return;
    }
  }

  mainTyping = true;
  typeLine(mainDialog[mainIndex], () => {
    mainTyping = false;
  });
}

// Show next line of hat dialog
function advanceHatDialog() {
  if (hatTyping) {
    // Skip typing animation to full line if typing
    if (typingTimeout) clearTimeout(typingTimeout);
    textBox.textContent = hatDialog[hatIndex];
    hatTyping = false;
    return;
  }

  hatIndex++;
  if (hatIndex >= hatDialog.length) {
    hatIndex = 0; // loop back to start
  }
  hatTyping = true;
  typeLine(hatDialog[hatIndex], () => {
    hatTyping = false;
  });
}

// Handle dialog box clicks (main dialog)
dialog.addEventListener("click", () => {
  if (dialogLocked) return; // Ignore clicks during battle
  if (currentDialogType === "hat") {
    // Switch to main dialog on click
    currentDialogType = "main";
    mainTyping = true;
    typeLine(mainDialog[mainIndex], () => {
      mainTyping = false;
    });
    return;
  }

  // If main dialog is active, advance it
  if (currentDialogType === "main") {
    advanceMainDialog();
  }
});

// Handle hat clicks
hat.addEventListener("click", (e) => {
  e.stopPropagation();
  hat.classList.add("jump");

  if (currentDialogType !== "hat") {
    currentDialogType = "hat";
    hatIndex = -1; // reset so next advance shows first line
  }

  advanceHatDialog();

  hat.addEventListener("animationend", () => {
    hat.classList.remove("jump");
  }, { once: true });
});

cat.addEventListener("click",(e)=>{
    e.stopPropagation();
})
let gameOver = false;

// Start button click handler
startBtn.addEventListener("click", () => {
  battlefield.style.display = "block";
  startGame.style.display = "flex";
  pressStart.style.display = "none";

  btnPressed = true;
  gameOver = false; // <--- Reset game over state!

  mainDialog = startDialog;
  mainIndex = 0;
  currentDialogType = "main";
  mainTyping = true;

  typeLine(mainDialog[mainIndex], () => {
    mainTyping = false;
  });
});

// On page load, show intro dialog
window.onload = () => {
  currentDialogType = "main";
  mainIndex = 0;
  mainTyping = true;
  typeLine(mainDialog[mainIndex], () => {
    mainTyping = false;
  });
};


let playerScore = 0;
let enemyScore = 0;
let roundNumber = 0;
const totalRounds = 5;



function startBattle(playerChoice) {
  const enemyChoice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];

  const playerHand = document.querySelector(".player");
  const enemyHand = document.querySelector(".enemy");

  
  playerHand.style.backgroundImage = "url('images/rockGame.png')"; // player's hand
  enemyHand.style.backgroundImage = "url('images/catRock.png')";   // enemy's cat paw

 
  playerHand.style.right = "50px";
  enemyHand.style.left = "50px";
if (gameOver) return;

dialogLocked = true; // Prevent dialog clicks during battle
  
  setTimeout(() => {
    playerHand.classList.add("shake");
    enemyHand.classList.add("shake");
  }, 500);


setTimeout(() => {
  playerHand.classList.remove("shake");
  enemyHand.classList.remove("shake");


  playerHand.style.backgroundImage = `url('${hands[playerChoice]}')`;


  enemyHand.style.backgroundImage = `url('${paws[enemyChoice]}')`;

  
  setTimeout(() => {
    checkWinner(playerChoice, enemyChoice);
  }, 700); 
}, 1500);


function checkWinner(player, enemy) {
  let resultText = "";

  if ((player === "rock" && enemy === "scissors") ||
      (player === "paper" && enemy === "rock") ||
      (player === "scissors" && enemy === "paper")) {
    resultText = "<span style='color:red'>You Won this round!</span>";
    playerScore++;
  } else if (player !== enemy) {
    resultText = "<span style='color:red'>You Lost this round!</span>";
    enemyScore++;
  } else {
    resultText = "<span style='color:black'>It's a Tie!</span>";
  }

  roundNumber++;

  let roundSummary =
    `Round <span style='color:black'> ${roundNumber}</span> /  <span style='color:black'>${totalRounds}</span> <br> Results:<br>` +
    `You chose: <span style='color:black'> ${player} </span><br>` +
    `Enemy chose:<span style='color:black'> ${enemy}</span> <br>` +
    `${resultText} <br>` +
    `Current Score:<br> You: <span style='color:black'> ${playerScore} </span>, Enemy: <span style='color:black'>${enemyScore}</span>`;

  mainDialog = []; // Clear mainDialog first

  if (roundNumber >= totalRounds) {
    gameOver = true;

    // Add GAME OVER to the same text immediately
    if (playerScore > enemyScore) {
      roundSummary += `<br><span style='color:red'>GAME OVER! You WON the game!🎉</span>`;
    } else if (playerScore < enemyScore) {
      roundSummary += `<br><span style='color:red'>GAME OVER! You LOST the game!😿</span>`;
    } else {
      roundSummary += `<br><span style='color:red'>GAME OVER! It's a TIE!🤝</span>`;
    }

    // First message: round 5/5 with the result and GAME OVER
    mainDialog.push(roundSummary + "▼");

    // Second message: Restart prompt (on next click)
    mainDialog.push("Press the dialog box to play again!▼");
  } else {
    // Normal round
    mainDialog.push(roundSummary + "▼");
  }

  mainIndex = 0;
  currentDialogType = "main";
  mainTyping = true;

typeLine(mainDialog[mainIndex], () => {
    mainTyping = false;
    dialogLocked = false; // Unlock dialog after showing text
});
}}