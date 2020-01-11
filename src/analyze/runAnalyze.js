const analyzeGames = require('./analyzeGames');
const engine = require('../engine');
const pass2Dice = require('../traits/pass2Dice');
const zilch = require('../zilch');

// create players
const createPlayers = (count, traits) => Array.from({length: count},
	(_, i) => engine.createPlayer({
		trait: traits[(i + 1) % traits.length],
		name: `Player ${i + 1}`,
		turnOrder: i + 1,
	}));

const games = [
	createPlayers(3, [pass2Dice]),
	createPlayers(4, [pass2Dice]),
	createPlayers(5, [pass2Dice]),
	createPlayers(6, [pass2Dice]),
];
games.forEach(zilch);

const stats = analyzeGames(games);

console.log('*** game over ***', JSON.stringify({
	stats,
}, null, 4));