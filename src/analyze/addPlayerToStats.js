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

	const traitName = player.trait.name;
	if (!stats.traitRanks[player.rank]) {
		stats.traitRanks[player.rank] = {};
	}
	stats.traitRanks[player.rank][traitName] = (stats.traitRanks[player.rank][traitName] || 0) + 1;

	const traitCount = stats.traitCounts.find(trait => trait.name === traitName);
	if (traitCount) {
		traitCount.count++;
		traitCount.scoreSum += player.score;
	} else {
		stats.traitCounts.push({
			name: traitName,
			count: 1,
			scoreSum: player.score,
		});
	}
};
