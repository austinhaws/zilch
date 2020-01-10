const zilch = require('./zilch');
const engine = require('./engine');
const pass2Dice = require('./traits/pass2Dice');

zilch([
	engine.createPlayer({trait: pass2Dice, name: 'Buddy Rich'}),
	engine.createPlayer({trait: pass2Dice, name: 'Dave Weckl'}),
]);
