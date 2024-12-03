import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
}

export default function SEO({ 
  title, 
  description, 
  canonical,
  type = 'website'
}: SEOProps) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const finalCanonical = canonical || currentUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "SpeedBite",
    "image": [
      `${origin}/icon-512.png`
    ],
    "@id": origin,
    "url": origin,
    "telephone": "+1-234-567-8900",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Food Street",
      "addressLocality": "Foodtown",
      "addressRegion": "ST",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "servesCuisine": "American",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "23:00"
      }
    ],
    "menu": origin + "/#menu"
  };

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{`${title} | SpeedBite`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={finalCanonical} />

      {/* OpenGraph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={`${origin}/icon-512.png`} />
      <meta property="og:site_name" content="SpeedBite" />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${origin}/icon-512.png`} />

      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}