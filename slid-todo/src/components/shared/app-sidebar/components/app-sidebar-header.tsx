import Link from "next/link";
import AppLogo from "../../app-logo/app-logo";
import { CollapseButton } from "./collapse-button";

export const AppSidebarHeader = () => {
  return (
    <div className="flex justify-between items-center px-2 py-2">
      <Link href="/dashboard">
        <AppLogo />
      </Link>

      <CollapseButton />
    </div>
  );
};
