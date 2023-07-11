import { Button } from "antd";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function NotLoggedIn() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <Button className="font-bold text-white bg-red-400" onClick={() => connect()}>
        Connect Wallet
      </Button>
    </div>
  );
}
