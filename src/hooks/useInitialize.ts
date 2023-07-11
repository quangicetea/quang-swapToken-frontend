import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import abi from "../contracts/abi/TokenSwap.json";
import { TOKENSWAP_ADDRESS } from "../constants/address";

const useInitialize = (
  mainToken: `0x${string}`,
  swappedCurrency: `0x${string}` | undefined,
  swappedRate: number,
  swappedCurrencyDecimals: number,
  receiver: `0x${string}` | undefined,
  sender: `0x${string}` | undefined,
) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: TOKENSWAP_ADDRESS,
    abi,
    functionName: "initialize",
    args: [mainToken, swappedCurrency, swappedRate, swappedCurrencyDecimals, receiver, sender],
    enabled:
      Boolean(mainToken) &&
      Boolean(swappedCurrency) &&
      Boolean(swappedRate) &&
      Boolean(swappedCurrencyDecimals) &&
      Boolean(receiver) &&
      Boolean(sender),
  });
  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  return {
    data,
    error,
    isLoading,
    isSuccess,
    write,
    isError,
    isPrepareError,
    prepareError,
  };
};
export default useInitialize;
