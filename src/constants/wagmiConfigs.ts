import { createPublicClient, http } from "viem"
import { createConfig, mainnet } from "wagmi"
import { goerli } from "wagmi/chains"
export const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: goerli,
    transport: http(),
  }),
})
