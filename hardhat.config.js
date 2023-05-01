require("@nomicfoundation/hardhat-toolbox");


const INFURA_API_KEY = "39dd7423f7ad4214824703232e9cd99e";

const SEPOLIA_PRIVATE_KEY = "6f2a4f371d0f7e80190e343fd7ecd8fee0f9bf8c8ce33ea02bf6e094bb0eecb6";
// https://sepolia.infura.io/v3/9513cafc604b4355a04f38bcc71b8a84
// 6f2a4f371d0f7e80190e343fd7ecd8fee0f9bf8c8ce33ea02bf6e094bb0eecb6
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 99999,
      },
    },
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
