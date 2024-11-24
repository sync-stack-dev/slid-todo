import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import { ensureHttps } from "@/utils/url";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LinkButtonProps {
  url: string;
}

export const LinkButton = ({ url }: LinkButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="p-1 hover:bg-gray-100 rounded-full aspect-square"
          title={url}
        >
          <a href={ensureHttps(url)} className="w-4 h-4" data-cy="link-button" target="_blank">
            <LinkIcon />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>링크 열기</TooltipContent>
    </Tooltip>
  );
};
