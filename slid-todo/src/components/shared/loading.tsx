import Lottie from "lottie-react";
import loadingAnimation from "@/public/loading.json";
export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true} // autoplay 추가
        style={{ width: 200, height: 200 }}
        // 디버깅을 위한 추가 props
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
