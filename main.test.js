const {randomValueByWeight} = require('./main');

describe('Testing randomValueByWeight function', () => {
    test('Validate iterable random results', () => {
        const values = [['A'], ['B'], ['C'], ['D']];
        const weights = [[1], [2], [3], [4]];
        const seed = 12345;

        ['A', 'B', 'D', 'C'].forEach((v, i) => {
            expect(randomValueByWeight(values, weights, seed, i)).toBe(v);
        });
    });

    test('Validate same iteration results', () => {
        const values = [['A'], ['B'], ['C'], ['D']];
        const weights = [[1], [2], [3], [4]];
        const seed = 123;

        expect(randomValueByWeight(values, weights, seed, 100)).toBe('C');
        expect(randomValueByWeight(values, weights, seed, 100)).toBe('C');
        expect(randomValueByWeight(values, weights, seed, 100)).toBe('C');
    });

    test('Validate different length of values and weights', () => {
        const values = [['A'], ['B'], ['C'], ['D']];
        const weights = [[1], [2], [3]];
        const seed = 413;

        expect(() => randomValueByWeight(values, weights, seed, 100)).toThrow(Error('Values and weights must have the same length.'));
    });

    test('Test empty seed and iter', () => {
        const values = [['A'], ['B'], ['C'], ['D']];
        const weights = [[1], [2], [3], [4]];

        expect(randomValueByWeight(values, weights)).toBe('A');
    });
});
