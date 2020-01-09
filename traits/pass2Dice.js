const engine = require("../engine");

module.exports = {
	// current player is players[0]
	analyze: (dicePool, players) => {
		// count how many dice are tied up in sets
		const countSets = dicePool.sets.reduce((totDice, set) => totDice + set.count, 0);
		const setFor1s = dicePool.sets.filter(set => set.number === 1);
		const setFor5s = dicePool.sets.filter(set => set.number === 5);

		// check for 1s
		const count1s = dicePool.rolls.filter(n => n === 1).length;

		// check for 5s
		const count5s = dicePool.rolls.filter(n => n === 5).length;

		let totalCount = (setFor1s.length ? 0 : count1s) + (setFor5s.length ? 0 : count5s) + countSets;
		// check if all dice are used
		if (totalCount >= dicePool.rolls.length) {
			// everything scores!
			dicePool.currentScore += dicePool.sets.map(engine.scoreSet).reduce((tot, n) => tot + n, 0);
			dicePool.currentScore += (setFor1s.length ? 0 : count1s) * 100;
			dicePool.currentScore += (setFor5s.length ? 0 : count5s) * 50;

			dicePool.kept = [...dicePool.rolls];
			dicePool.rolls = [];

			// check for triples
		} else if (dicePool.sets.length > 1) {
			// two sets!! Way to go!
			dicePool.currentScore += dicePool.sets.map(engine.scoreSet).reduce((tot, n) => tot + n, 0);
			dicePool.kept = [...dicePool.rolls];
			dicePool.rolls = [];

		} else if (dicePool.sets.length && ((!count1s && !count5s) || dicePool.sets[0].number !== 2 || dicePool.sets[0].count > 3)) {
			dicePool.currentScore += engine.scoreSet(dicePool.sets[0]);
			dicePool.rolls = dicePool.rolls.filter(n => n !== dicePool.sets[0].number);
			dicePool.kept.push(...Array.from({length: dicePool.sets[0].count}, () => dicePool.sets[0].number));

		} else if (count1s) {
			// just keep one
			dicePool.kept.push(1);
			dicePool.rolls.splice(dicePool.rolls.indexOf(1), 1);
			dicePool.currentScore += 100;

		} else if (count5s) {
			// just keep one
			dicePool.currentScore += 50;
			dicePool.kept.push(5);
			dicePool.rolls.splice(dicePool.rolls.indexOf(5), 1);
		} else {
			console.error('pass2Dice.analyze(): zilch discovered');
		}
		return !!dicePool.rolls.length && dicePool.rolls.length <= 2;
	},
};