# dia-oracle
Chainlink to DIA Oracle Adapter


# How to run?

1. `npx hardhat compile`: This command runs the compilation of contracts in the project.

2. `npx hardhat test`: This command runs the tests defined in the project.

3. `npx hardhat run scripts/deployAdapter.ts --network mainnet`: This command executes the deployment script and deploys the contract on mainnet

4. `npx hardhat run scripts/deployAdapter.ts --network goerli`: This command executes the deployment script and deploys the contract on goerli testnet

Note: Before deployment create a .env file with two variables defined in .env.example
DEPLOYER_PRIVATE_KEY - Private key of the deployer address
DIA_ORACLE_ADDRESS - Address of the DIA Oracle

# DiaToChainlinkAdapter.sol

Certainly! Here's an explanation of the contract:

The `DiaToChainlinkAdapter` contract serves as an adapter between the DIA Oracle and the Chainlink aggregator. It implements the `AggregatorV3Interface` interface, which defines the functions required for a Chainlink aggregator contract. The contract is also inherited from the `Ownable` contract, which provides an access control mechanism where certain functions can only be called by the contract owner.

The contract has the following key components:

1. `diaOracle` variable: This private variable holds the address of the DIA Oracle contract that provides the price data.

2. `_version` variable: This private variable stores the version of the adapter contract.

3. `_decimals` variable: This private variable stores the number of decimals for the price data.

4. `_description` variable: This private variable stores the description of the adapter contract.

5. `_pairKey` variable: This private variable stores the pair key used to retrieve price data from the DIA Oracle.

The contract provides the following functions:

1. `version()`: This function returns the version of the adapter contract.

2. `setVersion(uint256 newVersion)`: This function allows the owner of the contract to set the version of the adapter contract.

3. `decimals()`: This function returns the number of decimals for the price data.

4. `setDecimals(uint8 newDecimals)`: This function allows the owner of the contract to set the number of decimals for the price data.

5. `description()`: This function returns the description of the adapter contract.

6. `setDescription(string memory newDescription)`: This function allows the owner of the contract to set the description of the adapter contract.

7. `getRoundData(uint80 _roundId)`: This function reverts the function call as it is not implemented in this adapter contract.

8. `latestRoundData()`: This function retrieves the latest round data from the DIA Oracle. It returns the round ID, answer (price), startedAt timestamp, updatedAt timestamp, and answeredInRound.

9. `getValueAndTimestamp()`: This private function retrieves the value and timestamp from the DIA Oracle using the `_pairKey`.

The contract is deployed with the address of the DIA Oracle and the pair key in the constructor. The default values for the version, decimals, and description are set. The owner of the contract can update the version, decimals, and description using the respective setter functions.

This contract acts as a bridge between the DIA Oracle and Chainlink aggregator, providing a standardized interface for accessing price data from the DIA Oracle through the Chainlink framework.

# IDIAOracleV2.sol

the IDIAOracleV2 interface specifies three functions:

1. `setValue(string memory key, uint128 value, uint128 timestamp) external`: This function is used to set a value for a specific key in the DIA Oracle. It takes three parameters: key (a string representing the key), value (a uint128 representing the value to be set), and timestamp (a uint128 representing the timestamp associated with the value).

2. `getValue(string memory key) external view returns (uint128, uint128)`: This function is used to retrieve the value and timestamp associated with a specific key from the DIA Oracle. It takes a key as a parameter and returns two values: value (a uint128 representing the value) and timestamp (a uint128 representing the timestamp).

3. `updateOracleUpdaterAddress(address newOracleUpdaterAddress) external`: This function is used to update the address of the Oracle Updater contract in the DIA Oracle. It takes a single parameter newOracleUpdaterAddress (an address representing the new address of the Oracle Updater contract).

The IDIAOracleV2 interface defines the required functions for interacting with the DIA Oracle contract. Any contract that wants to interact with the DIA Oracle needs to implement these functions according to the specified interface.
