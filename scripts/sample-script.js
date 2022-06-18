// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = require('ethers');
const helpers = require('../helpers/svg').svgHelpers;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const Melk = await hre.ethers.getContractFactory("MelkTest")
  const melk = await Melk.deploy();
  
  await melk.deployed();
  console.log("NFT deployed to:", melk.address);

  await melk.addModule("module2");


  tokenUri = helpers.buildTokenUri("lorenzo#7506", "0x422F4B687050f60DfAA64BF46AabEf9dEE9605aB", "module2", "13");
  
  await melk.mintCertificate("module2","0x422F4B687050f60DfAA64BF46AabEf9dEE9605aB", tokenUri )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
