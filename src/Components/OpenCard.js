import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import { getContract } from '../hooks/CustomHooks';
import img from '../Images/arrow-left.svg'
const ethers = require("ethers")

function OpenCard({ card, signer,epoch }) {
  const [flip, setFlip] = useState(false);
  const [bet, setBet] = useState();
  const [amount, setAmount] = useState();
  const {Contract} = getContract();

  const betposition = (position) => {
    setFlip(!flip)
    setBet(position)
    setAmount()
  }

  const setBackFlip = () => {
    setFlip(!flip)
    setAmount(0)
  }

  const toWei = ether => ethers.utils.parseEther(ether)
  const bearbet = async () => { 
    const wei = toWei(amount)
    await Contract.connect(signer).betBear(epoch,{value:parseInt(wei._hex)})
  }

  const bullbet = async () => { 
    const wei = toWei(amount)
    console.log(parseInt(wei._hex))
    await Contract.connect(signer).betBull(epoch,{value:parseInt(wei._hex)})
  }
  return (
    <ReactCardFlip isFlipped={flip}>
    <div className='h-[410px] w-[300px] border'>
        <div className='flex justify-between mx-3 mt-4 font-semibold text-lg'>
        <p>Open Front Card</p>
        {/* <button onClick={() => setFlip(!flip)}>Flip</button> */}
        {/* <p>#{number}</p> */}
        </div>
        <div className='flex justify-center my-4'>
          <button onClick={() => betposition('UP')} className='px-10 py-5 bg-green-500 text-white'>UP</button>
        </div>
        <div className='flex justify-center my-4'>
          <button onClick={() => betposition('DOWN')} className='px-10 py-5 bg-red-500 text-white'>DOWN</button>
        </div>
    </div>
    <div className='h-[410px] w-[300px] border'>
      {bet === 'UP' ?
      <div>
        <div className='flex  mx-3 mt-4 font-semibold text-lg'>
        {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
         */}
        <img onClick={() => setBackFlip()} className='w-[25px] cursor-pointer' src={img} alt="" />
        <div className='flex justify-center mx-auto'>
        <p>Up Position</p>
        </div>
        </div>
        <div className='my-10 mx-10'>
          <input className='p-5' value={amount} placeholder='Enter the amount' onChange={e => setAmount(e.target.value)} />
          
        </div>
        <div className='flex justify-center'>
        <p onClick={() => bullbet()} className='cursor-pointer px-7 py-2 bg-green-500 rounded-lg text-lg text-white font-semibold'>Bet</p>
        </div>
        
        {/* <button >Flip</button> */}
        </div>
        :
        <div>
        <div className='flex  mx-3 mt-4 font-semibold text-lg'>
          <img onClick={() => setBackFlip()} className='w-[25px] cursor-pointer' src={img} alt="" />
          <div className='flex justify-center mx-auto'>
        <p>Down Position</p>
        </div>
        </div>
        <div className='my-10 mx-10'>
          <input className='p-5' value={amount} placeholder='Enter the amount' onChange={e => setAmount(e.target.value)}/>
        </div>
        <div className='flex justify-center'>
        <p onClick={() => bearbet()} className='cursor-pointer px-7 py-2 bg-red-500 rounded-lg text-lg text-white font-semibold'>Bet</p>
        </div>
          {/* <button onClick={() => setFlip(!flip)}>Flip</button> */}
        </div>
}
    </div>
    </ReactCardFlip>
  )
}

export default OpenCard