module.exports = async (hre) => {
    // Send tokens to traders
    const accounts = await hre.ethers.getSigners();

    tokenA = await hre.ethers.getContractAt("ERC20PresetFixedSupply", "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");

    // Send from token owner to accounts
    for (let i = 10; i < accounts.length; i++) {
        await tokenA.transfer(accounts[i].address, 10000);
    }

    // Send from account to account
    // await tokenA.connect(accounts[3]).transfer(accounts[5].address, 10);

    for (const account of accounts) {
      balance = await tokenA.balanceOf(account.address);
      console.log("Balance of ", account.address, balance.toString());
    }
  };
  module.exports.tags = ['singleton', 'main-suite'];
