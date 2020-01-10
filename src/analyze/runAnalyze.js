const analyzeGames = require('./analyzeGames');
const engine = require('../engine');
const pass2Dice = require('../traits/pass2Dice');
const zilch = require('../zilch');

// create players
const players = [
	engine.createPlayer({
		trait: pass2Dice,
		name: 'player 1',
		turnOrder: 1,
	}),
	engine.createPlayer({
		trait: pass2Dice,
		name: 'player 2',
		turnOrder: 2,
	}),
	engine.createPlayer({
		trait: pass2Dice,
		name: 'player 3',
		turnOrder: 3,
	}),
	engine.createPlayer({
		trait: pass2Dice,
		name: 'player 4',
		turnOrder: 4,
	}),
];

zilch(players);

const stats = analyzeGames([players]);

console.log('*** game over ***', JSON.stringify({
	players,
	stats,
}, null, 4));