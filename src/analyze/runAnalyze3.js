const analyzeGames = require('./analyzeGames');
const engine = require('../engine');
const pass2Dice = require('../traits/pass2Dice');
const oneRoll = require('../traits/oneRoll');
const zilch = require('../zilch');
const shuffle = require('../util/shuffle');
const noSets = require('../traits/noSets');
const keepEverything = require('../traits/keepEverything');
const threshhold = require('../traits/threshhold');

// create players
const createPlayers = (count, traits) => Array.from({length: count},
	(_, i) => engine.createPlayer({
		trait: traits(i),
		name: `Player ${i + 1}`,
		turnOrder: i + 1,
	}));

engine.showGameLog = false;
const NUMBER_OF_GAMES = 1000;
const traits = [
	oneRoll,
	...(Array.from({length: 6}, (_, i) => pass2Dice(i + 1))),
	...(Array.from({length: 6}, (_, i) => noSets(i + 1))),
	...(Array.from({length: 6}, (_, i) => keepEverything(i + 1))),
	...[100, 300, 350, 500, 1000, 2000].map(threshhold),
];

const games = Array.from({length: NUMBER_OF_GAMES}, () => {
	shuffle(traits);
	return createPlayers(traits.length, i => traits[i]);
});
games.forEach(zilch);

const stats = analyzeGames(games);

console.log('*** game over ***', JSON.stringify({
	stats,
}, null, 4));