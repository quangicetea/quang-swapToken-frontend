import * as React from "react"
import abi from "../../contracts/abi/TokenSwap.json"
import { TOKENSWAP_ADDRESS, XYZCOIN_ADDRESS } from "../../constants/address"
import { useContractRead } from "wagmi"
export interface IReadProps {}

export function Read(props: IReadProps) {
  const { data, isError, isLoading, status } = useContractRead({
    address: TOKENSWAP_ADDRESS,
    abi,
    functionName: "getSwappedCurrencyRate",
    args: [XYZCOIN_ADDRESS],
  })
  console.log(data)
  return <div></div>
}
