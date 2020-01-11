module.exports = stats => {
	stats.averageScores = stats.totalScores / stats.totalPlayers;
	stats.averageRolls = stats.totalRolls / stats.totalPlayers;
	stats.averageRolls = stats.timesRoll6Dice / stats.totalPlayers;
	stats.averageAll6DiceZilch = stats.all6DiceZilch / stats.totalPlayers;
	stats.averageNumberDicePerRoll = stats.numberDicePerRoll.reduce((tot, n) => tot + n, 0) / stats.numberDicePerRoll.length;

	// remove this because it clutters the output
	stats.numberDicePerRoll = 'hidden';
};
