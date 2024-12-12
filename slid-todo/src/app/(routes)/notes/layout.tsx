import AppSidebar from "@/components/shared/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-full">{children}</div>
    </SidebarProvider>
  );
}
