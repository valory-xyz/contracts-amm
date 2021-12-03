module.exports = async (hre) => {
    // Based on https://github.com/gnosis/safe-tasks/blob/master/src/creation.ts

    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    proxy_factory_address = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
    gnosis_safe_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    gnosis_safe_address_L2 = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    // Get safe master and proxy factory instances
    gnosis_safe_contract = await hre.ethers.getContractAt("./third_party/safe-contracts/contracts/GnosisSafe.sol:GnosisSafe", gnosis_safe_address);
    gnosis_safe_contract_L2 = await hre.ethers.getContractAt("GnosisSafeL2", gnosis_safe_address_L2);
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

    setupData = gnosis_safe_contract_L2.interface.encodeFunctionData(
        "setup",
        // signers, threshold, to_address, data, fallback_handler, payment_token, payment, payment_receiver
        [signers, threshold, AddressZero, "0x", AddressZero, AddressZero, 0, AddressZero]
    );

    // Deploy the proxy
    const safe_contracts = require("@gnosis.pm/safe-contracts");
    proxy_address = await safe_contracts.calculateProxyAddress(proxy_factory_contract, gnosis_safe_contract_L2.address, setupData, nonce);

    await proxy_factory_contract.createProxyWithNonce(gnosis_safe_contract_L2.address, setupData, nonce).then((tx) => tx.wait());
    console.log("Safe proxy deployed to", proxy_address);

    // Log safe owners
    const ethers = require('ethers');
    default_mnemonic = "test test test test test test test test test test test junk";
    path_string = "m/44'/60'/0'/0/n";

    for (let i = 10; i < 14; i++) {
        path = path_string.replace('n', i.toString());
        wallet = ethers.Wallet.fromMnemonic(default_mnemonic, path);
        console.log("Safe proxy owner", (i - 10).toString(), "address:", wallet.address, "key:", wallet.privateKey);
    }

    // Verify proxy deployment
    proxy_contract = await hre.ethers.getContractAt("GnosisSafeProxy", proxy_address);
    console.log(proxy_contract.masterCopy());
};