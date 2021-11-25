module.exports = async (hre) => {
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

  };
  module.exports.tags = ['singleton', 'main-suite'];
