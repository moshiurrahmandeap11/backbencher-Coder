import { Helmet } from 'react-helmet-async';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* SEO Meta Tags */}
            <Helmet>
                <title>About Backbencher Coder - Our Mission & Developer Community</title>
                <meta 
                    name="description" 
                    content="Learn about Backbencher Coder's mission to make coding education accessible to everyone. Our vision, team, and commitment to empowering developers." 
                />
                <meta 
                    name="keywords" 
                    content="about backbencher coder, coding education, developer community, programming learning" 
                />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        About Backbencher Coder
                    </h1>
                    <p className="text-xl text-blue-100">
                        Empowering developers with practical tools and resources to build better software.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed">
                                To make coding education practical and accessible. We believe everyone should have 
                                the opportunity to learn programming through real-world examples and hands-on projects.
                            </p>
                        </div>
                        
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <p className="text-gray-600 leading-relaxed">
                                A world where anyone with dedication can learn to code and build meaningful software, 
                                regardless of their background or starting point.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">What We Provide</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Practical Tutorials</h3>
                            <p className="text-gray-600">
                                Step-by-step guides focused on real-world applications and problem-solving.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Developer Community</h3>
                            <p className="text-gray-600">
                                Connect with fellow developers, share knowledge, and grow together.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Code Resources</h3>
                            <p className="text-gray-600">
                                Ready-to-use code snippets, templates, and project examples.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">10K+</div>
                            <div className="text-gray-600">Developers</div>
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">500+</div>
                            <div className="text-gray-600">Resources</div>
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">95%</div>
                            <div className="text-gray-600">Success Rate</div>
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">24/7</div>
                            <div className="text-gray-600">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">BC</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-1">Backbencher Coder</h3>
                            <p className="text-blue-600 mb-2">Founder</p>
                            <p className="text-gray-600 text-sm">
                                Passionate about creating practical coding resources that help developers solve real problems.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">TC</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-1">Community</h3>
                            <p className="text-green-600 mb-2">Team</p>
                            <p className="text-gray-600 text-sm">
                                Dedicated to building a supportive environment where developers can learn and grow together.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">CE</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-1">Content Team</h3>
                            <p className="text-purple-600 mb-2">Educators</p>
                            <p className="text-gray-600 text-sm">
                                Creating clear, practical learning materials that focus on real-world application.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Start Your Coding Journey</h2>
                    <p className="text-blue-100 mb-8 text-lg">
                        Join developers worldwide who are building their skills with practical, real-world projects.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Explore Resources
                    </button>
                </div>
            </section>
        </div>
    );
};

export default About;