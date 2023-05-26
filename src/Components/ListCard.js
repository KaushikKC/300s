import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading';
import Card from './Card';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide,useSwiper } from 'swiper/react';
import Web3 from 'web3';
import {useSortedRounds, usecurrentEpoch} from '../hooks/CustomHooks';
import { getCurrentTimeStamp } from '../hooks/getCurrentTimeStamp';
import { getCurentRound } from '../hooks/getcurrentRound';
import SwiperCore, { Keyboard, Mousewheel, FreeMode } from 'swiper'
import {AiOutlineCaretLeft,AiOutlineCaretRight} from 'react-icons/ai'
import {GiCard3Hearts} from 'react-icons/gi'


const StyledSwiper = styled.div`
  .swiper-wrapper {
    align-items: center;
    display: flex;
  }

  .swiper-slide {
    width: 305px;
    
  }
`

SwiperCore.use([Keyboard, Mousewheel, FreeMode]);

function ListCard() {
  // const swiper = useSwiper();
  const {rounds} = useSortedRounds();
    const [components, setComponents] = useState([]);
    const [cards, setCards] = useState([]);
    const [OpenCard, setOpenCard] = useState();
    const [calCard, setCalCard] = useState(false);
   
    const [swiperRef, setSwiperRef] = useState(null);
    
    const {epoch} = usecurrentEpoch();
    const {CurrentRound} = getCurentRound()

    // console.log("currentRound",currentRound)

    useEffect(() => {
      const setinitialcard = setTimeout(() => {
        setCalCard(false)
    },3000)
      
      let CurrentTimeStamp = parseInt(CurrentRound?.lockTimestamp._hex)
      let current = Math.floor(Date.now() / 1000);
      let time = CurrentTimeStamp - current;
      if(time > 0){
        const interval = setTimeout(() => {
          setCalCard(true)          
        }, time * 1000);
      }
    },[CurrentRound,epoch])

    const handleSlideToLive = () => {
      const current = rounds.findIndex((round) => parseInt(round.epoch._hex) === epoch)
      swiperRef.slideTo(current+1)
    }

  return (
    <StyledSwiper className='mt-12'>
      
      <div className='flex space-x-4 justify-center mb-6'>
      <button className='text-2xl text-orange-800' onClick={() => swiperRef.slidePrev()}><AiOutlineCaretLeft/></button>
      <button className='text-[50px] text-blue-900 rotate-[-30deg]' onClick={handleSlideToLive}><GiCard3Hearts/></button>
      <button className='text-2xl text-orange-800' onClick={() => swiperRef.slideNext()}>
         <AiOutlineCaretRight/> 
      </button>
      </div>
      
      <Swiper
        initialSlide={5}
        onSwiper={setSwiperRef} 
        spaceBetween={35}
        slidesPerView="auto"
        freeMode={{ enabled: true, sticky: true, momentumRatio: 0.25, momentumVelocityRatio: 0.5 }}
        centeredSlides
        mousewheel
        keyboard
        resizeObserver
        className='mt-10'

      >
        {/* <SwiperButtonPrev>Prev</SwiperButtonPrev> */}
       
        
      {rounds.length > 2 ?
      <div>
        <div className='flex flex-row-reverse'>
      {rounds.slice(0).reverse().map(round => (
        <SwiperSlide key={parseInt(round.epoch._hex) } >
        <Card key={parseInt(round.epoch._hex)} card={round}   />
        </SwiperSlide>
      ))}
      </div>
      </div> 
      

      :
      
      <div className='flex flex-col h-[600px] justify-center items-center'>
        <ReactLoading type='spinningBubbles' color='#111' height={120} width={120} />
        <p className='font-bold text-xl mt-5'>Loading</p>
      </div>
}
      {
        calCard &&
        <div className='h-screen z-20 absolute w-full bg-slate-200/95 top-0 flex flex-col justify-center items-center'>
        <ReactLoading type='bars' color='#111' height={120} width={120} />
        <p className='font-bold text-xl mt-5'>Calculating</p>
        </div>
      }
    
      </Swiper>
    </StyledSwiper>
  )
}

export default ListCard