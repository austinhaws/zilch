const compareIfEquals = require('../util/compareIfEquals');

module.exports = stats => {
	stats.averageScores = stats.totalScores / stats.totalPlayers;
	stats.averageRolls = stats.totalRolls / stats.totalPlayers;
	stats.averageRolls = stats.timesRoll6Dice / stats.totalPlayers;
	stats.averageAll6DiceZilch = stats.all6DiceZilch / stats.totalPlayers;
	stats.averageNumberDicePerRoll = stats.numberDicePerRoll.reduce((tot, n) => tot + n, 0) / stats.numberDicePerRoll.length;

	// remove this because it clutters the output
	stats.numberDicePerRoll = 'hidden';

	stats.traitCounts.sort(compareIfEquals((a, b) => b.count - a.count, (a, b) => a.name.localeCompare(b.name)));
};
