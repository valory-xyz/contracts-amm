module.exports = async (hre) => {
  const WETH = await hre.ethers.getContractFactory("./third_party/canonical-weth/contracts/WETH9.sol:WETH9");
  const weth = await WETH.deploy();
  await weth.deployed();
  console.log("Weth deployed to:", weth.address);
};
