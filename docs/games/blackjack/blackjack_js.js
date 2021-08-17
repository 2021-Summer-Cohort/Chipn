const tableDiv = document.getElementById("table");
const dealerCardsDiv = document.getElementById("dealer-cards");
const seat1CardsDiv = document.getElementById("seat1-cards");
const seat2CardsDiv = document.getElementById("seat2-cards");
const seat3CardsDiv = document.getElementById("seat3-cards");
const seat4CardsDiv = document.getElementById("seat4-cards");
const seat5CardsDiv = document.getElementById("seat5-cards");
const seat6CardsDiv = document.getElementById("seat6-cards");
const seat7CardsDiv = document.getElementById("seat7-cards");

const buttonsDiv = document.getElementById("buttons");

const dealButton = document.getElementById("deal");
const hitButton = document.getElementById("hit");

const theDeck = newDeck(6);

let chips = getCookie("UserId");
console.log(chips);



// // Random generation of other players

// let playerNames = ["Carlos", "Chad", "Davis", "Dayna", "Deed", "Deairus", "Gabriel", "Gavin", "Jamal", "Joshua", "Justin", "Nina", "Pearl", "William"];
// let availableSeats = [seat1CardsDiv, seat2CardsDiv, seat3CardsDiv, seat5CardsDiv, seat6CardsDiv, seat7CardsDiv];
// let numberOfOtherPlayers = getRandomNumber(1, 6);
// let playersDealOrder = [];

// for(let i = 0; i < numberOfOtherPlayers; i++)
// {
//     let seatIndex = getRandomNumber(1, availableSeats.length) - 1;
//     let chosenSeat = availableSeats.splice(seatIndex, 1);
//     let nameIndex = getRandomNumber(1, playerNames.length) - 1;
//     let chosenName = playerNames.splice(nameIndex, 1);
//     let playerCreated = { name: chosenName[0].toString(), seat: chosenSeat[0], hand: [] };
//     playersDealOrder.push(playerCreated);
// }
// console.log(playersDealOrder);
// playersDealOrder[0].seat.innerText = "HELLO";





let playerName = "Davis Kyle Murphy"

let dealer = { name: "Dealer", seat: dealerCardsDiv, hand: [] };
let player = { name: playerName, seat: seat4CardsDiv, hand: [] };
let otherPlayerA = { name: "Cottontail", seat: seat1CardsDiv, hand: [] };
let otherPlayerB = { name: "Flopsy", seat: seat3CardsDiv, hand: [] };
let otherPlayerC = { name: "Dick", seat: seat6CardsDiv, hand: [] };

let playersDealOrder = [otherPlayerA, otherPlayerB, player, otherPlayerC, dealer];


let otherPlayerD = { name: "Mopsy", seat: seat2CardsDiv, hand: [] };
let otherPlayerE = { name: "Harry", seat: seat5CardsDiv, hand: [] };
let otherPlayerF = { name: "Tom", seat: seat7CardsDiv, hand: [] };

playersDealOrder.splice(1, 0, otherPlayerD);
playersDealOrder.splice(4, 0, otherPlayerE);
playersDealOrder.splice(6, 0, otherPlayerF);


let playersHandsDealOrder = [];
for (let player of playersDealOrder) {
    playersHandsDealOrder.push(player.hand);
}


for (let player of playersDealOrder) {
    player.seat.innerHTML = '<span class="player-name">' + player.name + "</span><br />";
}





// let [otherHandA, otherHandB, playerHand, otherHandC, dealerHand] = allPlayersDealOrder.hand;
// let allPlayersHandsDealOrder = [otherHandA, otherHandB, playerHand, otherHandC, dealerHand]

// let numberOfOtherPlayers = 3;

// for(let i = 0; i < numberOfOtherPlayers; i++)
// {
//     otherHands.push([]);
// }


// let allHands = [playerHand, otherHands[0], otherHands[1], otherHands[2], dealerHand]
// let allCardsDivs = [playerCardsDiv, other1CardsDiv, other2CardsDiv, other3CardsDiv, dealerCardsDiv]

function PlaceCard(card, cardsDiv) {
    let cardImage = document.createElement("img");
    cardImage.id = "card-" + card.Id;
    cardImage.className = "card";
    cardImage.src = "../../utilities/cards/images/" + card.ShortValue + card.ShortSuit + ".png";
    cardsDiv.appendChild(cardImage);
}

function PlaceCardDown(card, cardsDiv) {
    let cardImage = document.createElement("img");
    cardImage.id = "card-" + card.Id;
    cardImage.className = "card";
    cardImage.style.backgroundColor = "blue";
    cardImage.src = "../../utilities/cards/images/back.png";
    cardsDiv.appendChild(cardImage);
}



trueShuffle(theDeck);


dealButton.addEventListener("click", function() {
    deal(theDeck, 2, ...playersHandsDealOrder);
    console.log(playersHandsDealOrder);

    for (let i = 0; i < 2; i++) {
        for (let player of playersDealOrder) {
            if(i == 1 && player.name == "Dealer")
                PlaceCardDown(player.hand[i], player.seat);
            else
                PlaceCard(player.hand[i], player.seat);
        }
    }
});

// hitButton.addEventListener("click", function() {
//     hit(theDeck, player.hand);
//     let cardDeltIndex = player.hand.length - 1;
//     PlaceCard(player.hand[cardDeltIndex], player.seat);
// });

function hit(deck, hand)
{
	let cardDelt = deck.shift();
	hand.push(cardDelt);
}






            // for(let i = 0; i < playersHandsDealOrder[4].length; i++)
            // {
            //     playersHandsDealOrder.forEach(hand => {
            //         let j = 0;
            //         PlaceCard(hand[j], playersDealOrder[j].seat);
            //         j++;
            //     });
            // }
