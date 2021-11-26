module.exports = async (hre) => {
    const accounts = await hre.ethers.getSigners();

    weth_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    router_address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

    router = await hre.ethers.getContractAt("UniswapV2Router02", router_address);
    factory = await hre.ethers.getContractAt("UniswapV2Factory", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
    tokenA = await hre.ethers.getContractAt("ERC20PresetFixedSupply", "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");
    tokenB = await hre.ethers.getContractAt("ERC20PresetFixedSupply", "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");

    // Deploy pools
    pairAWETH = await factory.createPair(accounts[0].address, weth_address);
    pairBWETH = await factory.createPair(accounts[2].address, weth_address);

    pairAWETHdata = factory.interface.decodeFunctionData("createPair", pairAWETH.data);
    pairBWETHdata = factory.interface.decodeFunctionData("createPair", pairBWETH.data);

    console.log("Token A - WETH pool:", pairAWETHdata[0], pairAWETHdata[1]);
    console.log("Token B - WETH pool:", pairBWETHdata[0], pairBWETHdata[1]);

    // Add liquidity
    // router.connect(accounts[10]).addLiquidity(tokenA.address, tokenB.address, 10, 5, 9, 4, accounts[10].address, Date.now() + 1000);

  };
  module.exports.tags = ['singleton', 'main-suite'];