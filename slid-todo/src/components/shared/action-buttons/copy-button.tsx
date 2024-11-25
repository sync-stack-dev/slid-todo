import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export const CopyButton = () => {
  return (
    <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
      <Copy className="w-4 h-4" data-cy="copy-button" />
    </Button>
  );
};
