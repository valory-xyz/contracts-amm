module.exports = async (hre) => {
  // Deployments are done in alphabeticall order (by file name). That's the reason for the n_ in every file name.
  // The deployment addresses seem to be derived from the contract file.

  async function deploy_contract(contract_name) {
    const Contract = await hre.ethers.getContractFactory(contract_name);
    const contract_instance = await Contract.deploy();
    await contract_instance.deployed();
    console.log("Gnosis", contract_name, "deployed to:", contract_instance.address);
  }

  contract_list = [
    "SimulateTxAccessor",
    "GnosisSafeProxyFactory",
    "DefaultCallbackHandler",
    "CompatibilityFallbackHandler",
    "CreateCall",
    "MultiSend",
    "MultiSendCallOnly",
    "SignMessageLib",
    "GnosisSafeL2",
    "./third_party/safe-contracts/contracts/GnosisSafe.sol:GnosisSafe"
  ]

  for (const contract_name of contract_list) {
    await deploy_contract(contract_name);
  }
};