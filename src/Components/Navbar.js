import React, { useState } from 'react'
import {MdOutlineArrowDropDown} from 'react-icons/md'
import { getProvider } from '../hooks/CustomHooks'
import etherum from '../Images/Ethereum.png'
// import {MdOutlineArrowDropDown} from 'react-icons/md'


function Navbar({signer, setSigner, setSignerAddress, signerAddress}) {
  const {provider} = getProvider()
  
  const connect = async () => {
    await getSigner(provider)
      .then(signer => {
        setSigner(signer)
        // setChainid(1)
        console.log('connect')
    })
  }

  const getSigner = async provider => {
    const signer = provider.getSigner();

    await signer.getAddress()
      .then((address) => {
        setSignerAddress(address)
      })

    return signer;
  }

  return (
    <div className='flex justify-between px-4'>
      <div className='mt-3 p-4 ml-5 font-bold text-2xl'>
        <h1>300S</h1>
      </div>
      <div className='mt-4 mr-2 flex'>
        <div className='px-3 py-2 h-10 mt-2 items-center flex bg-slate-300 mr-6 font-semibold cursor-pointer rounded-xl'>
          <p>Arbitrum</p>
          <MdOutlineArrowDropDown />
        </div>
      {!signerAddress ?
      <button className='cursor-pointer h-12 sm:px-3 sm:py-1  md:px-5 mt-1 md:py-3 bg-gray-300 font-semibold rounded-xl' onClick={connect}>Connect</button> 
         : <p className='h-12 sm:px-3 sm:py-1  md:px-5 mt-1 md:py-3 bg-gray-300 font-semibold rounded-xl'>{signerAddress.slice(0,4)+ '....' + signerAddress.slice(-4)}</p>
        }
        </div>
         </div>
  )
}

export default Navbar