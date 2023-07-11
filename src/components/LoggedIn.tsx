import { Header } from "./Header";
import { ReadContracts } from "./ReadContracts/ReadContracts";
import { WriteContracts } from "./WriteContracts/WriteContracts";

export function LoggedIn() {
  return (
    <div className="m-7">
      <Header></Header>
      <div className="flex flex-col gap-3 my-5 justify-center items-center">
        <ReadContracts />
        <WriteContracts />
      </div>
    </div>
  );
}
