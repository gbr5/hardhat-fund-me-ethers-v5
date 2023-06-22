import { HardhatRuntimeEnvironment } from "hardhat/types"
import { network } from "hardhat"
import { networkConfig, developmentChain } from "../helper-hardhat-config"
import verify from "../utils/verify"

module.exports = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()

  const chainId = network.config.chainId!

  let ethUsdPriceFeedAddress: string
  let blockConfirmation = 1

  if (developmentChain.includes(chainId)) {
    const ethUsdAggregator = await get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    blockConfirmation = networkConfig[chainId]["blockConfirmation"]
  }
  const args = [ethUsdPriceFeedAddress]
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args,
    log: true,
    waitConfirmations: blockConfirmation,
  })

  if (!developmentChain.includes(chainId) && process.env.ETHERSCAN_API_KEY!) {
    // await sleep(60000)
    await verify(fundMe.address, args)
  }

  log("_________________________________________________")
}

module.exports.tags = ["all", "fundme"]
