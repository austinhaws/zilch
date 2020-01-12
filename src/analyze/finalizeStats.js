const compareIfEquals = require('../util/compareIfEquals');

module.exports = (stats, games) => {
	stats.averageScores = stats.totalScores / stats.totalPlayers;
	stats.averageRolls = stats.totalRolls / stats.totalPlayers;
	stats.averageRolls = stats.timesRoll6Dice / stats.totalPlayers;
	stats.averageAll6DiceZilch = stats.all6DiceZilch / stats.totalPlayers;
	stats.averageNumberDicePerRoll = stats.numberDicePerRoll.reduce((tot, n) => tot + n, 0) / stats.numberDicePerRoll.length;

	// remove this because it clutters the output
	stats.numberDicePerRoll = 'hidden';

	stats.traitCounts.sort(compareIfEquals((a, b) => b.count - a.count, (a, b) => a.name.localeCompare(b.name)));
	stats.traitCounts.forEach(count => count.percent = count.count / games.length);

	// average rank by trait name
	stats.averageRankByTrait = {};

	Object.keys(stats.traitRanks).forEach(rank => {
		Object.keys(stats.traitRanks[rank]).forEach(traitName => {
			if (!stats.averageRankByTrait[traitName]) {
				stats.averageRankByTrait[traitName] = {
					count: 0,
					sumRanks: 0,
					average: undefined,
					traitName,
				};
			}
			stats.averageRankByTrait[traitName].count += stats.traitRanks[rank][traitName];
			stats.averageRankByTrait[traitName].sumRanks += Number(rank) * stats.traitRanks[rank][traitName];
		})
	});

	Object.keys(stats.averageRankByTrait).forEach(traitName => stats.averageRankByTrait[traitName].average = stats.averageRankByTrait[traitName].sumRanks / stats.averageRankByTrait[traitName].count);

	stats.averageRankByTrait = Object.keys(stats.averageRankByTrait)
		.map(traitName => stats.averageRankByTrait[traitName])
		.sort(compareIfEquals((a, b) => a.average - b.average, (a, b) => a.traitName.localeCompare(b.traitName)));
};
