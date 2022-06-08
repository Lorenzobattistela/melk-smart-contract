const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nft", function() {
    it("Should deploy the NFT function", async function () {
        const Nft = await hre.ethers.getContractFactory("NFT");
        const nft = await Nft.deploy("Melk test", "MELK", "baseURIhere");
        await nft.deployed();
        expect(typeof(nft)).to.equal("object")
        expect(await nft.owner()).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    });

    describe("Testing NFT mint", function(){
        it("Should not execute", async function() {
            const Nft = await hre.ethers.getContractFactory("NFT");
            const nft = await Nft.deploy("Melk test", "MELK", "baseURIhere");
            await nft.deployed();
            tx = await nft.mint(_mintAmount=1);
            console.log(tx)
        })
    })
})