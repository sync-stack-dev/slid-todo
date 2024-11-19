import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface MenuItemsProps {
  onDelete: () => void;
}

export const MenuItems = ({ onDelete }: MenuItemsProps) => {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        onClick={onDelete}
        className="text-red-600 cursor-pointer"
        data-cy="delete-button"
      >
        삭제하기
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
