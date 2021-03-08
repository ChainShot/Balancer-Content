## Arbitrage 

When there is a difference in price for an asset between two pools containing significant liquidity, it will often open up an arbitrage opportunity. In this stage, execute upon an arbitrage opportunity, without taking into consideration to gas costs. 

There are four contracts passed into the function. Each one is connected to a `signer` which holds 150k DAI and 100 Ether. Use these funds to execute on arbitrage on the two pools passed in. 

Your resulting DAI and WETH should both be _at least_ the original balance. While one or the other should be above the original balance.