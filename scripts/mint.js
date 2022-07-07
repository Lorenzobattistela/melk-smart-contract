const hre = require("hardhat");

async function main() { 
    const contractAddress = "0x09AA2B1362B9a49b7E0D531f91B634be9662E1f2";

    const myContract = await hre.ethers.getContractAt("MelkTest", contractAddress);
    await myContract.addModule("module2");
    let a = await myContract.mintCertificate("module2", "0x422F4B687050f60DfAA64BF46AabEf9dEE9605aB", "lorenzo#7506", "0x422F4B687050f60DfAA64BF46AabEf9dEE9605aB");
    console.log(a);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });