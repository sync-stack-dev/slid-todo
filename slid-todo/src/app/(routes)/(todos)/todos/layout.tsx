import { SidebarProvider } from "@/components/ui/sidebar";

export default function TodosLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
}
