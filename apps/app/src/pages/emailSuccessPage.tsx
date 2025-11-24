import Link from "next/link";
import React from "react";

const emailSuccessPage = () => {
  return (
    <div className="page-container min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto px-8 text-center">
        <div className="bg-white border-8 border-gray-700 p-12 shadow-xl">
          <h1 className="text-4xl font-cormorant font-bold text-gray-800 mb-4">
            Thank You!
          </h1>
          <p className="text-lg font-cormorant text-gray-600 mb-8">
            Your message has been sent. I'll get back to you shortly.
          </p>
          <Link 
            href="/" 
            className="inline-block px-8 py-3 bg-gray-700 text-white font-cormorant font-semibold hover:bg-gray-800 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default emailSuccessPage;
