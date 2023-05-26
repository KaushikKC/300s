require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");

require("@nomicfoundation/hardhat-toolbox");


const INFURA_API_KEY = "39dd7423f7ad4214824703232e9cd99e";
// const ALCHEMY_API_KEY = "plRzV9wOj3MYxSVe-FswSri3rIYM98rC"

ACCOUNT1 = "eb9cd36d6f8dc9921388531c3b4bb030aa143174181a424d2ce176a602dbc59d"
ACCOUNT2 = "eb2616a297c732c45a224e9287375c70f558def5a364b7c01bb173fffde295c0"
const SEPOLIA_PRIVATE_KEY = "6f2a4f371d0f7e80190e343fd7ecd8fee0f9bf8c8ce33ea02bf6e094bb0eecb6";
// https://sepolia.infura.io/v3/9513cafc604b4355a04f38bcc71b8a84
// 6f2a4f371d0f7e80190e343fd7ecd8fee0f9bf8c8ce33ea02bf6e094bb0eecb6
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.1",
    compilerSource: "binary",
    settings: {},
  },
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
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}` // The Ethereum Web3 RPC URL (optional).
    },
    zkTestnet: {
      url: "https://testnet.era.zksync.dev", // The testnet RPC URL of zkSync Era network.
      ethNetwork: "goerli", // The Ethereum Web3 RPC URL, or the identifier of the network (e.g. `mainnet` or `goerli`)
      zksync: true,
      // Verification endpoint for Goerli
      // verifyURL: 'https://zksync2-testnet-explorer.zksync.dev/contract_verification',
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    zkSyncEra: {
      url: "https://testnet.era.zksync.dev",
      gasPrice: 0,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    arbitrumTestnet: {
      url: "https://goerli-rollup.arbitrum.io/rpc",
      chainId: 421613,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
