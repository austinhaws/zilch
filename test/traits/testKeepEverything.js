const Test = require('../../src/cw-2')();
const keepEverything = require('../../src/traits/keepEverything');
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

const runTest = (rolls, score, keepLength, willPass) => {
	const dicePool = testDicePool(rolls);
	engine.analyizeDicePool(dicePool);
	Test.assertEquals(keepEverything(2).analyze(dicePool), willPass);

	Test.assertEquals(dicePool.currentScore, score);
	Test.assertEquals(dicePool.kept.length, keepLength);
	Test.assertEquals(dicePool.rolls.length, 6 - keepLength);
};

Test.describe('No Sets', _ => {
	Test.it("1 1s", () => {
		runTest([1, 3, 2, 2, 3, 6], 100, 1, false);
	});

	Test.it("2 1s", () => {
		runTest([1, 1, 2, 2, 3, 6], 200, 2, false);
	});

	Test.it("3 1s", () => {
		runTest([1, 1, 2, 1, 3, 6], 1000,  3, false);
	});

	Test.it("4 1s", () => {
		runTest([1, 1, 2, 1, 3, 1], 2000,  4, true);
	});

	Test.it("5 1s", () => {
		runTest([1, 1, 2, 1, 1, 1], 4000,  5, true);
	});

	Test.it("6 1s", () => {
		runTest([1, 1, 1, 1, 1, 1], 8000,  6, false);
	});

	Test.it("1 5s", () => {
		runTest([5, 3, 2, 2, 3, 6], 50, 1, false);
	});

	Test.it("2 5s", () => {
		runTest([5, 5, 2, 2, 3, 6], 100, 2, false);
	});

	Test.it("3 5s", () => {
		runTest([5, 5, 2, 5, 3, 6], 500,  3, false);
	});

	Test.it("4 5s", () => {
		runTest([5, 5, 2, 5, 3, 5], 1000,  4, true);
	});

	Test.it("5 5s", () => {
		runTest([5, 5, 2, 5, 5, 5], 2000,  5, true);
	});

	Test.it("6 5s", () => {
		runTest([5, 5, 5, 5, 5, 5], 4000,  6, false);
	});

	Test.it("set of 3 and 1s", () => {
		runTest([3, 3, 3, 4, 1, 2], 400,  4, true);
	});

	Test.it("set of 3 and 5s", () => {
		runTest([3, 3, 3, 4, 5, 2], 350,  4, true);
	});
});