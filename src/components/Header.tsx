import PopoverUser from "./PopoverUser";

export function Header() {
  return (
    <div className="flex flex-row gap-5 px-40 py-2 w-full justify-end bg-slate-200 min-h-[50px] text-white">
      <PopoverUser></PopoverUser>
    </div>
  );
}
