const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Oracle", function () {
  it("Oracle aggregator deployment", async function () {
    const Oracle = await hre.ethers.getContractFactory("VerySimpleOffchainAggregator");
    const oracle = await Oracle.deploy(0, 120 , 18, "BTC - Valory stream", ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]);
    await oracle.deployed();
  });
});
