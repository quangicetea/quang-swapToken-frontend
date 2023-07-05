import type { CollapseProps } from "antd"
import { Collapse } from "antd"
import * as React from "react"
import { Read } from "./Read"

export interface ISetRateCurrencyProps {}

export function ReadContracts(props: ISetRateCurrencyProps) {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Set Swapped Currency Rate and Decimals",
      children: (
        <>
          <Read></Read>
        </>
      ),
    },
    {
      key: "2",
      label: "Swap Token",
      children: <></>,
    },
    {
      key: "3",
      label: "Initialize",
      children: <></>,
    },
  ]

  return (
    <>
      <p className="text-xl font-bold">Read contract</p>
      <Collapse items={items} defaultActiveKey={["3"]} />
    </>
  )
}
