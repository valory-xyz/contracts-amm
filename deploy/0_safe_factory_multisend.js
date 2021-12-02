module.exports = async (hre) => {
  // Deployments are done in alphabeticall order (by file name). That's the reason for the n_ in every file name.
  // The deployment addresses seem to be derived from the contract file.

  const SafeFactory = await hre.ethers.getContractFactory("GnosisSafeProxyFactory");
  const safe_factory = await SafeFactory.deploy();
  await safe_factory.deployed();
  console.log("Safe factory deployed to:", safe_factory.address);

  const Multisend = await hre.ethers.getContractFactory("MultiSend");
  const multisend = await Multisend.deploy();
  await multisend.deployed();
  console.log("Multi-send deployed to:", multisend.address);
};