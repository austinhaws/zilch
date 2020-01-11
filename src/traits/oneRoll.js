const engine = require("../engine");
const scoreSingle = require("./util/scoreSingle");

module.exports = {
	name: 'Pass after one roll',
	// current player is players[0]
	analyze: (dicePool, players) => {
		// score sets
		dicePool.sets.forEach(set => {
			dicePool.currentScore += engine.scoreSet(set);
			dicePool.rolls = dicePool.rolls.filter(n => n !== set.number);
			dicePool.kept.push(...Array.from({length: set.count}, () => set.number));
		});

		// score 1s and 5s if not in sets
		scoreSingle(1, 100, dicePool);
		scoreSingle(5, 50, dicePool);

		// always pass
		return true;
	},
};