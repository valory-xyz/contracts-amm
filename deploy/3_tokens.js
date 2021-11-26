module.exports = async (hre) => {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();

    const accounts = await hre.ethers.getSigners();
    tokenA_owner = accounts[0].address;
    tokenB_owner = accounts[1].address;

    const INITIAL_SUPPLY_A = 1000000;
    const INITIAL_SUPPLY_B = 5000000;

    const Token = await hre.ethers.getContractFactory("ERC20PresetFixedSupply");
    const tokenA = await Token.deploy("TokenA", "TOKA", INITIAL_SUPPLY_A, tokenA_owner);
    const tokenB = await Token.deploy("TokenB", "TOKB", INITIAL_SUPPLY_B, tokenB_owner);
    await tokenA.deployed();
    await tokenB.deployed();
    console.log("Token A deployed to:", tokenA.address);
    console.log("Token B deployed to:", tokenB.address);

    // Send from token owner to accounts
    for (let i = 10; i < accounts.length; i++) {
        await tokenA.connect(accounts[0]).transfer(accounts[i].address, 10000);
        await tokenB.connect(accounts[1]).transfer(accounts[i].address, 50000);
    }

    // Wrap some ETH
    weth_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    weth = await hre.ethers.getContractAt("./third_party/canonical-weth/contracts/WETH9.sol:WETH9", weth_address)

    for (let i = 10; i < accounts.length; i++) {
        // Send ETH to the WETH contract
        await accounts[i].sendTransaction({to: weth_address, value: 1000})

        // Show balance
        weth_balance = await weth.balanceOf(accounts[i].address);
        console.log("Balance for WETH of", accounts[i].address, weth_balance.toString());
    }

    // Send from account to account
    // await tokenA.connect(accounts[3]).transfer(accounts[5].address, 10);

    for (const account of accounts) {
      balanceWETH = await weth.balanceOf(account.address);
      balanceA = await tokenA.balanceOf(account.address);
      balanceB = await tokenB.balanceOf(account.address);
      console.log("Balances of", account.address, balanceWETH.toString(), balanceA.toString(), balanceB.toString());
    }

  };
  module.exports.tags = ['singleton', 'main-suite'];
