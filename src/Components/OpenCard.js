import React, { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import { getContract } from '../hooks/CustomHooks';
import img from '../Images/arrow-left.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAccount, useWalletClient,usePublicClient,useBalance } from 'wagmi';
import { is } from 'date-fns/locale';
const ethers = require("ethers")


function OpenCard({ card,signerAddress, signer,epoch, hasEntered, hasEnteredUp, hasEnteredDown}) {
  const [flip, setFlip] = useState(false);
  const [bet, setBet] = useState();
  const [amount, setAmount] = useState();
  const {Contract} = getContract();
  const { data: walletClient } = useWalletClient()
  const { address, connector, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const { data: balance } = useBalance({address: address})


  const betposition = (position) => {
    if(walletClient === undefined) {
      toast.warning("Please Connect Your Wallet", {
        position:'top-right',
      })
      return
    }
    setFlip(!flip)
    setBet(position)
    setAmount()
  }

  const setInput = (percent) => {
    
    let sampleAmount = percent / 100 * balance.formatted
    setAmount(sampleAmount.toFixed(9))
  }

  const setBackFlip = () => {
    setFlip(!flip)
    setAmount(0)
  }

  const toWei = ether => ethers.utils.parseEther(ether)
  const bearbet = async () => { 
    if(amount === 0 | balance.formatted === 0 | amount === undefined | balance === undefined) {
      toast.warning("Please Enter a Valid Amount", {})
    }
    let date = new Date();
    let timestamp = Math.floor(Date.now() / 1000);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wei = toWei(amount)
    let result = await Contract.connect(provider.getSigner()).betBear(epoch,timestamp,{value:parseInt(wei._hex)})
    await result.wait()
    setFlip(!flip)
    toast("You have sumbitted your Bet",{position:'top-right',})
  }

  const bullbet = async () => {
    if(amount === 0 | balance.formatted === 0 | amount === undefined | balance === undefined) {
      toast.warning("Please Enter a Valid Amount", {})
    }
    let date = new Date();
    let timestamp = Math.floor(Date.now() / 1000); 
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wei = toWei(amount)
    let result = await Contract.connect(provider.getSigner()).betBull(epoch,timestamp,{value:parseInt(wei._hex)})
    try{
      await result.wait()
    setFlip(!flip)
    toast("You have sumbitted your Bet",{position:'top-right',})
    }
    catch(e) {
      toast.error("Transaction Failed",{position:'top-right',})
    }
  }
  return (
    <ReactCardFlip isFlipped={flip}>
    {
      
      hasEntered && isConnected ?
      <div className=' mx-auto  flex-col justify-center items-center  text-white hex drop-shadow-xl'>
        <div className='flex flex-col justify-center items-center h-full'>
        {
          hasEnteredUp ?
          <div className='flex flex-col mt-[-40px] justify-center items-center'>
            <svg width="80" height="106" viewBox="0 0 155 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.257812 52.3254V75.3617H154.093V52.1931C154.093 46.6607 151.23 41.5222 146.525 38.6107L91.2086 4.37623C83.2607 -0.542551 73.2301 -0.605728 65.2209 4.21255L7.99675 38.6382C3.19469 41.5271 0.257812 46.7213 0.257812 52.3254Z" fill="#6C7E93"/>
</svg>
<p  className='font-semibold text-lg'>You Entered UP</p>
          </div>
          :
          <div className='flex flex-col justify-center items-center '>
            <p className='font-semibold text-lg'>You Entered DOWN</p>
            <svg width="80" height="106" viewBox="0 0 155 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.257751 23.3904V0.354103H154.093V23.5228C154.093 29.0552 151.23 34.1936 146.525 37.1051L91.2085 71.3396C83.2607 76.2584 73.23 76.3215 65.2208 71.5033L7.99669 37.0776C3.19462 34.1887 0.257751 28.9945 0.257751 23.3904Z" fill="#66788C"/>
</svg>

          </div>
        }
        
        </div>
      </div>
      :
      <div className='text-white hex drop-shadow-xl '>
        
        <div className='flex justify-center mx-3 mt-4 font-semibold text-lg '>
        <p>Open Front Card</p>
        
        </div>
        <div className='flex justify-center my-5'>
          <button onClick={ () => betposition('UP') } className='px-10 py-5 bg-green-500 rounded-lg text-white'>UP</button>
          
        </div>
        <div className='flex justify-center my-5'>
          <button onClick={() => betposition('DOWN')} className='px-10 py-5 bg-red-500 rounded-lg text-white'>DOWN</button>
  
        </div>
    </div>
    }
    
    <div className='text-white hex drop-shadow-xl'>
      {bet === 'UP' ?
      <div>
        <div className='flex  mx-3 mt-4 font-semibold text-lg'>
        
        <img onClick={() => setBackFlip()} className='w-[25px] cursor-pointer' src={img} alt="" />
        <div className='flex justify-center mx-auto'>
        <p>Up Position</p>
        </div>
        </div>
        
        {
          balance?.formatted > 0  ?
          <div>
            <div className='my-10 mx-10'>
          <input className='p-5 w-[225px] text-black' value={amount} placeholder='Enter the amount' onChange={e => setAmount(e.target.value)}/>
        </div>
          <div className='flex mb-5 rounded-lg opacity-80' >
          <p className='p-3 w-16 bg-amber-900' onClick={() => setInput(10)}>10%</p>
          <p className='p-3 w-16 bg-amber-900' onClick={() => setInput(25)}>25%</p>
          <p className='p-3 w-16 bg-amber-900' onClick={() => setInput(50)}>50%</p>
          <p className='p-3 w-16 bg-amber-900' onClick={() => setInput(75)}>75%</p>
          <p className='p-3 w-16 bg-amber-900' onClick={() => setInput(100)}>Max</p>
        </div>
        </div>
        :
        <div>
          <div className='my-10 mx-10'>
          <input className='p-5 w-[225px] text-black' value={amount} placeholder='Enter the amount' disabled onChange={e => setAmount(e.target.value)}/>
        </div>
        <div className='my-4 flex justify-center text-yellow-300 text-lg opacity-50'>
          <p>You have Insuffient Balance</p>
        </div>
        </div>
      }
        
        <div className='flex justify-center'>
        <p onClick={() => bullbet()} className='cursor-pointer px-7 py-2 bg-green-500 rounded-lg text-lg text-white font-semibold'>Bet</p>
        </div>
        
        
        </div>
        :
        <div>
        <div className='flex  mx-3 mt-4 font-semibold text-lg'>
          <img onClick={() => setBackFlip()} className='w-[25px] cursor-pointer' src={img} alt="" />
          <div className='flex justify-center mx-auto'>
        <p>Down Position</p>
        </div>
        </div>
        
        {
          balance?.formatted > 0 ?
          <div>
            <div className='my-10 mx-10'>
          <input className='p-5 w-[225px] text-black' value={amount} placeholder='Enter the amount' onChange={e => setAmount(e.target.value)}/>
        </div>
          <div className='flex mb-5 rounded-lg opacity-80' >
          <p className='p-3 w-16 bg-amber-900' onClick={() => setInput(10)}>10%</p>
          <p className='p-3 w-16 bg-amber-900' onClick={() => setInput(25)}>25%</p>
          <p className='p-3 w-16 bg-amber-900' onClick={() => setInput(50)}>50%</p>
          <p className='p-3 w-16 bg-amber-900' onClick={() => setInput(75)}>75%</p>
          <p className='p-3 w-16 bg-amber-900' onClick={() => setInput(100)}>Max</p>
        </div>
        </div>
        :
        <div>
          <div className='my-10 mx-10'>
          <input className='p-5 w-[225px] text-black' value={amount} placeholder='Enter the amount' disabled onChange={e => setAmount(e.target.value)}/>
        </div>
        <div className='my-4 flex justify-center text-yellow-300 text-lg opacity-50'>
          <p>You have Insuffient Balance</p>
        </div>
        </div>
      }
        <div className='flex justify-center'>
        <p onClick={() => bearbet()} className='cursor-pointer px-7 py-2 bg-red-500 rounded-lg text-lg text-white font-semibold'>Bet</p>
        </div>
          
        </div>
}
    </div>
    </ReactCardFlip>
  )
}

export default OpenCard