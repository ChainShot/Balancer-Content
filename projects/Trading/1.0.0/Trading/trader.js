const ethers = require('hardhat').ethers;
const pools = [
    "0x7afe74ae3c19f070c109a38c286684256adc656c",
    "0x53b89ce35928dda346c574d9105a5479cb87231c",
];

const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

async function poolInfo(pool) {
    const daiWeight = await pool.getDenormalizedWeight(daiAddress);
    const wethWeight = await pool.getDenormalizedWeight(wethAddress);
    const daiBalance = await pool.getBalance(daiAddress);
    const wethBalance = await pool.getBalance(wethAddress);
    const swapFee = await pool.getSwapFee();
    return {
        daiWeight,
        wethWeight,
        daiBalance,
        wethBalance,
        swapFee
    }
}

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

async function calculateNewSpotPrice(pool, daiIn, wethOut) {
    const { daiWeight, wethWeight, daiBalance, wethBalance, swapFee } = await poolInfo(pool);
    const newDaiBalance = daiBalance.add(daiIn);
    const newWethBalance = wethBalance.sub(wethOut);
    return pool.calcSpotPrice(
        newDaiBalance,
        daiWeight,
        newWethBalance,
        wethWeight,
        swapFee
    );
}

async function execute() {
    const secondPool = await ethers.getContractAt("BPool", pools[1]);

    const daiAmountIn = ethers.utils.parseEther("3100");

    const wethOut = await calculateOut(secondPool, daiAmountIn);
    // const newSpotPrice = await calculateNewSpotPrice(secondPool, daiAmountIn, wethOut);

    // console.log(ethers.utils.formatEther(wethOut));
    // console.log(ethers.utils.formatEther(newSpotPrice));

    const dai = await ethers.getContractAt("IERC20", daiAddress);
    await dai.approve(secondPool.address, daiAmountIn);

    await secondPool.swapExactAmountIn(daiAddress, daiAmountIn, wethAddress, 0, ethers.constants.MaxUint256);

    const firstPool = await ethers.getContractAt("BPool", pools[0]);

    const weth = await ethers.getContractAt("IERC20", wethAddress);
    await weth.approve(firstPool.address, wethOut);
    await firstPool.swapExactAmountIn(wethAddress, wethOut, daiAddress, 0, ethers.constants.MaxUint256);
}

module.exports = execute;