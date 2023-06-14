const { ethers, network, run } = require("hardhat");

async function callExec() {
const PredictionsContract = await ethers.getContractFactory("ThreeHundredSeconds");
const predictionsContract = PredictionsContract.attach("0xb06e2c050e95f084D2A83DdC23B56B501E3C3A2D");

let date = new Date();
let timestamp = Math.floor(Date.now() / 1000);
let response = await predictionsContract.pause();
// let response = await predictionsContract.genesisStartRound(timestamp);
// let response = await predictionsContract.genesisLockRound(0,timestamp);

    console.log(response)
    try{
      let recipt = await response.wait();
      console.log("Transaction success");
    } catch(e) {
      console.log("Transaction failed");
    }
  }

callExec();