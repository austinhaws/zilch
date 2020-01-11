const applySet = require('./util/applySet');
const scoreSingle = require('./util/scoreSingle');

module.exports = passN => ({
	name: `keep everything - Pass ${passN}`,
	analyze: (dicePool, players) => {

		// keep all sets
		dicePool.sets.forEach(set => applySet(set, dicePool));

		// if no 1s set then keep all 1s
		if (dicePool.sets.filter(set => set.number === 1).length === 0) {
			scoreSingle(1, 100, dicePool);
		}
		// if no 5s set then keep all 5s
		if (dicePool.sets.filter(set => set.number === 5).length === 0) {
			scoreSingle(5, 50, dicePool);
		}

		// pass if <= passN dice are left
		return !!dicePool.rolls.length && dicePool.rolls.length <= passN;
	},
});