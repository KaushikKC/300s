import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading';
import Card from './Card';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Web3 from 'web3';
import {useSortedRounds, usecurrentEpoch} from '../hooks/CustomHooks';
import { getCurrentTimeStamp } from '../hooks/getCurrentTimeStamp';
import { getCurentRound } from '../hooks/getcurrentRound';
// import usecurrentEpoch from '../hooks/CustomHooks';
// import { ethers } from 'ethers';
// import { CONTACT_ABI, CONTACT_ADDRESS } from '../context/config';
// const ethers = require("ethers")
// import 'swiper/css';


const StyledSwiper = styled.div`
  .swiper-wrapper {
    align-items: center;
    display: flex;
  }

  .swiper-slide {
    width: 305px;
    
  }
`

function ListCard({signer, signerAddress}) {
  const {rounds} = useSortedRounds();
    const [components, setComponents] = useState([]);
    const [cards, setCards] = useState([]);
    const [OpenCard, setOpenCard] = useState();
    
    // const {epoch} = usecurrentEpoch();

    // console.log("currentRound",currentRound)

  useEffect(() => {
    // Add initial cards
    const initialCards = [
      { id: 1, type: 'open', number: 5 },
      { id: 2, type: 'live', number: 4 },
      { id: 3, type: 'past', number: 3 },
      { id: 4, type: 'past', number: 2 },
      { id: 5, type: 'past', number: 1 },
    ];
    setCards(initialCards);
    setOpenCard(5)

    // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    // const web3 = new Web3("https://cloudflare-eth.com");
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS)
    

    // console.log("Contract", daiContract)
    // async function sample() {
    //   const provider = await new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/9513cafc604b4355a04f38bcc71b8a84");
    //   // await provider.send('eth_requestAccounts', []);
    //   const daiContract = await new ethers.Contract(CONTACT_ADDRESS, CONTACT_ABI, provider);
    //   const sample = await daiContract.rounds(1);
    //   console.log("Sample",sample);
    // }
    // sample();
    // const sample = contactList.methods.currentEpoch().call((err,res) => {console.log(res)});
    // console.log(sample);
    // console.log("Rounds", rounds);
    // console.log("cards", cards.map(card => card.id ) );
    
    // Schedule card updates every 5 minutes
    const interval = setInterval(() => {
      setCards( prevCards => {
        // Add new open card
        const newOpenCard = { id: Date.now(), type: 'open', number: prevCards[0].number + 1 };
        const updatedCards = [newOpenCard, ...prevCards.slice(0, 4)];

        // Move cards one position backward
        // updatedCards.((card) => {
         
        updatedCards[2].type = updatedCards[2].type === 'live' && 'past' ;
        updatedCards[1].type = updatedCards[1].type === 'open' && 'live' ;
        setOpenCard(updatedCards[0].number)    
        
        // // updatedCards[1].type = card.type === 'open' ? 'live' : card.type;
        // });
          
        return updatedCards;
      });
    }, 10000);

    // // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Add a new component
  //     setComponents(prevComponents => [...prevComponents, <Card />]);

  //     // Remove the last component
  //     if (components.length >= 3) {
  //       setComponents(prevComponents => prevComponents.slice(1));
  //     }
  //   }, 10 * 1000); // 5 minutes in milliseconds

  //   return () => clearInterval(interval);
  // }, [components]);
  return (
    <StyledSwiper>
      <Swiper
        initialSlide={5}
        onSwiper={(swiper) => console.log(swiper) }
        spaceBetween={16}
        slidesPerView="auto"
        freeMode={{ enabled: true, sticky: true, momentumRatio: 0.25, momentumVelocityRatio: 0.5 }}
        centeredSlides
        mousewheel
        keyboard
        resizeObserver

      >
        
      {rounds.length > 2 ?
      <div>
        <div className='flex flex-row-reverse'>
      {rounds.slice(0).reverse().map(round => (
        <SwiperSlide key={parseInt(round.epoch._hex) } >
        <Card key={parseInt(round.epoch._hex)} card={round} signer={signer} signerAddress={signerAddress}  />
        </SwiperSlide>
      ))}
      </div>
      </div> :
      
      <div className='flex flex-col h-[600px] justify-center items-center'>
        <ReactLoading type='spinningBubbles' color='#111' height={120} width={120} />
        <p className='font-bold text-xl mt-5'>Loading</p>
      </div>
}
    
      </Swiper>
    </StyledSwiper>
  )
}

export default ListCard