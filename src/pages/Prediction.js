import React, { useState } from 'react'
import ListCard from '../Components/ListCard'
import Menu from '../Components/Menu'
import Navbar from '../Components/Navbar'
import Timer from '../Components/Timer'
import TradingViewWidget from '../Components/TradeViewChart'

function Prediction() {
  const [signer, setSigner] = useState();
  const [signerAddress, setSignerAddress] = useState();
  return (
    <div>
        <Navbar signer={signer} setSigner={setSigner} setSignerAddress={setSignerAddress} signerAddress={signerAddress}/>
        <div className='flex '>
        <Menu />
        <Timer />
        </div>

        
        <ListCard signer={signer} signerAddress={signerAddress}/>
        <TradingViewWidget />
    </div>
  )
}

export default Prediction