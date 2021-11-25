module.exports = async (hre) => {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const WETH = await hre.ethers.getContractFactory("./third_party/canonical-weth/contracts/WETH9.sol:WETH9");
  const weth = await WETH.deploy();
  await weth.deployed();
  console.log("Weth deployed to:", weth.address);
//   await deploy('GnosisSafe', {
//     from: deployer,
//     args: [],
//     log: true,
//     deterministicDeployment: true,
//   });
};
module.exports.tags = ['singleton', 'main-suite'];
