const { expect } = require("chai");
const { ethers } = require("hardhat");
const globals = require("../globals/globals.js");

describe("Safe", function () {
  it("Gnosis Safe deployment", async function () {
    // Deploy all the Gnosis contracts
    for (const contractName of globals.contractNameList) {
      const contract = await globals.deployContract(contractName);
      console.log("Contract", contractName, "deployed to:", contract.address);
      globals.contractMap.set(contractName, contract.address);
    }
    await globals.verifyContractAddresses();

    // Deploy the Gnosis safe contract
    const Safe = await hre.ethers.getContractFactory("GnosisSafeL2");
    const safe = await Safe.deploy();
    await safe.deployed();
    console.log("Safe deployed to:", safe.address);
  });
});
