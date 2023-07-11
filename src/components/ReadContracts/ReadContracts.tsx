import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { ReadRate } from "./ReadRate";

export function ReadContracts() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Get Swapped Currency Rate and Decimals",
      children: <ReadRate />,
    },
  ];

  return (
    <>
      <p className="text-xl font-bold">Read contract</p>
      <Collapse items={items} />
    </>
  );
}
