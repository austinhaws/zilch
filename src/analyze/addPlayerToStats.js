module.exports = (player, stats) => {
	stats.totalPlayers++;
	stats.totalScores += player.score;
	stats.totalRolls += player.numberRolls;
	stats.numberZilches += player.numberZilches;
	stats.lowest = stats.lowest === undefined ? player.score : Math.min(player.score, stats.lowest);
	stats.highest = stats.highest === undefined ? player.score : Math.max(player.score, stats.highest);
	stats.timesRoll6Dice += player.timesRoll6Dice;
	stats.all6DiceZilch += player.all6DiceZilch;
	stats.numberDicePerRoll.push(...player.numberDicePerRoll);

	const traitCount = stats.traitCounts.find(trait => trait.name === player.trait.name);
	if (traitCount) {
		traitCount.count++;
	} else {
		stats.traitCounts.push({
			name: player.trait.name,
			count: 1,
		});
	}
};
