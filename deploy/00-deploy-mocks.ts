import { network } from "hardhat"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChain, args } from "../helper-hardhat-config"

module.exports = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const chainId = network.config.chainId!

  const { DECIMALS, INITIAL_ANSWER } = args

  if (developmentChain.includes(chainId)) {
    log("Local network detected! Deploying mocks ...💣")
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER], // uint8 _decimals, int256 _initialAnswer
    })
    log("Mocks deployed! 💥 🚀")
    log("_________________________________________________")
  }
}

module.exports.tags = ["all", "mocks"]
