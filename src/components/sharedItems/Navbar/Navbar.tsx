import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, Users, LogOut } from "lucide-react";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import axiosInstance from "../../../hooks/AxiosInstance/AxiosInstance";

interface Profile {
  profileimage?: string;
  name?: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = UseAuth();
  const [profile, setProfile] = useState<Profile>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user?.uid) {
          const res = await axiosInstance.get(`/users/${user.uid}`);
          setProfile(res.data.data);
        }
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user?.uid]);

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Get profile image URL with proper formatting
  const getProfileImageUrl = (): string => {
    if (!profile?.profileimage) {
      return "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80";
    }
    
    // If image path is already a full URL, return it as is
    if (profile.profileimage.startsWith('http')) {
      return profile.profileimage;
    }
    
    // If it's a relative path, convert to full URL
    const baseUrl = 'http://localhost:3000';
    
    // Handle both formats: "/uploads/profiles/filename" and "uploads/profiles/filename"
    if (profile.profileimage.startsWith('/')) {
      return `${baseUrl}${profile.profileimage}`;
    } else {
      return `${baseUrl}/${profile.profileimage}`;
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    {
      to: "/chat",
      label: "Community Chat",
      icon: <MessageCircle className="w-4 h-4" />,
    },
    { to: "/forum", label: "Forum", icon: <Users className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfileClick = () => {
    const firstName = profile?.name?.split(" ")[0] || user?.displayName?.split(" ")[0] || "user";
    navigate(`/${firstName}/${user?.uid}`);
    setIsOpen(false);
  };

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80";
  };

  const profileImageUrl = getProfileImageUrl();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo + Hamburger */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu - Always show but position changes based on login */}
            {user ? (
              // Logged in - Hamburger on LEFT side
              <button
                onClick={toggleMenu}
                className="text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110 lg:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            ) : (
              // Not logged in - Hamburger on RIGHT side (we'll position it differently)
              <button
                onClick={toggleMenu}
                className="text-white p-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110 md:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            )}

            {/* Logo */}
            <NavLink 
              to="/" 
              className="flex items-center space-x-2 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://i.postimg.cc/vmGpnxQd/icon.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">
                Backbencher Coder
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation - Center (Only show when logged in) */}
          {user && (
            <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-white text-purple-600 shadow-md"
                        : "text-white hover:bg-white/20"
                    }`
                  }
                >
                  {link.icon && link.icon}
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}

          {/* Right Section - Profile/Get Started */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Logged in - Show profile on RIGHT side
              <div className="flex items-center space-x-3">
                {/* Desktop Navigation for logged out users */}
                {!user && (
                  <div className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                            isActive
                              ? "bg-white text-purple-600 shadow-md"
                              : "text-white hover:bg-white/20"
                          }`
                        }
                      >
                        {link.icon && link.icon}
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}

                {/* Desktop Profile */}
                <div className="hidden md:flex items-center space-x-3">
                  <div
                    onClick={handleProfileClick}
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white group-hover:border-purple-300 transition-all duration-300 transform group-hover:scale-110"
                      src={profileImageUrl}
                      alt={profile?.name || user?.displayName || "User"}
                      onError={handleImageError}
                    />
                  </div>
                </div>

                {/* Mobile Profile Icon */}
                <div className="md:hidden flex items-center space-x-3">
                  <div
                    onClick={handleProfileClick}
                    className="cursor-pointer"
                  >
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white"
                      src={profileImageUrl}
                      alt={profile?.name || user?.displayName || "User"}
                      onError={handleImageError}
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Not logged in - Show Get Started button on RIGHT side
              <div className="flex items-center space-x-4">
                {/* Desktop Navigation for logged out users */}
                <div className="hidden md:flex items-center space-x-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                          isActive
                            ? "bg-white text-purple-600 shadow-md"
                            : "text-white hover:bg-white/20"
                        }`
                      }
                    >
                      {link.icon && link.icon}
                      {link.label}
                    </NavLink>
                  ))}
                </div>

                <NavLink
                  to="/auth/login"
                  className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Get Started
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu - Works for both logged in and logged out */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Sidebar */}
        <div className="relative w-80 max-w-full h-full bg-gradient-to-b from-indigo-700 to-purple-800 shadow-2xl">
          {/* Sidebar Header - Only show when user is logged in */}
          {user && (
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <img
                  className="w-12 h-12 rounded-full border-2 border-white"
                  src={profileImageUrl}
                  alt={profile?.name || user?.displayName || "User"}
                  onError={handleImageError}
                />
                <div>
                  <h3 className="text-white font-semibold">
                    {profile?.name || user?.displayName || "User"}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-white/20 shadow-lg"
                      : "hover:bg-white/10"
                  }`
                }
              >
                {link.icon && link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            {user ? (
              // Logout Button for logged in users
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              // Login/Register Buttons for logged out users
              <div className="space-y-2">
                <NavLink
                  to="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all duration-300"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;