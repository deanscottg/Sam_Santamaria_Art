import React from "react";
import Image from "next/image";
import LoaderSVG from "./svgs/LoaderSVG";

const loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-700"></div>
        </div>
        <h2 className="text-3xl font-cormorant font-bold text-gray-800 mb-2">
          Artistically Loading
        </h2>
        <p className="text-lg font-cormorant text-gray-600">
          Please wait a moment...
        </p>
      </div>
    </div>
  );
};

export default loader;
