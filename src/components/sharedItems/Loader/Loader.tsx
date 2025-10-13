
const Loader = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
            {/* Backbencher Coder Logo/Brand */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                    Backbencher<span className="text-blue-600">Coder</span>
                </h1>
                <p className="text-gray-600 text-lg">Loading awesome content...</p>
            </div>

            {/* Animated Spinner */}
            <div className="relative">
                {/* Outer Ring */}
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                
                {/* Spinning Ring */}
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                
                {/* Inner Dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
            </div>

            {/* Loading Dots Animation */}
            <div className="flex space-x-2 mt-8">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 bg-gray-200 rounded-full h-2 mt-8 overflow-hidden">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>

            {/* Loading Text with Typing Animation */}
            <div className="mt-6 text-center">
                <p className="text-gray-700 font-medium">
                    Preparing your experience
                    <span className="inline-block w-1 h-4 ml-1 bg-blue-600 animate-pulse"></span>
                </p>
            </div>

            {/* Website Info */}
            <div className="mt-12 text-center">
                <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Backbencher Coder. All rights reserved.
                </p>
                <p className="text-gray-400 text-xs mt-2">
                    Building the future, one line of code at a time
                </p>
            </div>
        </div>
    );
};

export default Loader;