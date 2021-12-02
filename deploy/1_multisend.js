module.exports = async (hre) => {
    const Multisend = await hre.ethers.getContractFactory("MultiSend");
    const multisend = await Multisend.deploy();
    await multisend.deployed();
    console.log("Multi-send deployed to:", multisend.address);
  };