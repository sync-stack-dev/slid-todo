import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronsRightIcon } from "lucide-react";

export const ExpandButton = () => {
  const { setOpen } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="p-[12px] w-[24px] h-[24px] 
      border-2 border-gray-500 hover:bg-gray-100 rounded-[8px] transition-transform duration-200 hover:scale-105"
      onClick={() => setOpen(true)}
    >
      <ChevronsRightIcon className="w-[24px] h-[24px] text-gray-700" data-cy="expand-button" />
    </Button>
  );
};
