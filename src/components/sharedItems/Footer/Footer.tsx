import { NavLink } from "react-router";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact" },
        { to: "/forum", label: "Forum" },
    ];

    const resources = [
        { to: "/blog", label: "Blog" },
        { to: "/tutorials", label: "Tutorials" },
        { to: "/docs", label: "Documentation" },
        { to: "/faq", label: "FAQ" },
    ];

    const legal = [
        { to: "/privacy", label: "Privacy Policy" },
        { to: "/terms", label: "Terms of Service" },
        { to: "/cookies", label: "Cookie Policy" },
    ];

    const socialLinks = [
        { href: "https://facebook.com", icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
        { href: "https://twitter.com", icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
        { href: "https://instagram.com", icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
        { href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
        { href: "https://github.com", icon: <Github className="w-5 h-5" />, label: "GitHub" },
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-xl font-bold">BC</span>
                            </div>
                            <h3 className="text-xl font-bold">Backbencher Coder</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Empowering developers to build amazing things. Join our community and start your coding journey today.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transform hover:scale-110 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {resources.map((link) => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-gray-300">
                                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                                <span className="text-sm">Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-300">
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                <a href="mailto:info@backbenchercoder.com" className="text-sm hover:text-white transition-colors">
                                    info@backbenchercoder.com
                                </a>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-300">
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <a href="tel:+8801234567890" className="text-sm hover:text-white transition-colors">
                                    +880 123-456-7890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="max-w-md mx-auto text-center">
                        <h4 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h4>
                        <p className="text-gray-300 text-sm mb-4">Get the latest updates and news delivered to your inbox</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-300 text-sm flex items-center gap-1">
                            © {currentYear} Backbencher Coder. Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> in Bangladesh
                        </p>
                        <div className="flex space-x-6">
                            {legal.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className="text-gray-300 hover:text-white text-sm transition-colors"
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;