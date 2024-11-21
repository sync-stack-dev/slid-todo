import AppLogo from "../../app-logo/app-logo";
import { CollapseButton } from "./collapse-button";

export const AppSidebarHeader = () => {
  return (
    <div className="flex justify-between items-center px-5 py-2">
      <div>
        <AppLogo />
      </div>

      <CollapseButton />
    </div>
  );
};
