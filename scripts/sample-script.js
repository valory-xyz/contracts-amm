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

  // Deploy Uniswap factory
  feeToSetter_address = "0xc0ffee254729296a45a3885639AC7E10F9d54979";
  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(feeToSetter_address);

  await weth.deployed();
  await factory.deployed();

  // Deploy Router02
  const Router = await hre.ethers.getContractFactory("UniswapV2Router02");
  const router = await Router.deploy(factory.address, weth.address);

  await safe.deployed();
  await router.deployed();

  console.log("Safe deployed to:", safe.address);
  console.log("WETH deployed to:", weth.address);
  console.log("Uniswap factory deployed to:", factory.address);
  console.log("Router deployed to:", router.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
