import AppSidebar from "@/components/shared/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { GoalProvider } from "@/context/goal-context";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function TodosLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-full">{children}</div>
    </SidebarProvider>
  );
}
