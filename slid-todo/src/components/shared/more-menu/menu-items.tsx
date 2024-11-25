"use client";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface MenuItemsProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const MenuItems = ({ onEdit, onDelete }: MenuItemsProps) => {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={onEdit} className="cursor-pointer" data-cy="edit-button">
        수정하기
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onDelete} className="cursor-pointer" data-cy="delete-button">
        삭제하기
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
