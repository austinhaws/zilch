const Test = require('../../src/cw-2')();
const noSets = require('../../src/traits/noSets');
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

Test.describe('No Sets', _ => {
	Test.it("1s w/ set", () => {
		const dicePool = testDicePool([1, 3, 1, 3, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 200);
		Test.assertEquals(dicePool.kept.length, 2);
		Test.assertEquals(dicePool.rolls.length, 4);
	});

	Test.it("5s w/ set", () => {
		const dicePool = testDicePool([5, 3, 5, 3, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 100);
		Test.assertEquals(dicePool.kept.length, 2);
		Test.assertEquals(dicePool.rolls.length, 4);
	});

	Test.it("set of 1s", () => {
		const dicePool = testDicePool([1, 2, 1, 3, 3, 1]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 1000);
		Test.assertEquals(dicePool.kept.length, 3);
		Test.assertEquals(dicePool.rolls.length, 3);
	});

	Test.it("set of 5s", () => {
		const dicePool = testDicePool([5, 2, 5, 3, 3, 5]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 500);
		Test.assertEquals(dicePool.kept.length, 3);
		Test.assertEquals(dicePool.rolls.length, 3);
	});

	Test.it("set of 1s with another set", () => {
		const dicePool = testDicePool([1, 2, 1, 2, 2, 1]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 1200);
		Test.assertEquals(dicePool.kept.length, 6);
		Test.assertEquals(dicePool.rolls.length, 0);
	});

	Test.it("set of 5s with another set", () => {
		const dicePool = testDicePool([5, 2, 5, 2, 2, 5]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 700);
		Test.assertEquals(dicePool.kept.length, 6);
		Test.assertEquals(dicePool.rolls.length, 0);
	});

	Test.it("set of 1s and 5s", () => {
		const dicePool = testDicePool([5, 1, 5, 1, 1, 5]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 1500);
		Test.assertEquals(dicePool.kept.length, 6);
		Test.assertEquals(dicePool.rolls.length, 0);
	});

	Test.it("two non-1/5 sets", () => {
		const dicePool = testDicePool([3, 2, 3, 2, 2, 3]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 500);
		Test.assertEquals(dicePool.kept.length, 6);
		Test.assertEquals(dicePool.rolls.length, 0);
	});

	Test.it("set of 1s with 5", () => {
		const dicePool = testDicePool([1, 2, 1, 1, 5, 3]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 1000);
		Test.assertEquals(dicePool.kept.length, 3);
		Test.assertEquals(dicePool.rolls.length, 3);
	});

	Test.it("set of 5s with 1", () => {
		const dicePool = testDicePool([5, 2, 5, 5, 1, 3]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 500);
		Test.assertEquals(dicePool.kept.length, 3);
		Test.assertEquals(dicePool.rolls.length, 3);
	});

	Test.it("set w/o 1s/5s", () => {
		const dicePool = testDicePool([3, 2, 3, 3, 6, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 300);
		Test.assertEquals(dicePool.kept.length, 3);
		Test.assertEquals(dicePool.rolls.length, 3);
	});

	Test.it("4 1s", () => {
		const dicePool = testDicePool([1, 1, 1, 1, 6, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 2000);
		Test.assertEquals(dicePool.kept.length, 4);
		Test.assertEquals(dicePool.rolls.length, 2);
	});

	Test.it("4 5s", () => {
		const dicePool = testDicePool([5, 5, 5, 5, 6, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 1000);
		Test.assertEquals(dicePool.kept.length, 4);
		Test.assertEquals(dicePool.rolls.length, 2);
	});

	Test.it("4 3s", () => {
		const dicePool = testDicePool([3, 3, 3, 3, 6, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 600);
		Test.assertEquals(dicePool.kept.length, 4);
		Test.assertEquals(dicePool.rolls.length, 2);
	});

	Test.it("5 3s", () => {
		const dicePool = testDicePool([3, 3, 3, 3, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 1200);
		Test.assertEquals(dicePool.kept.length, 5);
		Test.assertEquals(dicePool.rolls.length, 1);
	});

	Test.it("two 1s 2 5s", () => {
		const dicePool = testDicePool([1, 1, 5, 5, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(noSets(2).analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 300);
		Test.assertEquals(dicePool.kept.length, 4);
		Test.assertEquals(dicePool.rolls.length, 2);
	});

});