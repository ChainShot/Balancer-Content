const calculateNewSpotPrice = require('./calculateNewSpotPrice');
const calculateOut = require('./calculateOut');
const poolInfo = require('./poolInfo');

/**
 * @param {Contract} pool1 A Contract pointed at a BPool
 * @param {Contract} pool2 A Contract pointed at a BPool
 * @param {Contract} dai A Contract pointed at the DAI token
 * @param {Contract} weth A Contract pointed at the WETH token
 */
async function execute(pool1, pool2, dai, weth) {
    const daiAmountIn = ethers.utils.parseEther("3100");

    const wethOut = await calculateOut(pool2, daiAmountIn);

    await dai.approve(pool2.address, daiAmountIn);
    await pool2.swapExactAmountIn(dai.address, daiAmountIn, weth.address, 0, ethers.constants.MaxUint256);

    await weth.approve(pool1.address, wethOut);
    await pool1.swapExactAmountIn(weth.address, wethOut, dai.address, 0, ethers.constants.MaxUint256);
}

module.exports = execute;