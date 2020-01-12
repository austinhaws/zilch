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
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;
const NUMBER_OF_GAMES = 100;
const traits = [
	pass2Dice(2),
	pass2Dice(3),
	pass2Dice(4),
	keepEverything(2),
	keepEverything(3),
	keepEverything(4),
];

const games = Array.from({length: NUMBER_OF_GAMES}, () => createPlayers(6, i => traits[i]));
games.forEach(zilch);

const stats = analyzeGames(games);

console.log('*** game over ***', JSON.stringify({
	stats,
}, null, 4));