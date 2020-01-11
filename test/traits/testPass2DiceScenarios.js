const Test = require('../../src/cw-2')();
const hackRolls = require("../hack/hackRolls");
const pass2Dice = require('../../src/traits/pass2Dice');
const engine = require('../../src/engine');

Test.setGlobalOptions({
	hideSuccess: true,
	hideTiming: true,
	hideTitles: true,
});

engine.showGameLog = false;

Test.describe('Pass 2 Dice: Scenarios', _ => {

	Test.it("keep max", () => {
		hackRolls([
			...[1, 2, 4, 6, 6, 3],
			...[1, 2, 4, 6, 6],
			...[1, 2, 4, 6],
			...[5, 5, 4],
		]);

		const players = [
			engine.createPlayer({trait: pass2Dice, name: 'Test dummy 1', turnOrder: 1}),
			engine.createPlayer({trait: pass2Dice, name: 'Test dummy 2', turnOrder: 2}),
		];

		const dicePool = engine.createDicePool();

		engine.takeTurn(players, dicePool, false);
		Test.assertEquals(players[0].score, 400);
	});
});