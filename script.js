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

playGame();