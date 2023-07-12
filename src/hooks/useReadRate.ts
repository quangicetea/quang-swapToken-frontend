import { useContractRead } from "wagmi";
import { TOKENSWAP_ADDRESS } from "../constants/address";
import abi from "../contracts/abi/TokenSwap.json";
import { toast } from "react-toastify";

const useReadRate = (currency: `0x${string}`) => {
  const { data, isError, isLoading, isSuccess, error } = useContractRead({
    address: TOKENSWAP_ADDRESS,
    abi,
    functionName: "getSwappedCurrencyRate",
    args: [currency],
    enabled: Boolean(currency),
    onError(error) {
      toast.error(error.name);
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
