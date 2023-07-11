import { Button } from "antd";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function NotLoggedIn() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    <Button className="font-bold text-white bg-red-400" onClick={() => connect()}>
      Connect Wallet
    </Button>
  );
}
