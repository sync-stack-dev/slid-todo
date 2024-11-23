import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface InfiniteScrollTriggerProps {
  isLoading: boolean;
}

export const InfiniteScrollTrigger = forwardRef<HTMLDivElement, InfiniteScrollTriggerProps>(
  ({ isLoading }, ref) => (
    <div ref={ref} className="h-10 flex items-center justify-center">
      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground animate-fade-in">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>할 일 불러오는 중...</span>
        </div>
      )}
    </div>
  ),
);

InfiniteScrollTrigger.displayName = "InfiniteScrollTrigger";
