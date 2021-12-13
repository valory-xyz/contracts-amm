const globals = require("../globals/globals.js");

module.exports = async (hre) => {
    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    // Get relevant contracts
    const routerAddress = globals.contractMap.get(globals.routerContractName);
    const router = await hre.ethers.getContractAt(globals.routerContractName, routerAddress);
    const factoryAddress = globals.contractMap.get(globals.factoryContractName);
    const factory = await hre.ethers.getContractAt(globals.factoryContractName, factoryAddress);
    const wethAddress = globals.contractMap.get(globals.wethContractName);
    const weth = await hre.ethers.getContractAt(globals.wethContractName, wethAddress);
    const tokenAAddress = globals.tokenMap.get(globals.tokenList[0]);
    const tokenBAddress = globals.tokenMap.get(globals.tokenList[1]);

    if (await router.factory() != factory.address) {
        throw new Error("incorrect amounts");
    }
    if (await router.WETH() != weth.address) {
        throw new Error("incorrect amounts");
    }

    // to check this satisfies uniswap format
    const tokenA = await hre.ethers.getContractAt("UniswapV2ERC20", tokenAAddress);
    const tokenB = await hre.ethers.getContractAt("UniswapV2ERC20", tokenBAddress);

    // Deploy pools A-WETH and B-WETH and A-B
    const pairAWETHtxReceipt = await factory.createPair(tokenAAddress, wethAddress);
    const pairAWETHdata = factory.interface.decodeFunctionData("createPair", pairAWETHtxReceipt.data);
    console.log("Token A - WETH pool:", pairAWETHdata[0], pairAWETHdata[1]); // Why do we have 2 addresses here?
    let pairAddress = await factory.allPairs(0);
    console.log("Pair A - WETH address:", pairAddress);
    const pairAWETH = await hre.ethers.getContractAt("UniswapV2Pair", pairAddress);
    let reserves = await pairAWETH.getReserves();
    console.log("Pair A - WETH reserves:", reserves.toString());

    const pairBWETHtxReceipt = await factory.createPair(tokenBAddress, wethAddress);
    const pairBWETHdata = factory.interface.decodeFunctionData("createPair", pairBWETHtxReceipt.data);
    console.log("Token B - WETH pool:", pairBWETHdata[0], pairBWETHdata[1]);
    pairAddress = await factory.allPairs(1);
    console.log("Pair B - WETH:", pairAddress);
    const pairBWETH = await hre.ethers.getContractAt("UniswapV2Pair", pairAddress);
    reserves = await pairBWETH.getReserves();
    console.log("Pair B - WETH reserves:", reserves.toString());

    const pairABtxReceipt = await factory.createPair(tokenAAddress, tokenBAddress);
    const pairABdata = factory.interface.decodeFunctionData("createPair", pairABtxReceipt.data);
    console.log("Token A - Token B pool:", pairABdata[0], pairABdata[1]);
    pairAddress = await factory.allPairs(2);
    console.log("Pair A - B:", pairAddress);
    const pairAB = await hre.ethers.getContractAt("UniswapV2Pair", pairAddress);
    reserves = await pairAB.getReserves();
    console.log("Pair A - B reserves:", reserves.toString());

    // Set the token allowances for the router contract
    const ALLOWANCE = 10 ** 10;
    const contracts = [weth, tokenA, tokenB];
    for (let i = 10; i < accounts.length; i++) {
        let contractAllowances = new Array();
        for (let j = 0; j < contracts.length; j++) {
            const res = contracts[j].balanceOf(accounts[i].address);
            if (ALLOWANCE > res) {
                throw new Error("incorrect amounts for contract " + contracts[j].name);
            }
            await contracts[j].connect(accounts[i]).approve(routerAddress, ALLOWANCE);
            const contractAllowance = await contracts[j].allowance(accounts[i].address, routerAddress);
            if (ALLOWANCE != contractAllowance) {
                throw new Error("incorrect amounts");
            }
            contractAllowances.push(contractAllowance);
        }
        console.log("Router allowances for", accounts[i].address, "WETH:", contractAllowances[0].toString(),
            "Token A:", contractAllowances[1].toString(), "Token B:", contractAllowances[2].toString());
    }

    // Add liquidity
    const amountA = 10 ** 8;
    const amountB = 10 ** 8;
    const minAmountA = 10 ** 7;
    const minAmountB = 10 ** 7;
    const amountWETH = 10 ** 8;
    const amountETH = amountWETH;
    const minAmountWETH = 10 ** 7;
    const minAmountETH = minAmountWETH;
    const deadline = Date.now() + 1000;
    const toAddress = accounts[10].address;

    // sanity checks
    const MINIMUM_LIQUIDITY = 10 ** 3;
    if ((amountA > ALLOWANCE) || (amountWETH > ALLOWANCE) || (amountA < MINIMUM_LIQUIDITY) || (amountWETH < MINIMUM_LIQUIDITY)) {
        throw new Error("incorrect amounts");
    }

    router.connect(accounts[10]).addLiquidity(
        weth.address,
        tokenA.address,
        amountWETH,
        amountA,
        minAmountWETH,
        minAmountA,
        toAddress,
        deadline
    );

    reserves = await pairAWETH.getReserves();
    console.log("Pair A - WETH reserves:", reserves.toString());
    let reservesArr = reserves.toString().split(",");
    if (reservesArr[0] != amountA || reservesArr[1] != amountWETH) {
        throw new Error("Pair A - WETH reserves are not correct");
    }

    router.connect(accounts[10]).addLiquidity(
        weth.address,
        tokenB.address,
        amountWETH,
        amountB,
        minAmountWETH,
        minAmountB,
        toAddress,
        deadline
    );

    reserves = await pairBWETH.getReserves();
    console.log("Pair B - WETH reserves:", reserves.toString());
    reservesArr = reserves.toString().split(",");
    if (reservesArr[0] != amountA || reservesArr[1] != amountWETH) {
        throw new Error("Pair B - WETH reserves are not correct");
    }

    router.connect(accounts[10]).addLiquidity(
        tokenA.address,
        tokenB.address,
        amountA,
        amountB,
        minAmountA,
        minAmountB,
        toAddress,
        deadline
    );

    reserves = await pairAB.getReserves();
    console.log("Pair A - B reserves:", reserves.toString());
    reservesArr = reserves.toString().split(",");
    if (reservesArr[0] != amountA || reservesArr[1] != amountB) {
        throw new Error("Pair A - B reserves are not correct");
    }

    // Possible errors and resolutions:
    // TransferHelper::transferFrom: transferFrom failed > likely allowance or actual amount of tokens owned too low!
    // ds-math-sub-underflow > likely minimum liquidity undercut!
    // strange error with it claiming address is not a contract: https://github.com/Uniswap/v2-core/issues/102

    router.connect(accounts[10]).addLiquidityETH(
        tokenA.address,
        amountA,
        minAmountA,
        minAmountETH,
        toAddress,
        deadline,
        {value: amountETH}
    );
};