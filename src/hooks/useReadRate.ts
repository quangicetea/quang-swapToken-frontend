import {
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"
import abi from "../contracts/abi/TokenSwap.json"
import { TOKENSWAP_ADDRESS } from "../constants/address"

const useReadRate = (currency: `0x${string}`) => {
  const tokenSwapContract: {
    address: any
    abi: any
  } = {
    address: TOKENSWAP_ADDRESS,
    abi,
  }
  const { data, isSuccess, isLoading } = useContractReads({
    contracts: [
      {
        ...tokenSwapContract,
        functionName: "getSwappedCurrencyDecimals",
        args: [currency],
      },
      {
        ...tokenSwapContract,
        functionName: "getSwappedCurrencyRate",
        args: [currency],
      },
    ],
    enabled: Boolean(currency),
    watch: true,
    onSuccess(data) {
      console.log("Success", data)
    },
    onError(error) {
      console.log("Error", error)
    },
  })
  return {
    data,
    isSuccess,
  }
}
export default useReadRate
