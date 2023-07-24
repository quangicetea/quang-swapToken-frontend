import { Header } from "./Header";
import { SwapToken } from "./SwapToken";

export function LoggedIn() {
  return (
    <div className="">
      <Header></Header>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3 my-5">
          <SwapToken />
        </div>
      </div>
    </div>
  );
}
