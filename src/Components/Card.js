import React from 'react'
import { getBets, usecurrentEpoch } from '../hooks/CustomHooks';
import LiveCard from './LiveCard'
import OpenCard from './OpenCard'
import PastCard from './PastCard'
import SoonRoundCard from './SoonRoundCard';

function Card({ card,signer,signerAddress}) {
  const ledger = getBets(parseInt(card.epoch._hex),signerAddress)
  const hasEntered = ledger ? parseInt(ledger.amount?._hex) != 0 : false
  const hasEnteredUp = hasEntered && ledger.position === 0;
  const hasEnteredDown = hasEntered && ledger.position === 1;
  // console.log("card",card)
  // console.log("ledger",ledger)
  // console.log("hasEntered",hasEntered)
  const {epoch} = usecurrentEpoch();
  // console.log("epoch",parseInt(card.epoch._hex))

  // if (card.epoch > epoch) {
    
  // }

  if(parseInt(card.epoch._hex) === epoch) {
    return (
      <div>
        <OpenCard card={card} signer={signer} epoch={epoch} hasEntered={hasEntered} hasEnteredUp={hasEnteredUp} hasEnteredDown={hasEnteredDown} />
      </div>
    )
  }

  if (parseInt(card.epoch._hex) === epoch-1) {
    return (
      <div>
        <LiveCard card={card} hasEntered={hasEntered} hasEnteredUp={hasEnteredUp} hasEnteredDown={hasEnteredDown} />
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
  if(card.epoch > epoch){
  return (
    <div>
      <SoonRoundCard  card={card}  />
    </div>
  )
  }
}

export default Card