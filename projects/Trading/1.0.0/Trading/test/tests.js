const { assert } = require("chai");
const execute = require('../trader');
const getToken = require('./getToken');
describe('Trader', function () {
    beforeEach(async () => {
        const account1 = (await ethers.provider.listAccounts())[0];
        await getToken("weth", ethers.utils.parseEther("100"), [account1]);
        await getToken("dai", ethers.utils.parseEther("150000"), [account1]);
        await execute();
    });

    it('should make profit', async () => {
        
    });
});
