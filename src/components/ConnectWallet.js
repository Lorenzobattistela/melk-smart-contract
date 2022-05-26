import '../App.css';
import { ethers } from 'ethers';

export default function ConnectWallet({account, setAccount, balance}){
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

    return(
        <div className='connect-wallet'>
            <button className='connect-button' onClick={connectWallet}>Connect Wallet</button>
        </div>
    )
}