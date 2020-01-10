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

	createDicePool: () => ({
		// what has been rolled
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
// console.log('before reset', {dicePool});
		const {rolls, rollNumberCounts, sets, isZilched} = engine.createDicePool();
		Object.assign(dicePool, {rolls, rollNumberCounts, sets, isZilched});
// console.log('after reset', {dicePool});

		const diceToRoll = dicePool.isZilched ? NUMBER_DICE : (NUMBER_DICE - dicePool.kept.length);

		if (dicePool.isZilched) {
			dicePool.currentScore = 0;
		}
		if (diceToRoll === 6) {
			dicePool.kept = engine.createDicePool().kept;
		}
		dicePool.isZilched = false;

		dicePool.rolls = Array.from({length: diceToRoll}, () => engine.rollDie());
		engine.analyizeDicePool(dicePool);
		return dicePool.isZilched;
	},

	takeTurn: (players, dicePool) => {
		let playerPassed = false;
		while (!playerPassed && !engine.rollDicePool(dicePool)) {
			if (dicePool.rolls.length === NUMBER_DICE) {
				players[0].timesRoll6Dice++;
			}
// console.log('before analyze', {dicePool, currentPlayer: players[0].name});
			playerPassed = players[0].trait.analyze(dicePool, players);
			players[0].numberRolls++;
// console.log('aft3er analyze', {dicePool, playerPassed});
		}
		if (dicePool.isZilched) {
			players[0].numberZilches++;
		}
		players[0][dicePool.isZilched ? 'zilchedScore' : 'score'] += dicePool.currentScore;
	},

	zilched: dicePool => dicePool.rolls.every(n => n !== 1 && n !== 5) && !dicePool.sets.length,
};

module.exports = engine;