// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // Deploy gnosis safe
  const Safe = await hre.ethers.getContractFactory("GnosisSafe");
  const safe = await Safe.deploy();

  // Deploy WETH
  const WETH = await hre.ethers.getContractFactory("third_party/canonical-weth/contracts/WETH9.sol:WETH9");
  const weth = await WETH.deploy();

  // We get the contract to deploy
  // const Router = await hre.ethers.getContractFactory("UniswapV2Router02");
  // const router = await Router.deploy();

  await safe.deployed();
  await weth.deployed();
  // await router.deployed(factory, weth);

  console.log("Safe deployed to:", safe.address);
  console.log("WETH deployed to:", weth.address);
  // console.log("Router deployed to:", router.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
