import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

interface LinkButtonProps {
  url: string;
}

export const LinkButton = ({ url }: LinkButtonProps) => {
  return (
    <Button variant="ghost" className="p-1 hover:bg-gray-100 rounded">
      <Link className="w-4 h-4" data-cy="link-button" />
    </Button>
  );
};
