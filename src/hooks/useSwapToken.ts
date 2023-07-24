import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import abi from "../contracts/abi/TokenSwap.json";
import { TOKENSWAP_ADDRESS } from "../constants/address";

const useSwapToken = (token: `0x${string}` | undefined, amountSender: number | bigint) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: TOKENSWAP_ADDRESS,
    abi,
    functionName: "swap",
    args: [token, amountSender],
    enabled: Boolean(amountSender) && Boolean(token),
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
export default useSwapToken;
