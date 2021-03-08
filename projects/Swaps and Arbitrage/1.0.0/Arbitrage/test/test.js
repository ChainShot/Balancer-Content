const { assert } = require("chai");
const execute = require('../arbitrage');
const getToken = require('./getToken');
const pool1Address = "0x7afe74ae3c19f070c109a38c286684256adc656c";
const pool2Address = "0x53b89ce35928dda346c574d9105a5479cb87231c";

describe('Trader', function () {
    const wethBalance = ethers.utils.parseEther("100");
    const daiBalance = ethers.utils.parseEther("150000");
    let weth, dai;
    let account1;
    beforeEach(async () => {
        account1 = (await ethers.provider.listAccounts())[0];
        weth = await getToken("weth", wethBalance, [account1]);
        dai = await getToken("dai", daiBalance, [account1]);

        const pool1 = await ethers.getContractAt("BPool", pool1Address);
        const pool2 = await ethers.getContractAt("BPool", pool2Address);
        await execute(pool1, pool2, dai, weth);
    });

    it('should make profit', async () => {
        const newWethBalance = await weth.balanceOf(account1);
        const newDaiBalance = await dai.balanceOf(account1);
        const wethDiff = newWethBalance.sub(wethBalance);
        const daiDiff = newDaiBalance.sub(daiBalance);

        assert(wethDiff.gte(0), "Should not lose any WETH");
        assert(daiDiff.gte(0), "Should not lose any DAI");
        assert(wethDiff.gt(0) || daiDiff.gt(0), "A profit should be made");

        console.log(`Profit in Dai: ${ethers.utils.formatEther(daiDiff)}`);
        console.log(`Profit in Weth: ${ethers.utils.formatEther(wethDiff)}`);
    });
});
