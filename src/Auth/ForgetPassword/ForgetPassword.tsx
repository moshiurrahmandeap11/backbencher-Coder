import React, { useState } from 'react';
import { Link } from 'react-router';
import UseAuth from '../../hooks/UseAuth/UseAuth';



const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const {ForgetPassword} = UseAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            await ForgetPassword(email);
            setSuccess(true);
            setEmailSent(true);
            setEmail('');
        } catch (error: any) {
            console.error('Password reset error:', error);
            
            // Firebase specific error handling
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('No account found with this email address');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address format');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many attempts. Please try again later');
                    break;
                case 'auth/network-request-failed':
                    setError('Network error. Please check your connection');
                    break;
                default:
                    setError('Failed to send reset email. Please try again');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendEmail = () => {
        setEmailSent(false);
        setSuccess(false);
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                {/* Header Section */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Forgot Password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {emailSent 
                            ? "Check your email for reset instructions"
                            : "Enter your email to reset your password"
                        }
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <p className="text-green-800 font-medium">Reset email sent!</p>
                                <p className="text-green-700 text-sm mt-1">
                                    Check your inbox at <strong>{email}</strong> for password reset instructions.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="text-red-800">{error}</p>
                        </div>
                    </div>
                )}

                {/* Reset Form */}
                {!emailSent && (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
                                placeholder="Enter your email address"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-md"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    'Send Reset Instructions'
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {/* Resend Option */}
                {emailSent && (
                    <div className="space-y-4">
                        <button
                            onClick={handleResendEmail}
                            className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                        >
                            Resend Email
                        </button>
                    </div>
                )}

                {/* Help Text */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        Remember your password?{' '}
                        <Link
                            to="/auth/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200"
                        >
                            Back to Login
                        </Link>
                    </p>
                </div>

                {/* Additional Help */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Didn't receive the email?</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                        <li>• Check your spam folder</li>
                        <li>• Make sure you entered the correct email</li>
                        <li>• Wait a few minutes and try again</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;