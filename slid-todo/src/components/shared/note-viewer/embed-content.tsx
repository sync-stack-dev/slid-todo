import { cn } from "@/utils/cn";
import { ensureHttps } from "@/utils/url";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface EmbedContentProps {
  url: string;
  isVisible: boolean;
  className?: string;
  simpleMode?: boolean;
}

const getEmbedUrl = (url: string) => {
  try {
    const urlObj = new URL(ensureHttps(url));

    // YouTube
    if (urlObj.hostname.includes("youtube.com") || urlObj.hostname.includes("youtu.be")) {
      const videoId = urlObj.hostname.includes("youtu.be")
        ? urlObj.pathname.slice(1)
        : urlObj.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    // Vimeo
    if (urlObj.hostname.includes("vimeo.com")) {
      const videoId = urlObj.pathname.slice(1);
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }

    return null;
  } catch (e) {
    return null;
  }
};

const EmbedContent = ({ url, isVisible, className, simpleMode = false }: EmbedContentProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 1350px)");

  if (!isVisible || !url) return null;

  const embedUrl = getEmbedUrl(url);
  const hostname = new URL(ensureHttps(url)).hostname;

  if (simpleMode || !isLargeScreen) {
    return (
      <div className={cn("w-full p-2", className)}>
        {embedUrl && (
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              title="Embed Content"
              src={embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative lg:absolute lg:top-0 lg:right-[800px] lg:-mr-4 lg:w-[540px] lg:h-screen",
        "bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800",
        "flex items-center justify-center",
        "z-[51]",
        className,
      )}
    >
      <div className="relative lg:w-full lg:h-full flex justify-center items-center p-4">
        {embedUrl ? (
          <div className="w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe
              title="Embed Content"
              src={embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : (
          <div className="w-full max-w-xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="mb-6">
                  <ExternalLink className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  미리보기를 지원하지 않는 링크입니다
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{hostname}</p>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                  <span>오른쪽 노트의 링크를 클릭해주세요</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmbedContent;
