import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronsLeftIcon } from "lucide-react";

export const CollapseButton = () => {
  const { setOpen } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="p-[12px] w-[24px] h-[24px] 
       border-2 border-gray-400 hover:bg-gray-300 rounded-[8px] transition-transform duration-200 hover:scale-105
      "
      onClick={() => setOpen(false)}
    >
      <ChevronsLeftIcon className="w-[24px] h-[24px] text-gray-500 " data-cy="collapse-button" />
    </Button>
  );
};
