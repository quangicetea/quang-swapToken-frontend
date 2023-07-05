import type { CollapseProps } from "antd"
import { Collapse } from "antd"
import { Initialize } from "./Initialize"
import { SetCurrencyAndRate } from "./SetCurrencyAndRate"
import { SwapToken } from "./SwapToken"

export interface ISetRateCurrencyProps {}

export function WriteContracts(props: ISetRateCurrencyProps) {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Set Swapped Currency Rate and Decimals",
      children: <SetCurrencyAndRate></SetCurrencyAndRate>,
    },
    {
      key: "2",
      label: "Swap Token",
      children: <SwapToken></SwapToken>,
    },
    {
      key: "3",
      label: "Initialize",
      children: <Initialize></Initialize>,
    },
  ]

  return (
    <>
      <p className="text-xl font-bold">Write contract</p>
      <Collapse items={items} defaultActiveKey={["3"]} />
    </>
  )
}
