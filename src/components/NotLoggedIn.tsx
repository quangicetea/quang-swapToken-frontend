import { Button } from "antd"
import { useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
export interface INotLoggedInProps {}

export function NotLoggedIn(props: INotLoggedInProps) {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  return (
    <Button
      className="bg-red-400 text-white font-bold"
      onClick={() => connect()}
    >
      Connect Wallet
    </Button>
  )
}
