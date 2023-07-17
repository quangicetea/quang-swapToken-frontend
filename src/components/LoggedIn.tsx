import { Header } from "./Header";
import { ReadContracts } from "./ReadContracts/ReadContracts";
import { SwapToken } from "./SwapToken";
import { WriteContracts } from "./WriteContracts/WriteContracts";

export function LoggedIn() {
  return (
    <div className="">
      <Header></Header>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3 my-5">
          <ReadContracts />
          <WriteContracts />
          <SwapToken />
        </div>
      </div>
    </div>
  );
}
