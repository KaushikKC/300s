import React from 'react'
import { usecurrentEpoch } from '../hooks/CustomHooks';
import LiveCard from './LiveCard'
import OpenCard from './OpenCard'
import PastCard from './PastCard'
import SoonRoundCard from './SoonRoundCard';

function Card({ card,signer}) {
  const {epoch} = usecurrentEpoch();
  // console.log("epoch",parseInt(card.epoch._hex))

  // if (card.epoch > epoch) {
    
  // }

  if(parseInt(card.epoch._hex) === epoch) {
    return (
      <div>
        <OpenCard card={card} signer={signer} epoch={epoch} />
      </div>
    )
  }

  if (parseInt(card.epoch._hex) === epoch-1) {
    return (
      <div>
        <LiveCard card={card} />
      </div>
    )
  }
  if(parseInt(card.epoch._hex) < epoch-1){
  return (
    <div>
      <PastCard card={card} />

    </div>
  )
  }

  return (
    <div>
      <SoonRoundCard   />
    </div>
  )
}

export default Card