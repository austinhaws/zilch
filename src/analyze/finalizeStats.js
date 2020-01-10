module.exports = stats => {
	stats.averageScores = stats.totalScores / stats.totalPlayers;
	stats.averageRolls = stats.totalRolls / stats.totalPlayers;
};
