const rulesBtn = document.getElementById("btn-rules");
const betsBtn= document.getElementById("btn-bets");
const modal = document.getElementById("myModal");
const placeBetBtn = document.getElementById("place-bet");
const betInput = document.getElementById("bet-amt");
const diceSound = document.getElementById("diceAudio");
let betAmt = 0;
rulesBtn.addEventListener("click", function(){
  console.log("You clicked the li element");
  // if(modal.style.visibility !== "visible"){
  //   modal.style.visibility = "visible";
  //   modal.style.opacity = "1";
  // }
  // else{
  //   modal.style.visibility = "hidden";
  //   modal.style.opacity = "0";
  // }
  document.getElementById('id01').style.display='block';
});
betsBtn.addEventListener("click", function(){
  console.log("You clicked the li element");
  document.getElementById('id02').style.display='block';
});
placeBetBtn.addEventListener("click", function(){
  if(betInput.value > chips){
    alert("Not enough Chips");
  }else{
  betAmt = parseInt(betInput.value); 
  console.log(betAmt);}
  document.getElementById('id02').style.display='none';

});

// Dice Roll

var winCount        = 0;
var lossCount       = 0;
var gameCount       = 0;
var thePoint        = 0;
var chips         = 100;

// var betInput     = document.getElementById('betField').value;
// var bet          = parseInt(betInput);

var elDiceOne       = document.getElementById('dice1');
var elDiceTwo       = document.getElementById('dice2');
var elComeOut       = document.getElementById('comeOutButton');
var elPointRoll     = document.getElementById('pointRollButton');
var elWinOrLoss     = document.getElementById('winOrLoss');
var elCrapsWins     = document.getElementById('crapWins');
var elCrapsLosses   = document.getElementById('crapLosses');

elComeOut.onclick   = function () {checkBet(comeOutRoll); 
};

elPointRoll.onclick = function () {checkBet(pointRoll); };

function checkBet(roll){
  if(betAmt > chips){
    alert("Bet is set too Damn High!! GO GET MONEY!!!");
  }else{
    roll();
  }
}
// Come Out Roll Function

function comeOutRoll() {
  diceSound.play()
  // Initial dice variables
  var diceOne   = Math.floor((Math.random() * 6) + 1);
  var diceTwo   = Math.floor((Math.random() * 6) + 1);
  var rollTotal = diceOne + diceTwo;

  console.log(rollTotal + ' ' + diceOne + ' ' + diceTwo);
  elDiceOne.classList.toggle('animate');
  elDiceTwo.classList.toggle('animate');

  //Dice reset and display
  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove('show-' + i);
    if (diceOne === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }

  for (var k = 1; k <= 6; k++) {
    elDiceTwo.classList.remove('show-' + k);
    if (diceTwo === k) {
      elDiceTwo.classList.add('show-' + k);
    }
  }

  // if rollTotal = 7 or 11; Player wins
  if (rollTotal === 7 || rollTotal === 11) {
    Win();
    
    // cash += betField;
  } else if (rollTotal === 2 || rollTotal === 3 || rollTotal === 12) {
    Lose();
    
    // cash -= betField;
  } else {
    // sets the point and changes button display
    thePoint = rollTotal;
    elWinOrLoss.innerHTML = 'Roll the Point!';

    //  sets value for the point and changes the button displayed
    document.getElementById('theRoll').innerHTML = 'Roll a ' + thePoint + ' to win';
    elComeOut.style.display = 'none';
    elPointRoll.style.display = 'block';
  }

  setTimeout(winLossCount(), 1500);
}// END Come out roll function

//POINT ROLL FUNCTION
function pointRoll() {
  diceSound.play()
  // sets dice variables
  var diceOne   = Math.floor((Math.random() * 6) + 1);
  var diceTwo   = Math.floor((Math.random() * 6) + 1);
  var rollTotal = diceOne + diceTwo;

  //Dice reset and display

  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove('show-' + i);
    if (diceOne === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }

  for (var k = 1; k <= 6; k++) {
    elDiceTwo.classList.remove('show-' + k);
    if (diceTwo === k) {
      elDiceTwo.classList.add('show-' + k);
    }
  }

  // if player rolls a 7, player loses
  if (rollTotal === 7) {
    thePoint = 0;
    Lose();
    
    // cash -= betField;
    elComeOut.style.display = 'block';
    elPointRoll.style.display = 'none';

  } else if (rollTotal === thePoint) {
    // If player rolls the point; player wins
    Win();

    // cash += betField;
    thePoint = 0;// resests the point

    // Resets buttons
    elComeOut.style.display   = 'block';
    elPointRoll.style.display = 'none';

  } else {
    // Roll again if no winner

    console.log('roll again');
  }

  setTimeout(winLossCount(), 1500);
} // END POINT ROLL FUNCTION

function winLossCount() {
  // Update win and loss count
  elCrapsLosses.innerHTML = 'Losses: ' + lossCount;
  elCrapsWins.innerHTML   = 'Wins: ' + winCount;
  // document.getElementById('score').innerHTML = 'CASH:' + cash;
}
function Win()
{
  console.log('you won!');
  winCount++; // updates win count
  gameCount++;
  elWinOrLoss.innerHTML = 'You Won!';
  chips += betAmt;
    console.log(chips);
}
function Lose()
{
  console.log('You lost!');
  lossCount++;
  gameCount++;
  elWinOrLoss.innerHTML = 'LOSER!';
  chips -= betAmt;
    console.log(chips);
}
