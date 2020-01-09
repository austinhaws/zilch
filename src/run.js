const zilch = require('./zilch');
const engine = require('./engine');
const pass2Dice = require('./traits/pass2Dice');

zilch([
	engine.createPlayer(pass2Dice, 'Buddy Rich'),
	engine.createPlayer(pass2Dice, 'Dave Weckl'),
]);
