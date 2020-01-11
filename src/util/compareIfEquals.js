module.exports = (cmp, ifEquals) => (a, b) => {
	let result = cmp(a, b);
	return result || ifEquals(a, b);
};
