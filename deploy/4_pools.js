const globals = require("../globals/globals.js");

module.exports = async (hre) => {
    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    // Get relevant contracts
    const router_address = globals.contract_map.get(globals.router_contract_name);
    router = await hre.ethers.getContractAt(globals.router_contract_name, router_address);
    const factory_address = globals.contract_map.get(globals.factory_contract_name);
    factory = await hre.ethers.getContractAt(globals.factory_contract_name, factory_address);
    const weth_address = globals.contract_map.get(globals.weth_contract_name);
    weth = await hre.ethers.getContractAt(globals.weth_contract_name, weth_address);
    const tokenA_address = globals.token_map.get(globals.token_list[0]);
    const tokenB_address = globals.token_map.get(globals.token_list[1]);

    if (await router.factory() != factory.address) {
        throw new Error("incorrect amounts");
    }
    if (await router.WETH() != weth.address) {
        throw new Error("incorrect amounts");
    }

    // to check this satisfies uniswap format
    tokenA = await hre.ethers.getContractAt("UniswapV2ERC20", tokenA_address);
    tokenB = await hre.ethers.getContractAt("UniswapV2ERC20", tokenB_address);

    // Deploy pools A-WETH and B-WETH and A-B
    pairAWETH_tx_receipt = await factory.createPair(tokenA_address, weth_address);
    pairAWETHdata = factory.interface.decodeFunctionData("createPair", pairAWETH_tx_receipt.data);
    console.log("Token A - WETH pool:", pairAWETHdata[0], pairAWETHdata[1]); // Why do we have 2 addresses here?
    pair_address = await factory.allPairs(0);
    console.log("Pair A - WETH address:", pair_address);
    pairAWETH = await hre.ethers.getContractAt("UniswapV2Pair", pair_address);
    reserves = await pairAWETH.getReserves();
    console.log("Pair A - WETH reserves:", reserves.toString());

    pairBWETH_tx_receipt = await factory.createPair(tokenB_address, weth_address);
    pairBWETHdata = factory.interface.decodeFunctionData("createPair", pairBWETH_tx_receipt.data);
    console.log("Token B - WETH pool:", pairBWETHdata[0], pairBWETHdata[1]);
    pair_address = await factory.allPairs(1);
    console.log("Pair B - WETH:", pair_address);
    pairBWETH = await hre.ethers.getContractAt("UniswapV2Pair", pair_address);
    reserves = await pairBWETH.getReserves();
    console.log("Pair B - WETH reserves:", reserves.toString());

    pairAB_tx_receipt = await factory.createPair(tokenA_address, tokenB_address);
    pairABdata = factory.interface.decodeFunctionData("createPair", pairAB_tx_receipt.data);
    console.log("Token A - Token B pool:", pairABdata[0], pairABdata[1]);
    pair_address = await factory.allPairs(2);
    console.log("Pair A - B:", pair_address);
    pairAB = await hre.ethers.getContractAt("UniswapV2Pair", pair_address);
    reserves = await pairAB.getReserves();
    console.log("Pair A - B reserves:", reserves.toString());

    // Set the token allowances for the router contract
    ALLOWANCE = 10 ** 10;
    const contracts = [weth, tokenA, tokenB];
    for (let i = 10; i < accounts.length; i++) {
        let contract_allowances = new Array();
        for (let j = 0; j < contracts.length; j++) {
            res = contracts[j].balanceOf(accounts[i].address);
            if (ALLOWANCE > res) {
                throw new Error("incorrect amounts for contract " + contracts[j].name);
            }
            await contracts[j].connect(accounts[i]).approve(router_address, ALLOWANCE);
            contract_allowance = await contracts[j].allowance(accounts[i].address, router_address);
            if (ALLOWANCE != contract_allowance) {
                throw new Error("incorrect amounts");
            }
            contract_allowances.push(contract_allowance);
        }
        console.log("Router allowances for", accounts[i].address, "WETH:", contract_allowances[0].toString(),
            "Token A:", contract_allowances[1].toString(), "Token B:", contract_allowances[2].toString());
    }

    // Add liquidity
    amount_A = 10 ** 8;
    amount_B = 10 ** 8;
    min_amount_A = 10 ** 7;
    min_amount_B = 10 ** 7;
    amount_WETH = 10 ** 8;
    amount_ETH = amount_WETH;
    min_amount_WETH = 10 ** 7;
    min_amount_ETH = min_amount_WETH;
    deadline = Date.now() + 1000;
    to_address = accounts[10].address;

    // sanity checks
    MINIMUM_LIQUIDITY = 10 ** 3;
    if ((amount_A > ALLOWANCE) || (amount_WETH > ALLOWANCE) || (amount_A < MINIMUM_LIQUIDITY) || (amount_WETH < MINIMUM_LIQUIDITY)) {
        throw new Error("incorrect amounts");
    }

    router.connect(accounts[10]).addLiquidity(
        weth.address,
        tokenA.address,
        amount_WETH,
        amount_A,
        min_amount_WETH,
        min_amount_A,
        to_address,
        deadline
    );

    reserves = await pairAWETH.getReserves();
    console.log("Pair A - WETH reserves:", reserves.toString());
    reserves_arr = reserves.toString().split(",");
    if (reserves_arr[0] != amount_A || reserves_arr[1] != amount_WETH) {
        throw new Error("Pair A - WETH reserves are not correct");
    }

    router.connect(accounts[10]).addLiquidity(
        weth.address,
        tokenB.address,
        amount_WETH,
        amount_B,
        min_amount_WETH,
        min_amount_B,
        to_address,
        deadline
    );

    reserves = await pairBWETH.getReserves();
    console.log("Pair B - WETH reserves:", reserves.toString());
    if (reserves_arr[0] != amount_A || reserves_arr[1] != amount_WETH) {
        throw new Error("Pair B - WETH reserves are not correct");
    }

    router.connect(accounts[10]).addLiquidity(
        tokenA.address,
        tokenB.address,
        amount_A,
        amount_B,
        min_amount_A,
        min_amount_B,
        to_address,
        deadline
    );

    reserves = await pairAB.getReserves();
    console.log("Pair A - B reserves:", reserves.toString());
    if (reserves_arr[0] != amount_A || reserves_arr[1] != amount_B) {
        throw new Error("Pair A - B reserves are not correct");
    }

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