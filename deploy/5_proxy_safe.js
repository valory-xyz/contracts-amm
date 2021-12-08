const globals = require("../globals/globals.js");

module.exports = async (hre) => {
    // Based on https://github.com/gnosis/safe-tasks/blob/master/src/creation.ts

    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    // Get safe master and proxy factory instances and addresses
    const gnosis_safe_address = globals.contract_map.get(globals.gnosis_safe_contract_name);
    gnosis_safe_contract = await hre.ethers.getContractAt(globals.gnosis_safe_contract_name, gnosis_safe_address);
    const gnosis_safe_address_L2 = globals.contract_map.get(globals.gnosis_safe_L2_contract_name);
    gnosis_safe_contract_L2 = await hre.ethers.getContractAt(globals.gnosis_safe_L2_contract_name, gnosis_safe_address_L2);
    const proxy_factory_address = globals.contract_map.get(globals.gnosis_proxy_factory_contract_name);
    proxy_factory_contract = await hre.ethers.getContractAt(globals.gnosis_proxy_factory_contract_name, proxy_factory_address);
    const default_fallback_handler_address = globals.contract_map.get(globals.default_fallback_handler_contract_name);


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
        [signers, threshold, AddressZero, "0x", default_fallback_handler_address, AddressZero, 0, AddressZero]
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
    proxy_contract = await hre.ethers.getContractAt(globals.gnosis_safe_L2_contract_name, proxy_address);
    if (await proxy_contract.getThreshold() != threshold) {
      throw new Error("incorrect threshold")
    };
    for (const signer of signers) {
        const isOwner = await proxy_contract.isOwner(signer)
        if (!isOwner) {
          throw new Error("incorrect signer")
        };
    };

    const weth_address = globals.contract_map.get(globals.weth_contract_name);
    weth = await hre.ethers.getContractAt(globals.weth_contract_name, weth_address);
    await weth.connect(accounts[19]).transfer(proxy_address, 10 ** 10);
};