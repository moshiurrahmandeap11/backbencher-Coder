import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

type FormState = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const initialForm: FormState = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

const Contact: React.FC = () => {
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const validate = (values: FormState) => {
        const e: Partial<FormState> = {};
        if (!values.name.trim()) e.name = 'Name is required';
        if (!values.email.trim()) e.email = 'Email is required';
        else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(values.email)) e.email = 'Invalid email';
        if (!values.subject.trim()) e.subject = 'Subject is required';
        if (!values.message.trim()) e.message = 'Message is required';
        return e;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(null);
        const validation = validate(form);
        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            return;
        }

        try {
            setSubmitting(true);
            // Mock submit delay
            await new Promise(resolve => setTimeout(resolve, 900));
            setSuccess('Your message has been sent. We will get back to you soon.');
            setForm(initialForm);
            } catch (err: unknown) {
                console.error('Contact submit error:', err);
                setSuccess('Failed to send message. Please try again later.');
            } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
            {/* SEO Meta Tags */}
            <Helmet>
                {/* Basic Meta Tags */}
                <title>Contact Backbencher Coder - Get Support & Collaborate</title>
                <meta 
                    name="description" 
                    content="Get in touch with Backbencher Coder team. Contact us for technical support, collaboration opportunities, course inquiries, and developer community partnerships." 
                />
                <meta 
                    name="keywords" 
                    content="contact backbencher coder, programming support, coding help, technical support, collaboration, course inquiry, developer community, contact form, get in touch" 
                />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Contact Backbencher Coder - Get Support & Collaborate" />
                <meta 
                    property="og:description" 
                    content="Reach out to our team for technical support, course inquiries, collaboration opportunities, or to join our vibrant developer community." 
                />
                <meta property="og:url" content="https://backbenchercoder.com/contact" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Backbencher Coder" />
                <meta property="og:image" content="https://backbenchercoder.com/images/og-contact.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Contact Backbencher Coder - Get in Touch" />
                
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Backbencher Coder - Support & Collaboration" />
                <meta 
                    name="twitter:description" 
                    content="Have questions or want to collaborate? Contact our team for programming support, course information, and community partnerships." 
                />
                <meta name="twitter:url" content="https://backbenchercoder.com/contact" />
                <meta name="twitter:image" content="https://backbenchercoder.com/images/twitter-contact.jpg" />
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
                <link rel="canonical" href="https://backbenchercoder.com/contact" />
                
                {/* Alternate Languages */}
                <link rel="alternate" href="https://backbenchercoder.com/contact" hrefLang="x-default" />
                <link rel="alternate" href="https://backbenchercoder.com/contact" hrefLang="en" />
                
                {/* Preload critical resources */}
                <link rel="preload" as="image" href="./src/assets/contact-hero.jpg" />
                
                {/* Structured Data / JSON-LD for Contact Page */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "name": "Contact Backbencher Coder",
                        "description": "Contact page for Backbencher Coder - Programming education platform",
                        "url": "https://backbenchercoder.com/contact",
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "Backbencher Coder",
                            "description": "Programming education platform for developers",
                            "url": "https://backbenchercoder.com",
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "contactType": "customer service",
                                "email": "support@backbencher.dev",
                                "telephone": "+1-555-123-4567",
                                "availableLanguage": "English",
                                "areaServed": "Worldwide"
                            },
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "123 Backbencher Ave",
                                "addressLocality": "Code City",
                                "addressCountry": "Global"
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
                                    "name": "Contact",
                                    "item": "https://backbenchercoder.com/contact"
                                }
                            ]
                        }
                    })}
                </script>

                {/* Additional Schema for Organization with Contact Points */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Backbencher Coder",
                        "url": "https://backbenchercoder.com",
                        "logo": "https://backbenchercoder.com/images/logo.png",
                        "description": "Learn coding, build projects, and join a community of developers worldwide",
                        "contactPoint": [
                            {
                                "@type": "ContactPoint",
                                "contactType": "customer support",
                                "email": "support@backbencher.dev",
                                "telephone": "+1-555-123-4567",
                                "availableLanguage": "English",
                                "areaServed": "Worldwide"
                            },
                            {
                                "@type": "ContactPoint",
                                "contactType": "technical support",
                                "email": "tech@backbencher.dev",
                                "availableLanguage": "English",
                                "areaServed": "Worldwide"
                            },
                            {
                                "@type": "ContactPoint",
                                "contactType": "collaboration",
                                "email": "partnerships@backbencher.dev",
                                "availableLanguage": "English",
                                "areaServed": "Worldwide"
                            }
                        ],
                        "sameAs": [
                            "https://twitter.com/backbenchercoder",
                            "https://github.com/backbenchercoder",
                            "https://linkedin.com/company/backbenchercoder",
                            "https://youtube.com/backbenchercoder"
                        ]
                    })}
                </script>

                {/* Additional Schema for WebPage */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Contact Backbencher Coder",
                        "description": "Contact form and information for Backbencher Coder programming platform",
                        "url": "https://backbenchercoder.com/contact",
                        "isPartOf": {
                            "@type": "WebSite",
                            "name": "Backbencher Coder",
                            "url": "https://backbenchercoder.com"
                        },
                        "about": {
                            "@type": "Organization",
                            "name": "Backbencher Coder",
                            "description": "Programming education platform"
                        },
                        "mainEntity": {
                            "@type": "ContactPoint",
                            "contactType": "customer service",
                            "email": "support@backbencher.dev",
                            "availableLanguage": "English"
                        }
                    })}
                </script>
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
                        <p className="text-gray-600 mb-6">Have a question or want to collaborate? Send us a message and we'll reply as soon as possible.</p>

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200'}`}
                                        placeholder="Your full name"
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                    />
                                    {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200'}`}
                                        placeholder="you@domain.com"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                    />
                                    {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${errors.subject ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200'}`}
                                    placeholder="Subject"
                                    aria-invalid={!!errors.subject}
                                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                                />
                                {errors.subject && <p id="subject-error" className="mt-1 text-xs text-red-600">{errors.subject}</p>}
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${errors.message ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200'}`}
                                    placeholder="Write your message here..."
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? 'message-error' : undefined}
                                />
                                {errors.message && <p id="message-error" className="mt-1 text-xs text-red-600">{errors.message}</p>}
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60"
                                >
                                    {submitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {success && <p className="text-sm text-green-600">{success}</p>}
                            </div>
                        </form>
                    </div>

                    {/* Sidebar with contact info & map */}
                    <aside className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                            <p className="text-gray-600 mt-2">Reach out via email or phone, or visit our office during business hours.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium text-gray-900">support@backbencher.dev</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1 5h13" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium text-gray-900">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 .9-.4 1.7-1 2.3L6 18l3.6-5c.6-.6 1-1.4 1-2.3 0-1.9 1.5-3.5 3.4-3.5S17.8 7 17.8 8.9c0 .9-.4 1.7-1 2.3L14 14l-2-3z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="font-medium text-gray-900">123 Backbencher Ave, Code City</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-40 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                            Map placeholder
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Contact;