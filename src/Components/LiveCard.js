import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import Web3 from 'web3'
const ethers = require("ethers")


const TESTNET_PRICE_SERVICE = "https://xc-testnet.pyth.network"

const testnetConnection = new EvmPriceServiceConnection(TESTNET_PRICE_SERVICE)

const ETH_USD_TESTNET_PRICE_ID = [
  "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6"
]

function LiveCard({ card, hasEntered, hasEnteredUp, hasEnteredDown}) {
  const [ethPrice, setETHPrice] = useState(0)
  const { address, connector, isConnected } = useAccount()
  
  let livePrice = (ethPrice?.price / 100000000).toFixed(4);
  let lockedPrice = (parseInt(card.lockPrice._hex) / 100000000).toFixed(4)
  let PoolPrice = ethers.utils.formatUnits(parseInt(card.totalAmount._hex).toString()) 
  let difference = (livePrice - lockedPrice).toFixed(4)
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
    <div className='text-white hex drop-shadow-xl transition ease-in-out delay-250 duration-500 hover:-translate-y-1 hover:scale-110'>
        <div className='flex justify-center mx-3 mt-4 font-semibold text-lg'>
        <p>Live Card</p>
      
        </div>
        {hasEntered && isConnected &&
          <div className='flex justify-center'>
          <p className='font-semibold text-lg px-3 py-2 border bg-orange-800 rounded-xl mt-3'>Entered: {hasEnteredUp ? "UP" : "Down"}</p>
          </div>
        }
        <div className='flex mt-7 items-center'>
        <div className='ml-3 space-y-2'>
          <p><span className='font-semibold'>Last Price:</span>  ${livePrice}</p>
        <p><span className='font-semibold'>Lock Price:</span> {lockedPrice}</p>
        <p><span className='font-semibold'>Pool Price:</span><br /> {Number(PoolPrice).toFixed(12)} ETH</p>
        </div>
        <p className={`ml-3 ${difference > 0 ? 'bg-green-500' : 'bg-red-500'} p-2`}>{difference }</p>
        </div>
        
    </div>
  )
}

export default LiveCard