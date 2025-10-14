import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const fadeInUp = {
        hidden: { y: 60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const slideInLeft = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const slideInRight = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const scaleIn = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden">
            {/* SEO Meta Tags */}
            <Helmet>
                {/* Basic Meta Tags */}
                <title>About Backbencher Coder - Our Mission, Vision & Developer Community</title>
                <meta 
                    name="description" 
                    content="Learn about Backbencher Coder's mission to democratize coding education. Discover our vision, team, and commitment to empowering developers worldwide." 
                />
                <meta 
                    name="keywords" 
                    content="about backbencher coder, coding education mission, developer community, programming learning platform, coding resources, tech education, developer tools, programming community" 
                />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="About Backbencher Coder - Our Mission to Democratize Coding Education" />
                <meta 
                    property="og:description" 
                    content="Discover how Backbencher Coder empowers developers worldwide with cutting-edge tools, resources, and a vibrant community to foster innovation and growth." 
                />
                <meta property="og:url" content="https://backbenchercoder.com/about" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Backbencher Coder" />
                <meta property="og:image" content="https://backbenchercoder.com/images/og-about.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="About Backbencher Coder - Empowering Developers Worldwide" />
                
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Backbencher Coder - Mission & Vision" />
                <meta 
                    name="twitter:description" 
                    content="Learn about our journey, team, and commitment to making coding education accessible to everyone worldwide." 
                />
                <meta name="twitter:url" content="https://backbenchercoder.com/about" />
                <meta name="twitter:image" content="https://backbenchercoder.com/images/twitter-about.jpg" />
                <meta name="twitter:site" content="@backbenchercoder" />
                <meta name="twitter:creator" content="@backbenchercoder" />
                
                {/* Additional SEO Meta Tags */}
                <meta name="author" content="Backbencher Coder" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="rating" content="general" />
                <meta name="distribution" content="global" />
                
                {/* Canonical URL */}
                <link rel="canonical" href="https://backbenchercoder.com/about" />
                
                {/* Alternate Languages */}
                <link rel="alternate" href="https://backbenchercoder.com/about" hrefLang="x-default" />
                <link rel="alternate" href="https://backbenchercoder.com/about" hrefLang="en" />
                
                {/* Preload critical resources */}
                <link rel="preload" as="image" href="./src/assets/about-hero.jpg" />
                
                {/* Structured Data / JSON-LD for About Page */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        "name": "About Backbencher Coder",
                        "description": "Learn about Backbencher Coder's mission, vision, and commitment to democratizing coding education",
                        "url": "https://backbenchercoder.com/about",
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "Backbencher Coder",
                            "description": "Programming education platform empowering developers worldwide",
                            "url": "https://backbenchercoder.com",
                            "foundingDate": "2023",
                            "founder": {
                                "@type": "Person",
                                "name": "Backbencher Coder"
                            },
                            "mission": "To democratize coding education and provide accessible, high-quality resources that empower individuals from all backgrounds to become proficient developers and innovators in the digital age.",
                            "vision": "A world where anyone with passion and dedication can learn to code, build amazing projects, and contribute to the global technology ecosystem regardless of their starting point.",
                            "address": {
                                "@type": "PostalAddress",
                                "addressCountry": "Global"
                            },
                            "email": "info@backbenchercoder.com",
                            "numberOfEmployees": "10+",
                            "slogan": "Empowering developers worldwide",
                            "knowsAbout": [
                                "Programming Education",
                                "Web Development",
                                "JavaScript",
                                "React",
                                "Python",
                                "Node.js",
                                "Coding Tutorials",
                                "Developer Community"
                            ],
                            "sameAs": [
                                "https://github.com/backbenchercoder",
                                "https://twitter.com/backbenchercoder",
                                "https://linkedin.com/company/backbenchercoder"
                            ]
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Backbencher Coder",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://backbenchercoder.com/images/logo.png"
                            }
                        }
                    })}
                </script>

                {/* Additional Schema for Organization */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Backbencher Coder",
                        "alternateName": "Backbencher Coder Platform",
                        "url": "https://backbenchercoder.com",
                        "logo": "https://backbenchercoder.com/images/logo.png",
                        "description": "Learn coding, build projects, and join a community of developers worldwide",
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "Global"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "customer service",
                            "email": "info@backbenchercoder.com",
                            "availableLanguage": "English"
                        },
                        "sameAs": [
                            "https://twitter.com/backbenchercoder",
                            "https://github.com/backbenchercoder",
                            "https://linkedin.com/company/backbenchercoder",
                            "https://youtube.com/backbenchercoder"
                        ],
                        "knowsAbout": [
                            "Computer Programming",
                            "Web Development",
                            "Software Engineering",
                            "JavaScript Programming",
                            "React Development",
                            "Python Programming",
                            "Node.js Development",
                            "Coding Education",
                            "Programming Tutorials",
                            "Developer Tools"
                        ],
                        "founder": {
                            "@type": "Person",
                            "name": "Backbencher Coder Team"
                        },
                        "foundingDate": "2023",
                        "numberOfEmployees": "10+",
                        "slogan": "Empowering developers worldwide with cutting-edge tools and resources"
                    })}
                </script>

                {/* Additional Schema for Educational Organization */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "EducationalOrganization",
                        "name": "Backbencher Coder",
                        "description": "Programming education platform providing coding tutorials, resources, and community support for developers",
                        "url": "https://backbenchercoder.com",
                        "logo": "https://backbenchercoder.com/images/logo.png",
                        "sameAs": [
                            "https://twitter.com/backbenchercoder",
                            "https://github.com/backbenchercoder"
                        ],
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "email": "info@backbenchercoder.com",
                            "contactType": "educational support"
                        },
                        "knowsAbout": [
                            "Programming",
                            "Web Development",
                            "Software Engineering",
                            "Coding Education"
                        ],
                        "memberOf": {
                            "@type": "Organization",
                            "name": "Developer Education Alliance"
                        }
                    })}
                </script>
            </Helmet>

            {/* Hero Section */}
            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 lg:py-24"
            >
                <div className="absolute inset-0 bg-black/20"></div>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                >
                    <motion.h1 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        About <span className="text-blue-200">Backbencher Coder</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                    >
                        Empowering developers worldwide with cutting-edge tools, resources, and a vibrant community to foster innovation and growth.
                    </motion.p>
                </motion.div>
            </motion.section>

            {/* Rest of your existing About page content remains exactly the same */}
            <motion.section 
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={containerVariants}
                className="py-16 lg:py-20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Mission */}
                        <motion.div 
                            variants={slideInLeft}
                            className="bg-white rounded-2xl shadow-lg p-8 lg:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6"
                            >
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </motion.div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To democratize coding education and provide accessible, high-quality resources that empower 
                                individuals from all backgrounds to become proficient developers and innovators in the digital age.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div 
                            variants={slideInRight}
                            className="bg-white rounded-2xl shadow-lg p-8 lg:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6"
                            >
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </motion.div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                A world where anyone with passion and dedication can learn to code, build amazing projects, 
                                and contribute to the global technology ecosystem regardless of their starting point.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="py-16 lg:py-20 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Backbencher Coder?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We provide everything you need to start and advance your coding journey
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                                title: "Expert Guidance",
                                description: "Learn from experienced developers and industry experts who provide practical insights and real-world knowledge.",
                                color: "blue"
                            },
                            {
                                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                                title: "Comprehensive Resources",
                                description: "Access a vast library of tutorials, documentation, and coding challenges tailored for all skill levels.",
                                color: "green"
                            },
                            {
                                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                                title: "Vibrant Community",
                                description: "Join thousands of developers in our supportive community where you can collaborate and grow together.",
                                color: "purple"
                            },
                            {
                                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                                title: "Hands-on Projects",
                                description: "Build real-world projects that enhance your portfolio and demonstrate your skills to potential employers.",
                                color: "orange"
                            },
                            {
                                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                                title: "Career Support",
                                description: "Get career guidance, interview preparation, and job placement assistance to kickstart your tech career.",
                                color: "red"
                            },
                            {
                                icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
                                title: "Customizable Learning",
                                description: "Choose your own learning path with personalized recommendations based on your goals and interests.",
                                color: "indigo"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ 
                                    y: -10,
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                                className="text-center p-6 lg:p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
                            >
                                <motion.div 
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className={`w-20 h-20 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6`}
                                >
                                    <svg className={`w-10 h-10 text-${feature.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                    </svg>
                                </motion.div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={staggerContainer}
                className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
                    >
                        {[
                            { number: "10K+", label: "Active Developers" },
                            { number: "500+", label: "Learning Resources" },
                            { number: "95%", label: "Success Rate" },
                            { number: "24/7", label: "Community Support" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={scaleIn}
                                whileHover={{ scale: 1.1 }}
                                className="p-4"
                            >
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-3xl lg:text-4xl font-bold mb-2"
                                >
                                    {stat.number}
                                </motion.div>
                                <div className="text-blue-200">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Team Section */}
            <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="py-16 lg:py-20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Passionate individuals dedicated to making coding education accessible to everyone
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[
                            { 
                                initials: "BC", 
                                name: "Backbencher Coder", 
                                role: "Founder & Lead Developer",
                                description: "Passionate about creating tools that empower developers and make coding accessible to all.",
                                gradient: "from-blue-400 to-purple-600"
                            },
                            { 
                                initials: "TC", 
                                name: "Tech Community", 
                                role: "Community Manager",
                                description: "Dedicated to building and nurturing our vibrant community of developers and learners.",
                                gradient: "from-green-400 to-blue-500"
                            },
                            { 
                                initials: "CE", 
                                name: "Content Experts", 
                                role: "Education Team",
                                description: "Creating comprehensive learning materials and resources for developers at every level.",
                                gradient: "from-purple-400 to-pink-500"
                            }
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ 
                                    y: -15,
                                    scale: 1.03,
                                    transition: { duration: 0.3 }
                                }}
                                className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300"
                            >
                                <motion.div 
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className={`w-24 h-24 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                                >
                                    <span className="text-white text-2xl font-bold">{member.initials}</span>
                                </motion.div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                                <p className="text-gray-600">{member.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-16 lg:py-20 bg-gray-900 text-white"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2 
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl lg:text-4xl font-bold mb-6"
                    >
                        Ready to Start Your Coding Journey?
                    </motion.h2>
                    <motion.p 
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                    >
                        Join thousands of developers who have transformed their careers with Backbencher Coder
                    </motion.p>
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Get Started Free
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-all duration-200"
                        >
                            Explore Resources
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default About;