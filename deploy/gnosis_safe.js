module.exports = async (hre) => {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const Safe = await hre.ethers.getContractFactory("./third_party/safe-contracts/contracts/GnosisSafe.sol:GnosisSafe");
//   await deploy('GnosisSafe', {
//     from: deployer,
//     args: [],
//     log: true,
//     deterministicDeployment: true,
//   });
// };
module.exports.tags = ['singleton', 'main-suite'];
