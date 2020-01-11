const Test = require('../../src/cw-2')();
const threshhold = require('../../src/traits/threshhold');
const runTest = require('../util/runTest');

Test.setGlobalOptions({
	hideSuccess: true,
	hideTiming: true,
	hideTitles: true,
});

Test.describe('No Sets', _ => {
	Test.it("100 threshhold", () => {
		runTest(threshhold, [100], [5, 3, 2, 2, 3, 6], 50, 1, false);
		runTest(threshhold, [100], [5, 5, 2, 2, 3, 6], 100, 2, true);
	});

	Test.it('1000 threshhold', () => {
		runTest(threshhold, [1000], [5, 5, 5, 1, 1, 4], 700, 5, false);
		runTest(threshhold, [1000], [5, 5, 5, 5, 4, 4], 1000, 4, true);
		runTest(threshhold, [1000], [3, 3, 3, 5, 3, 3], 1250, 6, true);
	})
});
