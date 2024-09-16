/**
 * Get random value from list, based on the seed provided.
 *
 * @param {[[string]]} values
 * @param {[[string]]} weights
 * @param {number} seed.
 * @param {number} iter.
 * @return The random value.
 * @customfunction
 */
function randomValueByWeight(values, weights, seed = 0, iter = 0) {
    if (values.length !== weights.length) {
        throw new Error('Values and weights must have the same length.');
    }

    let random = (function () {
        let a = 1, b = 1;
        return {
            nextInt: function () {
                a = (a * 67307) & 0xffff;
                b = (b * 67427) & 0xffff;
                return a ^ (b << 15);
            },
            reset(seed) {
                a = b = seed | 0;
            }
        };
    })();

    random.reset(seed);

    let randValue = seed;
    for (let i = 0; i < iter; i++) {
        randValue = random.nextInt();
    }
    randValue /= (2147483648 + 1);

    const size = weights.reduce((acc, v) => acc + v[0], 0);
    const randPosition = Math.floor(randValue * size);
    for (let i = 0, w = 0; i < weights.length; i++) {
        w += weights[i][0];
        if (randPosition < w) {
            return values[i][0];
        }
    }
    return values[values.length - 1][0];
}

module.exports = {
    randomValueByWeight
};
