import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface FileButtonProps {
  url: string;
}

export const FileButton = ({ url }: FileButtonProps) => {
  return (
    <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
      <FileText className="w-4 h-4" data-cy="file-button" />
    </Button>
  );
};
