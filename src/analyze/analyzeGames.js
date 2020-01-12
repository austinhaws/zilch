const analyzeGame = require('./analyzeGame');
const baseStatSet = require('./baseStatSet');
const finalizeStats = require('./finalizeStats');

module.exports = games => {
	const stats = {
		all: () => true,
		losers: (player, players) => player.score === Math.min(...players.map(p => p.score)),
		winners: (player, players) => player.score === Math.max(...players.map(p => p.score)),
	};
	Object.keys(stats).forEach(key => stats[key] = {
		includes: stats[key],
		stats: baseStatSet(),
	});

	games.forEach(game => analyzeGame(game, stats));

	Object.keys(stats).forEach(key => finalizeStats(stats[key].stats, games));

	return stats;
};
