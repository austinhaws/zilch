const addPlayerToStats = require('./addPlayerToStats');
const compareIfEquals = require('../util/compareIfEquals');

module.exports = (players, stats)  => {
	// sort players in to order of score so winner is first
	players.sort(compareIfEquals((a, b) => b.score - a.score, (a, b) => a.name.localeCompare(b.name)));
	players.forEach((player, i) => player.rank = i + 1);

	// apply stats
	Object.keys(stats)
		.forEach(key => players.filter(player => stats[key].includes(player, players))
			.forEach((player, rank) => addPlayerToStats(player, stats[key].stats)));
};
