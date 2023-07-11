import { Button, Modal } from "antd";
import React from "react";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { displayWalletAddress } from "../utils";
import { toast } from "react-toastify";

const DropdownButton = () => {
  const [show, setShow] = React.useState<boolean>(false);
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
      console.log("error");
    }
  };
  console.log(chains);
  if (isSuccess) {
    toast.success(isSuccess);
  }
  return (
    <div>
      <Button
        onClick={handleClick}
        className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 w-44"
      >
        User
      </Button>
      {show && (
        <div className="bg-white divide-y divide-gray-100 text-center rounded-lg shadow dark:bg-gray-700">
          <div
            className="
    "
          >
            <button onClick={showModal}>{chain?.name}</button>
          </div>
          <div className="">
            <button onClick={handleClickDisconnect}>Disconnect</button>
          </div>
          <p>{displayWalletAddress(address)}</p>
        </div>
      )}
      <Modal title="SWITCH NETWORK" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex justify-center flex-row gap-3">
          {chains.map((x) => (
            <Button
              onClick={() => {
                handleSwitchNetwork(x.id);
              }}
            >
              {x.network}
            </Button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default DropdownButton;
