
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';


function App() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')

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

  const connectWallet = async (e) => {
    e.preventDefault();
    if(!window.ethereum) {
      throw new Error('No crypto wallet found. Please install it.');
    }
    
    window.ethereum.request({method: 'eth_requestAccounts'}).then(res=>{
      console.log(res);
      setAccount(res[0]);
    })
  }

  const getMelkBalance = async (e) => {
    e.preventDefault();
    const melkTokenAddress = "0x9Fd41F6f67D4438f0e3Dc3951eAE0ad2093492Dd";
    const network = "matic";
    const provider = new ethers.providers.AlchemyProvider(network, process.env.ALCHEMY_API_KEY);
    if(!window.ethereum) {
      throw new Error('No crypto wallet found. Please install it.');
    }
    
    let contract = new ethers.Contract(melkTokenAddress, minABI, provider);
    let melkBalance = await Number(ethers.utils.formatEther(await contract.balanceOf(account)));
    console.log(melkBalance)
    setBalance(melkBalance);
  }

  const mintNFT = async (e) => {
    e.preventDefault();
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
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <h1>{account}</h1>
      <button onClick={getMelkBalance}>GetBalance</button>
      <h1>{balance}</h1>
      <button onClick={mintNFT}>Mint NFT</button>
      <p>Price: 86 MELK</p>
    </div>
  );
}

export default App;
