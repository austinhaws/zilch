module.exports = (n, nScore, dicePool) => {
	if (dicePool.sets.filter(set => set.number === n).length === 0) {
		const nCount = dicePool.rolls.filter(rollN => rollN === n).length;
		dicePool.rolls = dicePool.rolls.filter(rollN => rollN !== n);
		dicePool.kept.push(...Array.from({length: nCount}, () => n));
		dicePool.currentScore += nCount * nScore;
	}
};
