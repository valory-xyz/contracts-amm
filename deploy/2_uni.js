module.exports = async (hre) => {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const accounts = await hre.ethers.getSigners();

  // Deploy Uniswap factory
  feeToSetter_address = accounts[2].address;
  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(feeToSetter_address);

  await factory.deployed();

  // Deploy Router02
  weth_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const Router = await hre.ethers.getContractFactory("UniswapV2Router02");
  const router = await Router.deploy(factory.address, weth_address);

  await router.deployed();

  console.log("Uniswap factory deployed to:", factory.address);
  console.log("Router02 deployed to:", router.address);
//   await deploy('GnosisSafe', {
//     from: deployer,
//     args: [],
//     log: true,
//     deterministicDeployment: true,
//   });
};
module.exports.tags = ['singleton', 'main-suite'];
