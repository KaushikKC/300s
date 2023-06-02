import React from 'react'
import { getClaimable, getContract } from '../hooks/CustomHooks'
import { useAccount } from 'wagmi'
import { is } from 'date-fns/locale'
import { toast } from 'react-toastify'
const ethers = require("ethers")

function PastCard({ card}) {
  const { address, connector, isConnected } = useAccount()
  let closePrice = (parseInt(card?.closePrice._hex) / 100000000).toFixed(4)
  let lockPrice = (parseInt(card?.lockPrice._hex)  / 100000000).toFixed(4)
  let differnce = (closePrice - lockPrice).toFixed(4)
  let PoolPrice = ethers.utils.formatUnits(parseInt(card.totalAmount._hex).toString()) 
  let {claimable} = getClaimable(parseInt(card.epoch._hex),address)
  const {Contract} = getContract();
  let BullAmount = ethers.utils.formatUnits(parseInt(card.bullAmount._hex).toString())
  let BearAmount = ethers.utils.formatUnits(parseInt(card.bearAmount._hex).toString())
  let top =  PoolPrice / BullAmount 
  let bottom = PoolPrice /BearAmount
  // console.log("card",parseInt(card.epoch._hex))
  // console.log("claimable",claimable)

  const getClaimed = async () => {
    let date = new Date();
    let timestamp = Math.floor(Date.now() / 1000);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let result = await Contract.connect(provider.getSigner()).claim([parseInt(card.epoch._hex)],timestamp)
    try{
      await result.wait()
      toast.success("You have claimed your rewards",{position:'top-right',})
    }
    catch(e) {
      toast.error("Error in claiming your rewards",{position:'top-right',})
    }
    
  }


  return (
    <div className='text-white hex drop-shadow-xl opacity-75 hover:opacity-100 transition ease-in-out delay-250 duration-500 hover:-translate-y-1 hover:scale-110'>
        <div className='flex justify-center mx-3 mt-4 font-semibold text-lg'>
        <p>Past Card</p>
        </div>
        {
          claimable && isConnected &&
          <div className='flex justify-center'>
            <button onClick={getClaimed} className='px-4 py-2 flex  bg-black text-white my-3 rounded-xl font-semibold'>Claim Your Rewards</button>
          </div>
        }
        <div className='mt-4 flex flex-col items-center'>
        <div className='px-2 py-1 bg-green-300 rounded-lg flex flex-col items-center'>
            <p>UP</p>
            <p>{top > 0 ? top.toFixed(2)  : '0.00' }x</p>
          </div>
          <div className='ml-3 space-y-2'>
        <p> <span className='font-semibold'>Close Price:</span>  {closePrice}</p>
        <p><span className='font-semibold'>Lock Price:</span> {lockPrice}</p>
        <p><span className='font-semibold'>Pool Price:</span><br /> {Number(PoolPrice).toFixed(12)} ETH</p>
        </div>
        
        <div>

        <p className={`ml-3 ${differnce > 0 ? 'bg-green-500' : 'bg-red-500'} p-2`}>{differnce}</p>        
        <div className='px-2 py-1 bg-red-500 rounded-lg flex flex-col items-center'>
          <p>Down</p>
          <p>{bottom > 0 ? bottom.toFixed(2) : '0.00'}x</p>
        </div>
        </div>
        {/* <p>#{number}</p> */}
        </div>
    </div>
  )
}

export default PastCard