import { forwardRef } from "react";

interface InfiniteScrollTriggerProps {
  isLoading: boolean;
}

export const InfiniteScrollTrigger = forwardRef<HTMLDivElement, InfiniteScrollTriggerProps>(
  ({ isLoading }, ref) => (
    <div ref={ref} className="h-10">
      {isLoading && "Loading more..."}
    </div>
  ),
);

InfiniteScrollTrigger.displayName = "InfiniteScrollTrigger";
