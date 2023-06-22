import { deployments, ethers, getNamedAccounts } from "hardhat"
// import { FundMe, MockV3Aggregator } from "../../typechain-types"
import { assert } from "chai"

// !!
//
// Check to see how to see why typechain is not working
//
// !!

describe("FundMe", async function () {
  let fundMe: any //FundMe
  let deployer
  let mockV3Aggregator: any //MockV3Aggregator

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
})
