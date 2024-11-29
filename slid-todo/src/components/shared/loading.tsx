import Lottie from "lottie-react";
import loadingAnimation from "@/public/loading.json";
export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        style={{ width: 200, height: 200 }}
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
