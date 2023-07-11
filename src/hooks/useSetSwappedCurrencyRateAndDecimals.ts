import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import abi from "../contracts/abi/TokenSwap.json";
import { TOKENSWAP_ADDRESS } from "../constants/address";

const useSetSwappedCurrencyRateAndDecimals = (
  currencyAddress: `0x${string}` | undefined,
  rate: number,
  decimals: number,
) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: TOKENSWAP_ADDRESS,
    abi,
    functionName: "setSwappedCurrencyRateAndDecimals",
    args: [currencyAddress, rate, decimals],
    // enabled: Boolean(decimals) && Boolean(currencyAddress) && Boolean(rate),
    enabled: true,
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
export default useSetSwappedCurrencyRateAndDecimals;
