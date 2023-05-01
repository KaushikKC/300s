import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import React, { useEffect, useState } from 'react'


const TESTNET_PRICE_SERVICE = "https://xc-testnet.pyth.network"

const testnetConnection = new EvmPriceServiceConnection(TESTNET_PRICE_SERVICE)

const ETH_USD_TESTNET_PRICE_ID = [
  "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6"
]

function LiveCard({ card, hasEntered, hasEnteredUp, hasEnteredDown}) {
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
    <div className='h-[410px] w-[300px] border'>
        <div className='flex justify-between mx-3 mt-4 font-semibold text-lg'>
        <p>Live Card</p>
      
        </div>
        {hasEntered && 
          <>
          <p>Entered: {hasEnteredUp ? "UP" : "Down"}</p>
          </>
        }
        <div>
          <p>Last Price ${(ethPrice?.price / 100000000).toFixed(4)}</p>
        <p>Lock Price {parseInt(card.lockPrice._hex)}</p>
        </div>
        
    </div>
  )
}

export default LiveCard