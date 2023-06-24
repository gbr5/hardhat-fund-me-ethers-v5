import { getNamedAccounts, ethers } from "hardhat"

async function main() {
  const deployer = (await getNamedAccounts()).deployer
  const fundMe = await ethers.getContract("FundMe", deployer)
  console.log("Funding Contract ... 💣")

  const transactionResponse = await fundMe.fund({
    value: ethers.utils.parseEther("0.1"),
  })

  await transactionResponse.wait(1)

  console.log("Funded 💥🚀")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
