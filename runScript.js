// import { parseEther } from "ethers/lib/utils";
const { ethers, network, run } = require("hardhat");
// import config from "../config";
 
let roundTime = (180)*1000;
let bufferTime = (100)*1000;
 
async function callExec() {
  const PredictionsContract = await ethers.getContractFactory("PancakePredictionV2");
  const predictionsContract = PredictionsContract.attach("0xF31a6C3a51033A7E3dc0295e3127BBa26611E102");
  try {
    let response = await predictionsContract.executeRound();
    console.log(response)
    // if()
 
  } catch(e) {
    console.log(e.message);
    if(e.message.indexOf("Can only lock round within bufferSeconds") > -1) return setTimeout(callExec, bufferTime / 10);
    if(e.message.indexOf("Can only lock round after lockTimestamp") > -1) return setTimeout(callExec, bufferTime / 10);
 
  }
 
  // console.log(response)
  setTimeout(callExec, roundTime + 30000);
}
 
setTimeout(callExec, roundTime);
// const CONTACT_ABI = require('./src/context/config');
// const { ethers } = require('ethers');


// const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545'); // connect to local Ethereum node
// const contractAddress = '0x1F34Ea2Ad60b2c2850877f59770F13accA552A3c'; // replace with contract address
// const contractAbi = CONTACT_ABI; // replace with contract ABI

// const wallet = new ethers.Wallet('private-key', provider); // replace with your private key
// const contractInstance = new ethers.Contract(contractAddress, contractAbi, wallet);

// const functionToRun = contractInstance.functions.executeRound(); // replace with the function you want to run

// const interval = 181 * 1000; // repeat every 60 seconds (adjust as needed)

// setInterval(() => {
//   functionToRun().then((tx) => {
//     console.log(tx.hash); // log the transaction hash
//   });
// }, interval);