const ethers = require("ethers");
require("dotenv").config();

async function main() {
    let abi = [
        "event CourseAdded(string indexed moduleName)",
        "function addModule(string memory newModule) external",
    ];
    let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    let httpProvider = new ethers.providers.JsonRpcProvider();
    let contract = new ethers.Contract(contractAddress, abi, httpProvider);
    
    let privateKey = process.env.PRIVATE_KEY;
    let wallet = new ethers.Wallet(privateKey, httpProvider);
    let contractWithSigner = contract.connect(wallet);
    let transaction = await contractWithSigner.addModule("lorenzo");
    await transaction.wait();

    
    contract.on("CourseAdded", (setter, NewModule, event)=> {
        console.log("New module is: ", NewModule);
    })
}

main();
