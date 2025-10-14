import { Helmet } from 'react-helmet-async';

const Maintenance = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
            <Helmet>
                <title>Maintenance Mode - Backbencher Coder</title>
                <meta 
                    name="description" 
                    content="Backbencher Coder is currently under maintenance. We'll be back soon with improvements and new features." 
                />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            
            <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
                {/* Animated Icon */}
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <svg 
                        className="w-12 h-12 text-blue-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                        />
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                    </svg>
                </div>

                {/* Content */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Under Maintenance
                </h1>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                    We're currently performing some maintenance to improve your experience. 
                    We'll be back online shortly with exciting new features and improvements.
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
                </div>

                {/* Estimated Time */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        <strong>Estimated completion:</strong><br />
                        We expect to be back in approximately 30-60 minutes
                    </p>
                </div>

                {/* Contact Info */}
                <div className="text-sm text-gray-500">
                    <p>Need immediate assistance?</p>
                    <p className="mt-1">
                        Email us at{' '}
                        <a 
                            href="mailto:support@backbenchercoder.com" 
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            
                            backbenchercoder@gmail.com
                        </a>
                    </p>
                </div>

                {/* Social Links */}
                <div className="mt-6 flex justify-center space-x-4">
                    <a 
                        href="https://twitter.com/backbenchercoder" 
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </a>
                    <a 
                        href="https://github.com/backbenchercoder" 
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;