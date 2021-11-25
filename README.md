# Contracts AMM

## Setting the repository

- Clone the repository, and recursively clone the submodules:

      git clone --recursive git@https://github.com/valory-xyz/contracts-amm.git

  Note: to update the Git submodules later:

      git submodule update --init --recursive

## Development

First, [install hardhat](https://hardhat.org/getting-started/) and other requirements:

```bash
yarn
```

Run the relevant tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat coverage
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/deploy.js
npx hardhat help
```

To run a node and deploy to it:
```shell
npx hardhat node
npx hardhat run --network localhost scripts/deploy.js
```

For useful documentation check out [ethers](https://docs.ethers.io/v5/).