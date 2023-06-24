import { deployments, ethers, getNamedAccounts } from "hardhat"
// import { FundMe, MockV3Aggregator } from "../../typechain-types"
import { assert, expect } from "chai"
import { Address } from "hardhat-deploy/dist/types"
import { BigNumber } from "ethers"

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
      await expect(fundMe.fund()).to.be.revertedWith("FundMe__NotEnoughETH")
    })
    it("Updated the amount funded data structure", async function () {
      await fundMe.fund({ value: sendValue })
      const response = await fundMe.getAddressToAmountFunded(deployer)
      assert.equal(response.toString(), sendValue.toString())
    })
    it("Adds funder to array of funders", async function () {
      await fundMe.fund({ value: sendValue })
      const funder = await fundMe.getFunder(0)
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

    it("Allows us to withdraw with multiple funders", async function () {
      // Arrange
      const accounts = await ethers.getSigners()
      for (let i = 1; i < 6; i++) {
        const fundMeConnectedContract = await fundMe.connect(accounts[i])

        fundMeConnectedContract.fund({ value: sendValue })
        // totalFundedValue.add(sendValue)
      }
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const startingDeployerBalance = await ethers.provider.getBalance(deployer)
      // Act
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
        startingFundMeBalance
          .add(startingDeployerBalance)
          .add(sendValue)
          .add(sendValue)
          .add(sendValue)
          .add(sendValue)
          .add(sendValue)
          .toString(),
        endingDeployerBalance.add(gasCost).toString()
      )

      // Make sure that the funders are reset properly
      await expect(fundMe.getFunder(0)).to.be.reverted

      for (let i = 0; i < 6; i++) {
        assert.equal(
          await fundMe.getAddressToAmountFunded(accounts[i].address),
          0
        )
      }
    })

    it("Only owner can withdraw", async function () {
      const accounts = await ethers.getSigners()
      const attacker = accounts[1]
      const attackerConnectedContract = await fundMe.connect(attacker)

      await expect(attackerConnectedContract.withdraw()).to.be.revertedWith(
        "FundMe__NotOwner"
      )
    })
  })
  describe("cheaperWithdraw", async function () {
    beforeEach(async function () {
      await fundMe.fund({ value: sendValue })
    })
    it("Can withdraw ETH from a single funder (cheaperWithdraw function)", async function () {
      // arrange
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const startingDeployerBalance = await ethers.provider.getBalance(deployer)
      // act
      const transactionResponse = await fundMe.cheaperWithdraw()
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

    it("Allows us to withdraw with multiple funders (cheaperWithdraw function)", async function () {
      // Arrange
      const accounts = await ethers.getSigners()
      for (let i = 1; i < 6; i++) {
        const fundMeConnectedContract = await fundMe.connect(accounts[i])

        fundMeConnectedContract.fund({ value: sendValue })
        // totalFundedValue.add(sendValue)
      }
      const startingFundMeBalance = await fundMe.provider.getBalance(
        fundMe.address
      )
      const startingDeployerBalance = await ethers.provider.getBalance(deployer)
      // Act
      const transactionResponse = await fundMe.cheaperWithdraw()
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
        startingFundMeBalance
          .add(startingDeployerBalance)
          .add(sendValue)
          .add(sendValue)
          .add(sendValue)
          .add(sendValue)
          .add(sendValue)
          .toString(),
        endingDeployerBalance.add(gasCost).toString()
      )

      // Make sure that the funders are reset properly
      await expect(fundMe.getFunder(0)).to.be.reverted

      for (let i = 0; i < 6; i++) {
        assert.equal(
          await fundMe.getAddressToAmountFunded(accounts[i].address),
          0
        )
      }
    })

    it("Only owner can withdraw (cheaperWithdraw function)", async function () {
      const accounts = await ethers.getSigners()
      const attacker = accounts[1]
      const attackerConnectedContract = await fundMe.connect(attacker)

      await expect(attackerConnectedContract.withdraw()).to.be.revertedWith(
        "FundMe__NotOwner"
      )
    })
  })
})
