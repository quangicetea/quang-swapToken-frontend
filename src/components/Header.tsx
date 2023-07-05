import { Button } from "antd"
import { useAccount, useDisconnect } from "wagmi"

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
  const { address } = useAccount()

  const { disconnect } = useDisconnect()

  return (
    <div className="flex flex-row gap-5">
      <p className="font-bold">Connected to {address}</p>
      <Button
        className="bg-red-400 text-white font-bold"
        onClick={() => disconnect()}
      >
        Disconnect
      </Button>
    </div>
  )
}
