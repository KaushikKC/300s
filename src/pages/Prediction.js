import React, { useState } from 'react'
import ListCard from '../Components/ListCard'
import Menu from '../Components/Menu'
import Navbar from '../Components/Navbar'
import {Timer} from '../Components/Timer'
import TradingViewWidget from '../Components/TradeViewChart'

function Prediction() {
  
  return (
    <div className='overflow-x-hidden bg-amber-100 h-screen'>
        <Navbar />
        <div className='flex '>
        <Menu />
        <Timer />
        </div>

        
        <ListCard />
        <TradingViewWidget />
    </div>
  )
}

export default Prediction