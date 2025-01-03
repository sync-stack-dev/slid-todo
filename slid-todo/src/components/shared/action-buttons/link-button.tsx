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
        <a
          href={ensureHttps(url)}
          data-cy="link-button"
          data-testid="link-button"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center p-1 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-full w-8 h-8"
          aria-label="Open external link"
        >
          <LinkIcon className="text-blue-400 w-4 h-4" aria-hidden="true" />
        </a>
      </TooltipTrigger>
      <TooltipContent>링크 열기</TooltipContent>
    </Tooltip>
  );
};
