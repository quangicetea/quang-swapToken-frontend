import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { Initialize } from "./Initialize";
import { SetCurrencyAndRate } from "./SetCurrencyAndRate";
import { SwapToken } from "./SwapToken";

export function WriteContracts() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Set Swapped Currency Rate and Decimals",
      children: <SetCurrencyAndRate />,
    },
    {
      key: "2",
      label: "Swap Token",
      children: <SwapToken />,
    },
    {
      key: "3",
      label: "Initialize",
      children: <Initialize />,
    },
  ];

  return (
    <>
      <p className="text-xl font-bold">Write contract</p>
      <Collapse items={items} />
    </>
  );
}
