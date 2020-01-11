const engine = require('../../engine');

module.exports = (set, dicePool) => {
	dicePool.currentScore += engine.scoreSet(set);
	dicePool.rolls = dicePool.rolls.filter(n => n !== set.number);
	dicePool.kept.push(...Array.from({length: set.count}, () => set.number));
};
