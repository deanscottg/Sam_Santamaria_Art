import React from "react";

const SubmitLoader = () => {
  return (
    <div className="w-full min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-8 text-center">
        <div className="bg-white border-8 border-gray-700 p-12 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-700"></div>
          </div>
          <h2 className="text-3xl font-cormorant font-bold text-gray-800 mb-2">
            Sending Your Message
          </h2>
          <p className="text-lg font-cormorant text-gray-600">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmitLoader;
