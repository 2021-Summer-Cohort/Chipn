addPageTitle("titleCraps.gif");

const howToPlayContent = `
<button id='btn-rules' style='margin-left: 20px;  font-size: 16pt;' >Rules</button>
`;

addInstructions(howToPlayContent)

const accountId = _getCookie("UserId");
let currentChips;
_getAccount(accountId, (data) => {
  currentChips = data.chipCount;
});

const nextGameDiv = document.getElementById("next-game");
const playAgainButton = document.getElementById("play-again");
nextGameDiv.style.display = "none";

//import {getAccount} from "../../../src/js/api/actions";

/*
FETCH.getAccount(accountId, data => {
            accountDiv.innerHTML =`
            Name: ${data.userName}<br />
            Chip Count: ${data.chipCount}<br />
            <button id="logout">Logout</button>
            `;
            const logoutButton = document.getElementById("logout");
            logoutButton.addEventListener("click", () => {
                deleteCookie("UserId");
                location.reload();
            });
        });
*/

const rulesBtn = document.getElementById("btn-rules");
// const betsBtn = document.getElementById("btn-bets");
const modal = document.getElementById("myModal");
const placeBetBtn = document.getElementById("place-bet");
const betInput = document.getElementById("bet-amt");
const diceSound = document.getElementById("diceAudio");
let betAmt = 0;
// document.getElementById('id02').style.display = 'block';

rulesBtn.addEventListener("click", function () {
  console.log("You clicked the li element");
  // if(modal.style.visibility !== "visible"){
  //   modal.style.visibility = "visible";
  //   modal.style.opacity = "1";
  // }
  // else{
  //   modal.style.visibility = "hidden";
  //   modal.style.opacity = "0";
  // }
  document.getElementById('id01').style.display = 'block';
});
// betsBtn.addEventListener("click", function () {
//   console.log("You clicked the li element");
//   document.getElementById('id02').style.display = 'block';
// });
placeBetBtn.addEventListener("click", function () {
  // console.log(betInput.value + ">" + ChipCountInput.value);
  if (parseInt(betInput.value) === NaN) {
    alert("Enter a bet");
  }
  else if ((parseInt(betInput.value) < 5 || parseInt(betInput.value) > 100) || !betInput.value) {
    alert("Must make a bet between 5 and  100");
  }
  else if (parseInt(betInput.value) > parseInt(currentChips.value)) {
    alert("Not enough Chips");
  }

  else {
    betAmt = parseInt(betInput.value);
    console.log(betAmt);
    // document.getElementById('id02').style.display = 'none';
    elComeOut.disabled = false;
    elPointRoll.disabled = false;
    document.getElementById("bet-prompt").style.display = "none";
    
  document.getElementById("roll-buttons").style.display = "block";
    // document.getElementById("").style.display = none;
    elComeOut.style.display = "block";
    elWinOrLoss.innerHTML = "Let's roll!";
  }


});

// Dice Roll

var winCount = 0;
var lossCount = 0;
var gameCount = 0;
var thePoint = 0;
var chips = undefined;

/*
export function getAccount(accountId, callback)
{
   fetch(accountURL + accountId)
   .then(response => response.json())
   .then(data => {callback(data)});
}
*/
const accountURL = "https://localhost:44336/api/Account/";
function ModifyChipCount(ChipsToChange) //can be positive or negative.
{
  let accountId = getCookie("UserId"); if (accountId !== null && accountId !== undefined && accountId !== "") {
    var RequestBody = null;
    fetch(accountURL + accountId).then(r => r.json()).then(d => {
      RequestBody = {
        Id: accountId,
        age: d.age,
        chipCount: d.chipCount + ChipsToChange,
        email: d.email,
        password: d.password,
        userName: d.userName
      };
      fetch(accountURL + accountId, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(RequestBody) }).then(response => response.text()).then(data => {
        fetch(accountURL + accountId).then(response => response.json()).then(data => {
          console.log(data);
        });
      });
    });
  }
  else {

  }
}
function getAccount(accountId, callback) {
  fetch(accountURL + accountId)
    .then(response => response.json())
    .then(data => { callback(data) });
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// const ChipCountInput = document.getElementById("ChipCountInput");
// function GetChipCount() {
//   let accountId = getCookie("UserId");
//   getAccount(accountId, data => {
//     ChipCountInput.value = data.chipCount;
//     chips = ChipCountInput.value;
//     console.log("ChipCountInput.value=" + ChipCountInput.value);
//   });
// }
// GetChipCount();

// var betInput     = document.getElementById('betField').value;
// var bet          = parseInt(betInput);

var elDiceOne = document.getElementById('dice1');
var elDiceTwo = document.getElementById('dice2');
var elComeOut = document.getElementById('comeOutButton');
var elPointRoll = document.getElementById('pointRollButton');
var elWinOrLoss = document.getElementById('winOrLoss');
var elCrapsWins = document.getElementById('crapWins');
var elCrapsLosses = document.getElementById('crapLosses');



elComeOut.onclick = function () {
  checkBet(comeOutRoll);
};

elPointRoll.onclick = function () { checkBet(pointRoll); };

function checkBet(roll) {
  console.log("Chips later on: " + chips);
  if (betAmt > chips) {
    alert("Bet is set too Damn High!! GO GET MONEY!!!");
  } else {
    roll();
  }
}
// Come Out Roll Function

function comeOutRoll() {
  diceSound.play()
  // Initial dice variables
  var diceOne = Math.floor((Math.random() * 6) + 1);
  var diceTwo = Math.floor((Math.random() * 6) + 1);
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
  var diceOne = Math.floor((Math.random() * 6) + 1);
  var diceTwo = Math.floor((Math.random() * 6) + 1);
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
    elComeOut.style.display = 'block';
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
  elCrapsWins.innerHTML = 'Wins: ' + winCount;
  // document.getElementById('score').innerHTML = 'CASH:' + cash;
}
function Win() {
  console.log('you won!');
  winCount++; // updates win count
  gameCount++;
  elWinOrLoss.innerHTML = 'You Won!';
  _modifyChipCount(betAmt * 1);
  currentChips += betAmt;
  document.getElementById("account-chips").innerText = currentChips;
  // ModifyChipCount(betAmt * 1);
  // // GetChipCount();
  // //chips += betAmt;
  // console.log(chips);
  // document.getElementById('id02').style.display = 'block';

  document.getElementById("roll-buttons").style.display = "none";
  // elPointRoll.style.display = "none";
  // elComeOut.style.display = "none";
  nextGameDiv.style.display = "block";
  playAgainButton.addEventListener("click", () => {
    nextGameDiv.style.display = "none";
    document.getElementById("bet-prompt").style.display = "block";
    elWinOrLoss.innerHTML = '';
  });
  elComeOut.disabled = true;
    elPointRoll.disabled = true;
 
}
function Lose() {
  console.log('You lost!');
  lossCount++;
  gameCount++;
  elWinOrLoss.innerHTML = 'You Lost!';
  _modifyChipCount(-betAmt);
  currentChips -= betAmt;
  document.getElementById("account-chips").innerText = currentChips;
  // document.getElementById('id02').style.display = 'block';
  
  document.getElementById("roll-buttons").style.display = "none";
  // elPointRoll.style.display = "none";
  // elComeOut.style.display = "none";
  nextGameDiv.style.display = "block";
  playAgainButton.addEventListener("click", () => {
    nextGameDiv.style.display = "none";
    document.getElementById("bet-prompt").style.display = "block";
    elWinOrLoss.innerHTML = '';
  });
  elComeOut.disabled = true;
    elPointRoll.disabled = true;
 
  /*
  fetch().then().then(d=>{

  });
  */
  ModifyChipCount((betAmt * -1));
  // GetChipCount();
  // //chips -= betAmt;
  // console.log(chips);
  
  
}
