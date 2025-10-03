import { NavLink } from "react-router";
import { useState } from "react";
import { Menu, X, MessageCircle, Users } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
        { to: "/chat", label: "Community Chat", icon: <MessageCircle className="w-4 h-4" /> },
        { to: "/forum", label: "Forum", icon: <Users className="w-4 h-4" /> },
    ];

    return (
        <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to="/" className="flex items-center space-x-2 group">
                            <div className="w-10 h-10  rounded-lg flex items-center justify-center overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                                <img src="https://i.postimg.cc/vmGpnxQd/icon.jpg" alt="Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-white font-bold text-xl hidden sm:block">
                                Backbencher Coder
                            </span>
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
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
                        <NavLink
                            to="/get-started"
                            className="ml-4 px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Get Started
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-white p-2 rounded-lg hover:bg-white/20 transition-colors duration-300"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-4 pt-2 pb-4 space-y-2 bg-purple-700/50 backdrop-blur-sm">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                ` px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
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
                    <NavLink
                        to="/get-started"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 bg-white text-purple-600 rounded-lg font-semibold text-center hover:bg-gray-100 transition-all duration-300 shadow-lg mt-2"
                    >
                        Get Started
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;