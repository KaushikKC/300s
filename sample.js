// import { ethers } from 'ethers';
// import { CONTACT_ADDRESS, CONTACT_ABI } from './src/context/config';
// const { CONTACT_ADDRESS, CONTACT_ABI } = require('./src/context/config');
// const ethers = require("ethers")

// const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/9513cafc604b4355a04f38bcc71b8a84");

// async function sample() {
//     // await provider.send('eth_requestAccounts', []);
//     const daiContract = await new ethers.Contract(CONTACT_ADDRESS, CONTACT_ABI, provider);
//     const sample = await daiContract.currentEpoch();
//     console.log(sample);
//   }
//   sample();

// const Web3 = require("web3") // for nodejs only
// // Replace the provider URL with your own endpoint URL
// const web3 = new Web3("https://rpc.ankr.com/eth_sepolia")
// const aggregatorV3InterfaceABI = [
//   {
//     inputs: [],
//     name: "decimals",
//     outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "description",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
//     name: "getRoundData",
//     outputs: [
//       { internalType: "uint80", name: "roundId", type: "uint80" },
//       { internalType: "int256", name: "answer", type: "int256" },
//       { internalType: "uint256", name: "startedAt", type: "uint256" },
//       { internalType: "uint256", name: "updatedAt", type: "uint256" },
//       { internalType: "uint80", name: "answeredInRound", type: "uint80" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "latestRoundData",
//     outputs: [
//       { internalType: "uint80", name: "roundId", type: "uint80" },
//       { internalType: "int256", name: "answer", type: "int256" },
//       { internalType: "uint256", name: "startedAt", type: "uint256" },
//       { internalType: "uint256", name: "updatedAt", type: "uint256" },
//       { internalType: "uint80", name: "answeredInRound", type: "uint80" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "version",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
// ]
// const addr = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
// const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)

// // Valid roundId must be known. They are NOT incremental.
// // let validId = BigInt("18446744073709554177")
// priceFeed.methods
//   .latestRoundData()
//   .call()
//   .then((historicalRoundData) => {
//     console.log(historicalRoundData.answer)
//     // document.getElementById("get-price-field").value = historicalRoundData.answer
//   })

const ethers = require('ethers');

async function waitForTransaction(txHash) {
  const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/9513cafc604b4355a04f38bcc71b8a84"); // create a provider instance
  const receipt = await provider.waitForTransaction(txHash); // wait for the transaction to be mined and get the receipt

  if (receipt.status === 1) { // check if the status is success
    return 0; // if success, return nothing
  } else { // if the status is fail
    return -1;
  }
}

// usage example
const txHash = '0x83ef15099af19c24ce5a6774ee3ac20cda49c296f4c4d42c7b060e441ac3fffb'; // replace with your transaction hash
waitForTransaction(txHash).then((result) => {
  console.log(result); // will log undefined if status is success or -1 if status is fail
}).catch((error) => {
  console.error(error); // will log any errors that occurred during execution
})