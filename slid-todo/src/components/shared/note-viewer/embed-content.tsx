import { SheetContent, SheetPortal } from "@/components/ui/sheet";
import { cn } from "@/utils/cn";
import { ensureHttps } from "@/utils/url";
import { useState } from "react";

interface EmbedContentProps {
  url: string;
  isVisible: boolean;
  className?: string;
}

const EmbedContent = ({ url, isVisible, className }: EmbedContentProps) => {
  const [error, setError] = useState(false);

  if (!isVisible) return null;

  const handleError = () => {
    setError(true);
  };

  return (
    <div
      className={cn(
        "relative lg:absolute lg:top-0 lg:right-[800px] lg:-mr-4 lg:w-[1000px] lg:h-full bg-blue-50 dark:bg-gray-900 z-[51]",
        className,
      )}
    >
      <div className="relative lg:w-full lg:h-full flex justify-center items-center">
        {error ? (
          <div className="text-white">이 사이트는 임베드할 수 없습니다.</div>
        ) : (
          <iframe
            src={ensureHttps(url)}
            className="
            w-screen 
            origin-top
            lg:w-screen
            lg:h-screen
            lg:scale-[0.5]
            aspect-video
            pointer-events-auto
          "
            onError={handleError}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default EmbedContent;
