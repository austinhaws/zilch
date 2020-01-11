const Test = require('../../src/cw-2')();
const engine = require('../../src/engine');
const testDicePool = require('./testDicePool');

module.exports = (trait, traitParams, rolls, score, keepLength, willPass) => {
	const dicePool = testDicePool(rolls);
	engine.analyizeDicePool(dicePool);
	Test.assertEquals(trait(...traitParams).analyze(dicePool), willPass);

	Test.assertEquals(dicePool.currentScore, score);
	Test.assertEquals(dicePool.kept.length, keepLength);
	Test.assertEquals(dicePool.rolls.length, 6 - keepLength);
};
