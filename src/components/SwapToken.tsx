import { Button, Input, Modal } from "antd";
import * as React from "react";
import useTokenBalance from "../hooks/useTokenBalance";
import { ABCCOIN_ADDRESS, USER1_ADDRESS, XYZCOIN_ADDRESS } from "../constants/address";
import { useNetwork } from "wagmi";
import { SwapOutlined } from "@ant-design/icons";
import useReadRate from "../hooks/useReadRate";
import useReadDecimals from "../hooks/useReadDecimals";
import { SetCurrencyAndRate } from "./WriteContracts/SetCurrencyAndRate";
import useSwapToken from "../hooks/useSwapToken";
export function SwapToken() {
  const { data: rate } = useReadRate(XYZCOIN_ADDRESS);
  const { data: decimals } = useReadDecimals(XYZCOIN_ADDRESS);
  const { chain } = useNetwork();
  const { userBalance: abcCoin } = useTokenBalance(ABCCOIN_ADDRESS, USER1_ADDRESS, chain?.id);
  const { userBalance: xyzCoin } = useTokenBalance(XYZCOIN_ADDRESS, USER1_ADDRESS, chain?.id);
  const [inputValue, setInputValue] = React.useState<any>(0);
  const { write } = useSwapToken(XYZCOIN_ADDRESS, inputValue);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [swappedCurrency, setSwappedCurrency] = React.useState<any>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="border rounded-xl flex flex-col gap-5 px-5 w-[600px]">
      <>
        <p className="my-3 text-xl font-bold text-center text-purple-800 uppercase">Swap</p>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-bold">ABC</p>
            <p>
              <span className="px-2 font-bold">Balance:</span>
              <span>{Number(abcCoin)}</span>
            </p>
          </div>
          <Input
            value={inputValue.toString()}
            onChange={(e) => {
              const userInputValue = e.target.value;
              setErrorMessage("");
              if (!/^\d*$/.test(userInputValue)) {
                setErrorMessage("Input value must be greater than 0");
              }
              const userInputBigInt = BigInt(userInputValue);
              setInputValue(userInputBigInt);
              const myBigIntValue = BigInt(abcCoin);
              if (userInputBigInt > myBigIntValue) {
                setErrorMessage("Input value must be less than balance");
                return;
              }
              const swappedCurrency =
                Number(userInputValue) * (Number(rate) / Math.pow(10, Number(decimals)));
              setSwappedCurrency(swappedCurrency);
            }}
            className="w-full p-3 bg-gray-100 rounded-xl"
            type="number"
          />
          {errorMessage && <p className="text-xs font-bold text-red-500">{errorMessage}</p>}
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
            className="w-full p-3 bg-gray-100 rounded-xl"
            type="number"
          ></Input>
        </div>
        {rate && decimals && (
          <p className="text-center">Rate: {Number(rate) / Math.pow(10, Number(decimals))}</p>
        )}
        <div className="mx-auto">
          <Button onClick={showModal} className="font-bold bg-red-200">
            Change Rate
          </Button>
          <Modal
            width={800}
            title="Set Swapped Currency Rate and Decimals"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <SetCurrencyAndRate />
          </Modal>
        </div>
        <Button
          disabled={!inputValue}
          onClick={() => write?.()}
          className="items-center justify-center font-bold text-white bg-blue-400"
        >
          SWAP
        </Button>
      </>
    </div>
  );
}
