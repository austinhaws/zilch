module.exports = () => ({
	// how many players in this category
	totalPlayers: 0,
	// how many points gained for all players of all games
	totalScores: 0,
	// how many rolls did players make
	totalRolls: 0,
	// how many zilches did players get
	numberZilches: 0,
	timesRoll6Dice: 0,

	averageRoll6Dice: undefined,
	averageRolls: undefined,
	averageScores: undefined,
	// pointer to game/player that had lowest score
	lowest: undefined,
	// pointer to game/player that had highest score
	highest: undefined,
});
