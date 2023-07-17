import { Button, Input } from "antd";
import * as React from "react";
import useTokenBalance from "../hooks/useTokenBalance";
import { ABCCOIN_ADDRESS, USER1_ADDRESS, XYZCOIN_ADDRESS } from "../constants/address";
import { useNetwork } from "wagmi";
import { SwapOutlined } from "@ant-design/icons";
import useReadRate from "../hooks/useReadRate";
import useReadDecimals from "../hooks/useReadDecimals";

export function SwapToken() {
  const { data: rate } = useReadRate(XYZCOIN_ADDRESS);
  const { data: decimals } = useReadDecimals(XYZCOIN_ADDRESS);
  const { chain } = useNetwork();
  const { userBalance: abcCoin } = useTokenBalance(ABCCOIN_ADDRESS, USER1_ADDRESS, chain?.id);
  const { userBalance: xyzCoin } = useTokenBalance(XYZCOIN_ADDRESS, USER1_ADDRESS, chain?.id);
  const [mainToken, setMainToken] = React.useState<any>();
  const [swappedCurrency, setSwappedCurrency] = React.useState<any>();

  return (
    <div className="border rounded-xl flex flex-col gap-5 px-5 w-[600px] ">
      <p className="uppercase text-xl font-bold text-purple-800 my-3 text-center">Swap</p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-bold">ABC</p>
          <p>
            <span className="px-2 font-bold">Balance:</span>
            <span>{Number(abcCoin)}</span>
          </p>
        </div>
        <Input
          value={mainToken}
          onChange={(e) => {
            const mainTokenValue = e.target.value;
            const swappedCurrency =
              Number(mainTokenValue) * (Number(rate) / Math.pow(10, Number(decimals)));
            setMainToken(mainTokenValue);
            setSwappedCurrency(swappedCurrency);
          }}
          className="w-full bg-gray-100 rounded-xl p-3"
          type="number"
        ></Input>
      </div>
      <div className="mx-auto">
        <SwapOutlined />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="font-bold">XYZ</p>
          <p>
            <span className="px-2 font-bold">Balance:</span>

            <span>{Number(xyzCoin)}</span>
          </p>
        </div>
        <Input
          value={swappedCurrency}
          disabled
          className="w-full bg-gray-100 rounded-xl p-3"
          type="number"
        ></Input>
      </div>
      {mainToken && (
        <div className="flex justify-between font-bold">
          <p className="text-purple-800">Price</p>
          <p>
            {mainToken} CAKE = {swappedCurrency} BNB
          </p>
        </div>
      )}
      {rate && decimals && (
        <p className="text-center">Rate: {Number(rate) / Math.pow(10, Number(decimals))}</p>
      )}
      <div className="mx-auto">
        <Button className="font-bold bg-red-200">Change Rate</Button>
      </div>

      <Button className="bg-blue-400 justify-center items-center font-bold text-white">SWAP</Button>
    </div>
  );
}
