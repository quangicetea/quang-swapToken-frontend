import { Header } from "./Header"
import { Intro } from "./Intro"
import { ReadContracts } from "./ReadContracts/ReadContracts"
import { WriteContracts } from "./WriteContracts/WriteContracts"

export interface ILoggedInProps {}

export function LoggedIn(props: ILoggedInProps) {
  return (
    <div className="m-7">
      <Header></Header>
      <Intro></Intro>
      <div className="flex flex-col gap-3">
        {/* <ReadContracts></ReadContracts> */}
        <WriteContracts></WriteContracts>
      </div>
    </div>
  )
}
