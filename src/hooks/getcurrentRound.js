import { useEffect, useState } from "react";

const { useSortedRounds, usecurrentEpoch } = require("./CustomHooks");

const getCurentRound = () => {
    const [CurrentRound, setCurrentRound] = useState();
    const {rounds} =  useSortedRounds()
    const {epoch} = usecurrentEpoch()
    // const [temrounds, settemrounds] = useState([]);
    // useEffect( () => {
        const fetchRound = async () => {
          const round = await rounds[2];
          console.log("round2",rounds[2])
          setCurrentRound(round);
        };
    
        fetchRound();
    //   }, [rounds]);
    // console.log("CurrentRound",CurrentRound)
    return {CurrentRound};
}

export {getCurentRound}