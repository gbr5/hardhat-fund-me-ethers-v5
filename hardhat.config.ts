import { HardhatUserConfig } from "hardhat/config"
import "@nomiclabs/hardhat-waffle"
import "hardhat-gas-reporter"
// import "@nomiclabs/hardhat-etherscan"
import "@nomicfoundation/hardhat-verify"

import "solidity-coverage"
import "hardhat-deploy"

import * as dotenv from "dotenv"

dotenv.config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL! || "https://eth-sepolia"
const PRIVATE_KEY = process.env.PRIVATE_KEY! || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY! || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY! || "key"

interface IHardhatUserConfig extends HardhatUserConfig {
  etherscan?: {
    // Your API key for Etherscan
    apiKey: string
    customChains: []
  }
  gasReporter: {
    enabled: boolean
    outputFile: string
    noColors: boolean
    currency: string
    coinmarketcap?: string
    token: string
  }
  namedAccounts: {
    deployer: {
      default: number
    }
    user: {
      default: number
    }
  }
}

const config: IHardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.7" }, { version: "0.6.6" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    // Your API key for Etherscan - Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
    customChains: [],
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH", //"MATIC",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
  mocha: {
    timeout: 500000,
  },
}

export default config
