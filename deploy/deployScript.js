import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
// import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// load env file
// import dotenv from "dotenv";
// dotenv.config();

// load wallet private key from env file
const PRIVATE_KEY = "6f2a4f371d0f7e80190e343fd7ecd8fee0f9bf8c8ce33ea02bf6e094bb0eecb6";
const adminAddress = 0x84B325e04a106A8A4636914C22319b9daecF2892;

if (!PRIVATE_KEY)
  throw "⛔️ Private key not detected! Add it to the .env file!";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre) {
  console.log(`Running deploy script for the Greeter contract`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY);

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("PancakePredictionV2");

  // Estimate contract deployment fee
  // const greeting = "Hi there!";
  // const deploymentFee = await deployer.estimateDeployFee(artifact, [greeting]);

  // ⚠️ OPTIONAL: You can skip this block if your account already has funds in L2
  // const depositHandle = await deployer.zkWallet.deposit({
  //   to: deployer.zkWallet.address,
  //   token: utils.ETH_ADDRESS,
  //   amount: deploymentFee.mul(2),
  // });
  // // Wait until the deposit is processed on zkSync
  // await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  // const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  // console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const greeterContract = await deployer.deploy(artifact, [adminAddress,adminAddress,180,120,1,1000]);

  //obtain the Constructor Arguments
  // console.log(
  //   "constructor args:" + greeterContract.interface.encodeDeploy([greeting])
  // );

  // Show the contract info.
  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}