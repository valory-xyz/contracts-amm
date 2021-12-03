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
    nonce =  0;
    AddressZero = "0x" + "0".repeat(40);

    setupData = master_contract.interface.encodeFunctionData(
        "setup",
        // signers, threshold, to_address, data, fallback_handler, payment_token, payment, payment_receiver
        [signers, threshold, AddressZero, "0x", AddressZero, AddressZero, 0, AddressZero]
    );

    // Deploy the proxy
    const safe_contracts = require("@gnosis.pm/safe-contracts");
    proxy_address = await safe_contracts.calculateProxyAddress(proxy_factory_contract, master_contract.address, setupData, nonce);

    await proxy_factory_contract.createProxyWithNonce(master_contract.address, setupData, nonce).then((tx) => tx.wait());
    console.log("Safe proxy deployed to", proxy_address);

    // Log safe owners
    const ethers = require('ethers');
    default_mnemonic = "test test test test test test test test test test test junk";
    path_string = "m/44'/60'/0'/0/n"

    for (let i = 10; i < 14; i++) {
        path = path_string.replace('n', i.toString())
        wallet = ethers.Wallet.fromMnemonic(default_mnemonic, path);
        console.log("Safe proxy owner", (i - 10).toString(), "address:", wallet.address, "key:", wallet.privateKey);
    }
};