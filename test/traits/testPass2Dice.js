const Test = require('../../src/cw-2')();
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

Test.describe('Pass 2 Dice', _ => {
	Test.it("1", () => {
		const dicePool = testDicePool([1, 6, 5, 2, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 100);
		Test.assertEquals(dicePool.kept.length, 1);
		Test.assertEquals(dicePool.rolls.length, 5);
	});
	Test.it("11 - keep just one", () => {
		const dicePool = testDicePool([1, 1, 5, 2, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 100);
		Test.assertEquals(dicePool.kept.length, 1);
		Test.assertEquals(dicePool.rolls.length, 5);
	});
	Test.it("111", () => {
		const dicePool = testDicePool([1, 1, 1, 2, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 1000);
		Test.assertEquals(dicePool.kept.length, 3, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 3, 'rolls length');
	});
	Test.it("1111", () => {
		const dicePool = testDicePool([1, 1, 1, 1, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 2000);
		Test.assertEquals(dicePool.kept.length, 4, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 2, 'rolls length');
	});
	Test.it("11111", () => {
		const dicePool = testDicePool([1, 1, 1, 1, 1, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 4000);
		Test.assertEquals(dicePool.kept.length, 5, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 1, 'rolls length');
	});
	Test.it("111111", () => {
		const dicePool = testDicePool([1, 1, 1, 1, 1, 1]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 8000);
		Test.assertEquals(dicePool.kept.length, 6, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 0, 'rolls length');
	});

	Test.it("5", () => {
		const dicePool = testDicePool([6, 6, 5, 2, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 50);
		Test.assertEquals(dicePool.kept.length, 1, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 5, 'rolls length');
	});

	Test.it("55", () => {
		const dicePool = testDicePool([6, 5, 5, 2, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 50);
		Test.assertEquals(dicePool.kept.length, 1, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 5, 'rolls length');
	});

	Test.it("555", () => {
		const dicePool = testDicePool([5, 5, 5, 2, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 500);
		Test.assertEquals(dicePool.kept.length, 3, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 3, 'rolls length');
	});

	Test.it("5555", () => {
		const dicePool = testDicePool([5, 5, 5, 5, 3, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 1000);
		Test.assertEquals(dicePool.kept.length, 4, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 2, 'rolls length');
	});

	Test.it("55555", () => {
		const dicePool = testDicePool([5, 5, 5, 5, 5, 4]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 2000);
		Test.assertEquals(dicePool.kept.length, 5, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 1, 'rolls length');
	});

	Test.it("555555", () => {
		const dicePool = testDicePool([5, 5, 5, 5, 5, 5]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 4000);
		Test.assertEquals(dicePool.kept.length, 6, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 0, 'rolls length');
	});


	Test.it("222", () => {
		const dicePool = testDicePool([2, 2, 2, 3, 4, 6]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 200);
		Test.assertEquals(dicePool.kept.length, 3, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 3, 'rolls length');
	});

	Test.it("2225", () => {
		const dicePool = testDicePool([2, 2, 2, 3, 4, 5]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 50);
		Test.assertEquals(dicePool.kept.length, 1, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 5, 'rolls length');
	});

	Test.it("2221", () => {
		const dicePool = testDicePool([2, 2, 2, 3, 4, 1]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 100);
		Test.assertEquals(dicePool.kept.length, 1, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 5, 'rolls length');
	});

	Test.it("222235", () => {
		const dicePool = testDicePool([2, 2, 2, 2, 5, 3]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 400);
		Test.assertEquals(dicePool.kept.length, 4, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 2, 'rolls length');
	});

	Test.it("222231", () => {
		const dicePool = testDicePool([2, 2, 2, 2, 1, 3]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 400);
		Test.assertEquals(dicePool.kept.length, 4, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 2, 'rolls length');
	});

	Test.it("666", () => {
		const dicePool = testDicePool([6, 6, 6, 2, 1, 3]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 600);
		Test.assertEquals(dicePool.kept.length, 3, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 3, 'rolls length');
	});

	Test.it("6666", () => {
		const dicePool = testDicePool([6, 6, 6, 6, 1, 3]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 1200);
		Test.assertEquals(dicePool.kept.length, 4, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 2, 'rolls length');
	});

	Test.it("66666", () => {
		const dicePool = testDicePool([6, 6, 6, 6, 6, 3]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), true);

		Test.assertEquals(dicePool.currentScore, 2400);
		Test.assertEquals(dicePool.kept.length, 5, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 1, 'rolls length');
	});

	Test.it("666666", () => {
		const dicePool = testDicePool([6, 6, 6, 6, 6, 6]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 4800);
		Test.assertEquals(dicePool.kept.length, 6, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 0, 'rolls length');
	});

	Test.it("153331", () => {
		const dicePool = testDicePool([1, 5, 3, 3, 3, 1]);
		engine.analyizeDicePool(dicePool);
		Test.assertEquals(pass2Dice.analyze(dicePool), false);

		Test.assertEquals(dicePool.currentScore, 550);
		Test.assertEquals(dicePool.kept.length, 6, 'kept length');
		Test.assertEquals(dicePool.rolls.length, 0, 'rolls length');
	});

console.log('*** need to test scenario');
	// 111554 -
	// rolled 124663
	// rolled 12466
	// rolled 1246
	// rolled 554
	// it should have taken both 5s, but it only took one of them
});