const engine = require("../engine");

const scoreSingle1or5s = (n, nScore, dicePool) => {
	if (dicePool.sets.filter(set => set.number === n).length === 0) {
		const nCount = dicePool.rolls.filter(rollN => rollN === n).length;
		dicePool.rolls = dicePool.rolls.filter(rollN => rollN !== n);
		dicePool.kept.push(...Array.from({length: nCount}, () => n));
		dicePool.currentScore += nCount * nScore;
	}
};

module.exports = {
	// current player is players[0]
	analyze: (dicePool, players) => {
		// score sets
		dicePool.sets.forEach(set => {
			dicePool.currentScore += engine.scoreSet(set);
			dicePool.rolls = dicePool.rolls.filter(n => n !== set.number);
			dicePool.kept.push(...Array.from({length: set.count}, () => set.number));
		});

		// score 1s and 5s if not in sets
		scoreSingle1or5s(1, 100, dicePool);
		scoreSingle1or5s(5, 50, dicePool);

		// always pass
		return true;
	},
};