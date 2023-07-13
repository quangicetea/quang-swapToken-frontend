import { Button, Popover, Modal, Badge } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { displayWalletAddress } from "../utils";
import { UserOutlined } from "@ant-design/icons";
import { VALIDCHANINS } from "../constants/networks";
import { ABCCOIN_ADDRESS, USER1_ADDRESS, XYZCOIN_ADDRESS } from "../constants/address";

import useTokenBalance from "../hooks/useTokenBalance";
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
  const { userBalance: xyzCoin } = useTokenBalance(XYZCOIN_ADDRESS, USER1_ADDRESS, chain?.id);
  const { userBalance: abcCoin } = useTokenBalance(ABCCOIN_ADDRESS, USER1_ADDRESS, chain?.id);

  const content = (
    <div className="font-bold text-center bg-white rounded-lg ">
      <div>
        {isValidChain ? (
          <button onClick={showModal}>
            {" "}
            <Badge status="success" /> Network: {chain?.name}
          </button>
        ) : (
          <button onClick={showModal}>
            <Badge status="warning" /> Not supported chain
          </button>
        )}
      </div>
      <div className="">
        <button
          className="hover:text-red-500 border rounded-xl p-2 bg-red-300"
          onClick={handleClickDisconnect}
        >
          Disconnect
        </button>
      </div>
      {abcCoin && xyzCoin && (
        <div className="">
          <p>BALANCES</p>
          <div className="flex gap-2 ">
            <div className="">
              <p>ABC COIN</p>
              <p>{Number(abcCoin)}</p>
            </div>
            <div className="">
              <p>XYZ COIN</p>
              <p>{Number(xyzCoin)}</p>
            </div>
          </div>
        </div>
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
