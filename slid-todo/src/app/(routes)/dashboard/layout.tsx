import AppSidebar from "@/components/shared/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full rounded-lg bg-[#F1F5F9] dark:bg-black">{children}</div>
    </SidebarProvider>
  );
}
