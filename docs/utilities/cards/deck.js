const cardSuits = ["Spades", "Diamonds", "Clubs", "Hearts"];
const cardSuitsShort = ["S", "D", "C", "H"];
const cardSuitsColors = ["black", "red", "black", "red"];
const cardValues = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
const cardValuesShort = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];

function newDeck(size, hasJokers)
{
	let deckSize = 1;
	if(size != undefined) {
		deckSize = size;
	}

	let deck = new Array();

	for(let i = 0; i < deckSize; i++)
	{
		for(let j = 0; j < cardSuits.length; j++)
		{
			for(let k = 0; k < cardValues.length; k++)
			{
				let card = {Id: i+cardSuitsShort[j]+cardValuesShort[k], Suit: cardSuits[j], Value: cardValues[k], ShortSuit: cardSuitsShort[j], ShortValue: cardValuesShort[k], Color: cardSuitsColors[j]};
				deck.push(card);
			}
		}
		if(hasJokers) {
			let card = {Id: i+"BX", Suit: "Blacks", Value: "Joker", ShortSuit: "B", ShortValue: "X", Color: "black"};
			deck.push(card);
			card = {Id: i+"RX", Suit: "Reds", Value: "Joker", ShortSuit: "R", ShortValue: "X", Color: "red"};
			deck.push(card);
		}
	}

	return deck;
}

function shuffle(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (var i = 0; i < 1000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}

function getRandomNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
	// The max & min are inclusive
}

function trueShuffle(deck, numberOfShuffles)
{
	let shuffleCount = 7;
	if(numberOfShuffles != undefined) {
		shuffleCount = numberOfShuffles;
	}

	let jokersCount = deck.length % 13;
	let cutMargin = (deck.length - jokersCount) / 13;
	let halfDeck = deck.length / 2;

	for(let riffles = 0; riffles < shuffleCount; riffles++)
	{
		let cutSpot = getRandomNumber(halfDeck - cutMargin, halfDeck + cutMargin);

		let leftHand = deck.splice(cutSpot, deck.length - 1);
		let rightHand = deck.splice(0, cutSpot);
	
		while(leftHand.length > 0 && rightHand.length > 0)
		{
			let cardCount = getRandomNumber(1,3);
			while(leftHand.length < cardCount)
			{
				cardCount--;
			}
			let cards = leftHand.splice(0, cardCount);
			for(let i = 0; i < cardCount; i++)
			{
				deck.push(cards[i]);
			}
	
			cardCount = getRandomNumber(1,3);
			while(rightHand.length < cardCount)
			{
				cardCount--;
			}
			cards = rightHand.splice(0, cardCount);
			for(let i = 0; i < cardCount; i++)
			{
				deck.push(cards[i]);
			}
		}
		if(leftHand.length > 0) {
			for(let i = 0; i < leftHand.length; i++)
			{
				deck.push(leftHand[i]);
			}
		}
		if(rightHand.length > 0) {
			for(let i = 0; i < rightHand.length; i++)
			{
				deck.push(rightHand[i]);
			}
		}
	}
}

function deal(deck, cardCount)
{
	for(let i = 0; i < cardCount; i++)
	{
		for(let j = 2; j < arguments.length; j++)
		{
			let cardDelt = deck.shift();
			arguments[j].push(cardDelt);
		}
	}
}
