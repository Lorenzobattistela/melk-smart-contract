
import './App.css';
import { useState } from 'react';

import MintNft from './components/MintNft';
import InformationBoard from './components/InfoBoard';
import ConnectWallet from './components/ConnectWallet';

function App() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')

  return(
    <div>
      <ConnectWallet account={account} setAccount={setAccount} balance={balance} />
      <InformationBoard/>
      <MintNft account={account} balance={balance} setBalance={setBalance}/>
    </div>
  );
}

export default App;