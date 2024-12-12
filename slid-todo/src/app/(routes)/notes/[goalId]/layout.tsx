import { SidebarProvider } from "@/components/ui/sidebar";

export default function NoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="w-full bg-[#F1F5F9] dark:bg-black">{children}</div>
    </SidebarProvider>
  );
}
