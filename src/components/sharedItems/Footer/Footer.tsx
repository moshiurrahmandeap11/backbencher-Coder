import { NavLink } from "react-router";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../hooks/AxiosInstance/AxiosInstance";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const quickLinks = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
        { to: "/forum", label: "Forum" },
    ];

    const resources = [
        { to: "/blog", label: "Blog" },
        { to: "/tutorials", label: "Tutorials" },
        { to: "/docs", label: "Docs" },
        { to: "/faq", label: "FAQ" },
    ];

    const socialLinks = [
        { href: "https://facebook.com", icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
        { href: "https://twitter.com", icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
        { href: "https://instagram.com", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
        { href: "https://linkedin.com", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
        { href: "https://github.com", icon: <Github className="w-4 h-4" />, label: "GitHub" },
    ];

    const handleSubscribe = async () => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email");
            return;
        }

        setLoading(true);

        try {
            const response = await axiosInstance.post('/subscribers', { email });
            
            if (response.data.success) {
                toast.success("Subscribed successfully!");
                setEmail("");
            } else {
                toast.error(response.data.message || "Subscription failed");
            }
        } catch (error: any) {
            if (error.response?.status === 409) {
                toast.error("Email already subscribed");
            } else {
                toast.error("Failed to subscribe");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubscribe();
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Brand Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <span className="font-bold text-white">BC</span>
                            </div>
                            <span className="font-bold text-lg">Backbencher Coder</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Learn coding, build projects, and join our developer community.
                        </p>
                        <div className="flex gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-3">Resources</h4>
                        <ul className="space-y-2">
                            {resources.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-3">Contact</h4>
                            <div className="space-y-2 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>contact@backbencher.dev</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Dhaka, Bangladesh</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Newsletter</h4>
                            <div className="space-y-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Your email"
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:border-blue-500"
                                    disabled={loading}
                                />
                                <button
                                    onClick={handleSubscribe}
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    {loading ? "Subscribing..." : "Subscribe"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-6 pt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Backbencher Coder. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;