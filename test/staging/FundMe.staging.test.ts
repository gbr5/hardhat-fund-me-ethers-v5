import { ethers, getNamedAccounts, network } from "hardhat"
// import { FundMe, MockV3Aggregator } from "../../typechain-types"
import { assert, expect } from "chai"
import { Address } from "hardhat-deploy/dist/types"
import { developmentChain } from "../../helper-hardhat-config"

// !!
//
// Check to see how to see why typechain is not working
//
// !!

const chainId = network.config.chainId!

developmentChain.includes(network.config.chainId!)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe: any //FundMe
      let deployer: Address
      const sendValue = ethers.utils.parseEther("0.5")

      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        fundMe = await ethers.getContract("FundMe", deployer)
      })

      it("Allows people to fund and withdraw", async function () {
        await fundMe.fund({ value: sendValue })
        await fundMe.withdraw()
        const endingBalance = await fundMe.provider.getBalance(fundMe.address)
        assert.equal(endingBalance.toString(), "0")
      })
    })
