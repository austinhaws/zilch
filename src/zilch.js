const logger = require('./log');
const engine = require('./engine');

module.exports = players => {
	const dicePool = engine.createDicePool();
	while (!engine.hasWinner(players)) {
		engine.takeTurn(players, dicePool);
		players.push(players.shift());
	}
console.log('after game', players);
};

// make this same generator idea for 1-12 for dad's "rule"