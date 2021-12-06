const globals = require("./globals.js");

module.exports = async (hre) => {
    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    // Deploy tokens via ERC20PresetFixedSupply contract
    const tokens = globals.token_list;
    let token_instances = new Array();
    for (let i = 0; i < tokens.length; i++) {
        token_instance = await globals.deploy_token(tokens[i], "ERC20PresetFixedSupply", accounts[i].address);
        console.log("Token", tokens[i].name, "deployed to:", token_instance.address);
        globals.token_map.set(tokens[i], token_instance);
        token_instances.push(token_instance);
    }

    // Distribute tokens to the trader accounts (the last 10 signers)
    for (let i = 10; i < accounts.length; i++) {
        for (let j = 0; j < tokens.length; j++) {
            await token_instances[j].connect(accounts[j]).transfer(accounts[i].address, 10 ** 10);
        }
    }

    // Wrap some ETH
    const weth_instance = globals.contract_map.get(globals.weth_contract_name);
    for (let i = 10; i < accounts.length; i++) {
        // Send ETH to the WETH contract to get WETH
        await accounts[i].sendTransaction({to: weth_instance.address, value: 10 ** 10})
    }

    // Show balances for WETH, A, B
    for (const account of accounts) {
        balanceWETH = await weth_instance.balanceOf(account.address);
        balanceA = await token_instances[0].balanceOf(account.address);
        balanceB = await token_instances[1].balanceOf(account.address);
        console.log("Balances of", account.address, " WETH:", balanceWETH.toString(), " tokenA:", balanceA.toString(), " tokenB", balanceB.toString());
    }
  };