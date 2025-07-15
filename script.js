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
  "Oh you like pressing the dialog box, looking for funny lines▼ "
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

// Typing function, types a line character by character
function typeLine(line, onComplete) {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }

  let charIdx = 0;
  textBox.textContent = "";

  function typeChar() {
    if (charIdx < line.length) {
      textBox.textContent += line.charAt(charIdx);
      charIdx++;
      typingTimeout = setTimeout(typeChar, 40);
    } else {
      typingTimeout = null;
      if (onComplete) onComplete();
    }
  }

  typeChar();
}

// Show next line of main dialog
function advanceMainDialog() {
  if (mainTyping) {
    // Skip typing animation to full line if typing
    if (typingTimeout) clearTimeout(typingTimeout);
    textBox.textContent = mainDialog[mainIndex];
    mainTyping = false;
    return;
  }

  mainIndex++;
  if (mainIndex >= mainDialog.length) {
    if (!btnPressed) {
      mainDialog = [
        "You didnt hit start!▼",
        "What are you waiting for!▼",
        "We don't have the whole day lad!▼",
        "I will use my magic on you!▼",
        "I'm a magic cat you know!!▼"
      ];
      mainIndex = 0;
    } else {
      // End of main dialog; stay on last line
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

// Start button logic
startBtn.addEventListener("click", () => {
 startGame.style.display = "flex";
  pressStart.style.display = "none";
  btnPressed = true;
  mainDialog = startDialog;
  mainIndex = 0;
  currentDialogType = "main";
  mainTyping = true;
  typeLine(mainDialog[mainIndex], () => {
    mainTyping = false;
  });
});

// On load, show first main dialog line
window.onload = () => {
  currentDialogType = "main";
  mainIndex = 0;
  mainTyping = true;
  typeLine(mainDialog[mainIndex], () => {
    mainTyping = false;
  });
};
