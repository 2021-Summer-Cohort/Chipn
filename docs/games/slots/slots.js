addPageTitle("titleSlots.gif");

const howToPlayContent = `
<div class="info">
<button id="HowToPlayBtn" onclick="toggleInstructions()">How to Play</button>
<div class="allInstructions">
    <div class="instructions">
        Press anywhere to spin the reels.<br /> Each spin costs 2 chips<br /> Match at least two on the middle row
        to win!<br /> See prizes below.
    </div>


    <div class="prize-table">
        <div class="doubles">
        </div>
        <div class="triples">
        </div>
        <!--<div id="dealer"><img id="dealerImage"src="./images/dealer2.png"/></div>-->
    </div>
</div>
</div>
`;

addInstructions(howToPlayContent);


// SOURCE: https://codepen.io/mog13/pen/VRBgNQ

let reelContents = ["./images/spade.png", "./images/DonutCream.png" , "./images/heart.png", "./images/DonutRainbow.png", "./images/DonutPink.png", "./images/diamond.png", "./images/clover.png", "./images/Lit.png"];
let reelLength = 3; //3
let reelContainers = document.querySelectorAll(".reel-container");
let spinningReels = [];
let spinning = false;
let reelDelay = 100; //100

// reelContents[0] = new Image();
// reelContents[0].src = "/css/images/DonutRainbow.png"
let accountId= _getCookie("UserId") ;
// let money = 100;
let money;
 _getAccount(accountId, (data) =>
{
money = data.chipCount;
document.querySelector("#account-chips").innerText = data.chipCount;
document.querySelector("#account-username").innerText = data.userName;
});

let moneyToAdd = 0;
let cost =2;

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let masterVolume = audioCtx.createGain();
masterVolume.gain.setValueAtTime(0.05, audioCtx.currentTime);
masterVolume.connect(audioCtx.destination);

let getReelItem = () => {
  let newReel = document.createElement("img"); //div
  let randomNum = Math.floor(Math.random() * reelContents.length)
  newReel.src = // newReel.innerHTML
    reelContents[randomNum];
  newReel.id = reelContents[randomNum];
  newReel.classList.add("reel-item");
  setTimeout(() => {
    newReel.classList.add("active");
  }, 0);

  return newReel;
};



let startSpin = () => {
  notEnoughFunds();
  if (!spinning && money >= cost) { //cost
    document.querySelectorAll(".prize-item.active").forEach(s => {
      s.classList.remove("active");
    });
    updateMoney(-cost); //cost
    setChange(-cost); //cost
    spinningReels.push(0);
    setTimeout(() => {
      spinningReels.push(1);
    }, reelDelay);
    setTimeout(() => {
      spinningReels.push(2);
    }, reelDelay * 2);

    spinning = true;
    spinUpdate(7);
  }
   
};

 function notEnoughFunds(){
  if(money < cost){ //cost
    alert("You do not have enough funds!");
  }
 }

let spinUpdate = spinsLeft => {
  spinningReels.forEach(n => {
    moveReel(n);
  });
  if (spinsLeft > 0) {
    setTimeout(() => {
      spinUpdate(spinsLeft - 1);
    }, reelDelay);
  } else {
    if (spinningReels.length > 0) {
      spinningReels.shift();

      setTimeout(() => {
        spinUpdate(0);
      }, reelDelay);
      playNote(160 - (30 - spinningReels.length * 10), 0.1);
    } else {
      spinning = false;
      findWins();
    }
  }
};

let moveReel = reelIndex => {
  let selectedReel = reelContainers[reelIndex];
  selectedReel.prepend(getReelItem());
  if (selectedReel.children.length > reelLength) {
    selectedReel.lastElementChild.classList.add("deactivate");
    setTimeout(() => {
      selectedReel.removeChild(selectedReel.lastElementChild);
    }, reelDelay);
  }
};

let updateMoney = change => {
  money += change;
  document.querySelector("#account-chips").innerText = money;
  _modifyChipCount(change);
};

let setChange = change => {
  let changes = document.querySelector("#chips-change");
  let newChange = document.createElement("span");
  newChange.innerHTML = change > 0 ? `+${change}` : change;
  newChange.classList.add("change");
  if (change < 0) newChange.classList.add("negative");
  changes.prepend(newChange);
  if (changes.children.length > 1) {
    changes.removeChild(changes.lastElementChild);
  }
};

let playWinChime = amount => {
  let clampedAm = amount > 20 ? 20 : amount;
  playNote(400 + 100 * (20 - clampedAm), 0.05, "sine");
  if (--amount > 0)
    setTimeout(() => {
      playWinChime(amount);
    }, 70);
};

let findWins = () => {
  console.log('searching for wins');
  let winline = [];
  let symbols = {};
  reelContainers.forEach(reel => {
    let symbol = reel.children[1].id; ///.innerText
    winline.push(symbol);
    if (symbols[symbol]) symbols[symbol]++;
    else symbols[symbol] = 1;
  });
  console.log(`symbols: ${symbols}`);
  if (
    winline.filter(s => {
      return s === winline[0];
    }).length === 3
  ) {
    win(3, winline[0]);
    document
      .querySelector(".triples")
      .children[reelContents.indexOf(winline[0])].classList.add("active");
  } else {
    for (s in symbols) {
      if (symbols[s] == 2) {
        win(2, s);
        console.log(`s: ${s}`);
        document
          .querySelector(".doubles")
          .children[reelContents.indexOf(s)].classList.add("active");
      }
    }
  }
  console.log(`win lines: ${winline}`);

};

let win = (amountMatching, symbol) => {
  reelContainers.forEach(reel => {
    if (reel.children[1].src === symbol) //.innerText
      reel.children[1].classList.add("win");
  });
  let winAmount = 1 + reelContents.indexOf(symbol);
  playWinChime(winAmount);
  if (amountMatching == 3) winAmount *= 100;
  console.log(`win amount: ${winAmount}`);
  setChange(winAmount);
  addToMoney(winAmount);
};

let addToMoney = (amount, speed) => {
  let changeAmount = Math.ceil(amount / 2);
  updateMoney(changeAmount);
  let remainder = amount - changeAmount;
  if (!speed) speed = 101;
  speed -= 5;
  if (speed < 10) speed = 10;
  if (remainder)
    setTimeout(() => {
      addToMoney(remainder);
    }, speed);
};

function playNote(freq, dur, type) {
  if (!freq) freq = 1000;
  if (!dur) dur = 1;
  if (!type) type = "square";
  return new Promise(res => {
    let oscillator = audioCtx.createOscillator();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz
    oscillator.connect(masterVolume);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + dur);
    oscillator.onended = res;
  });
}

//fills reels
reelContainers.forEach((reel, i) => {
  for (let n = 0; n < reelLength; n++) {
    moveReel(i);
  }
});

let addToPrizeTable = (combo, amount, target) => {
  let pt = document.querySelector(`.prize-table .${target}`);
  let prize = document.createElement("div");
  prize.innerHTML = `${combo}: ${amount}`;
  prize.classList.add("prize-item");
  prize.setAttribute("win-attr", combo.replace(/[-???]/g, ""));
  pt.append(prize);
};

//fill prize table
reelContents.forEach((symbol, index) => {
  addToPrizeTable(`<img src="${symbol}" height="25px"/>-<img src="${symbol}" height="25px"/>-???`, index + 1, "doubles"); //fix to put images into this
});

reelContents.forEach((symbol, index) => {
  addToPrizeTable(
    `<img src="${symbol}" height="25px"/>-<img src="${symbol}" height="25px"/>-<img src="${symbol}" height="25px"/>`, //fix to put images into this
    (index + 1) * 100,
    "triples"
  );
});


function toggleInstructions() {
  const x = document.querySelector(".allInstructions");
  if (x.style.display === "none") {
    x.style.display = "block";
  }
  else {
    x.style.display = "none";
  }
}
toggleInstructions();
