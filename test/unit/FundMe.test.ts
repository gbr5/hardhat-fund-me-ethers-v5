import { deployments, ethers, getNamedAccounts } from "hardhat"
// import { FundMe, MockV3Aggregator } from "../../typechain-types"
import { assert, expect } from "chai"
import { Address } from "hardhat-deploy/dist/types"

// !!
//
// Check to see how to see why typechain is not working
//
// !!

describe("FundMe", async function () {
  let fundMe: any //FundMe
  let deployer: Address
  let mockV3Aggregator: any //MockV3Aggregator
  const sendValue = ethers.utils.parseEther("1")

  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer

    await deployments.fixture(["all"])

    fundMe = await ethers.getContract("FundMe", deployer)
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
  })

  describe("constructor", async function () {
    it("Sets the aggregator addresses correctly", async function () {
      const response = await fundMe.getPriceFeed()
      assert.equal(response, mockV3Aggregator.address)
    })
  })

  // describe("receive", async function () {
  //   it("Receive function calls fund function correctly", async function () {
  //   })
  // })

  // describe("fallback", async function () {
  //   it("Fallback function calls fund function correctly", async function () {
  //   })
  // })

  describe("fund", async function () {
    it("Fails if not enough ETH are sent", async function () {
      await expect(fundMe.fund()).to.be.revertedWith(
        "You need to spend more ETH!"
      )
    })
    it("Updated the amount funded data structure", async function () {
      await fundMe.fund({ value: sendValue })
      const response = await fundMe.s_addressToAmountFunded(deployer)
      assert.equal(response.toString(), sendValue.toString())
    })
    it("Adds funder to array of funders", async function () {
      await fundMe.fund({ value: sendValue })
      const funder = await fundMe.s_funders(0)
      assert.equal(funder, deployer)
    })
  })

  describe("withdraw", async function () {
    beforeEach(async function () {
      await fundMe.fund({ value: sendValue })
    })
    it("Can withdraw ETH from a single funder", async function () {
      // arrange
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const startingDeployerBalance = await ethers.provider.getBalance(deployer)
      // act
      const transactionResponse = await fundMe.withdraw()
      const transactionReceipt = await transactionResponse.wait(1)
      const { gasUsed, effectiveGasPrice } = transactionReceipt
      const gasCost = gasUsed * effectiveGasPrice
      const endingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const endingDeployerBalance = await fundMe.provider.getBalance(deployer)
      // assert
      assert.equal(endingFundMeBalance, 0)
      assert.equal(
        startingFundMeBalance.add(startingDeployerBalance).toString(),
        endingDeployerBalance.add(gasCost).toString()
      )
    })
  })
  // Not owner can't withdraw
  // Owner can withdraw
})
