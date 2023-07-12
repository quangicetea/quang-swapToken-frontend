import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import abi from "../contracts/abi/TokenSwap.json";
import { TOKENSWAP_ADDRESS } from "../constants/address";
import { toast } from "react-toastify";

const useSetMainToken = (addressToken: `0x${string}` | undefined) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: TOKENSWAP_ADDRESS,
    abi,
    functionName: "setMainToken",
    args: [addressToken],
    enabled: Boolean(addressToken),
    onError(err) {
      toast.error(err.name);
    },
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
export default useSetMainToken;
