import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { ReadRate } from "./ReadRate";
import { ReadDecimals } from "./ReadDecimals";

export function ReadContracts() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Get Swapped Currency Rate",
      children: <ReadRate />,
    },
    {
      key: "2",
      label: "Get Swapped Currency Decimals",
      children: <ReadDecimals />,
    },
  ];

  return (
    <>
      <p className="text-xl font-bold">Read contract</p>
      <Collapse className="min-w-[600px]" items={items} />
    </>
  );
}
