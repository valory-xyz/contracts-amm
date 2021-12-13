/*global hre*/

// Contract names that are used more often in the scripts
const gnosisSafeContractName = "./third_party/safe-contracts/contracts/GnosisSafe.sol:GnosisSafe";
const gnosisSafeL2ContractName = "GnosisSafeL2";
const gnosisProxyFactoryContractName = "GnosisSafeProxyFactory";
const defaultFallbackHandlerContractName = "DefaultCallbackHandler";
const wethContractName = "./third_party/canonical-weth/contracts/WETH9.sol:WETH9";
const factoryContractName = "UniswapV2Factory";
const routerContractName = "UniswapV2Router02";

// List of contract names to deploy
const contractNameList = [
    gnosisProxyFactoryContractName,
    gnosisSafeL2ContractName,
    gnosisSafeContractName,
    defaultFallbackHandlerContractName,
    wethContractName,
    "SimulateTxAccessor",
    "CompatibilityFallbackHandler",
    "CreateCall",
    "MultiSend",
    "MultiSendCallOnly",
    "SignMessageLib"
];

// Map of contract names <-> addresses for the verification
// If you swap the rows, the contract addresses are deterministic and should not change the row number
// TODO: Prefill deterministic set of addresses for testing purposes, such that we know for every new
// contract which address will be assigned.
const contrAddrMap = new Map ([
    [gnosisProxyFactoryContractName, "0x5FbDB2315678afecb367f032d93F642f64180aa3"],
    [gnosisSafeL2ContractName, "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"],
    [gnosisSafeContractName, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"],
    [defaultFallbackHandlerContractName, "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"],
    [wethContractName, "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"],
    ["SimulateTxAccessor", "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"],
    ["CompatibilityFallbackHandler", "0x0165878A594ca255338adfa4d48449f69242Eb8F"],
    ["CreateCall", "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"],
    ["MultiSend", "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"],
    ["MultiSendCallOnly", "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"],
    ["SignMessageLib", "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"]
]);

// List of token names to deploy
const tokenList = [
    { name: "TokenA", symbol: "TOKA", initialSupply: 10 ** 12 },
    { name: "TokenB", symbol: "TOKB", initialSupply: 10 ** 12 }
];

// Map of contract names <-> contract instances
let contractMap = new Map();

// Map of tokens <-> token instances
let tokenMap = new Map();

// Function to deploy a contract by the contract name / path
async function deployContract(contractName) {
    const Contract = await hre.ethers.getContractFactory(contractName);
    const contractInstance = await Contract.deploy();
    await contractInstance.deployed();
    return contractInstance;
}

// Function to deploy a token by the token parameters, contract name / path and the token owner address
async function deployToken(token, contractName, tokenOwner) {
    const Token = await hre.ethers.getContractFactory(contractName);
    const tokenInstance = await Token.deploy(token.name, token.symbol, token.initialSupply, tokenOwner);
    await tokenInstance.deployed();
    return tokenInstance;
}

// Verify deployed contract addresses. For testing purposes.
async function verifyContractAddresses() {
    contractMap.forEach((value, key) => {
        if (value != contrAddrMap.get(key)) {
            throw new Error("Address matching failed for " + key + " contract");
        }
    });
}

module.exports.gnosisProxyFactoryContractName = gnosisProxyFactoryContractName;
module.exports.gnosisSafeL2ContractName = gnosisSafeL2ContractName;
module.exports.gnosisSafeContractName = gnosisSafeContractName;
module.exports.defaultFallbackHandlerContractName = defaultFallbackHandlerContractName;
module.exports.wethContractName = wethContractName;
module.exports.factoryContractName = factoryContractName;
module.exports.routerContractName = routerContractName;
module.exports.contractNameList = contractNameList;
module.exports.tokenList = tokenList;
module.exports.contractMap = contractMap;
module.exports.tokenMap = tokenMap;
module.exports.deployContract = deployContract;
module.exports.deployToken = deployToken;
module.exports.verifyContractAddresses = verifyContractAddresses;