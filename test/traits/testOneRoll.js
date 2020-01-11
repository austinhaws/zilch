const Test =require('../../src/cw-2')();
const oneRoll = require('../../src/traits/oneRoll');
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

Test.describe('One roll', _ => {
	Test.it("sets and 1 and 5", () => {
		const dicePool = testDicePool([1, 3, 5, 3, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(oneRoll.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 450);
		Test.assertEquals(dicePool.kept.length, 5);
		Test.assertEquals(dicePool.rolls.length, 1);
	});
	Test.it("2 sets", () => {
		const dicePool = testDicePool([4, 3, 4, 3, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(oneRoll.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 700);
		Test.assertEquals(dicePool.kept.length, 6);
		Test.assertEquals(dicePool.rolls.length, 0);
	});
	Test.it("1s sets", () => {
		const dicePool = testDicePool([1, 1, 1, 1, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(oneRoll.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 2000);
		Test.assertEquals(dicePool.kept.length, 4);
		Test.assertEquals(dicePool.rolls.length, 2);
	});
	Test.it("5s sets", () => {
		const dicePool = testDicePool([5, 5, 5, 5, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(oneRoll.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 1000);
		Test.assertEquals(dicePool.kept.length, 4);
		Test.assertEquals(dicePool.rolls.length, 2);
	});
	Test.it("one 1", () => {
		const dicePool = testDicePool([1, 2, 6, 6, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(oneRoll.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 100);
		Test.assertEquals(dicePool.kept.length, 1);
		Test.assertEquals(dicePool.rolls.length, 5);
	});
	Test.it("one 5", () => {
		const dicePool = testDicePool([5, 2, 6, 6, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(oneRoll.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 50);
		Test.assertEquals(dicePool.kept.length, 1);
		Test.assertEquals(dicePool.rolls.length, 5);
	});
});