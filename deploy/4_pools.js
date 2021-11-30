module.exports = async (hre) => {
    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    // Get relevant contracts
    factory_address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
    router_address = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
    weth_address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    tokenA_address = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
    tokenB_address = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

    factory = await hre.ethers.getContractAt("UniswapV2Factory", factory_address);
    router = await hre.ethers.getContractAt("UniswapV2Router02", router_address);
    weth = await hre.ethers.getContractAt("./third_party/canonical-weth/contracts/WETH9.sol:WETH9", weth_address);
    tokenA = await hre.ethers.getContractAt("ERC20PresetFixedSupply", tokenA_address);
    tokenB = await hre.ethers.getContractAt("ERC20PresetFixedSupply", tokenB_address);

    
    if (await router.factory()  != factory.address) {
       throw new Error("incorrect amounts")
    };
    if (await router.WETH()  != weth.address) {
       throw new Error("incorrect amounts")
    };

    // to check this satisfies uniswap format
    tokenA = await hre.ethers.getContractAt("UniswapV2ERC20", tokenA_address);
    tokenB = await hre.ethers.getContractAt("UniswapV2ERC20", tokenB_address);


    // Deploy pools A-WETH and B-WETH
    pairAWETH_tx_receipt = await factory.createPair(tokenA_address, weth_address);
    pairAWETHdata = factory.interface.decodeFunctionData("createPair", pairAWETH_tx_receipt.data);
    console.log("Token A - WETH pool:", pairAWETHdata[0], pairAWETHdata[1]); // Why do we have 2 addresses here?
    pair_address = await factory.allPairs(0);
    console.log("pairAWETH:" ,pair_address);
    pairA = await hre.ethers.getContractAt("UniswapV2Pair", pair_address);
    reserves = await pairA.getReserves();
    console.log("reserves:" ,reserves);

    pairBWETH_tx_receipt = await factory.createPair(tokenB_address, weth_address);
    pairBWETHdata = factory.interface.decodeFunctionData("createPair", pairBWETH_tx_receipt.data);
    console.log("Token B - WETH pool:", pairBWETHdata[0], pairBWETHdata[1]);
    pair_address = await factory.allPairs(1);
    console.log("pairBWETH:" ,pair_address);
    pairB = await hre.ethers.getContractAt("UniswapV2Pair", pair_address);
    reserves = await pairB.getReserves();
    console.log("reserves:" ,reserves);

    // Set the token allowances for the router contract
    ALLOWANCE = 10 ** 10;
    for (let i = 10; i < accounts.length; i++) {
      // weth
      res = weth.balanceOf(accounts[i].address)
      if (ALLOWANCE > res) {
        throw new Error("incorrect amounts")
      };
      await weth.connect(accounts[i]).approve(router_address, ALLOWANCE);
      weth_allowance = await weth.allowance(accounts[i].address, router_address)
      if (ALLOWANCE != weth_allowance) {
        throw new Error("incorrect amounts")
      };
      // tokenA
      res = tokenA.balanceOf(accounts[i].address)
      if (ALLOWANCE > res) {
        throw new Error("incorrect amounts")
      };
      await tokenA.connect(accounts[i]).approve(router_address, ALLOWANCE);
      tokenA_allowance = await tokenA.allowance(accounts[i].address, router_address)
      if (ALLOWANCE != tokenA_allowance) {
        throw new Error("incorrect amounts")
      };
      // tokenB
      res = tokenB.balanceOf(accounts[i].address)
      if (ALLOWANCE > res) {
        throw new Error("incorrect amounts")
      };
      await tokenB.connect(accounts[i]).approve(router_address, ALLOWANCE);
      tokenB_allowance = await tokenB.allowance(accounts[i].address, router_address)
      if (ALLOWANCE != tokenB_allowance) {
        throw new Error("incorrect amounts")
      };
      console.log("Router allowances for", accounts[i].address, "WETH:", weth_allowance.toString(), "Token A:", tokenA_allowance.toString(), "Token B:", tokenB_allowance.toString())
    }

    // Add liquidity
    amount_A = 10 ** 4
    min_amount_A = 10 ** 3
    amount_WETH = 10 ** 4
    amount_ETH = amount_WETH
    min_amount_WETH = 10 ** 3
    min_amount_ETH = min_amount_WETH
    deadline = Date.now() + 1000
    to_address = accounts[10].address;


    // sanity checks
    MINIMUM_LIQUIDITY = 10 ** 3
    if ((amount_A > ALLOWANCE) || (amount_WETH > ALLOWANCE) || (amount_A < MINIMUM_LIQUIDITY) || (amount_WETH < MINIMUM_LIQUIDITY)) {
      throw new Error("incorrect amounts")
    };

    router.connect(accounts[10]).addLiquidity(
      weth.address,
      tokenA.address,
      amount_A,
      amount_WETH,
      min_amount_A,
      min_amount_WETH,
      to_address,
      deadline
    );

    // Possible errors and resolutions:
    // TransferHelper::transferFrom: transferFrom failed > likely allowance or actual amount of tokens owned too low!
    // ds-math-sub-underflow > likely minimum liquidity undercut!
    // strange error with it claiming address is not a contract: https://github.com/Uniswap/v2-core/issues/102

    router.connect(accounts[10]).addLiquidityETH(
      tokenA.address,
      amount_A,
      min_amount_A,
      min_amount_ETH,
      to_address,
      deadline,
      {value: amount_ETH}
    );
  };