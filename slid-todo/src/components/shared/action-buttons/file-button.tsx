import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { ensureHttps } from "@/utils/url";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
interface FileButtonProps {
  url: string;
}

export const FileButton = ({ url }: FileButtonProps) => {
  const fileName = url.split("/").pop() || "download";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-full aspect-square w-8 h-8"
          title={url}
          aria-label="file-button"
          data-testid="file-button"
        >
          <a
            href={ensureHttps(url)}
            download={fileName}
            target="_blank"
            rel="noopener noreferrer"
            className="w-4 h-4"
            data-cy="file-button"
          >
            <FileText className="text-blue-400" aria-label="file-button-icon" />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>파일 다운로드</TooltipContent>
    </Tooltip>
  );
};
