// components/ui/loading.tsx
"use client";

interface LoadingProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Loading = ({ fullScreen = true, size = "md" }: LoadingProps) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-[2px]",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-[4px]",
  };

  return (
    <div
      className={`flex justify-center items-center ${fullScreen ? "h-screen" : "h-full"}`}
      data-testid="loading"
    >
      <div
        className={`
          ${sizeClasses[size]}
          border-solid
          border-blue-200
          border-t-blue-500
          rounded-full
          animate-spin
        `}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};
