const { assert } = require("chai");
const calculateOut = require('../calculateOut');
const poolAddress = "0x7afe74ae3c19f070c109a38c286684256adc656c";
const {formatEther, parseEther} = ethers.utils;
const cases = [
    [parseEther("1000"), "631488374115339848"],
    [parseEther("500"), "315754155790619434"],
    [parseEther("9900"), "6248223607655776808"]
];
describe('calculateOut', function () {
    let pool;
    before(async () => {
        pool = await ethers.getContractAt("BPool", poolAddress);
    });

    cases.forEach(([daiIn, wethOut]) => {
        it(`should calculateOut ${formatEther(wethOut)} WETH for ${formatEther(daiIn)} DAI`, async () => {
            const actualWethOut = await calculateOut(pool, daiIn);
            assert.equal(actualWethOut.toString(), wethOut.toString());
        });
    });
});
