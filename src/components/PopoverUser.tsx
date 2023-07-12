import { Button, Popover, Modal } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { displayWalletAddress } from "../utils";
import { UserOutlined } from "@ant-design/icons";
import { VALIDCHANINS } from "../constants/networks";
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
  const content = (
    <div className="bg-white divide-y divide-gray-100 text-center rounded-lg shadow dark:bg-gray-700">
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
          <Button className="w-10 h-10 rounded-full flex justify-center items-center border-black">
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
        <div className="flex justify-center flex-row gap-3">
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
