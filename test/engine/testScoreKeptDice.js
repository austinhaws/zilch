const Test = require('../../../cw-2')();
const engine = require('../../engine');

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

Test.describe('score kept dice', _ => {
	Test.it("singles", () => {
		Test.assertEquals(engine.scoreKeptDice([1], testDicePool([1, 2, 3, 4, 5, 6])), 100);
		Test.assertEquals(engine.scoreKeptDice([1, 1], testDicePool([1, 1, 3, 4, 5, 6])), 200);
		Test.assertEquals(engine.scoreKeptDice([5], testDicePool([1, 2, 3, 4, 5, 6])), 50);
		Test.assertEquals(engine.scoreKeptDice([5, 5], testDicePool([1, 2, 3, 4, 5, 5])), 100);
		Test.assertEquals(engine.scoreKeptDice([1, 1, 5, 5], testDicePool([1, 1, 3, 4, 5, 5])), 300);
		Test.assertEquals(engine.scoreKeptDice([], testDicePool([1, 1, 3, 4, 5, 5])), 0);
	});
	Test.it("sets", () => {
		const testSet = (n, count) => engine.scoreKeptDice(Array.from({length: count}, () => n), testDicePool(Array.from({length: 6}, () => n)));

		const testAllSet = (n, totals) => totals.forEach((total, i) => Test.assertEquals(testSet(n, 3 + i), total));

		testAllSet(1, [1000, 2000, 4000, 8000]);
		testAllSet(2, [200, 400, 800, 1600]);
		testAllSet(3, [300, 600, 1200, 2400]);
		testAllSet(4, [400, 800, 1600, 3200]);
		testAllSet(5, [500, 1000, 2000, 4000]);
		testAllSet(6, [600, 1200, 2400, 4800]);
	});
	Test.it("singles & sets", () => {
		Test.assertEquals(engine.scoreKeptDice([1, 3, 3, 3], testDicePool([1, 1, 1, 3, 3, 3])), 400);
		Test.assertEquals(engine.scoreKeptDice([1, 3, 3, 3, 5, 5], testDicePool([1, 5, 5, 3, 3, 3])), 500);
	});
});