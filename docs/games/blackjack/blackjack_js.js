addPageTitle("titleBlackjack.gif");


// const tableDiv = document.getElementById("table");
const dealerCardsDiv = document.getElementById("dealer-cards");
const seat1CardsDiv = document.getElementById("seat1-cards");
const seat2CardsDiv = document.getElementById("seat2-cards");
const seat3CardsDiv = document.getElementById("seat3-cards");
const seat4CardsDiv = document.getElementById("seat4-cards");
const seat5CardsDiv = document.getElementById("seat5-cards");
const seat6CardsDiv = document.getElementById("seat6-cards");
const seat7CardsDiv = document.getElementById("seat7-cards");

// const buttonsDiv = document.getElementById("buttons");

const stayButton = document.getElementById("stay");
const hitButton = document.getElementById("hit");
const newRoundButton = document.getElementById("new-round");

const accountId = _getCookie("UserId");
// console.log(accountId);
const chipsSpan = document.getElementById("account-chips");
let currentChips;

const theDeck = newDeck(6);

trueShuffle(theDeck);

let player = { name: "Player", seat: seat4CardsDiv, hand: [], score: 0, aceCount: 0, natural: false, bust: false };
let dealer = { name: "Dealer", seat: dealerCardsDiv, hand: [], score: 0, aceCount: 0, natural: false, bust: false };
let playersDealOrder = [];



// Random generation of other players
let availableNames = ["Carlos", "Chad", "Davis", "Dayna", "Deed", "Deairus", "Gabriel", "Gavin", "Jamal", "Joshua", "Justin", "Nina", "Pearl", "William"];
let availableSeats = [seat1CardsDiv, seat2CardsDiv, seat3CardsDiv, seat5CardsDiv, seat6CardsDiv, seat7CardsDiv];

let numberOfOtherPlayers = getRandomNumber(1, 6);
for(let i = 0; i < numberOfOtherPlayers; i++)
{
    let seatIndex = getRandomNumber(1, availableSeats.length) - 1;
    let chosenSeat = availableSeats.splice(seatIndex, 1);
    let nameIndex = getRandomNumber(1, availableNames.length) - 1;
    let chosenName = availableNames.splice(nameIndex, 1);
    let playerCreated = { name: chosenName[0].toString(), seat: chosenSeat[0], hand: [], score: 0, aceCount: 0, natural: false, bust: false };
    playersDealOrder.push(playerCreated);
}

playersDealOrder.push(player);

playersDealOrder.sort(function(a, b) {
    var seatA = a.seat.id;
    var seatB = b.seat.id;
    if (seatA < seatB) {
      return -1;
    }
    if (seatA > seatB) {
      return 1;
    }
    return 0;
});

playersDealOrder.push(dealer);

// console.log(playersDealOrder);



// Initialize players
// let playerName = "Davis Kyle Murphy";

// let dealer = { name: "Dealer", seat: dealerCardsDiv, hand: [], score: 0, aceCount: 0, bust: false };
// let player = { name: playerName, seat: seat4CardsDiv, hand: [], score: 0, aceCount: 0, bust: false };
// let otherPlayerA = { name: "Cottontail", seat: seat1CardsDiv, hand: [], score: 0, aceCount: 0, bust: false };
// let otherPlayerB = { name: "Flopsy", seat: seat3CardsDiv, hand: [], score: 0, aceCount: 0, bust: false };
// let otherPlayerC = { name: "Dick", seat: seat6CardsDiv, hand: [], score: 0, aceCount: 0, bust: false };

// let playersDealOrder = [otherPlayerA, otherPlayerB, player, otherPlayerC, dealer];

// // For fewer players, comment out next six lines
// let otherPlayerD = { name: "Mopsy", seat: seat2CardsDiv, hand: [], score: 0, aceCount: 0, bust: false };
// let otherPlayerE = { name: "Harry", seat: seat5CardsDiv, hand: [], score: 0, aceCount: 0, bust: false };
// let otherPlayerF = { name: "Tom", seat: seat7CardsDiv, hand: [], score: 0, aceCount: 0, bust: false };
// playersDealOrder.splice(1, 0, otherPlayerD);
// playersDealOrder.splice(4, 0, otherPlayerE);
// playersDealOrder.splice(6, 0, otherPlayerF);



// Seat players and set-up bet-placing option
let playersHandsDealOrder = [];
for (let player of playersDealOrder) {
    playersHandsDealOrder.push(player.hand);
}

for (let player of playersDealOrder) {
    player.seat.innerHTML = '<span class="player-name">' + player.name + "</span><br />";
}

seat4CardsDiv.innerHTML = `
    <span id="user-player-name" class="player-name"> ${player.name}</span><br />
    <input type="number" id="bet-amount" value="2" min="2" max="500" step="2" /><br />
    <button id="place-bet">Place Bet</button>
    <button id="deal">Deal</button>
`;

const betAmountInput = document.getElementById("bet-amount");
const placeBetButton = document.getElementById("place-bet");
const dealButton = document.getElementById("deal");

_getAccount(accountId, (data) => {
    document.getElementById("user-player-name").innerText = data.userName;
    currentChips = data.chipCount;
    if(data.chipCount < betAmountInput.max) {
        if(data.chipCount % 2 == 1) {
            betAmountInput.max = data.chipCount - 1;
        } else {
            betAmountInput.max = data.chipCount;
        }
    }
});

newRoundButton.style.display = "none";
dealButton.style.display = "none";



// Accept bet from player
let betAmount;
placeBetButton.addEventListener("click", () => {
    betAmountEntered = parseInt(betAmountInput.value);
    if(betAmountEntered > betAmountInput.max) {
        alert("Sorry, but your bet exceeds the maximum allowed.");
    } else if(betAmountEntered < betAmountInput.min) {
        alert("Sorry, but there is a minimum bet of $2.");
    } else {
        betAmount = betAmountEntered;
        betAmountInput.style.display = "none";
        placeBetButton.style.display = "none";
        dealButton.style.display = "inline";
        document.getElementById("seat4-bet").innerHTML = "Your bet:<br />" + betAmount; // TODO: Add to player array
    }
});



// Deal new game
dealButton.addEventListener("click", function() {
    // TODO: Shuffle deck if less than 25% of cards remain undealt
    deal(theDeck, 2, ...playersHandsDealOrder);
    dealButton.style.display = "none";

    for (let i = 0; i < 2; i++) {
        for (let player of playersDealOrder) {
            if(i == 1 && player.name == "Dealer")
                placeCardDown(player.hand[i], player.seat);
            else
                placeCard(player.hand[i], player.seat);
        }
    }

    for(let player of playersDealOrder)
    {
        for(let card of player.hand) {
            scoreCard(player, card);
        }
        isNatural(player);
        isBust(player);
    }

    if(player.natural) {
        stayButton.innerText = "NATURAL";
        hitButton.innerText = "BLACKJACK";
        dealersTurn();
    } else {
        stayButton.disabled = false;
        hitButton.disabled = false;
    }
});

stayButton.addEventListener("click", function() {
    hitButton.disabled = "true";
    stayButton.disabled = "true";
    dealersTurn();
});

hitButton.addEventListener("click", function() {
    hit(theDeck, player.hand);
    let cardDeltIndex = player.hand.length - 1;
    placeCard(player.hand[cardDeltIndex], player.seat);
    scoreCard(player, player.hand[cardDeltIndex]);
    isBust(player);
    if(player.bust) {
        hitButton.disabled = "true";
        hitButton.innerText = "BUST";
        stayButton.disabled = "true";
        dealersTurn();
    }
    // console.log(player.score);
    // console.log(player.bust);
});



function scoreCard(player, card) {
    if(card.ShortValue == "T" || card.ShortValue == "J" || card.ShortValue == "Q" || card.ShortValue == "K")
    player.score += 10;
else if(card.ShortValue == "A") {
    player.score += 11;
    player.aceCount += 1;
} else
    player.score += parseInt(card.ShortValue);
}

function isNatural(player) {
    if(player.score == 21) {
        player.natural = true;
    }
}

function isBust(player) {
    if(player.score > 21) {
        if(player.aceCount > 0) {
            player.score -= 10;
            player.aceCount--;
            isBust(player);
        } else {
            player.bust = true;
        }        
    }
}



function placeCard(card, cardsDiv) {
    let cardImage = document.createElement("img");
    cardImage.id = "card-" + card.Id;
    cardImage.className = "card";
    cardImage.src = "../../utilities/cards/images/" + card.ShortValue + card.ShortSuit + ".png";
    cardsDiv.appendChild(cardImage);
}

function placeCardDown(card, cardsDiv) {
    let cardImage = document.createElement("img");
    cardImage.id = "card-" + card.Id;
    cardImage.className = "card";
    cardImage.src = "../../utilities/cards/images/back.png";
    cardsDiv.appendChild(cardImage);
}



function hit(deck, hand)
{
	let cardDelt = deck.shift();
	hand.push(cardDelt);
}



function dealersTurn() {
    dealerCardsDiv.innerHTML = '<span class="player-name">' + dealer.name + "</span><br />";
    placeCard(dealer.hand[0], dealer.seat)
    placeCard(dealer.hand[1], dealer.seat)
    dealersHit();
}

function dealersHit() {
    if(dealer.score < 17) {
        hit(theDeck, dealer.hand);
        let cardDeltIndex = dealer.hand.length - 1;
        placeCard(dealer.hand[cardDeltIndex], dealer.seat);
        scoreCard(dealer, dealer.hand[cardDeltIndex]);
        // console.log("HIT");
        dealersHit();
    } else {
        isBust(dealer);
        if(dealer.score < 17) {
            dealersHit();
        }
        console.log("DEALER SCORE: " + dealer.score);
        console.log("DEALER BUST: " + dealer.bust);
        settleUp();
    }
}

function settleUp() {
    console.log("BET AMOUNT: " + betAmount);
    console.log("PLAYER WIN: " + (player.score > dealer.score && !player.bust));
    let changeToChips;
    let statement;

    if(player.natural && !dealer.natural) {
        changeToChips = betAmount * 1.5;
        statement = 'Blackjack! You were dealt a "natural" and received a 3 to 2 payout of $' + changeToChips + '.';
    } else if(player.natural && dealer.natural) {
        changeToChips = 0;
        statement = "Push. You and the dealer got Blackjacks, so you neither lost your wager nor won a payout.";
    } else if(!player.natural && dealer.natural) {
        changeToChips = -betAmount;
        statement = "The dealer had a Blackjack. You lost $" + betAmount + '.';
    } else if(player.bust) {
        changeToChips = -betAmount;
        statement = "Bust! You went over 21, so you've lost your wager of $" + betAmount + '.';
    } else if(player.score > dealer.score) {
        changeToChips = betAmount;
        statement = "You won! You've received a payout of $" + changeToChips + '.';
    } else if(dealer.bust) {
        changeToChips = betAmount;
        statement = "The dealer went bust. You've received a payout of $" + changeToChips + '.';
    } else {
        changeToChips = -betAmount;
        statement = "The dealer wins. You've lost your wager of of $" + betAmount + '.';
    }

    _modifyChipCount(changeToChips);
    setChange(changeToChips);
    document.getElementById("seat4-payout").innerHTML = statement;
    document.getElementById("account-chips").innerText = currentChips + changeToChips;

    newRoundButton.style.display = "inline";
    // stayButton.style.display = "none";
    // hitButton.style.display = "none";
}


newRoundButton.addEventListener("click", function() { 
    for(let player of playersDealOrder) {
        player.hand.splice(0, player.hand.length);
        player.score = 0;
        player.aceCount = 0;
        player.natural = false;
        player.bust = false;
    }
    let allCards = document.querySelectorAll(".card");
    for(let card of allCards) {
        card.remove();
    }

    _getAccount(accountId, (data) => {
        currentChips = data.chipCount;
        if(data.chipCount < betAmountInput.max) {
            if(data.chipCount % 2 == 1) {
                betAmountInput.max = data.chipCount - 1;
            } else {
                betAmountInput.max = data.chipCount;
            }
        }
    });

    stayButton.innerText = "Stay";
    hitButton.innerText = "Hit";

    newRoundButton.style.display = "none";
    betAmountInput.style.display = "inline";
    placeBetButton.style.display = "inline";
    document.getElementById("seat4-bet").innerHTML = " ";
    document.getElementById("seat4-payout").innerHTML = " ";
});

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