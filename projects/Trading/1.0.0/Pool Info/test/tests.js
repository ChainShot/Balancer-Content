const { assert } = require("chai");
const poolInfo = require('../poolInfo');
const pool1Data = {
    address: "0x7afe74ae3c19f070c109a38c286684256adc656c",
    daiBalance: "15812471786111339324011532",
    wethBalance: "10001024176362212821293",
    swapFee: ethers.utils.parseEther(".0015")
}
const pool2Data = {
    address: "0x53b89ce35928dda346c574d9105a5479cb87231c",
    daiBalance: "475950247478863055763551",
    wethBalance: "132327647140704723809",
    swapFee: ethers.utils.parseEther(".005")
}
const keys = ["daiWeight", "wethWeight", "daiBalance", "wethBalance", "swapFee"];
describe('poolInfo', function () {
    let pool1, pool2;
    before(async () => {
        pool1 = await ethers.getContractAt("BPool", pool1Data.address);
        pool2 = await ethers.getContractAt("BPool", pool2Data.address);
    });

    it('should provide info about a 50/50 dai/weth pool', async () => {
        const info = await poolInfo(pool1);
        keys.forEach(key => {
            assert(info[key], `Expected ${key} to be defined!`);
        });
        assert.equal(info.daiWeight.toString(), ethers.utils.parseEther("25").toString(), "expected a denormalized weight for dai");
        assert.equal(info.wethWeight.toString(), ethers.utils.parseEther("25").toString(), "expected a denormalized weight for weth");
        assert.equal(info.daiBalance.toString(), pool1Data.daiBalance.toString(), "expected to see the proper dai balance");
        assert.equal(info.wethBalance.toString(), pool1Data.wethBalance.toString(), "expected to see the proper weth balance");
        assert.equal(info.swapFee.toString(), pool1Data.swapFee.toString(), "expected to see the proper swap fee");
    });

    it('should provide info about a 70/30 dai/weth pool', async () => {
        const info = await poolInfo(pool2);
        keys.forEach(key => {
            assert(info[key], `Expected ${key} to be defined!`);
        });
        assert.equal(info.daiWeight.toString(), ethers.utils.parseEther("7").toString(), "expected a denormalized weight for dai");
        assert.equal(info.wethWeight.toString(), ethers.utils.parseEther("3").toString(), "expected a denormalized weight for weth");
        assert.equal(info.daiBalance.toString(), pool2Data.daiBalance.toString(), "expected to see the proper dai balance");
        assert.equal(info.wethBalance.toString(), pool2Data.wethBalance.toString(), "expected to see the proper weth balance");
        assert.equal(info.swapFee.toString(), pool2Data.swapFee.toString(), "expected to see the proper swap fee");
    });
});
