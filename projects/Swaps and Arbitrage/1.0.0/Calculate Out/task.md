## Calculate Out

The Balancer Pool Smart contract inherits from `BPool` which contains several methods that will help us run calculations on swaps. Among those is the `calcOutGivenIn` method, [documented here](https://github.com/balancer-labs/balancer-core/blob/f4ed5d65362a8d6cec21662fb6eae233b0babc1f/contracts/BMath.sol#L45-L74). This formula will allow us to determine how much we will receive of a specific token **out** if we input a certain token amount **in**. 

Let's use this method to determine how WETH we will receive for inputting a certain amount of DAI for a given pool.