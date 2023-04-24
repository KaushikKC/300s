import React, { useEffect, useState } from 'react'
import eth from '../Images/Ethereum.png'
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import {usecurrentEpoch} from '../hooks/CustomHooks'

const TESTNET_PRICE_SERVICE = "https://xc-testnet.pyth.network"

const testnetConnection = new EvmPriceServiceConnection(TESTNET_PRICE_SERVICE)

const ETH_USD_TESTNET_PRICE_ID = [
  "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6"
]
function Menu() {

  const [ethPrice, setETHPrice] = useState(0)
  


  useEffect(() => {
   async function run() {
    testnetConnection.subscribePriceFeedUpdates(ETH_USD_TESTNET_PRICE_ID, async (priceFeed) => {
      const price = await priceFeed.getPriceNoOlderThan(60);
      setETHPrice(price);
      // console.log(`${JSON.stringify(price)}`)
    })
  }
  run()
  })
  

  return (
    <div className='w-[250px]'>
        <div className='flex bg-yellow-300 w-[]'>
            <img src={eth} alt="" />
            <div className='flex flex-row'>
                <h1>ETH/USD : </h1>
                {/* <p>
                  <span>
                    {ethPrice.getpriceAsNumberUnchecked().toFixed(3) +
                     "+" +
                     ethPrice.getConfAsNumberUnchecked().toFixed(3)}
                  </span>
                </p> */}
                <p>${(ethPrice?.price / 100000000).toFixed(4)} </p>
                
            </div>            
        </div>
        {/* <p>{epoch}</p> */}
    </div>
  )
}

export default Menu