module.exports = async (hre) => {
    // Based on https://github.com/gnosis/safe-tasks/blob/master/src/creation.ts

    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    proxy_factory_address = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
    master_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    // Get safe master and proxy factory instances
    master_contract = await hre.ethers.getContractAt("GnosisSafeL2", master_address);
    proxy_factory_contract = await hre.ethers.getContractAt("GnosisSafeProxyFactory", proxy_factory_address);

    // Prepare deployment data
    signers =  accounts.slice(10, 14).map(
        function (currentElement) {
            return currentElement.address;
        }
    );

    threshold = 3; // 3 out of 4 signers
    nonce =  new Date().getTime();
    AddressZero = "0x" + "0".repeat(40);

    setupData = master_contract.interface.encodeFunctionData(
        "setup",
        // signers, threshold, to_address, data, fallback_handler, payment_token, payment, payment_receiver
        [signers, threshold, AddressZero, "0x", AddressZero, AddressZero, 0, AddressZero]
    );

    // Deploy the proxy
    safe_address = await proxy_factory_contract.createProxyWithNonce(master_contract.address, setupData, nonce).then((tx) => tx.wait());
    console.log(`Safe deployed to ${safe_address}`);
};