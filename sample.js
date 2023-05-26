const {ethers} = require("hardhat");

async function main() {
  const EthUsdPriceContract = await ethers.getContractFactory("PancakePredictionV2");
  const adminAddress = '0x4F646BdeEe8F99F7f8806550c03791288750a44c';
   // replace with the actual Pyth contract address
  const ethUsdPriceContract = await EthUsdPriceContract.deploy(adminAddress,adminAddress,180,120,1,1000);
  await ethUsdPriceContract.deployed();
  console.log("EthUsdPriceContract deployed to:", ethUsdPriceContract.address);
  
  // const ethUsdPrice = await ethUsdPriceContract.getEthUsdPrice({gasLimit: 10000000});
  // console.log("Current ETH/USD price:", ethUsdPrice);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});