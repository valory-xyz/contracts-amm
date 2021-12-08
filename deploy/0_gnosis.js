const globals = require("../globals/globals.js");

module.exports = async (hre) => {
    // Deployments are done in alphabetical order (by file name). That's the reason for the n_ in every file name.
    // The deployment addresses seem to be derived from the contract file.

    // Deploy all the contracts
    for (const contract_name of globals.contract_name_list) {
        const contract = await globals.deploy_contract(contract_name);
        console.log("Contract", contract_name, "deployed to:", contract.address);
        globals.contract_map.set(contract_name, contract.address);
    }

    await globals.verify_contract_addresses();
};