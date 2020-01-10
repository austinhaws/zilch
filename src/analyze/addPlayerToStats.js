module.exports = (player, stats) => {
	stats.totalPlayers++;
	stats.totalScores += player.score;
	stats.totalRolls += player.numberRolls;
	stats.numberZilches += player.numberZilches;
	stats.lowest = stats.lowest === undefined ? player.score : Math.min(player.score, stats.lowest);
	stats.highest = stats.highest === undefined ? player.score : Math.max(player.score, stats.highest);
};
