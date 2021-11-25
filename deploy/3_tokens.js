module.exports = async (hre) => {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();

    tokenA_owner = "0x8620E694dE039d3727c878C86b53C3c81f18C779"
    tokenB_owner = "0x55c1412C3Bd15881F14372b9F4Bad18346197329"
    const INITIAL_SUPPLY = 1000000;

    const Token = await hre.ethers.getContractFactory("ERC20PresetFixedSupply");
    const tokenA = await Token.deploy("TokenA", "TOKA", INITIAL_SUPPLY, tokenA_owner);
    const tokenB = await Token.deploy("TokenB", "TOKB", INITIAL_SUPPLY, tokenB_owner);
    await tokenA.deployed();
    await tokenB.deployed();
    console.log("Token A deployed to:", tokenA.address);
    console.log("Token B deployed to:", tokenB.address);

  };
  module.exports.tags = ['singleton', 'main-suite'];
