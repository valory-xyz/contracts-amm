module.exports = async (hre) => {
    // Send tokens to traders
    const accounts = await hre.ethers.getSigners();

    weth_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    factory = await hre.ethers.getContractAt("UniswapV2Factory", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
    pairAWETH = await factory.createPair(accounts[0].address, weth_address);
    pairBWETH = await factory.createPair(accounts[2].address, weth_address);

    console.log("Token A - WETH pool deployed. Data:", pairAWETH.data);
    console.log("Token B - WETH pool deployed. Data:", pairBWETH.data);
  };
  module.exports.tags = ['singleton', 'main-suite'];
