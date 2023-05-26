// import { parseEther } from "ethers/lib/utils";
const { EvmPriceServiceConnection } = require("@pythnetwork/pyth-evm-js");
const { ethers, network, run } = require("hardhat");
const { useState } = require("react");
// import config from "../config";
 
let roundTime = (180)*1000;
let bufferTime = (150)*1000;

const TESTNET_PRICE_SERVICE = "https://xc-testnet.pyth.network"

const testnetConnection = new EvmPriceServiceConnection(TESTNET_PRICE_SERVICE)

const ETH_USD_TESTNET_PRICE_ID = [
  "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6"
]

let price = 0;
 
async function callExec() {
  
  const PredictionsContract = await ethers.getContractFactory("ThreeHundredSeconds");
  const predictionsContract = PredictionsContract.attach("0xb06e2c050e95f084D2A83DdC23B56B501E3C3A2D");
  
  try {
    testnetConnection.subscribePriceFeedUpdates(ETH_USD_TESTNET_PRICE_ID, async (priceFeed) => {
          price = await priceFeed.getPriceNoOlderThan(60);
      })
      let date = new Date();
      let timestamp = Math.floor(Date.now() / 1000);
    let response = await predictionsContract.executeRound(price?.price,timestamp);
    console.log(response)
    try{
      let recipt = await response.wait();
      console.log("Transaction success");
    } catch(e) {
      console.log("Transaction failed");
      return setTimeout(callExec, bufferTime / 10);
    }
  } catch(e) {
    console.log(e.message);
    if(e.message.indexOf("Can only lock round within bufferSeconds") > -1) return setTimeout(callExec, bufferTime / 10);
    if(e.message.indexOf("Can only lock round after lockTimestamp") > -1) return setTimeout(callExec, bufferTime / 10);
    return setTimeout(callExec, bufferTime / 10);
 
  }
 
  setTimeout(callExec, roundTime  + 5000 );
}
 
setTimeout(callExec, roundTime);
