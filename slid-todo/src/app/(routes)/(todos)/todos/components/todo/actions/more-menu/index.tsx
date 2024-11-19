import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuItems } from "./menu-items";
import { Todo } from "@/actions/todo/types";

interface MoreMenuProps {
  todo: Todo;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MoreMenu = ({ todo, onEdit, onDelete }: MoreMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontal className="w-4 h-4" data-cy="more-button" />
        </Button>
      </DropdownMenuTrigger>
      <MenuItems onEdit={onEdit} onDelete={onDelete} />
    </DropdownMenu>
  );
};
