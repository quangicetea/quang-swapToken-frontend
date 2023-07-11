import { useContractReads } from "wagmi";
import { TOKENSWAP_ADDRESS } from "../constants/address";
import abi from "../contracts/abi/TokenSwap.json";
import { toast } from "react-toastify";

const useReadRate = (currency: `0x${string}`) => {
  const tokenSwapContract: {
    address: any;
    abi: any;
  } = {
    address: TOKENSWAP_ADDRESS,
    abi,
  };
  const { data, isSuccess, isLoading, isError, error } = useContractReads({
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
    allowFailure: false,
    onSuccess() {},
    onError(error) {
      toast.error(error.message);
    },
  });
  return {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
  };
};
export default useReadRate;
