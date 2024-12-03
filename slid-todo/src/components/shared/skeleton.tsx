const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-white/20 ${className}`} />
);

export default Skeleton;
