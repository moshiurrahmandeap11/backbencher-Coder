import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Home, Users, MessageCircle, Database } from "lucide-react";
import UseAuth from "../../../hooks/UseAuth/UseAuth";
import axiosInstance from "../../../hooks/AxiosInstance/AxiosInstance";

interface Profile {
  profileimage?: string;
  name?: string;
}

const Navbar = () => {
  const { user } = UseAuth();
  const [profile, setProfile] = useState<Profile>({});
  const navigate = useNavigate();

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

  const handleProfileClick = () => {
    const firstName = profile?.name?.split(" ")[0] || user?.displayName?.split(" ")[0] || "user";
    navigate(`/${firstName}/${user?.uid}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80";
  };

  const getProfileImageUrl = (): string => {
    if (!profile?.profileimage) {
      return "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80";
    }
    
    if (profile.profileimage.startsWith('http')) {
      return profile.profileimage;
    }
    
    const baseUrl = 'http://localhost:3000';
    if (profile.profileimage.startsWith('/')) {
      return `${baseUrl}${profile.profileimage}`;
    } else {
      return `${baseUrl}/${profile.profileimage}`;
    }
  };

  const profileImageUrl = getProfileImageUrl();

  // Mobile bottom navigation items
  const mobileNavItems = [
    { to: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { to: "/community", label: "Community", icon: <Users className="w-5 h-5" /> },
    { to: "/forum", label: "Forum", icon: <MessageCircle className="w-5 h-5" /> },
    { to: "/chat", label: "Chat", icon: <MessageCircle className="w-5 h-5" /> },
    { to: "/data", label: "Data", icon: <Database className="w-5 h-5" /> },
  ];

  // Desktop navigation items
  const desktopNavItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/community", label: "Community" },
    { to: "/forum", label: "Forum" },
    { to: "/chat", label: "Chat" },
    { to: "/data", label: "Data" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-blue-600 shadow-lg sticky top-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img
                  src="https://i.postimg.cc/vmGpnxQd/icon.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-bold text-xl">
                Backbencher Coder
              </span>
            </NavLink>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {desktopNavItems.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white text-blue-600 shadow-md"
                        : "text-white hover:bg-white/20"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Auth Section - Login/Profile at TOP RIGHT */}
            <div className="flex items-center space-x-4">
              {user ? (
                // Show profile image when user is logged in
                <div
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white hover:border-blue-300 transition-all duration-300"
                    src={profileImageUrl}
                    alt={profile?.name || user?.displayName || "User"}
                    onError={handleImageError}
                  />
                </div>
              ) : (
                // Show Login button when user is not logged in
                <NavLink
                  to="/auth/login"
                  className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Logo and Login/Profile */}
      <nav className="bg-blue-600 shadow-lg sticky top-0 z-50 md:hidden">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img
                  src="https://i.postimg.cc/vmGpnxQd/icon.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-bold text-lg">
                Backbencher
              </span>
            </NavLink>

            {/* Login/Profile at TOP RIGHT on mobile */}
            <div className="flex items-center">
              {user ? (
                // Show profile image when user is logged in
                <div
                  onClick={handleProfileClick}
                  className="cursor-pointer"
                >
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src={profileImageUrl}
                    alt={profile?.name || user?.displayName || "User"}
                    onError={handleImageError}
                  />
                </div>
              ) : (
                // Show Login button when user is not logged in
                <NavLink
                  to="/auth/login"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all duration-300"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Add padding to content for mobile bottom nav */}
      <div className="md:hidden pb-16"></div>
    </>
  );
};

export default Navbar;