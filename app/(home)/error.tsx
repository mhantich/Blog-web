
'use client'
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <div className="text-center">
        <svg 
          className="mx-auto mb-6 animate-bounce" 
          width="100" 
          height="100" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <AlertTriangle className="text-red-500" size={100} />
        </svg>
        
        <h1 className="text-4xl font-bold text-red-600 mb-4 animate-pulse">
          Oops! Something Went Wrong
        </h1>
        
        <p className="text-lg text-red-800 mb-6">
          Were experiencing an unexpected error. Please try again later.
        </p>
        
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;