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




function getHumanChoice(){
    let input=prompt("Pick Rock Paper Scissors:");
   input=input.charAt(0).toUpperCase()+input.slice(1).toLowerCase();
    return input;
}

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