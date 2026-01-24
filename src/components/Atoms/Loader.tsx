import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/animation/Loader.json";

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-[999]">
      <div className=" h-[15%] w-[30%] flex items-center justify-center">
        <Lottie animationData={loaderAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
