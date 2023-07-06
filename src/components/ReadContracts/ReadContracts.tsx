import type { CollapseProps } from "antd"
import { Collapse } from "antd"
import { ReadRate } from "./ReadRate"
export interface ISetRateCurrencyProps {}

export function ReadContracts(props: ISetRateCurrencyProps) {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Get Swapped Currency Rate and Decimals",
      children: <ReadRate></ReadRate>,
    },
    // {
    //   key: "2",
    //   label: "Swap Token",
    //   children: <></>,
    // },
    // {
    //   key: "3",
    //   label: "Initialize",
    //   children: <></>,
    // },
  ]

  return (
    <>
      <p className="text-xl font-bold">Read contract</p>
      <Collapse items={items} defaultActiveKey={["1"]} />
    </>
  )
}
