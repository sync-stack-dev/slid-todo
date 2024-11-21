import { ExpandButton } from "./expand-button";
import AppLogo from "../../app-logo/app-logo";

export const AppSidebarTrigger = () => {
  return (
    <div
      className="hidden md:flex p-[20px]  flex-col items-center border-[1px] border-slate-200"
      data-cy="expand-wrapper"
    >
      <div className="mb-5 w-[32px] h-[32px] bg-blue-600 text-sm">
        <AppLogo />
      </div>

      <ExpandButton />
    </div>
  );
};
