const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nft", function() {
    it("Should deploy the NFT function", async function () {
        const Nft = await hre.ethers.getContractFactory("NFT");
        const nft = await Nft.deploy("Melk test", "MELK", "baseURIhere");
        await nft.deployed();

        a = await nft.mint("0x422F4B687050f60DfAA64BF46AabEf9dEE9605aB", 1);
        console.log(a)
    })
})