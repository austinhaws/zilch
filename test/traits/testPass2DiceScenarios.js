const Test = require('../../src/cw-2')();
const hackRolls = require("../hack/hackRolls");
const pass2Dice = require('../../src/traits/pass2Dice');
const engine = require('../../src/engine');

Test.setGlobalOptions({
	hideSuccess: true,
	hideTiming: true,
	hideTitles: true,
});

const testDicePool = rolls => ({
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

Test.describe('Pass 2 Dice: Scenarios', _ => {

	Test.it("keep max", () => {
		hackRolls([
			...[1, 2, 4, 6, 6, 3],
			...[1, 2, 4, 6, 6],
			...[1, 2, 4, 6],
			...[5, 5, 4],
		]);

		const players = [
			engine.createPlayer(pass2Dice, 'Test dummy 1'),
			engine.createPlayer(pass2Dice, 'Test dummy 2'),
		];

		const dicePool = engine.createDicePool();

		engine.takeTurn(players, dicePool);
		Test.assertEquals(players[0].score, 400);
	});
});