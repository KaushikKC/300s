import React from 'react'

function PastCard({ card}) {
  return (
    <div className='h-[410px] w-[300px] border'>
        <div className='flex justify-between mx-3 mt-4 font-semibold text-lg'>
        <p>Past Card</p>
        </div>
        <div>
        <p>Close Price {parseInt(card?.closePrice._hex)}</p>
        <p>Lock Price {parseInt(card?.lockPrice._hex)}</p>
        
        
        {/* <p>#{number}</p> */}
        </div>
    </div>
  )
}

export default PastCard