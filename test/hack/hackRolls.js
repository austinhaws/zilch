const engine = require('../../src/engine');

let engineRoller = undefined;
let currentRollIdx = 0;

module.exports = useRolls => {
	// hack engine to use new roller
	if (!engineRoller) {
		engineRoller = engine.rollDie;
	}
	currentRollIdx = 0;
	engine.rollDie = () => currentRollIdx < useRolls.length ? useRolls[currentRollIdx++] : engineRoller();
}
;
