import { Header } from "./Header";
import { ReadContracts } from "./ReadContracts/ReadContracts";
import { WriteContracts } from "./WriteContracts/WriteContracts";

export function LoggedIn() {
  return (
    <div className="">
      <Header></Header>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-3 my-5 justify-center items-center">
          <ReadContracts />
          <WriteContracts />
        </div>
      </div>
    </div>
  );
}
