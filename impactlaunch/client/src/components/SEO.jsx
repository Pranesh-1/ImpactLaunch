import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, url }) {
    const siteTitle = "ImpactLaunch | AI Growth Platform";
    const finalTitle = title ? `${title} | ImpactLaunch` : siteTitle;
    const desc = description || "Launch your purpose-driven startup with AI-powered tools for growth and impact.";

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={desc} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || "https://impactlaunch.demo"} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={desc} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url || "https://impactlaunch.demo"} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={desc} />
            {image && <meta property="twitter:image" content={image} />}

            {/* Analytics Mock */}
            <script>
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DEMO-12345');
        `}
            </script>
        </Helmet>
    );
}
