import React from 'react';

const ErrorPage = ({ errorCode = 500, errorMessage = "Something went wrong" }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20">
        <div className="p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="animate-bounce">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-24 w-24 text-red-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-red-400 mb-4">
            {errorCode} Error
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            {errorMessage}
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            We apologize for the inconvenience. Our website is currently experiencing technical difficulties.
            Our team has been notified and is working to resolve the issue.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </button>
            
            <a
              href="/"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Return Home
            </a>
            
            <a
              href="mailto:support@example.com"
              className="px-6 py-3 border border-gray-500 hover:border-white text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Support
            </a>
          </div>
          
          <div className="mt-10 text-sm text-gray-400">
            <p>Error ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
            <p className="mt-1">Timestamp: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;