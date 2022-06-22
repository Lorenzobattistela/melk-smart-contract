const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
    it("Should deploy the NFT contract", async function() {
        const Melk = await hre.ethers.getContractFactory("MelkTest")
        const melk = await Melk.deploy();
        expect(await melk.deployed()).to.not.equal(null);
    });

    describe("Testing smart contract functions", async function() {
        const Melk = await hre.ethers.getContractFactory("MelkTest")
        const melk = await Melk.deploy();

        describe("Test Smart contract AddModule", function () {
            describe("Correct parameters", function() {
                it("Should add the module melk1 correctly", async function () {
                    let moduleName = "melk1";
                    const Web3  = require("web3")
                    const abiDecoder = require("abi-decoder")
                    let tx = await melk.addModule(moduleName);
                    let abi = require("../artifacts/contracts/nft.sol/MelkTest.json").abi;
                    abiDecoder.addABI(abi);
                    let decodedData = abiDecoder.decodeMethod(tx.data)
                    let functionName = decodedData.name;
                    let value = decodedData.params[0].value;
                    
                    expect(functionName).to.equal("addModule");
                    expect(value).to.equal(moduleName);
                });
            });

            describe("Module already exists", function() {
                it("Should not execute", async function() {
                    let moduleName = "melk1";
                });
            });
        });
    });
});