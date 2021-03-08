const calculateOut = require('./calculateOut');
const poolInfo = require('./poolInfo');

/**
 * @param {Contract} pool A Contract pointed at a BPool
 * @param {BigNumber} daiIn Amount of DAI to be swapped in
 */
async function calculateNewSpotPrice(pool, daiIn) {
    const { daiWeight, wethWeight, daiBalance, wethBalance, swapFee } = await poolInfo(pool);
    const newDaiBalance = daiBalance.add(daiIn);
    const wethOut = await calculateOut(pool, daiIn);
    const newWethBalance = wethBalance.sub(wethOut);
    return pool.calcSpotPrice(
        newDaiBalance,
        daiWeight,
        newWethBalance,
        wethWeight,
        swapFee
    );
}

module.exports = calculateNewSpotPrice;