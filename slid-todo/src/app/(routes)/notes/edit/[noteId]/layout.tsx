import { SidebarProvider } from "@/components/ui/sidebar";

export default function NoteEditLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="w-full h-full bg-white rounded-lg dark:bg-black">{children}</div>
    </SidebarProvider>
  );
}
