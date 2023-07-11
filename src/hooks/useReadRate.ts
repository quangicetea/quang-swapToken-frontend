import { useContractReads } from 'wagmi';
import { TOKENSWAP_ADDRESS } from '../constants/address';
import abi from '../contracts/abi/TokenSwap.json';

const useReadRate = (currency: `0x${string}`) => {
  const tokenSwapContract: {
    address: any;
    abi: any;
  } = {
    address: TOKENSWAP_ADDRESS,
    abi
  };
  const { data, isSuccess } = useContractReads({
    contracts: [
      {
        ...tokenSwapContract,
        functionName: 'getSwappedCurrencyDecimals',
        args: [currency]
      },
      {
        ...tokenSwapContract,
        functionName: 'getSwappedCurrencyRate',
        args: [currency]
      }
    ],
    enabled: Boolean(currency),
    watch: true
  });
  return {
    data,
    isSuccess
  };
};
export default useReadRate;
