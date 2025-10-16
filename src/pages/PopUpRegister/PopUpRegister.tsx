import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axiosInstance from '../../hooks/AxiosInstance/AxiosInstance';
import UseAuth from '../../hooks/UseAuth/UseAuth';

const PopUpRegister = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { googleLogin, user, isInitialized } = UseAuth();
    const navigate = useNavigate();

    // Show popup immediately when auth is fully initialized and user is not logged in
    useEffect(() => {
        // Wait for auth to be initialized
        if (isInitialized && !user) {
            // Check if user has previously dismissed the popup
            const hasDismissed = localStorage.getItem('bb_popup_dismissed');
            const hasRegistered = localStorage.getItem('bb_user_registered');
            
            if (!hasDismissed && !hasRegistered) {
                // Show popup immediately without delay
                setIsOpen(true);
            }
        }
    }, [isInitialized, user]);

    // Close popup when user logs in
    useEffect(() => {
        if (user) {
            setIsOpen(false);
        }
    }, [user]);

    const handleClose = () => {
        setIsOpen(false);
        // Remember that user dismissed the popup for 7 days
        localStorage.setItem('bb_popup_dismissed', 'true');
        const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        setTimeout(() => {
            localStorage.removeItem('bb_popup_dismissed');
        }, sevenDays);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const userCredential = await googleLogin();
            const userUid = userCredential?.user?.uid;
            const userEmail = userCredential?.user?.email;
            
            // Check if user exists in database
            let userExists = false;
            try {
                await axiosInstance.get(`/users/${userUid}`);
                userExists = true;
            } catch (err: any) {
                if (err.response?.status === 404) {
                    userExists = false;
                }
            }

            // Create user if doesn't exist
            if (!userExists) {
                const userData = {
                    uid: userUid,
                    name: userCredential?.user?.displayName || "No Name",
                    email: userEmail,
                    age: null,
                };
                await axiosInstance.post("/users", userData);
                // Mark as registered
                localStorage.setItem('bb_user_registered', 'true');
            }

            // Update last login
            await axiosInstance.patch(`/users/${userUid}/last-login`);
            
            toast.success('Welcome to Backbencher Coder!');
            setIsOpen(false);
            
        } catch (error: any) {
            console.error('Google login error:', error);
            if (error.code === 'auth/popup-closed-by-user') {
                toast.error('Login was cancelled');
            } else {
                toast.error('Failed to login with Google');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleManualRegister = () => {
        setIsOpen(false);
        localStorage.setItem('bb_user_registered', 'true');
        navigate('/auth/register');
    };

    const handleManualLogin = () => {
        setIsOpen(false);
        navigate('/auth/login');
    };

    // Don't show if:
    // 1. Auth not initialized yet
    // 2. User is logged in
    // 3. Popup is not open
    if (!isInitialized || user || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={handleClose}
            />
            
            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-scale-in">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>

                    <div className="flex flex-col lg:flex-row">
                        {/* Left Side - Content */}
                        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                            <div className="max-w-md mx-auto lg:mx-0 w-full">
                                {/* Logo/Brand */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">BC</span>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900">Backbencher Coder</span>
                                </div>

                                {/* Heading */}
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    Join Our Developer Community
                                </h2>
                                
                                <p className="text-lg text-gray-600 mb-2">
                                    Unlock your coding potential with:
                                </p>
                                
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 text-sm">✓</span>
                                        </div>
                                        <span className="text-gray-700">Free coding tutorials & resources</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 text-sm">✓</span>
                                        </div>
                                        <span className="text-gray-700">Interactive coding challenges</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 text-sm">✓</span>
                                        </div>
                                        <span className="text-gray-700">Developer community support</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 text-sm">✓</span>
                                        </div>
                                        <span className="text-gray-700">Project collaboration opportunities</span>
                                    </li>
                                </ul>

                                {/* Google Sign In Button */}
                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md mb-4 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                <path
                                                    fill="#4285F4"
                                                    d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                                                />
                                                <path
                                                    fill="#34A853"
                                                    d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z"
                                                />
                                                <path
                                                    fill="#FBBC05"
                                                    d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98c-.8 1.6-1.27 3.41-1.27 5.38s.46 3.78 1.27 5.38l3.98-3.09z"
                                                />
                                                <path
                                                    fill="#EA4335"
                                                    d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                                                />
                                            </svg>
                                            <span className="text-gray-700 font-medium text-lg">
                                                Continue with Google
                                            </span>
                                        </>
                                    )}
                                </button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                {/* Alternative Options */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleManualRegister}
                                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        onClick={handleManualLogin}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                                    >
                                        Sign In
                                    </button>
                                </div>

                                {/* Privacy Note */}
                                <p className="text-xs text-gray-500 text-center mt-6">
                                    By continuing, you agree to our Terms of Service and Privacy Policy
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Visual */}
                        <div className="flex-1 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden hidden lg:block">
                            <div className="absolute inset-0 bg-black bg-opacity-20" />
                            
                            {/* Animated Background Elements */}
                            <div className="absolute top-10 right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl" />
                            <div className="absolute bottom-20 left-10 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-xl" />
                            
                            {/* Content Overlay */}
                            <div className="relative z-10 h-full flex items-center justify-center p-8">
                                <div className="text-center text-white">
                                    <div className="w-32 h-32 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Start Your Coding Journey</h3>
                                    <p className="text-blue-100 text-lg">
                                        Join 10,000+ developers building amazing projects
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUpRegister;