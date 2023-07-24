import { Button, Modal } from "antd";
import React from "react";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { displayWalletAddress } from "../utils";
import { toast } from "react-toastify";
const DropdownButton = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const [isValidChain, setIsValidChain] = React.useState<boolean>(true);
  const { chains, chain } = useNetwork();
  const { switchNetworkAsync, isSuccess } = useSwitchNetwork();
  React.useEffect(() => {
    if (!isSuccess) return;
    toast.success("Switch network successfully!");
  }, [isSuccess]);
  const handleClick = () => {
    setShow((prev) => !prev);
  };
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
    } catch {
      toast.error("Switch network fail!");
    }
  };
  if (isSuccess) {
    toast.success(isSuccess);
  }
  const validchains = [
    {
      id: 1,
      network: "homestead",
      name: "Ethereum",
    },
    {
      id: 5,
      network: "goerli",
      name: "Goerli",
    },
  ];
  React.useEffect(() => {
    const isValidChain = validchains.some((validchain) => validchain.name === chain?.name);
    if (!isValidChain) {
      setIsValidChain(false);
    }
  }, [chain]);
  return (
    <div>
      <Button
        onClick={handleClick}
        className="px-5 text-sm font-medium text-white bg-blue-700 rounded-lg w-44"
      >
        User
      </Button>
      {show && (
        <div className="text-center bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
          <div>
            {isValidChain ? (
              <button onClick={showModal}>{chain?.name}</button>
            ) : (
              <button onClick={showModal}>Not supported chain</button>
            )}
          </div>
          <div className="">
            <button onClick={handleClickDisconnect}>Disconnect</button>
          </div>
          <p>{displayWalletAddress(address)}</p>
        </div>
      )}
      <Modal title="SWITCH NETWORK" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-row justify-center gap-3">
          {chains.map((x) => (
            <Button
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

export default DropdownButton;
