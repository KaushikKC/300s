import React from 'react'

function SoonRoundCard({card}) {
  return (
    <div className='h-[410px] w-[300px] border'>
        <div className='flex justify-between mx-3 mt-4 font-semibold text-lg'>
        <p>Soon Card</p>
        <p>{parseInt(card.epoch._hex)}</p>
        {/* <p>{card.epoch}</p> */}
        </div>
    </div>
  )
}

export default SoonRoundCard