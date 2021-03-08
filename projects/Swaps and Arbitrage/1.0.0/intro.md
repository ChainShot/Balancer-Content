## Balancer Swaps 

In this tutorial we're going to take a look at swapping with balancer. We'll interact with two live mainnet balancer pools: [a 50/50 dai/weth pool](https://pools.balancer.exchange/#/pool/0x7afe74ae3c19f070c109a38c286684256adc656c/) and [a 70/30 dai/weth pool](0x53b89ce35928dda346c574d9105a5479cb87231c). 

Often times, the prices of one asset relative to the other is different across many balancer pools with the same assets. We're going to take a look at some of the calculations performed to determine the relative asset pricing and how we can determine an arbitrage situation.