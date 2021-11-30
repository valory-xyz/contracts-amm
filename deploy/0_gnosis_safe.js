module.exports = async (hre) => {
  // Deployments are done in alphabeticall order (by file name). That's the reason for the n_ in every file name.
  // The deployment addresses seem to be derived from the contract file.
  const Safe = await hre.ethers.getContractFactory("./third_party/safe-contracts/contracts/GnosisSafe.sol:GnosisSafe");
  const safe = await Safe.deploy();
  await safe.deployed();
  console.log("Safe deployed to:", safe.address);

  const Multisend = await hre.ethers.getContractFactory("MultiSend");
  const multisend = await Multisend.deploy();
  await multisend.deployed();
  console.log("Multi-send deployed to:", multisend.address);
};