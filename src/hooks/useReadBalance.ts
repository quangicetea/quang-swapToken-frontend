import { useContractRead } from "wagmi";
import { toast } from "react-toastify";

const useReadBalance = (address: `0x${string}`, abi: any, account: `0x${string}`) => {
  const { data, isError, isLoading, isSuccess, error } = useContractRead({
    address,
    abi,
    functionName: "balanceOf",
    args: [account],
    enabled: Boolean(account),
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
export default useReadBalance;
