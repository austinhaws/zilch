const engine = require('../../src/engine');

module.exports = rolls => ({
	// what has been rolled
	rolls: rolls.concat([...Array.from({length: 6 - rolls.length}, () => engine.rollDie())]),
	// for checking for sets: {number: count}
	rollNumberCounts: undefined,
	sets: [],
	// what rolls were kept
	kept: [],
	// what the current total is
	currentScore: 0,
	// is the last roll a zilch
	isZilched: false,
});
