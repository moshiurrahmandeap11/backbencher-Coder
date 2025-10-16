import { useState } from 'react';
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

const Contact = () => {
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
        <div className="min-h-screen bg-gray-50 py-12">
            {/* SEO Meta Tags */}
            <Helmet>
                <title>Contact Backbencher Coder - Get Support & Collaborate</title>
                <meta 
                    name="description" 
                    content="Get in touch with Backbencher Coder team. Contact us for technical support, collaboration opportunities, and developer community partnerships." 
                />
            </Helmet>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions or want to collaborate? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 sm:p-8">
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                                            errors.name 
                                                ? 'border-red-300 focus:ring-red-200' 
                                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        }`}
                                        placeholder="Your full name"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                                            errors.email 
                                                ? 'border-red-300 focus:ring-red-200' 
                                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        }`}
                                        placeholder="you@domain.com"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <input
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                                        errors.subject 
                                            ? 'border-red-300 focus:ring-red-200' 
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                    placeholder="What's this about?"
                                />
                                {errors.subject && <p className="mt-2 text-sm text-red-600">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                                        errors.message 
                                            ? 'border-red-300 focus:ring-red-200' 
                                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                    placeholder="Tell us more about your inquiry..."
                                />
                                {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                {submitting ? 'Sending Message...' : 'Send Message'}
                            </button>

                            {success && (
                                <div className={`p-4 rounded-lg ${
                                    success.includes('Failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                                }`}>
                                    {success}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Email</p>
                                        <p className="text-gray-600">support@backbencher.dev</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Phone</p>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Address</p>
                                        <p className="text-gray-600">123 Backbencher Ave<br />Code City, Global</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Email Support</span>
                                    <span className="text-sm font-medium text-gray-900">Within 24 hours</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Technical Issues</span>
                                    <span className="text-sm font-medium text-gray-900">Within 48 hours</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Collaboration</span>
                                    <span className="text-sm font-medium text-gray-900">Within 3 days</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Immediate Help?</h3>
                            <p className="text-blue-700 text-sm mb-4">
                                Check our documentation and community forums for quick answers to common questions.
                            </p>
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                Visit Help Center
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;