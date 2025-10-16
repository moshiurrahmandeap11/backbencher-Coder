
import { Helmet } from 'react-helmet-async';
import WhatInMind from './HomeElements/whatInMind/WhatInMind';
import PopUpRegister from '../PopUpRegister/PopUpRegister';

const Home = () => {
    return (
        <div>
            <Helmet>
                {/* Basic Meta Tags */}
                <title>Backbencher Coder - Learn to Code, Build Projects, Join Developer Community</title>
                <meta 
                    name="description" 
                    content="Join Backbencher Coder - The ultimate platform for developers. Learn coding, build real-world projects, join an active community, and advance your programming career." 
                />
                <meta 
                    name="keywords" 
                    content="learn coding, programming, web development, javascript, react, python, node.js, programming courses, coding tutorials, developer community, programming projects, coding challenges, backend development, frontend development, full stack development" 
                />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Backbencher Coder - Learn to Code, Build Projects, Join Community" />
                <meta 
                    property="og:description" 
                    content="Join thousands of developers learning together. Free coding resources, interactive tutorials, and a supportive community to help you master programming." 
                />
                <meta property="og:url" content="https://backbenchercoder.com" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Backbencher Coder" />
                <meta property="og:image" content="https://backbenchercoder.com/images/og-home.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Backbencher Coder - Coding Community" />
                
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Backbencher Coder - Learn to Code & Build Projects" />
                <meta 
                    name="twitter:description" 
                    content="Join our developer community. Learn programming, build portfolio projects, and connect with fellow coders worldwide." 
                />
                <meta name="twitter:url" content="https://backbenchercoder.com" />
                <meta name="twitter:image" content="https://backbenchercoder.com/images/twitter-home.jpg" />
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
                <link rel="canonical" href="https://backbenchercoder.com" />
                
                {/* Alternate Languages (if you have multi-language support in future) */}
                <link rel="alternate" href="https://backbenchercoder.com" hrefLang="x-default" />
                <link rel="alternate" href="https://backbenchercoder.com" hrefLang="en" />
                
                {/* Preload critical resources */}
                <link rel="preload" as="image" href="./src/assets/hero-image.jpg" />
                
                {/* Structured Data / JSON-LD for Homepage */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Backbencher Coder",
                        "description": "Learn coding, build projects, and join a community of developers",
                        "url": "https://backbenchercoder.com",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://backbenchercoder.com/search?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Backbencher Coder",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://backbenchercoder.com/images/logo.png"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "email": "info@backbenchercoder.com",
                                "contactType": "customer service"
                            }
                        },
                        "mainEntity": {
                            "@type": "EducationalOrganization",
                            "name": "Backbencher Coder",
                            "description": "Programming education platform for developers",
                            "url": "https://backbenchercoder.com",
                            "sameAs": [
                                "https://github.com/backbenchercoder",
                                "https://twitter.com/backbenchercoder",
                                "https://linkedin.com/company/backbenchercoder"
                            ]
                        }
                    })}
                </script>

                {/* Additional Schema for Course Catalog */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Programming Courses",
                        "description": "Comprehensive programming courses and tutorials",
                        "url": "https://backbenchercoder.com/courses",
                        "numberOfItems": 50,
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "item": {
                                    "@type": "Course",
                                    "name": "JavaScript Fundamentals",
                                    "description": "Learn JavaScript from scratch",
                                    "url": "https://backbenchercoder.com/courses/javascript"
                                }
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "item": {
                                    "@type": "Course",
                                    "name": "React Masterclass",
                                    "description": "Master React.js development",
                                    "url": "https://backbenchercoder.com/courses/react"
                                }
                            }
                        ]
                    })}
                </script>
            </Helmet>

            {/* Home page content */}
            <div>
                <WhatInMind></WhatInMind>

                {/* pop up register */}
                <PopUpRegister></PopUpRegister>
            </div>
        </div>
    );
};

export default Home;