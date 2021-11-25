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
  await safe.deployed();

  // Deploy WETH
  const WETH = await hre.ethers.getContractFactory("third_party/canonical-weth/contracts/WETH9.sol:WETH9");
  const weth = await WETH.deploy();

  // Deploy Uniswap factory
  feeToSetter_address = "0xc0ffee254729296a45a3885639AC7E10F9d54979"; // random for now
  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(feeToSetter_address);

  await weth.deployed();
  await factory.deployed();

  // Deploy Router02
  const Router = await hre.ethers.getContractFactory("UniswapV2Router02");
  const router = await Router.deploy(factory.address, weth.address);

  await router.deployed();

  console.log("Gnosis safe deployed to:", safe.address);
  console.log("WETH deployed to:", weth.address);
  console.log("Uniswap factory deployed to:", factory.address);
  console.log("Uniswap router02 deployed to:", router.address);

 // Deploy tokens
 tokenA_owner = "0x8620E694dE039d3727c878C86b53C3c81f18C779"
 tokenB_owner = "0x55c1412C3Bd15881F14372b9F4Bad18346197329"
 const INITIAL_SUPPLY = 1000000;

 const Token = await hre.ethers.getContractFactory("ERC20PresetFixedSupply");
 const tokenA = await Token.deploy("TokenA", "TOKA", INITIAL_SUPPLY, tokenA_owner);
 const tokenB = await Token.deploy("TokenB", "TOKB", INITIAL_SUPPLY, tokenB_owner);
 await tokenA.deployed();
 await tokenB.deployed();
 console.log("Token A deployed to:", tokenA.address);
 console.log("Token B deployed to:", tokenB.address);

 // Send tokens to traders
 const accounts = ["0xC8b5Fa6F45d42FeD46156B5CbD543edD0d8D18aB",
                   "0xA8705818909Cc6E5748a703857C4C9Fd37f881ac",
                   "0x99C49aF33d27D64A95E6F8F190c4FBc23dBEFAF7",
                   "0x38C1A04b64D653352edef30Df28F8871a93Eb1E5"];

  owner_balance = await tokenA.balanceOf(tokenA_owner);
  console.log("Token A owner balance: ", owner_balance.toString());
  account_balance = await tokenA.balanceOf(accounts[0]);
  console.log("Account balance: ", account_balance.toString());

  await tokenA.transferFrom(owner_balance, accounts[0], 100);

  owner_balance = await tokenA.balanceOf(tokenA_owner);
  console.log("Token A owner balance: ", owner_balance.toString());
  account_balance = await tokenA.balanceOf(accounts[0]);
  console.log("Account balance: ", account_balance.toString());


 // Deploy pools

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
