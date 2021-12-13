const globals = require("../globals/globals.js");

module.exports = async (hre) => {
    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    // Deploy tokens via ERC20PresetFixedSupply contract
    const tokens = globals.tokenList;
    let tokenInstances = new Array();
    for (let i = 0; i < tokens.length; i++) {
        const tokenInstance = await globals.deployToken(tokens[i], "ERC20PresetFixedSupply", accounts[i].address);
        console.log("Token", tokens[i].name, "deployed to:", tokenInstance.address);
        globals.tokenMap.set(tokens[i], tokenInstance.address);
        tokenInstances.push(tokenInstance);
    }

    // Distribute tokens to the trader accounts (the last 10 signers)
    for (let i = 10; i < accounts.length; i++) {
        for (let j = 0; j < tokens.length; j++) {
            await tokenInstances[j].connect(accounts[j]).transfer(accounts[i].address, 10 ** 10);
        }
    }

    // Wrap some ETH
    const wethAddress = globals.contractMap.get(globals.wethContractName);
    const weth = await hre.ethers.getContractAt(globals.wethContractName, wethAddress);
    for (let i = 10; i < accounts.length; i++) {
        // Send ETH to the WETH contract to get WETH
        await accounts[i].sendTransaction({to: wethAddress, value: 10 ** 10});
    }

    // Show balances for WETH, A, B
    for (const account of accounts) {
        const balanceWETH = await weth.balanceOf(account.address);
        const balanceA = await tokenInstances[0].balanceOf(account.address);
        const balanceB = await tokenInstances[1].balanceOf(account.address);
        console.log("Balances of", account.address, " WETH:", balanceWETH.toString(), " tokenA:", balanceA.toString(), " tokenB", balanceB.toString());
    }
};