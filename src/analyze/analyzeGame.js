const addPlayerToStats = require('./addPlayerToStats');

module.exports = (players, stats)  => Object.keys(stats)
	.forEach(key => players.filter(player => stats[key].includes(player, players))
		.forEach(player => addPlayerToStats(player, stats[key].stats)));
