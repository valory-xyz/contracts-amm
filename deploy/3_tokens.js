module.exports = async (hre) => {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();

    const accounts = await hre.ethers.getSigners();
    tokenA_owner = accounts[0].address;
    tokenB_owner = accounts[0].address;

    const INITIAL_SUPPLY_A = 1000000;
    const INITIAL_SUPPLY_B = 1000000;

    const Token = await hre.ethers.getContractFactory("ERC20PresetFixedSupply");
    const tokenA = await Token.deploy("TokenA", "TOKA", INITIAL_SUPPLY_A, tokenA_owner);
    const tokenB = await Token.deploy("TokenB", "TOKB", INITIAL_SUPPLY_B, tokenA_owner);
    await tokenA.deployed();
    await tokenB.deployed();
    console.log("Token A deployed to:", tokenA.address);
    console.log("Token B deployed to:", tokenB.address);

  };
  module.exports.tags = ['singleton', 'main-suite'];
