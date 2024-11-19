import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface MenuItemsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MenuItems = ({ onEdit, onDelete }: MenuItemsProps) => {
  return (
    <DropdownMenuContent
      align="end"
      className="w-[160px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <DropdownMenuItem onClick={onEdit} data-cy="edit-button">
        수정하기
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onDelete} className="text-red-600" data-cy="delete-button">
        삭제하기
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
