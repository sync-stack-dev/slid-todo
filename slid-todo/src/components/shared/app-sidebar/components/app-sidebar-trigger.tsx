import { ExpandButton } from "./expand-button";
import AppLogo from "../../app-logo/app-logo";
import { HamburgerButton } from "./hamburger-button";
import { useSidebar } from "@/components/ui/sidebar";

export const AppSidebarTrigger = () => {
  const { isMobile } = useSidebar();

  return (
    <>
      {isMobile && (
        <div className="fixed z-50 h-[2rem] w-full flex items-center bg-white dark:bg-blue-950 ">
          <HamburgerButton />
        </div>
      )}
      <div
        className="hidden md:flex p-[20px]  flex-col items-center border-[1px] border-slate-200"
        data-cy="expand-wrapper"
      >
        <div className="mb-5 w-[32px] h-[32px] bg-blue-600 text-sm">
          <AppLogo />
        </div>

        <ExpandButton />
      </div>
    </>
  );
};
