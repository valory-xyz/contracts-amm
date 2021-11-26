module.exports = async (hre) => {
    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    // Deploy tokens A and B
    const Token = await hre.ethers.getContractFactory("ERC20PresetFixedSupply");

    // token A
    tokenA_owner = accounts[0].address;
    const INITIAL_SUPPLY_A = 1000000;
    const tokenA = await Token.deploy("TokenA", "TOKA", INITIAL_SUPPLY_A, tokenA_owner);
    await tokenA.deployed();
    console.log("Token A deployed to:", tokenA.address);

    // token B
    tokenB_owner = accounts[1].address;
    const INITIAL_SUPPLY_B = 5000000;
    const tokenB = await Token.deploy("TokenB", "TOKB", INITIAL_SUPPLY_B, tokenB_owner);
    await tokenB.deployed();
    console.log("Token B deployed to:", tokenB.address);

    // Distribute tokens A and B to the trader accounts (the last 10 signers)
    for (let i = 10; i < accounts.length; i++) {
        await tokenA.connect(accounts[0]).transfer(accounts[i].address, 10000);
        await tokenB.connect(accounts[1]).transfer(accounts[i].address, 50000);
    }

    // Wrap some ETH
    weth_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    for (let i = 10; i < accounts.length; i++) {
        // Send ETH to the WETH contract to get WETH
        await accounts[i].sendTransaction({to: weth_address, value: 1000})
    }

    // Show balances for WETH, A, B
    weth = await hre.ethers.getContractAt("./third_party/canonical-weth/contracts/WETH9.sol:WETH9", weth_address)

    for (const account of accounts) {
        balanceWETH = await weth.balanceOf(account.address);
        balanceA = await tokenA.balanceOf(account.address);
        balanceB = await tokenB.balanceOf(account.address);
        console.log("Balances of", account.address, " WETH:", balanceWETH.toString(), " tokenA:", balanceA.toString(), " tokenB", balanceB.toString());
    }
  };
