import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter"
require('dotenv').config()

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      // blockGasLimit: 0x1fffffffffff,
      gasPrice: 0,
      initialBaseFeePerGas: 0
      // allowUnlimitedContractSize: true,
    },
    sepolia: {
      url: 'https://rpc.ankr.com/eth_sepolia',
      accounts: [process.env.DEPLOYER_PRIVATE_KEY?process.env.DEPLOYER_PRIVATE_KEY:'']
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com	',
      accounts: [process.env.DEPLOYER_PRIVATE_KEY?process.env.DEPLOYER_PRIVATE_KEY:'']
    },
    // mainnet: {
    //   url: `https://rpc.ankr.com/eth`,
    //   accounts: ['']
    // },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY?process.env.DEPLOYER_PRIVATE_KEY:'']
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
    ],
  },
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false,
    currency: 'USD',
    gasPrice: 90
  },
  etherscan: {
    apiKey: {
      sepolia: 'A1SUQVDSEJPFNUYNN5N4XVAQE6WCR7F5US'
    }
  }
};

export default config;
