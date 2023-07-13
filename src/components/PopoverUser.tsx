import { Button, Popover, Modal } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { displayWalletAddress } from "../utils";
import { UserOutlined } from "@ant-design/icons";
import { VALIDCHANINS } from "../constants/networks";
import { ABCCOIN_ADDRESS, USER1_ADDRESS, XYZCOIN_ADDRESS } from "../constants/address";
import abcabi from "../contracts/abi/ABC.json";
import xyzabi from "../contracts/abi/XYZ.json";

import useReadBalance from "../hooks/useReadBalance";
const buttonWidth = 70;
const PopoverUser: React.FC = () => {
  const [isValidChain, setIsValidChain] = React.useState<boolean>(true);
  const { chains, chain } = useNetwork();
  const { switchNetworkAsync, isSuccess } = useSwitchNetwork();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const handleClickDisconnect = () => {
    disconnect();
  };
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
  const handleSwitchNetwork = async (newWorkId: number) => {
    try {
      switchNetworkAsync && (await switchNetworkAsync(newWorkId));
      setIsValidChain(true);
    } catch {
      toast.error("Switch network fail!");
    }
  };
  if (isSuccess) {
    toast.success(isSuccess);
  }
  const { data: abcCoin } = useReadBalance(ABCCOIN_ADDRESS, abcabi, USER1_ADDRESS);
  const { data: xyzCoin } = useReadBalance(XYZCOIN_ADDRESS, xyzabi, USER1_ADDRESS);

  console.log(abcCoin);
  const content = (
    <div className="font-bold text-center bg-white rounded-lg ">
      <div>
        {isValidChain ? (
          <button onClick={showModal}>Network: {chain?.name}</button>
        ) : (
          <button onClick={showModal}>Not supported chain</button>
        )}
      </div>
      <div className="">
        <button onClick={handleClickDisconnect}>Disconnect</button>
      </div>
      {abcCoin && (
        <>
          <p>ABC Coin: {Number(abcCoin)}</p>
          <p>XYZ Coin: {Number(xyzCoin)}</p>
        </>
      )}

      <p>Address: {displayWalletAddress(address)}</p>
    </div>
  );
  React.useEffect(() => {
    const isValidChain = VALIDCHANINS.some((validchain) => validchain.name === chain?.name);
    if (!isValidChain) {
      setIsValidChain(false);
    }
  }, [chain, isValidChain]);
  React.useEffect(() => {
    if (!isValidChain) {
      toast.warn("Chain is not valid! Please switch network");
    }
  }, [isValidChain]);
  React.useEffect(() => {
    if (!isSuccess) return;
    toast.success("Switch network successfully!");
  }, [isSuccess]);
  return (
    <div>
      <div style={{ marginLeft: buttonWidth, clear: "both", whiteSpace: "nowrap" }}>
        <Popover placement="bottom" title="User" content={content} trigger="click">
          <Button className="flex items-center justify-center w-10 h-10 border-black rounded-full">
            <UserOutlined />
          </Button>
        </Popover>
      </div>
      <Modal
        title="SWITCH NETWORK"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: "text-black border border-gray-500" }}
      >
        <div className="flex flex-row justify-center gap-3">
          {chains.map((x) => (
            <Button
              key={x.id}
              disabled={chain?.name == x.name || false}
              onClick={() => {
                handleSwitchNetwork(x.id);
              }}
            >
              {x.name}
            </Button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default PopoverUser;
