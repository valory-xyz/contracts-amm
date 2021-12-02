module.exports = async (hre) => {
  // Deployments are done in alphabeticall order (by file name). That's the reason for the n_ in every file name.
  // The deployment addresses seem to be derived from the contract file.

  // Transaction manager contract
  const TransactionManager = await hre.ethers.getContractFactory("./third_party/safe-contracts/contracts/GnosisSafe.sol:GnosisSafe");
  const transaction_manager = await TransactionManager.deploy();
  await transaction_manager.deployed();
  console.log("Gnosis transaction manager deployed to:", transaction_manager.address);

  // Transaction manager L2 contract
  const TransactionManagerL2 = await hre.ethers.getContractFactory("GnosisSafeL2");
  const transaction_manager_L2 = await TransactionManagerL2.deploy();
  await transaction_manager_L2.deployed();
  console.log("Gnosis transaction manager L2 deployed to:", transaction_manager_L2.address);

  // Owner manager contract
  const OwnerManager = await hre.ethers.getContractFactory("OwnerManager");
  const owner_manager = await OwnerManager.deploy();
  await owner_manager.deployed();
  console.log("Gnosis owner manager deployed to:", owner_manager.address);

  // Module manager contract
  const ModuleManager = await hre.ethers.getContractFactory("ModuleManager");
  const module_manager = await ModuleManager.deploy();
  await module_manager.deployed();
  console.log("Gnosis module manager deployed to:", module_manager.address);

  // Proxy factory
  const ProxyFactory = await hre.ethers.getContractFactory("GnosisSafeProxyFactory");
  const proxy_factory = await ProxyFactory.deploy();
  await proxy_factory.deployed();
  console.log("Gnosis proxy factory deployed to:", proxy_factory.address);

  // Fallback manager
  const FallbackManager = await hre.ethers.getContractFactory("FallbackManager");
  const fallback_manager = await FallbackManager.deploy();
  await fallback_manager.deployed();
  console.log("Gnosis fallback manager deployed to:", fallback_manager.address);
};