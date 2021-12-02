module.exports = async (hre) => {
    // Based on https://github.com/gnosis/safe-tasks/blob/master/src/creation.ts

    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    safe_factory_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    safe_address = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"; // account 8
    account_address = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"; // account 9

    // Get safe factory instance
    safe_factory_contract = await hre.ethers.getContractAt("GnosisSafeProxyFactory", safe_factory_address);

    // Get safe? instance
    // Can we use this 'safe_address' here? It is not deployed yet, so I don't think this will work. They call this singleton/master,
    // but in the oracle code this seems the safe to me.
    safe_contract = await hre.ethers.getContractAt("./third_party/safe-contracts/contracts/GnosisSafe.sol:GnosisSafe", safe_address); // Doesn't work for GnosisSafeL2 yet

    // Get safe and safe factory instances (the Gnosis way, doesn't work yet)
    // safe_contract = await contractInstance(hre, getSafeSingletonDeployment({ released: undefined }), safe_address);
    // safe_factory_contract = await contractInstance(hre, getProxyFactoryDeployment(), safe_factory_address)

    // Prepare deployment data
    signers =  accounts.slice(10, 14).map(
        function (currentElement) {
            return currentElement.address;
        }
    );

    threshold = 1;
    nonce =  new Date().getTime();
    AddressZero = "0x" + "0".repeat(40);

    setupData = safe_contract.interface.encodeFunctionData(
        "setup",
        [signers, threshold, AddressZero, "0x", AddressZero, AddressZero, 0, AddressZero]
    );

    // What's this? Errors with 'calculateProxyAddress' not found
    // predictedAddress = await calculateProxyAddress(safe_factory_contract, safe_contract.address, setupData, nonce);
    // console.log(`Deploy Safe to ${predictedAddress}`);

    // Deploy the safe
    safe_address = await safe_factory_contract.createProxyWithNonce(safe_contract.address, setupData, nonce).then((tx) => tx.wait());
    console.log(`Safe deployed to ${safe_address}`);
};