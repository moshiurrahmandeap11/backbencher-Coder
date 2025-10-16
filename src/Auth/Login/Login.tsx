import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import UseAuth from "../../hooks/UseAuth/UseAuth";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../../hooks/AxiosInstance/AxiosInstance";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);

  const { loginUser, googleLogin } = UseAuth();
  const navigate = useNavigate();

  // ✅ Check registration status on component mount
  useEffect(() => {
    checkRegistrationStatus();
  }, []);

  const checkRegistrationStatus = async () => {
    try {
      const response = await axiosInstance.get('/site-settings/status');
      if (response.data.success) {
        setAllowRegistration(response.data.data?.allow_registrations ?? true);
      }
    } catch (error) {
      console.error('Error checking registration status:', error);
      setAllowRegistration(true);
    }
  };

  const updateLastLogin = async (uid: string) => {
    try {
      await axiosInstance.patch(`/users/${uid}/last-login`, {
        lastLogin: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to update lastLogin:", err);
    }
  };

 // Updated Login.tsx - Add localStorage sync after successful login
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const user = await loginUser(email, password);
    const userUid = user?.user?.uid;
    
    // Update last login
    await updateLastLogin(userUid);
    
    // Fetch and sync user data to localStorage
    await fetchAndSyncUserData(userUid);
    
    navigate("/");
  } catch {
    setError("Failed to login. Please check your credentials.");
  } finally {
    setLoading(false);
  }
};

const handleGoogleLogin = async () => {
  setError("");
  setLoading(true);
  try {
    const user = await googleLogin();
    const userUid = user?.user?.uid;
    const userEmail = user?.user?.email;
    
    // ✅ Check if registration is allowed for NEW users
    let userExists = false;
    
    try {
      await axiosInstance.get(`/users/${userUid}`);
      userExists = true;
    } catch (err: any) {
      if (err.response?.status === 404) {
        userExists = false;
      } else {
        throw err;
      }
    }

    // ✅ If user doesn't exist and registration is disabled, block the login
    if (!userExists && !allowRegistration) {
      await user.user.delete();
      setError("New user registrations are currently disabled. Please try again later.");
      setLoading(false);
      return;
    }

    const userData = {
      uid: userUid,
      name: user?.user?.displayName || "No Name",
      email: userEmail,
      age: null,
      lastLogin: new Date().toISOString(),
    };

    if (!userExists) {
      // User not found → create new (only if registration is allowed)
      await axiosInstance.post(`/users`, userData);
    } else {
      // User exists → just update lastLogin
      await axiosInstance.patch(`/users/${userUid}/last-login`, {
        lastLogin: new Date().toISOString(),
      });
    }

    // Fetch and sync user data to localStorage
    await fetchAndSyncUserData(userUid);

    navigate("/");
  } catch (err: any) {
    console.error("Google login error:", err);
    
    if (err.message?.includes("registrations are currently disabled")) {
      setError(err.message);
    } else if (err.code === 'auth/popup-closed-by-user') {
      setError("Google login was cancelled.");
    } else if (err.code === 'auth/popup-blocked') {
      setError("Popup was blocked by browser. Please allow popups for this site.");
    } else {
      setError("Failed to login with Google. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

// Helper function to fetch and sync user data
const fetchAndSyncUserData = async (uid: string) => {
  try {
    const response = await axiosInstance.get(`/users/${uid}`);
    const userData = response.data.data;
    
    // Sync to localStorage
    localStorage.setItem('bb_user_profile', JSON.stringify(userData));
    localStorage.setItem('bb_user_role', userData.role || 'user');
    localStorage.setItem('bb_last_sync', new Date().toISOString());
    
    console.log('✅ User data synced to localStorage after login');
  } catch (error) {
    console.error('❌ Error syncing user data to localStorage:', error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* SEO Meta Tags */}
      <Helmet>
        {/* Basic Meta Tags */}
        <title>Login to Backbencher Coder - Access Your Developer Account</title>
        <meta 
          name="description" 
          content="Sign in to your Backbencher Coder account. Access coding courses, projects, and developer community. Secure login with email or Google authentication." 
        />
        <meta 
          name="keywords" 
          content="login backbencher coder, sign in, developer account, coding platform access, programming courses login, secure authentication, google login, developer community access" 
        />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Login - Backbencher Coder Developer Platform" />
        <meta 
          property="og:description" 
          content="Access your Backbencher Coder account to continue learning coding, building projects, and connecting with the developer community." 
        />
        <meta property="og:url" content="https://backbenchercoder.com/auth/login" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Backbencher Coder" />
        <meta property="og:image" content="https://backbenchercoder.com/images/og-login.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Login to Backbencher Coder - Developer Platform" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login - Backbencher Coder" />
        <meta 
          name="twitter:description" 
          content="Sign in to access coding courses, projects, and developer community features on Backbencher Coder platform." 
        />
        <meta name="twitter:url" content="https://backbenchercoder.com/auth/login" />
        <meta name="twitter:image" content="https://backbenchercoder.com/images/twitter-login.jpg" />
        <meta name="twitter:site" content="@backbenchercoder" />
        <meta name="twitter:creator" content="@backbenchercoder" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Backbencher Coder" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="language" content="English" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://backbenchercoder.com/auth/login" />
        
        {/* Alternate Languages */}
        <link rel="alternate" href="https://backbenchercoder.com/auth/login" hrefLang="x-default" />
        <link rel="alternate" href="https://backbenchercoder.com/auth/login" hrefLang="en" />
        
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="./src/assets/login-hero.jpg" />
        
        {/* Structured Data / JSON-LD for Login Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Login - Backbencher Coder",
            "description": "Login page for Backbencher Coder developer platform",
            "url": "https://backbenchercoder.com/auth/login",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Backbencher Coder",
              "url": "https://backbenchercoder.com",
              "potentialAction": {
                "@type": "LoginAction",
                "name": "Login",
                "target": "https://backbenchercoder.com/auth/login",
                "handler": {
                  "@type": "HttpActionHandler",
                  "url": "https://backbenchercoder.com/api/auth/login"
                }
              }
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://backbenchercoder.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Login",
                  "item": "https://backbenchercoder.com/auth/login"
                }
              ]
            },
            "mainEntity": {
              "@type": "CreativeWork",
              "name": "Login Form",
              "description": "Secure authentication form for Backbencher Coder platform"
            }
          })}
        </script>

        {/* Additional Schema for Authentication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Authentication",
            "name": "Backbencher Coder Login",
            "description": "Secure user authentication system",
            "url": "https://backbenchercoder.com/auth/login",
            "authenticationMethod": [
              "Email and Password",
              "Google OAuth"
            ],
            "securityNote": "All authentication requests are encrypted and secure",
            "provider": {
              "@type": "Organization",
              "name": "Backbencher Coder",
              "url": "https://backbenchercoder.com"
            }
          })}
        </script>

        {/* Additional Schema for Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Backbencher Coder",
            "url": "https://backbenchercoder.com",
            "logo": "https://backbenchercoder.com/images/logo.png",
            "description": "Learn coding, build projects, and join a community of developers worldwide",
            "sameAs": [
              "https://twitter.com/backbenchercoder",
              "https://github.com/backbenchercoder",
              "https://linkedin.com/company/backbenchercoder"
            ]
          })}
        </script>
      </Helmet>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            {allowRegistration ? (
              <Link
                to="/auth/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            ) : (
              <span className="text-gray-500">Registrations are currently closed</span>
            )}
          </p>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/auth/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </div>
        </form>

        {/* ✅ Google Login Section - Conditionally Rendered */}
        {allowRegistration ? (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
                {loading ? "Signing in..." : "Sign in with Google"}
              </button>
            </div>
          </div>
        ) : (
          // ✅ Show maintenance message when registration is disabled
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="w-full flex items-center justify-center px-4 py-3 border border-yellow-300 rounded-md shadow-sm text-sm font-medium text-yellow-800 bg-yellow-50">
                <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Under Maintenance - Google Login
              </div>
              <p className="text-xs text-yellow-600 text-center mt-2">
                Google login is temporarily unavailable due to system maintenance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;