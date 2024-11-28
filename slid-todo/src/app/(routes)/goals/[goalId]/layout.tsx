import { SidebarProvider } from "@/components/ui/sidebar";

export default function GoalLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="w-full h-full rounded-lg">{children}</div>
    </SidebarProvider>
  );
}
