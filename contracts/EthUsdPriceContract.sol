pragma solidity ^0.8.0;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract EthUsdPriceContract {
  IPyth pyth;

  constructor(address pythContract) {
    pyth = IPyth(pythContract);
  }

  function getBtcUsdPrice(
    bytes[] calldata priceUpdateData
  ) public payable returns (int64) {
    // Update the prices to the latest available values and pay the required fee for it. The `priceUpdateData` data
    // should be retrieved from our off-chain Price Service API using the `pyth-evm-js` package.
    // See section "How Pyth Works on EVM Chains" below for more information.
    uint fee = pyth.getUpdateFee(priceUpdateData);
    pyth.updatePriceFeeds{ value: fee }(priceUpdateData);

    bytes32 priceID = 0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6;
    // Read the current value of priceID, aborting the transaction if the price has not been updated recently.
    // Every chain has a default recency threshold which can be retrieved by calling the getValidTimePeriod() function on the contract.
    // Please see IPyth.sol for variants of this function that support configurable recency thresholds and other useful features.
    PythStructs.Price memory ethUsdPrice = pyth.getPrice(priceID);

    return ethUsdPrice.price;
  }
}