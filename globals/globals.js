// Contract names that are used more often in the scripts
const gnosis_safe_contract_name = "./third_party/safe-contracts/contracts/GnosisSafe.sol:GnosisSafe";
const gnosis_safe_L2_contract_name = "GnosisSafeL2";
const gnosis_proxy_factory_contract_name = "GnosisSafeProxyFactory";
const default_fallback_handler_contract_name = "DefaultCallbackHandler";
const weth_contract_name = "./third_party/canonical-weth/contracts/WETH9.sol:WETH9";
const factory_contract_name = "UniswapV2Factory";
const router_contract_name = "UniswapV2Router02";

// List of contract names to deploy
const contract_name_list = [
    gnosis_proxy_factory_contract_name,
    gnosis_safe_L2_contract_name,
    gnosis_safe_contract_name,
    default_fallback_handler_contract_name,
    weth_contract_name,
    "SimulateTxAccessor",
    "CompatibilityFallbackHandler",
    "CreateCall",
    "MultiSend",
    "MultiSendCallOnly",
    "SignMessageLib"
]

// Map of contract names <-> addresses for the verification
// If you swap the rows, the contract addresses are deterministic and should not change the row number
// TODO: Prefill deterministic set of addresses for testing purposes, such that we know for every new
// contract which address will be assigned.
const contr_addr_map = new Map ([
    [gnosis_proxy_factory_contract_name, 0x5FbDB2315678afecb367f032d93F642f64180aa3],
    [gnosis_safe_L2_contract_name, 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512],
    [gnosis_safe_contract_name, 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0],
    [default_fallback_handler_contract_name, 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9],
    [weth_contract_name, 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9],
    ["SimulateTxAccessor", 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707],
    ["CompatibilityFallbackHandler", 0x0165878A594ca255338adfa4d48449f69242Eb8F],
    ["CreateCall", 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853],
    ["MultiSend", 0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6],
    ["MultiSendCallOnly", 0x8A791620dd6260079BF849Dc5567aDC3F2FdC318],
    ["SignMessageLib", 0x610178dA211FEF7D417bC0e6FeD39F05609AD788]
])

// List of token names to deploy
const token_list = [
    { name: "TokenA", symbol: "TOKA", initialSupply: 10 ** 12 },
    { name: "TokenB", symbol: "TOKB", initialSupply: 10 ** 12 }
]

// Map of contract names <-> contract instances
let contract_map = new Map();

// Map of tokens <-> token instances
let token_map = new Map();

// Function to deploy a contract by the contract name / path
async function deploy_contract(contract_name) {
    const Contract = await hre.ethers.getContractFactory(contract_name);
    const contract_instance = await Contract.deploy();
    await contract_instance.deployed();
    return contract_instance;
}

// Function to deploy a token by the token parameters, contract name / path and the token owner address
async function deploy_token(token, contract_name, token_owner) {
    const Token = await hre.ethers.getContractFactory(contract_name);
    const token_instance = await Token.deploy(token.name, token.symbol, token.initialSupply, token_owner);
    await token_instance.deployed();
    return token_instance;
}

// Verify deployed contract addresses. For testing purposes.
async function verify_contract_addresses() {
    contract_map.forEach((value, key, map) => {
        if (value != contr_addr_map.get(key)) {
            throw new Error("Address matching failed for " + key + " contract");
        }
    });
}

module.exports.gnosis_proxy_factory_contract_name = gnosis_proxy_factory_contract_name;
module.exports.gnosis_safe_L2_contract_name = gnosis_safe_L2_contract_name;
module.exports.gnosis_safe_contract_name = gnosis_safe_contract_name;
module.exports.default_fallback_handler_contract_name = default_fallback_handler_contract_name;
module.exports.weth_contract_name = weth_contract_name;
module.exports.factory_contract_name = factory_contract_name;
module.exports.router_contract_name = router_contract_name;
module.exports.contract_name_list = contract_name_list;
module.exports.token_list = token_list;
module.exports.contract_map = contract_map;
module.exports.token_map = token_map;
module.exports.deploy_contract = deploy_contract;
module.exports.deploy_token = deploy_token;
module.exports.verify_contract_addresses = verify_contract_addresses;