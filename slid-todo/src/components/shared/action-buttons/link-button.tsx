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
          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-full aspect-square w-8 h-8"
          title={url}
        >
          <a href={ensureHttps(url)} data-cy="link-button" target="_blank">
            <LinkIcon className="text-blue-400" />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>링크 열기</TooltipContent>
    </Tooltip>
  );
};
