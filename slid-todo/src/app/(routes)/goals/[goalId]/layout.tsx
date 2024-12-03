import { SidebarProvider } from "@/components/ui/sidebar";

export default function GoalLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="w-full h-screen rounded-lg bg-[#F1F5F9] dark:bg-black">{children}</div>
    </SidebarProvider>
  );
}
