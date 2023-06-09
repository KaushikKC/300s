import React, { useEffect, useRef, useState } from 'react'
import {MdOutlineArrowDropDown} from 'react-icons/md'
import { getProvider } from '../hooks/CustomHooks'
import etherum from '../Images/Ethereum.png'
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'

import { is } from 'date-fns/locale'
// import {MdOutlineArrowDropDown} from 'react-icons/md'

const SupotedChainIds = [324,280,1,11155111];

function Navbar() {
  const [popup, setPopup] = useState(false)
  const [Switch, setSwitch] = useState(false)
  const { connect, connectors, error, pendingConnector } =
    useConnect({chainId: 324})
    const { address, connector, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { chain } = useNetwork()
  const { chains,isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()
  const setconnect = async (connector) => {
    await connect({connector})
    setPopup(false)
  }
  const doswitchNetwork = async (chainId) => {
    await switchNetwork?.(chainId)
    setSwitch(false)
  }

  useEffect(() => {
    // window.location.reload(false);
  },[address])


  useEffect(() => {
    console.log("chainID",chain?.id)
    if (!SupotedChainIds.includes(chain?.id) && chain?.id !== undefined ){
          disconnect()
          toast.error('Please switch to supported network')
        }
  }, [chain])


  return (
    <div className='bg-gray-800 py-2'>
      <ToastContainer style={{position: 'absolute',top: '7em',right: '0em'}}
        position='top-right'
      />
    
    <div className='flex pl-4 md:px-4'>
      
      <div className='mt-3 md:p-4 py-4 md:ml-5 font-bold text-xl md:text-2xl text-white'>
        <h1>300S</h1>
      </div>
      <div className='mt-4 ml-auto mr-2 flex'>
        <div className='px-3 py-4 h-10 mt-2 w-[110px] md:w-[220px] items-center text-center text-[10px] md:text-[15px] flex justify-center capitalize bg-amber-300 z-[15] mr-4 md:mr-6 font-semibold cursor-pointer rounded-xl' onClick={() => setSwitch(!Switch)}>
          <p>{isConnected ? chain?.name : "No Networks"}</p>
          <MdOutlineArrowDropDown className='text-[25px]'/>
        </div>
        {Switch && isConnected &&
        <div className='flex flex-col absolute h-[200px] md:h-[180px] top-[60px] z-10 w-[170px] md:w-[210px] ml-[-25px] rounded-lg md:ml-1 bg-amber-600  text-white pt-4  rounded-b-xl justify-evenly font-semibold'>
          {chains.map((x) => (
            <button
              disabled={!switchNetwork || x.id === chain?.id}
              key={x.id}
              onClick={() => doswitchNetwork(x.id)}
              className='cursor-pointer hover:bg-amber-800/50 w-full py-2 '
             
            >
              {x.name}
              {isLoading && pendingChainId === x.id && ' (switching)'}
            </button>
          ))}
          </div>
        }
      {!isConnected ?
      <button className='cursor-pointer h-12 px-3 sm:py-1  md:px-5 mt-1 md:py-3 bg-orange-800 text-white font-semibold rounded-xl' onClick={() => setPopup(true)}>Connect</button> 
          : <button className='h-12 px-3 sm:py-1  md:px-5 mt-1 md:py-3 bg-orange-800 text-white font-semibold rounded-xl' onClick={disconnect}>{address.slice(0,4)+ '....' + address.slice(-4)}</button>
        } 
        </div>
        {
          popup && !isConnected &&
          <div >
            <div className='absolute top-0 right-0 h-screen w-screen bg-black bg-opacity-50 z-50 flex justify-center items-center'  >
            <div className='w-[729px] h-[490px] bg-[#27262c] ' >
              <h1 className='ml-auto mr-4 px-4 py-2 w-[75px] mt-4 bg-white rounded-lg font-bold cursor-pointer' onClick={() => setPopup(false)}>Close</h1>
              <div className='h-[440px] mx-10 flex flex-col justify-evenly  rounded-lg'>
              {
                connectors.map(connector => (
                  <button
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => setconnect(connector)}
                  className='flex h-[60px] justify-center items-center font-bold  bg-[#dcdcdc] rounded-lg'
                  >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
          {/* {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'} */}
                  </button>
                ))
              }
              </div>
              </div>  
            </div>
          </div>
        }
         </div>
         </div>
  )
}

export default Navbar