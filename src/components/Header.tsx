import { Button } from "antd"
import { useAccount, useDisconnect, useNetwork } from "wagmi"

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
  const { address } = useAccount()
  const { chain, chains } = useNetwork()
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
      {chain && <p className="font-bold">Connected to {chain.name}</p>}
      {chains && (
        <div className="font-bold">
          Available chains:{" "}
          {chains.map((chain) => (
            <p>{chain.name}</p>
          ))}
        </div>
      )}
    </div>
  )
}
