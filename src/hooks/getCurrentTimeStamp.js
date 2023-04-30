import { useEffect, useState } from "react";
import { useSortedRounds } from "./CustomHooks";
import { getCurentRound } from "./getcurrentRound";


const getCurrentTimeStamp = () => {
    const [currentTimestamp, setCurrentTimestamp] = useState();
    const { rounds } = useSortedRounds();

    const { CurrentRound } = getCurentRound();
    // console.log("currentRound",currentRound)
        // setCurrentTimestamp(parseInt(currentRound?.lockTimestamp._hex));
  
    useEffect(() => {
      const fetchTimestamp = async () => {
        // const { CurrentRound } = getCurentRound();
        setCurrentTimestamp(parseInt(CurrentRound?.lockTimestamp._hex));
      };
  
      fetchTimestamp();
    }, [rounds]);
    
    // console.log("currentTimestamp",currentTimestamp)
    return {currentTimestamp };
  };

export {getCurrentTimeStamp}