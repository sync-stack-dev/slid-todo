const Skeleton = ({ className }: { className?: string; dataTestId?: string }) => (
  <div
    className={`animate-pulse bg-slate-200 dark:bg-white/20 ${className}`}
    data-testid="skeleton"
  />
);

export default Skeleton;
