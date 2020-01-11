const compareIfEquals = require('./compareIfEquals');
const logger = require('./log');

const NUMBER_DICE = 6;
const engine = {

	checkKeptInRolls: (kept, rolls) => {
		const keptDiceCounts = engine.countRollNumbers(kept);
		const dicePoolCounts = engine.countRollNumbers(rolls);
		return (Object.keys(keptDiceCounts).every(keptN => dicePoolCounts[keptN] >= keptDiceCounts[keptN])) ?
			keptDiceCounts :
			undefined;
	},

	scoreKeptDice: (keptDice, dicePool) => {
		// make sure kept dice exist in dicepool.roll
		const keptDiceCounts = engine.checkKeptInRolls(keptDice, dicePool.rolls);
		if (keptDiceCounts === undefined) {
			console.error({keptDice, rolls: dicePool.rolls});
			throw 'taken rolls not in rolled rolls';
		}

		// make sure the kept dice all score
		// get score of those dice
		return Object.keys(keptDiceCounts).map(Number).reduce((score, n) => {
			if (keptDiceCounts[n] >= 3) {
				score += engine.scoreSet({number: n, count: keptDiceCounts[n]});
			} else if (n === 1) {
				score += 100 * keptDiceCounts[n];
			} else if (n === 5) {
				score += 50 * keptDiceCounts[n];
			} else {
				throw `Can not score ${n} (${keptDiceCounts[n]})`;
			}
			return score;
		}, 0);
	},

	countRollNumbers: numbers => numbers.reduce((counts, roll) => {
			counts[roll] = (counts[roll] || 0) + 1;
			return counts;
		}, {}),

	analyizeDicePool: dicePool => {
		dicePool.rollNumberCounts = engine.countRollNumbers(dicePool.rolls);

		dicePool.sets = Object.keys(dicePool.rollNumberCounts).reduce((sets, number) => {
			if (dicePool.rollNumberCounts[number] >= 3) {
				sets.push({number: Number(number), count: dicePool.rollNumberCounts[number]});
			}
			return sets;
		}, []);
		dicePool.sets.sort(compareIfEquals((a, b) => b.count - a.count, (a, b) => b.number - a.number));
		dicePool.isZilched = engine.zilched(dicePool);
	},
	scoreSet: set => (set.number === 1 ? 1000 : set.number * 100) * (set.count > 3 ? Math.pow(2, set.count - 3) : 1),
	createPlayer: ({trait, name, turnOrder}) => ({
		trait,
		name,
		timesRoll6Dice: 0,
		turnOrder,
		numberRolls: 0,
		numberZilches: 0,
		score: 0,
		zilchedScore: 0,
	}),
	hasWinner: players => players.some(player => player.score >= 10000),
	rollDie: () => Math.floor(Math.random() * 6) + 1,

	createDicePoolDie: () => ({locked: false, value: undefined}),

	createDicePool: () => ({
		// what has been rolled
		dice: Array.from({length: 6}, engine.createDicePoolDie),
		rolls: undefined,
		// for checking for sets: {number: count}
		rollNumberCounts: undefined,
		sets: [],
		// what rolls were kept
		kept: [],
		// what the current total is
		currentScore: 0,
		// is the last roll a zilch
		isZilched: false,
	}),

	// returns false if the pool zilched
	rollDicePool: dicePool => {
		// unlock all dice (will relock with kepts)
		dicePool.dice.forEach(die => die.locked = false);
		// clear kepts if rolling all 6 or zilched
		if (dicePool.isZilched) {
			dicePool.currentScore = 0;
		}
		if (dicePool.kept.length === 6 || dicePool.isZilched) {
			dicePool.kept = [];
		}
// console.log('after reset', {dicePool: JSON.stringify(dicePool, null, 4)});

		// reset dice pool defaults
		const {rolls, rollNumberCounts, sets, isZilched} = engine.createDicePool();
		Object.assign(dicePool, {rolls, rollNumberCounts, sets, isZilched});

		// lock kept dice
		dicePool.kept.forEach(n => dicePool.dice.filter(die => !die.locked && die.value === n)[0].locked = true);
// console.log('after reset', {dicePool: JSON.stringify(dicePool, null, 4)});
		const diceToRoll = dicePool.dice.filter(die => !die.locked).length;

		if (dicePool.isZilched) {
			dicePool.currentScore = 0;
		}
		if (diceToRoll === 6) {
			dicePool.kept = engine.createDicePool().kept;
		}

		// roll unlocked dice
		dicePool.rolls = dicePool.dice.filter(dice => !dice.locked).map(dice => dice.value = engine.rollDie());
// console.log('after reset', {dicePool: JSON.stringify(dicePool, null, 4)});

		engine.analyizeDicePool(dicePool);
		return dicePool.isZilched;
	},

	outputTurn: (players, dicePool, rolled, playerPassed) => {
		const output = [`${players[0].name} rolled ${rolled.join(' ')} and `];
		if (dicePool.isZilched) {
			output.push(`zilched a score of ${dicePool.currentScore}`);
		} else {
			output.push(`kept ${dicePool.kept.join(' ')} and `);
			if (playerPassed) {
				output.push(`passed with `);
			} else {
				output.push(`current `);
			}
			output.push(`score of ${dicePool.currentScore}`);
		}
		// Player 1 rolled 1 2 4 3 5 2 and kept 1 with current score of 100
		// Player 1 rolled 2 4 3 3 5 and kept 5 and passed with score of 150
		// Player 1 rolled 244332 and zilched a score of 400
		console.log(output.join(''));
		if (dicePool.isZilched || playerPassed) {
			console.log(`*** ${dicePool.isZilched ? 'ZILCHED' : 'PASSED'} current score: ${players[0].score + (dicePool.isZilched ? 0 : dicePool.currentScore)}`);
		}
		if (dicePool.isZilched) {
			console.log('');
		}
	},

	takeTurn: (players, dicePool, showOutput) => {
		let playerPassed = false;
		let dicePoolZilched = false;
		while (!playerPassed && !dicePoolZilched) {
			players[0].numberRolls++;
			engine.rollDicePool(dicePool);
			dicePoolZilched = dicePool.isZilched;
			if (dicePool.rolls.length === NUMBER_DICE) {
				players[0].timesRoll6Dice++;
			}
			const rolled = [...dicePool.rolls];
			if (!dicePoolZilched) {
				playerPassed = players[0].trait.analyze(dicePool, players);
			}
			engine.outputTurn(players, dicePool, rolled, playerPassed);
		}
if (dicePool.isZilched && dicePool.rolls.length === 6) {
	console.log('*** full 6 dice zilch!');
	players[0].all6DiceZilch++;
}
		if (dicePool.isZilched) {
			players[0].numberZilches++;
		}
		players[0][dicePool.isZilched ? 'zilchedScore' : 'score'] += dicePool.currentScore;
	},

	zilched: dicePool => dicePool.rolls.every(n => n !== 1 && n !== 5) && !dicePool.sets.length,
};

module.exports = engine;