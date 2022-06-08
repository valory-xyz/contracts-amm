require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("hardhat-deploy");
require("@ethersproject/constants");
require("@gnosis.pm/safe-contracts");
require("hardhat-gas-reporter");

// import('hardhat/config').HardhatUserConfig;
// import('hardhat/config').HttpNetworkUserConfig;
// import("dotenv").dotenv;
// import("yargs").yargs;

// const argv = yargs
//   .option("network", {
//     type: "string",
//     default: "hardhat",
//   })
//   .help(false)
//   .version(false).argv;

// // Load environment variables.
// dotenv.config();
// const { NODE_URL, INFURA_KEY, MNEMONIC, ETHERSCAN_API_KEY, PK, SOLIDITY_VERSION, SOLIDITY_SETTINGS } = process.env;

// const DEFAULT_MNEMONIC =
//   "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

// const sharedNetworkConfig: HttpNetworkUserConfig = {};
// if (PK) {
//   sharedNetworkConfig.accounts = [PK];
// } else {
//   sharedNetworkConfig.accounts = {
//     mnemonic: MNEMONIC || DEFAULT_MNEMONIC,
//   };
// }

// if (["mainnet", "ropsten", "rinkeby", "kovan", "goerli"].includes(argv.network) && INFURA_KEY === undefined) {
//   throw new Error(
//     `Could not find Infura key in env, unable to connect to network ${argv.network}`,
//   );
// }

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

// eslint-disable-next-line
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// eslint-disable-next-line
task("deploy-contracts", "Deploys and verifies contracts")
    .setAction(async (_, hre) => {
        await hre.run("deploy");
    });

// eslint-disable-next-line
task("extra-compile", "Compile, updates contracts, then run node")
    .addParam("port", "The port for the node")
    .setAction(async (taskArgs, hre) => {
        await hre.run("compile");

        var json = require("./artifacts/third_party/v2-core/contracts/UniswapV2Pair.sol/UniswapV2Pair.json");
        const actualBytecode = json["bytecode"];
        const initHash = hre.ethers.utils.keccak256(actualBytecode);
        const initHashReplace = initHash.slice(2);
        // const STANDARD_HASH = "96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f"
        const fs = require("fs");
        const path = "./third_party/v2-periphery/contracts/libraries/UniswapV2Library.sol";
        fs.readFile(path, "utf8", function (err,data) {
            if (err) {
                return console.log(err);
            }
            var result = data.replace(/96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f/g, initHashReplace);

            fs.writeFile(path, result, "utf8", function (err) {
                if (err) return console.log(err);
            });
        });

        await hre.run("node", {port: parseInt(taskArgs.port)});
    });


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.6.6",
                evmVersion: "istanbul",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
            {
                version: "0.7.1",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.7.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
        ],
    },
    paths: {
        sources: "./third_party",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    networks: {
        ganache: {
            url: "http://localhost:8545"
        }
    },
    etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
        apiKey: ""
    },
    hardhat: {
        forking: {
            url: "https://eth-mainnet.alchemyapi.io/v2/<key>",
            blockNumber: 13669330
        }
    },
    tenderly: {
        username: "denim",
        project: "project"
    },
    gasReporter: {
        enabled: true,
        currency: "USD",

        // Ethereum
        token: "ETH",  // The reference token for gas price
        gasPriceApi: "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",

        // Avalanche
        // token: "AVAX",  // The reference token for gas price
        // gasPriceApi: "https://api.snowtrace.io/api?module=proxy&action=eth_gasPrice",

        // Polygon
        // token: "MATIC",  // The reference token for gas price
        // gasPriceApi: "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice",

        coinmarketcap: "",
      },
};