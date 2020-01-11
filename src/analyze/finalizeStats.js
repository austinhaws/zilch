module.exports = stats => {
	stats.averageScores = stats.totalScores / stats.totalPlayers;
	stats.averageRolls = stats.totalRolls / stats.totalPlayers;
	stats.averageRolls = stats.timesRoll6Dice / stats.totalPlayers;
	stats.averageAll6DiceZilch = stats.all6DiceZilch / stats.totalPlayers;
};
