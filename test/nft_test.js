const { expect, use } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
use(solidity);

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
                    await expect(melk.addModule(moduleName)).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'Module already exists'");
                });
            });
        });

        describe("Test smart contract minting certificate", function() {
            describe("Correct parameters", function() {
                it("Should mint the certficate correctly", async function () {
                    let course = "melk1";
                    let studentAddress = "0x422F4B687050f60DfAA64BF46AabEf9dEE9605aB";
                    let discordUser = "lorenzo#7506";
                    let wallet = "0x422F4B687050f60DfAA64BF46AabEf9dEE9605aB";

                    await expect(melk.mintCertificate(course, studentAddress, discordUser, wallet)).to.emit(melk, "StudentFinishedModule");
                });
            });

            describe("Wrong parameters", function() {
                it("Should not execute", async function () {
                    let course = "melk1";
                    let studentAddress = "0x422DfAA64BF46AabEf9dEE9605aB";
                    let discordUser = "lorenzo#7506";
                    let wallet = "0x422DfAA64BF46AabEf9dEE9605aB";
                    await expect(melk.mintCertificate(course, studentAddress, discordUser, wallet)).to.be.reverted;
                });
            });
        });
    });
});