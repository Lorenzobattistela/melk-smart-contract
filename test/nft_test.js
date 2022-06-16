const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
    it("Should deploy the NFT contract", async function() {
        const Melk = await hre.ethers.getContractFactory("MelkTest")
        const melk = await Melk.deploy();
        expect(await melk.deployed()).to.not.equal(null);
    });
    describe("Test Smart contract AddCourse", function () {
        // STUDY HOW TO EMIT EVENT AND GET THE EVENT TO CHECK IF COURSE WAS ADDED
    })
});