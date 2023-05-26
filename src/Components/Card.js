import React, { useEffect } from 'react'
import { getBets, usecurrentEpoch } from '../hooks/CustomHooks';
import LiveCard from './LiveCard'
import OpenCard from './OpenCard'
import PastCard from './PastCard'
import SoonRoundCard from './SoonRoundCard';
import { useAccount } from 'wagmi';

function Card({ card}) {
  const { address, connector : activeConnector, isConnected } = useAccount()
  const ledger = getBets(parseInt(card.epoch._hex),address)
  const hasEntered = ledger ? parseInt(ledger.bet?.amount?._hex) != 0 && ledger.bet != undefined  : false
  const hasEnteredUp = hasEntered && ledger.bet?.position === 0;
  const hasEnteredDown = hasEntered && ledger.bet?.position === 1;
  // console.log("card",card)
  // console.log("ledger",ledger)
  // console.log("hasEntered",hasEntered)
  const {epoch} = usecurrentEpoch();
  // console.log("epoch",parseInt(card.epoch._hex))

  // if (card.epoch > epoch) {
    
  // }
  useEffect(() => {
    const handleConnectorUpdate = ({account, chain}) => {
        if (account) {
          window.location.reload()
          console.log('new account', account)
        } else if (chain) {
          console.log('new chain', chain)
        }
      }
  
      if (activeConnector && isConnected) {
        activeConnector.on('change', handleConnectorUpdate)
      }
      if(isConnected) {
    return () => activeConnector.off('change', handleConnectorUpdate)
      }
    }, [activeConnector])

 
  if(parseInt(card.epoch._hex) === epoch) {
    return (
      <div>
        <OpenCard card={card}  epoch={epoch} hasEntered={hasEntered} hasEnteredUp={hasEnteredUp} hasEnteredDown={hasEnteredDown} />
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