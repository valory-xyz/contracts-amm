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

    // Get safe master and proxy factory instances and addresses
    const gnosisSafeAddressL2 = globals.contractMap.get(globals.gnosisSafeL2ContractName);
    const gnosisSafeContractL2 = await hre.ethers.getContractAt(globals.gnosisSafeL2ContractName, gnosisSafeAddressL2);
    const proxyFactoryAddress = globals.contractMap.get(globals.gnosisProxyFactoryContractName);
    const proxyFactoryContract = await hre.ethers.getContractAt(globals.gnosisProxyFactoryContractName, proxyFactoryAddress);
    const defaultFallbackHandlerAddress = globals.contractMap.get(globals.defaultFallbackHandlerContractName);


    // Get the signers (default, pre-funded accounts)
    const accounts = await hre.ethers.getSigners();

    // Prepare deployment data
    const signers =  accounts.slice(10, 14).map(
      function (currentElement) {
        return currentElement.address;
      }
    );

    const threshold = 3; // 3 out of 4 signers
    const nonce =  0;
    const AddressZero = "0x" + "0".repeat(40);

    const setupData = gnosisSafeContractL2.interface.encodeFunctionData(
      "setup",
      // signers, threshold, to_address, data, fallback_handler, payment_token, payment, payment_receiver
      [signers, threshold, AddressZero, "0x", defaultFallbackHandlerAddress, AddressZero, 0, AddressZero]
    );

    // Deploy the proxy
    const safeContracts = require("@gnosis.pm/safe-contracts");
    const proxyAddress = await safeContracts.calculateProxyAddress(proxyFactoryContract, gnosisSafeContractL2.address, setupData, nonce);

    await proxyFactoryContract.createProxyWithNonce(gnosisSafeContractL2.address, setupData, nonce).then((tx) => tx.wait());
    console.log("Safe proxy deployed to", proxyAddress);

    // Verify proxy deployment
    const proxyContract = await hre.ethers.getContractAt(globals.gnosisSafeL2ContractName, proxyAddress);
    if (await proxyContract.getThreshold() != threshold) {
        throw new Error("incorrect threshold");
    }
    for (const signer of signers) {
        const isOwner = await proxyContract.isOwner(signer);
        if (!isOwner) {
            throw new Error("incorrect signer");
        }
    }
  });
});
