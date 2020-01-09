const Test = require('../../src/cw-2')();
const engine = require('../../src/engine');

Test.setGlobalOptions({
	hideSuccess: true,
	hideTiming: true,
	hideTitles: true,
});

Test.describe('kept in rolls', _ => {
	Test.it("in", () => {
		Test.assertSimilar(engine.checkKeptInRolls([1], [1, 2, 3, 4, 5, 6]), {1: 1});
		Test.assertSimilar(engine.checkKeptInRolls([1, 2], [1, 2, 3, 4, 5, 6]), {1: 1, 2: 1});
		Test.assertSimilar(engine.checkKeptInRolls([1, 2, 3], [1, 2, 3, 4, 5, 6]), {1: 1, 2: 1, 3: 1});
		Test.assertSimilar(engine.checkKeptInRolls([1, 2, 3, 4], [1, 2, 3, 4, 5, 6]), {1: 1, 2: 1, 3: 1, 4: 1});
		Test.assertSimilar(engine.checkKeptInRolls([1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6]), {1: 1, 2: 1, 3: 1, 4: 1, 5: 1});
		Test.assertSimilar(engine.checkKeptInRolls([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]), {1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1});
		Test.assertSimilar(engine.checkKeptInRolls([1, 1, 1, 1, 2], [1, 1, 1, 1, 2, 1]), {1: 4, 2: 1});
		Test.assertSimilar(engine.checkKeptInRolls([1, 1, 1, 2], [1, 1, 1, 1, 2, 1]), {1: 3, 2: 1});
		Test.assertSimilar(engine.checkKeptInRolls([1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]), {1: 6});
		Test.assertSimilar(engine.checkKeptInRolls([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]), {1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1});
	});

	Test.it("not in", _ => {
		Test.assertSimilar(engine.checkKeptInRolls([1], [2, 2, 3, 4, 5, 6]), undefined);
		Test.assertSimilar(engine.checkKeptInRolls([1, 2, 3, 4, 5, 6], [2, 2, 3, 4, 5, 6]), undefined);
		Test.assertSimilar(engine.checkKeptInRolls([1, 1], [1, 2, 3, 4, 5, 6]), undefined);
		Test.assertSimilar(engine.checkKeptInRolls([1, 1, 2, 2, 3, 3], [1, 1, 2, 2, 3, 6]), undefined);
		Test.assertSimilar(engine.checkKeptInRolls([1, 2, 3, 3], [1, 1, 2, 2, 3, 6]), undefined);
		Test.assertSimilar(engine.checkKeptInRolls([3, 3], [1, 1, 2, 2, 3, 6]), undefined);
	});
});