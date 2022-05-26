import '../App.css';
import { ethers } from 'ethers';

export default function MintNft({account, balance, setBalance}){
    let minABI = [
        // balanceOf
        {
            "constant": true,
            "inputs": [{ "name": "_owner", "type": "address" }],
            "name": "balanceOf",
            "outputs": [{ "name": "balance", "type": "uint256" }],
            "type": "function"
        },
        // decimals
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{ "name": "", "type": "uint8" }],
            "type": "function"
        }
      ];

    const getMelkBalance = async () => {
        const melkTokenAddress = "0x9Fd41F6f67D4438f0e3Dc3951eAE0ad2093492Dd";
        const network = "matic";
        const provider = new ethers.providers.AlchemyProvider(network, process.env.ALCHEMY_API_KEY);
        if(!window.ethereum) {
          throw new Error('No crypto wallet found. Please install it.');
        }
        
        let contract = new ethers.Contract(melkTokenAddress, minABI, provider);
        let melkBalance = await Number(ethers.utils.formatEther(await contract.balanceOf(account)));
        setBalance(melkBalance);
    }  

    const mintNFT = async (e) => {
        e.preventDefault();
        await getMelkBalance()
        if(!window.ethereum) {
          alert('Please install Metamask extension')
          throw new Error('No crypto wallet found. Please install it.');
        }
    
        if(!account) {
          alert('No wallet connected. Please connect one');
          throw new Error('No wallet connected. Please connect one')
        }
    
        if (balance < 86) {
          alert('Você não tem MELK o suficiente. Faça todas as missões antes de mintar seu NFT!');
        }

        else {
          alert('Minting NFT...');
        }
      }
    
    return(
        <div className='mint'>
            <h1>Balance is: {balance}</h1>
            <button onClick={mintNFT}>MINT NFT</button>
        </div>
    )
}