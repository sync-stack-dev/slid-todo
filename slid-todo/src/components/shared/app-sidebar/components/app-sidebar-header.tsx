import Link from "next/link";
import AppLogo from "../../app-logo/app-logo";
import { CollapseButton } from "./collapse-button";
import Skeleton from "@/components/shared/skeleton";
import { useUserQuery } from "@/stores/use-user-store";
import { LogoText, LogoTextDark, LogoIcon } from "@/public/svgs";

export const AppSidebarHeader = () => {
  const { isLoading } = useUserQuery();

  if (isLoading) {
    return (
      <div className="flex justify-between items-center px-2 py-2">
        <Link href="/dashboard">
          <Skeleton className="w-[132px] h-[43px] rounded-xl" />
        </Link>
        <CollapseButton />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center px-2 py-2">
      <Link href="/dashboard">
        <div className="dark:hidden flex items-center gap-2">
          <LogoIcon />
          <LogoText />
        </div>
        <div className="hidden dark:flex items-center gap-2">
          <LogoIcon />
          <LogoTextDark />
        </div>
      </Link>
      <CollapseButton />
    </div>
  );
};
