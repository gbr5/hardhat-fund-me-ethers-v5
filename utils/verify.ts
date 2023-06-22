import { run } from "hardhat"

async function verify(contractAddress: string, args: any[]) {
  console.log(`Verifying contract ${contractAddress} ...`)
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (err: any) {
    console.log(err)
  }
}

export default verify
