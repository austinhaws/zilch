const engine = require('./engine');

module.exports = players => {
	const dicePool = engine.createDicePool();
	while (!engine.hasWinner(players)) {
		engine.takeTurn(players, dicePool);
		players.push(players.shift());
	}
};
