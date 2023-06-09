import React, { useEffect, useState,useCallback, useRef } from 'react'
import styled from 'styled-components'
import { useSortedRounds, usecurrentEpoch } from '../hooks/CustomHooks';
import {getCurrentTimeStamp} from '../hooks/getCurrentTimeStamp';
import { getCurentRound } from '../hooks/getcurrentRound';
import { useCountdown } from 'react-countdown-circle-timer';
// import useCountdown from '../hooks/useCountdown';

const StyledTimer = styled.div`
  
  svg {
    height: 100px;
    display: none;
  }
  
`
// console.log("CurrentRound",getCurentRound())

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
    }
  
    return (
      <div className="timer flex w-[110px] px-3 rounded-xl bg-slate-300 absolute top-2 h-[30px]">
        {/* <p className="text">Remaining</p> */}
        <p className="value">{remainingTime} </p>
        <p className="text"> seconds</p>
      </div>
    );
  };

  const getNow = () => Math.floor(Date.now() / 1000)

function Timer() {
  const {CurrentRound} = getCurentRound()
  // const {currentTimestamp } = getCurrentTimeStamp();
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timeover, setTimeover] = useState(false)
  // console.log("epoch",epoch)
  // const {CurrentTimestamp } = getCurrentTimeStamp();
  // const [timestamp, setTimestamp] = useState(CurrentTimestamp)
  // const {rounds} = useSortedRounds()
  // console.log("CurrentROund ",CurrentRound)
  let CurrentTimeStamp = parseInt(CurrentRound?.lockTimestamp._hex)

 
  
  
//   useEffect(() => {
//   if(timestamp != CurrentTimestamp){
//     setTimestamp(CurrentTimestamp)
//   }
// },)
  // let current 
  //  console.log("CurrentTimestamp",CurrentTimestamp)

  // useEffect(() => {
  //   const timer =
  //     correctTime > 0 &&
  //     setInterval(() => {
  //       setCorrectTime(correctTime - 1);
  //     }, 1000);
  //   return () => clearInterval(timer);
  // }, [correctTime]);

//  useEffect( ()=> {
//   // startClockFn(CurrentTimestamp)
//   // console.log("timestamp",timestamp - getNow())
//   console.log("Hi there I'm getting triggered")
//   // startClockFn(correctTime)
//   setCorrectTime(timestamp - getNow())
  
//  },[timestamp,setTimestamp,CurrentTimestamp])



//   const startClockFn = (totalTime) => {
//     const now = getNow()
//     totalTime = totalTime - now
//     const start = new Date()
//     console.log("Trigged")
//     // let secsFromLastPaused = 0
    
//     setClock(setInterval(() => {   
      
//       current = Number(((new Date() - start) / 1000).toFixed())
//     //  console.log("current",current)
//     // console.log("totalTime",totalTime)
//       // setSecsFromInitialStart(current)
//       current = totalTime - current
//       // console.log("current",current)
//       if( current <= 0) {
//         clearInterval(clock)
//         // setTimerSeconds(0)
//       }else {
//       setTimerSeconds(current)
//         // console.log("current",current)
//       }
//       // let mins = (current / 60).toString().split(".")[0].padStart(2, "0")
//       // let secs = (current % 60).toString().padStart(2, "0")
//       // setDisplay(`${mins}:${secs}`)
//     }, 1000))
// }

const accurateTimer = (callback, time = 1000) => {
  let nextAt
  let timeout
  nextAt = new Date().getTime() + time
  const wrapper = () => {
    nextAt += time
    timeout = setTimeout(wrapper, nextAt - new Date().getTime())
    callback?.()
  }
  const cancel = () => clearTimeout(timeout)
  timeout = setTimeout(wrapper, nextAt - new Date().getTime())
  return { cancel }
}

const getSecondsRemainingToNow = (timestamp) => {
  const now = getNow()
  console.log(now)
  // console.log( "True or False",Number.isFinite(timestamp) && timestamp > now ) 
  return  timestamp - now ;
}



const useCountdown = ( timestamp) => {
  const timerCancelRef = useRef(null)
  // console.log("timestamp",timestamp)
  let current = timestamp - getNow()
  // const [secondsRemaining, setSecondsRemaining] = useState(timestamp)
  const [secondsRemaining, setSecondsRemaining] = useState(current)
  useEffect(() => {
    setSecondsRemaining(current)
  },[current,timestamp,CurrentTimeStamp])

  // console.log("secondsRemaining",secondsRemaining)
  const [isPaused, setIsPaused] = useState(false)
  // const isWindowVisible = useIsWindowVisible()

  const pause = useCallback(() => setIsPaused(true), [setIsPaused])
  const unpause = useCallback(() => setIsPaused(false), [setIsPaused])

  useEffect(() => {
    let cancel
    if (!isPaused) {
      const { cancel: timerCancel } = accurateTimer(() => {
        setSecondsRemaining((prevSecondsRemaining) => {
          // if (prevSecondsRemaining) {
            return prevSecondsRemaining - 1
          // }
          // timerCancelRef.current?.()
          // return prevSecondsRemaining
        })
      })
      cancel = timerCancel
      timerCancelRef.current = timerCancel
    }

    return () => {
      cancel?.()
    }
  }, [isPaused, timestamp, setSecondsRemaining])

  // Pause the timer if the tab becomes inactive to avoid it becoming out of sync
  // useEffect(() => {
  //   if (isWindowVisible) {
  //     setSecondsRemaining(getSecondsRemainingToNow(timestamp))
  //     unpause()
  //   } else {
  //     pause()
  //   }
  // }, [pause, unpause, timestamp, setSecondsRemaining, isWindowVisible])

  return { secondsRemaining, pause, unpause }
}

  // let secRemaining = 1682249480;

  // useEffect(() => {
  const { secondsRemaining} = useCountdown(CurrentTimeStamp != NaN && Number(CurrentTimeStamp));
    // return { secondsRemaining}
// },[CurrentTimeStamp])
  // console.log("CurrentTimestamp", CurrentTimeStamp)
  
  // console.log("secondsRemaining ",secondsRemaining)
  

  

  
  return (
    <StyledTimer>
        <div className="timer flex px-5 py-3 w-[100px] md:w-[190px] justify-center rounded-3xl bg-slate-300 absolute top-[7rem] right-10 ">
          {/* {timerSeconds > 0 ? ( */}
            <p className="value font-semibold">{secondsRemaining < 0 | secondsRemaining === NaN ? "Closing" : secondsRemaining+ " Seconds" } </p>
        {/* // <p className="value">{timerSeconds} </p> */}
        {/* <p className="text font-semibold"> seconds</p> */}
      </div>
    </StyledTimer>
  )
}

export {Timer, useCountdown};