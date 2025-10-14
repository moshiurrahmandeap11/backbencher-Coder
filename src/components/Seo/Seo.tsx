import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axiosInstance from '../../hooks/AxiosInstance/AxiosInstance';


interface SEOData {
    site_name: string;
    site_description: string;
    site_url: string;
    contact_email: string;
}

const SEO = () => {
    const [seoData, setSeoData] = useState<SEOData>({
        site_name: 'Backbencher Coder',
        site_description: 'Empowering developers worldwide with coding resources, tutorials, and community support',
        site_url: 'https://backbenchercoder.com',
        contact_email: 'info@backbenchercoder.com'
    });

    useEffect(() => {
        fetchSEOSettings();
    }, []);

    const fetchSEOSettings = async () => {
        try {
            const response = await axiosInstance.get('/seo');
            if (response.data.success) {
                setSeoData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching SEO settings:', error);
        }
    };

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{seoData.site_name} - Learn to Code, Build Projects, Join Community</title>
            <meta name="description" content={seoData.site_description} />
            <meta name="keywords" content="coding, programming, web development, javascript, react, python, learn to code, programming community" />
            
            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={seoData.site_name} />
            <meta property="og:description" content={seoData.site_description} />
            <meta property="og:url" content={seoData.site_url} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={seoData.site_name} />
            
            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seoData.site_name} />
            <meta name="twitter:description" content={seoData.site_description} />
            <meta name="twitter:url" content={seoData.site_url} />
            
            {/* Additional SEO Meta Tags */}
            <meta name="author" content={seoData.site_name} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            
            {/* Canonical URL */}
            <link rel="canonical" href={seoData.site_url} />
            
            {/* Favicon and Icons */}
            <link rel="icon" type="image/svg+xml" href="./src/assets/favicon.png" />
            <link rel="apple-touch-icon" href="./src/assets/favicon.png" />
            
            {/* Structured Data / JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": seoData.site_name,
                    "description": seoData.site_description,
                    "url": seoData.site_url,
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${seoData.site_url}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": seoData.site_name,
                        "email": seoData.contact_email,
                        "url": seoData.site_url
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;