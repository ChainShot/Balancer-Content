const poolInfo = require('./poolInfo');
/**
 * @param {Contract} pool A Contract pointed at a Balancer Pool (BPool)
 * @param {Bignumber} daiAmountIn The amount of Dai to swap into the pool
 */
async function calculateOut(pool, daiAmountIn) {
    const { daiWeight, wethWeight, daiBalance, wethBalance, swapFee } = await poolInfo(pool);
    return pool.calcOutGivenIn(
        daiBalance,
        daiWeight,
        wethBalance,
        wethWeight,
        daiAmountIn,
        swapFee
    );
}

module.exports = calculateOut;