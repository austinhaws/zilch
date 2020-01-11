const analyzeGames = require('./analyzeGames');
const engine = require('../engine');
const pass2Dice = require('../traits/pass2Dice');
const oneRoll = require('../traits/oneRoll');
const zilch = require('../zilch');

// create players
const createPlayers = (count, traits) => Array.from({length: count},
	(_, i) => engine.createPlayer({
		trait: traits[(i) % traits.length],
		name: `Player ${i + 1}`,
		turnOrder: i + 1,
	}));

engine.showGameLog = false;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;
const NUMBER_OF_GAMES = 100;
const games = Array.from({length: NUMBER_OF_GAMES}, () =>
	createPlayers(Math.floor(Math.random() * (MAX_PLAYERS - MIN_PLAYERS + 1)) + MIN_PLAYERS, [
		oneRoll,
		pass2Dice(1),
		pass2Dice(2),
		pass2Dice(3),
		pass2Dice(4),
		pass2Dice(5),
		pass2Dice(6),
	]),
);
games.forEach(zilch);

const stats = analyzeGames(games);

console.log('*** game over ***', JSON.stringify({
	stats,
}, null, 4));