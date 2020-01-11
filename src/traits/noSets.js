const countNs = require('./util/countNs');
const scoreSingle = require('./util/scoreSingle');
const applySet = require('./util/applySet');

module.exports = passN => ({
	name: '1|5 before sets',
	analyze: (dicePool, players) => {
		// if 1s or 5s then keep them
		const count1s = countNs(dicePool, 1);
		const count5s = countNs(dicePool, 5);

		if (dicePool.sets.length === 2) {
			dicePool.sets.forEach(set => applySet(set, dicePool));
		} else {
			// keep 1s/5s sets first
			const firstSets = dicePool.sets.filter(set => set.number === 1 || set.number === 5);
			const secondSets = dicePool.sets.filter(set => set.number !== 1 && set.number !== 5);
			if (firstSets.length) {
				firstSets.forEach(set => applySet(set, dicePool));
			} else {
				// then keep 1s/5s
				scoreSingle(1, 100, dicePool);
				scoreSingle(5, 50, dicePool);
			}

			// then keep sets but only if there is no other points
			if (secondSets.length && !firstSets.length && !count1s && !count5s) {
				secondSets.forEach(set => applySet(set, dicePool));
			}
		}

		return !!dicePool.rolls.length && dicePool.rolls.length <= passN;
	},
});