import React, { useState } from 'react'
import {MdOutlineArrowDropDown} from 'react-icons/md'
import { getProvider } from '../hooks/CustomHooks'
import etherum from '../Images/Ethereum.png'


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
    <div>
      {!signerAddress ?
      <button className='cursor-pointer h-12 sm:px-3 sm:py-1  md:px-5 mt-1 md:py-3 bg-white font-semibold rounded-xl' onClick={connect}>Connect</button> 
         : <p className='h-12 sm:px-3 sm:py-1  md:px-5 mt-1 md:py-3 bg-white font-semibold rounded-xl'>{signerAddress.slice(0,4)+ '....' + signerAddress.slice(-4)}</p>
        }
         </div>
  )
}

export default Navbar