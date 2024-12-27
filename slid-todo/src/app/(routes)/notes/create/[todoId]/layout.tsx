import { SidebarProvider } from "@/components/ui/sidebar";

export default function NoteCreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="w-full bg-white rounded-lg dark:bg-black">{children}</div>
    </SidebarProvider>
  );
}
