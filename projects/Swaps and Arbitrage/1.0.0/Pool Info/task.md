## Pool Info

To make the rest of this tutorial easier, we're going to start by building a function that will return info about a given pool. Each pool that we will be dealing with will be purely ETH/DAI. 

From the `poolInfo` function an object should be returned with the following properties:

- `daiWeight` - the denormalized weight of the DAI token in the pool
- `wethWeight` - the denormalized weight of the WETH token in the pool
- `daiBalance` - the total balance of DAI in the pool
- `wethBalance` - the total balance of WETH in the pool
- `swapFee` - a fee for each trade given to the LPs

Use the `BPool` interface to find the appropriate methods to retrieve these properties.