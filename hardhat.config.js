require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require('hardhat-deploy');
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
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy-contracts", "Deploys and verifies contracts")
  .setAction(async (_, hre) => {
      await hre.run("deploy")
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
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
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
      {
        version: "0.8.0", // When adding versions >= 0.8.0, some math libraries from uniswap will fail to compile.
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.2",
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
      url: 'http://localhost:8545'
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/2980beeca3544c9fbace4f24218afcd4"
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "S3DUK14N4RQTU4GPBXVAXY76UIHF3DCQM4"
  },
  hardhat: {
    forking: {
      url: "https://eth-mainnet.alchemyapi.io/v2/<key>",
      blockNumber: 13669330
    }
  }
};