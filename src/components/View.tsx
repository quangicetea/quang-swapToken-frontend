import { useAccount } from "wagmi"
import { LoggedIn } from "./LoggedIn"
import { NotLoggedIn } from "./NotLoggedIn"
export interface IViewProps {}

export default function View(props: IViewProps) {
  const { isConnected } = useAccount()
  return isConnected ? <LoggedIn /> : <NotLoggedIn />
}
