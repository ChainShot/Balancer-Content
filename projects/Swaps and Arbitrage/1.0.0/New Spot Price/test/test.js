const { assert } = require("chai");
const calculateNewSpotPrice = require('../calculateNewSpotPrice');
const poolAddress = "0x53b89ce35928dda346c574d9105a5479cb87231c";
const { formatEther, parseEther } = ethers.utils;
const cases = [
    [parseEther("1000"), "1560051308255514187863"],
    [parseEther("500"), "1554625484848651195979"],
    [parseEther("9900"), "1658863898126708125047"]
];
describe('calculateNewSpotPrice', function () {
    let pool;
    before(async () => {
        pool = await ethers.getContractAt("BPool", poolAddress);
    });

    cases.forEach(([daiIn, wethPrice]) => {
        it(`a swap in of ${formatEther(daiIn)} DAI should change the WETH price to ${formatEther(wethPrice)} DAI`, async () => {
            const actualWethPrice = await calculateNewSpotPrice(pool, daiIn);
            assert.equal(actualWethPrice.toString(), wethPrice.toString());
        });
    });
});
