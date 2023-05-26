import { useState, useEffect } from 'react';
import { CONTACT_ABI, CONTACT_ADDRESS } from '../context/config';
import { fromUnixTime } from 'date-fns';
const ethers = require("ethers")


// const provider =  new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/9513cafc604b4355a04f38bcc71b8a84")
const provider =  new ethers.providers.JsonRpcProvider("https://testnet.era.zksync.dev")
// const provider =  new ethers.providers.JsonRpcProvider("https://goerli-rollup.arbitrum.io/rpc")
const Contract = new ethers.Contract(CONTACT_ADDRESS, CONTACT_ABI, provider);

 


const usecurrentEpoch = () => {
    const [epoch, setEpoch] = useState(0);
    useEffect(() => {
        const getEpoch = async () => {
            const epoch = await Contract.currentEpoch();
            setEpoch(parseInt(epoch._hex));
        };

        Contract.on('epochUpdate', getEpoch);

        getEpoch();

        return () => {
          Contract.off('epochUpdate', getEpoch);
    };

    },[] )
    
    return {epoch};
}

const useSortedRounds = () =>{
    const [rounds, setRounds] = useState([]);

  const { epoch } = usecurrentEpoch();

  useEffect(() => {
    const fetchRounds = async () => {
      const fetchedRounds = [];

      for (let i = 0; i < 4; i++) {
        if (epoch - i <= 0) {
          break;
        }
        // console.log("epoch",epoch - i )
        const roundData = await Contract.rounds(epoch - i);
        fetchedRounds.push(Object.assign({}, roundData));
      }

      setRounds([
        { epoch: epoch + 2 },
        { epoch: epoch + 1 },
        ...fetchedRounds,
      ]);
    };

    fetchRounds();
  }, [epoch]);
  // console.log("rounds",rounds)
  return { rounds };
    // const [rounds, setRounds] = useState([]);
    // // let rounds = [];
    // const {epoch} = usecurrentEpoch()
    // useEffect(() => {
    //     // setRounds([]);
    //     let tempepoch = epoch;
    //     const getRounds = async () => {
    //         // setRounds([]);
            
    //         for (let i = 0; i < 4; i++) {
    //             if(tempepoch <= 0){ break }
    //             const temprounds = await Contract.rounds(tempepoch);
    //             // console.log("temprounds",Object.assign({},temprounds))
    //             rounds[i+2] = Object.assign({},temprounds);
    //             // console.log("rounds",rounds[i])
    //             tempepoch = tempepoch - 1;
    //             // console.log("tempepoch",tempepoch)
    //         }
    //         rounds[0] = {epoch:epoch+1};
    //         rounds[1] = {epoch:epoch+2};
    //         // console.log("roundof1",rounds[2])
    //     };
    //     getRounds();
    // },[epoch])
    // // console.log("roundsof2",rounds )

    // return {rounds};
}

const getBets = (epoch, address) => {
  const [bet,setBet] = useState()

  useEffect( () => {
    const fetchBets = async () => {
      let betinfo = await Contract.ledger(epoch,address)
      setBet(betinfo)
    }
    Contract.on('BetBear', fetchBets);
    Contract.on('BetBull', fetchBets);
    fetchBets()

    return () => {
      Contract.off('BetBear', fetchBets);
      Contract.off('BetBull', fetchBets);
    };

  },[])

  return {bet}
}



const getContract = () => {
    return {Contract};
}

const getClaimable  = (epoch,address) => {
  const [claimable,setClaimable] = useState()

  useEffect(() => {
    const fetchClaimable = async () => {
      let claimableinfo = await Contract.claimable(epoch,address)
      setClaimable(claimableinfo)
    }
    Contract.on('Claim', fetchClaimable);
    fetchClaimable()
    return () => {
      Contract.off('Claim', fetchClaimable);
    }
  },[epoch,address])

  return {claimable}
}

// const getCurentRound = () => {
//     const [CurrentRound, setCurrentRound] = useState();
//     const [temrounds, settemrounds] = useState([]);
//     const Cround = async () => {
//         const {rounds} = useSortedRounds()
//         useEffect( () => {
//             console.log("roundinside",rounds)
//             const CurrentRoundtem = temrounds[2];
//         console.log("temRounded1",rounds[0])
//         console.log("temRounded3",rounds[2])
//         setCurrentRound(CurrentRoundtem);
//         },[rounds])
        
//     }
//     Cround();
//     return {CurrentRound};
// }

// const getCurrentTimeStamp = () => {
//     const [CurrentTimestamp, setCurrentTimestamp] = useState();
//     //  const {epoch} = usecurrentEpoch()
//     const Ctime = async () => {
//         const {CurrentRound} = getCurentRound()
//         console.log("CurrentRound",CurrentRound)
//         setCurrentTimestamp(parseInt(CurrentRound.lockTimestamp._hex));
//     }
//     Ctime();
//     return {CurrentTimestamp};
// }

const getProvider = () => {
    const [provider, setProvider] = useState();

    useEffect (() => {
    
        const onLoad = async () => {
        const provider = await new ethers.providers.Web3Provider(window.ethereum)
            await provider.send('eth_requestAccounts', []);
            setProvider(provider)
            // const {chainId} = await provider.getNetwork()
            // if(chainId != 1){
            //   await handleNetworkSwitch('eth')
            //   setChainid(1)
            // }
          }
        onLoad()
      },[])
    return {provider};
}

export {usecurrentEpoch,useSortedRounds,getContract, getProvider,getBets,getClaimable};
// export default useSortedRounds;
// export default usecurrentEpoch;