console.log("PUMPAJ");

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  let a = getRandomInt(1,4);
  console.log(a);

  const index = Math.floor(Math.random() * 3)+ 1;
  console.log(index);

  let string='';
  let pc='';
function placeValue(num, text){

    switch(num){
        case 1:
            text = "Rock";
            break;
        case 2:
            text = "Paper";
            break;
        case 3:
            text = "Scissors";
            break;
        }
        return text;
    }

  console.log("String is: ",placeValue(a,string), "and PC is:",placeValue(index,pc));


  function compare(p,m){
    if((p=="Paper" && m=="Rock") || (p=="Scissors" && m=="Paper")||(p=="Rock"&& m=="Scissors")){
        return console.log(`${p} WINS`);
    }
    else if((m=="Paper" && p=="Rock") || (m=="Scissors" && p=="Paper")||(m=="Rock"&& p=="Scissors")){
        return console.log(`${m} WINS`);
    }
    else if((p=="Rock" && m=="Rock") || (p=="Paper" && m=="Paper")||(p=="Scissors"&& m=="Scissors")){
        return console.log(`ITS A TIE!`);
    }
  }

  console.log(compare(placeValue(a,string),placeValue(index,pc)));