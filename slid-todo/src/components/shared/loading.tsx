import Lottie from "lottie-react";
import loadingAnimation from "@/public/loading.json";

interface LoadingProps {
  fullScreen?: boolean;
  size?: number;
}

export const Loading = ({ fullScreen = true, size = 200 }: LoadingProps) => {
  return (
    <div className={`flex justify-center items-center ${fullScreen ? "h-screen" : "h-full"}`}>
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        style={{ width: size, height: size }}
        onLoadedImages={() => {
          console.log("Images loaded");
        }}
        onComplete={() => {
          console.log("Animation completed");
        }}
      />
    </div>
  );
};
