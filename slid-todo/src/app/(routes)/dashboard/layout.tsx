import AppSidebar from "@/components/shared/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="w-full flex overflow-x-hidden">
        <AppSidebar />
        <div className="w-full min-w-0 rounded-lg bg-[#F1F5F9] dark:bg-black">{children}</div>
      </div>
    </SidebarProvider>
  );
}
