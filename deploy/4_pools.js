module.exports = async (hre) => {
    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    // Get relevant contracts
    factory_address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    router_address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
    weth_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    tokenA_address = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
    tokenB_address = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

    factory = await hre.ethers.getContractAt("UniswapV2Factory", factory_address);
    router = await hre.ethers.getContractAt("UniswapV2Router02", router_address);
    weth = await hre.ethers.getContractAt("./third_party/canonical-weth/contracts/WETH9.sol:WETH9", weth_address);
    tokenA = await hre.ethers.getContractAt("ERC20PresetFixedSupply", tokenA_address);
    tokenB = await hre.ethers.getContractAt("ERC20PresetFixedSupply", tokenB_address);

    // Deploy pools A-WETH and B-WETH
    pairAWETH = await factory.createPair(accounts[0].address, weth_address);
    pairAWETHdata = factory.interface.decodeFunctionData("createPair", pairAWETH.data);
    console.log("Token A - WETH pool:", pairAWETHdata[0], pairAWETHdata[1]);

    pairBWETH = await factory.createPair(accounts[2].address, weth_address);
    pairBWETHdata = factory.interface.decodeFunctionData("createPair", pairBWETH.data);
    console.log("Token B - WETH pool:", pairBWETHdata[0], pairBWETHdata[1]);

    // Set the token allowances for the router contract
    await weth.connect(accounts[10]).approve(router_address, 1000000);
    await tokenA.connect(accounts[10]).approve(router_address, 1000000);
    await tokenB.connect(accounts[10]).approve(router_address, 1000000);

    // await coin.approve(router_address, constants.MaxUint256);

    // Add liquidity
    amount_A = 10
    min_amount_A = 9
    amount_WETH = 5
    min_amount_WETH = 4
    deadline = Date.now() + 1000
    trader_address_index = accounts[10].address
    to_address = accounts[10].address;

    // router.connect(accounts[10]).addLiquidity(
    //   tokenA_address,
    //   weth_address,
    //   amount_A,
    //   amount_WETH,
    //   min_amount_A,
    //   min_amount_WETH,
    //   to_address,
    //   deadline
    // );

    // router.connect(accounts[10]).addLiquidityETH(
    //   tokenA_address,
    //   amount_A,
    //   min_amount_A,
    //   min_amount_WETH,
    //   to_address,
    //   deadline
    // );
  };