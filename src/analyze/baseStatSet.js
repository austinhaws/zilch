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
	// rolled 6 dice and zilched!
	all6DiceZilch: 0,
	// how many dice were rolled with each roll
	numberDicePerRoll: [],
	traitCounts: [],
	traitRanks: {},

	averageAll6DiceZilch: undefined,
	averageNumberDicePerRoll: undefined,
	averageRoll6Dice: undefined,
	averageRolls: undefined,
	averageScores: undefined,
	// pointer to game/player that had lowest score
	lowest: undefined,
	// pointer to game/player that had highest score
	highest: undefined,
});
