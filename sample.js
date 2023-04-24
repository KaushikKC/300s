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

const Web3 = require("web3") // for nodejs only
// Replace the provider URL with your own endpoint URL
const web3 = new Web3("https://rpc.ankr.com/eth_sepolia")
const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]
const addr = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)

// Valid roundId must be known. They are NOT incremental.
// let validId = BigInt("18446744073709554177")
priceFeed.methods
  .latestRoundData()
  .call()
  .then((historicalRoundData) => {
    console.log(historicalRoundData.answer)
    // document.getElementById("get-price-field").value = historicalRoundData.answer
  })