interface Config {
  name: string
  ethUsdPriceFeed: string
  blockConfirmation: number
}

export const networkConfig: { [key: number]: Config } = {
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    blockConfirmation: 5,
  },
  137: {
    name: "polygon",
    ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    blockConfirmation: 5,
  },
}

export const developmentChain = [31337]

export const args = {
  DECIMALS: 8,
  INITIAL_ANSWER: 200000000000,
}
