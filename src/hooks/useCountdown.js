import { useCallback, useEffect, useRef, useState } from "react"

const getNow = () => Math.floor(Date.now() / 1000)

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
    console.log(Number.isFinite(timestamp) && timestamp > now ) 
    return Number.isFinite(timestamp) && timestamp > now ? timestamp - now : 0
  }
  
  /**
   * Consider this moving up to the global level
   */
  const useCountdown = (timestamp = 1682170427+180) => {
    const timerCancelRef = useRef(null)
    const [secondsRemaining, setSecondsRemaining] = useState(() => getSecondsRemainingToNow(timestamp))
    const [isPaused, setIsPaused] = useState(false)
    // const isWindowVisible = useIsWindowVisible()
  
    const pause = useCallback(() => setIsPaused(true), [setIsPaused])
    const unpause = useCallback(() => setIsPaused(false), [setIsPaused])
  
    useEffect(() => {
      let cancel
      if (!isPaused) {
        const { cancel: timerCancel } = accurateTimer(() => {
          setSecondsRemaining((prevSecondsRemaining) => {
            if (prevSecondsRemaining) {
              return prevSecondsRemaining - 1
            }
            timerCancelRef.current?.()
            return prevSecondsRemaining
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
    useEffect(() => {
      if (isWindowVisible) {
        setSecondsRemaining(getSecondsRemainingToNow(timestamp))
        unpause()
      } else {
        pause()
      }
    }, [pause, unpause, timestamp, setSecondsRemaining, isWindowVisible])
  
    return { secondsRemaining, pause, unpause }
  }
  
  export default useCountdown