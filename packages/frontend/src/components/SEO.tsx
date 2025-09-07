"use client";

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  url?: string;
  keywords?: string;
  jsonLd?: any;
}

/**
 * SEO - u041au043eu043cu043fu043eu043du0435u043du0442 u0434u043bu044f u043eu043fu0442u0438u043cu0438u0437u0430u0446u0438u0438 SEO u0441 u0434u0438u043du0430u043cu0438u0447u0435u0441u043au0438u043cu0438 u043cu0435u0442u0430-u0442u0435u0433u0430u043cu0438
 * u0438 u0441u0442u0440u0443u043au0442u0443u0440u0438u0440u043eu0432u0430u043du043du044bu043cu0438 u0434u0430u043du043du044bu043cu0438 JSON-LD
 */
export default function SEO({
  title = 'AcroneLab - Web3 Innovation Studio',
  description = 'AcroneLab is a pioneering Web3 innovation studio specialized in blockchain games, NFT projects, and cutting-edge digital experiences.',
  image = '/og-image.jpg',
  type = 'website',
  url,
  keywords = 'web3, blockchain, nft, digital design, creative studio',
  jsonLd
}: SEOProps) {
  const pathname = usePathname();
  
  // u0424u043eu0440u043cu0438u0440u0443u0435u043c URL u0441u0442u0440u0430u043du0438u0446u044b
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acronelab.com';
  const pageUrl = url || `${siteUrl}${pathname}`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  // u0414u043eu0431u0430u0432u043bu044fu0435u043c u0431u0440u0435u043du0434u0438u043du0433 u0432 u0437u0430u0433u043eu043bu043eu0432u043eu043a, u0435u0441u043bu0438 u043eu043d u0435u0449u0435 u043du0435 u0441u043eu0434u0435u0440u0436u0438u0442 u043du0430u0437u0432u0430u043du0438u0435 u0431u0440u0435u043du0434u0430
  const fullTitle = title.includes('AcroneLab') ? title : `${title} | AcroneLab`;
  
  // u0424u043eu0440u043cu0438u0440u0443u0435u043c u0434u0430u043du043du044bu0435 JSON-LD u043fu043e u0443u043cu043eu043bu0447u0430u043du0438u044e, u0435u0441u043bu0438 u043du0435 u043fu0435u0440u0435u0434u0430u043du044b
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": type === 'website' ? 'WebSite' : 'Article',
    "url": pageUrl,
    "name": fullTitle,
    "description": description,
    "image": imageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "AcroneLab",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    }
  };
  
  // u0418u0441u043fu043eu043bu044cu0437u0443u0435u043c u043fu0435u0440u0435u0434u0430u043du043du044bu0435 u0434u0430u043du043du044bu0435 JSON-LD u0438u043bu0438 u0434u0430u043du043du044bu0435 u043fu043e u0443u043cu043eu043bu0447u0430u043du0438u044e
  const finalJsonLd = jsonLd || defaultJsonLd;
  
  return (
    <Head>
      {/* u041eu0441u043du043eu0432u043du044bu0435 u043cu0435u0442u0430-u0442u0435u0433u0438 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* u041au0430u043du043eu043du0438u0447u0435u0441u043au0438u0439 URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="AcroneLab" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* u0414u043eu043fu043eu043bu043du0438u0442u0435u043bu044cu043du044bu0435 u043cu0435u0442u0430-u0442u0435u0433u0438 u0434u043bu044f u0443u043bu0443u0447u0448u0435u043du0438u044f u0440u0435u043du0434u0435u0440u0438u043du0433u0430 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#0F172A" />

      {/* u041fu0440u0435u0434u0437u0430u0433u0440u0443u0437u043au0430 u0448u0440u0438u0444u0442u043eu0432 u0438 u043au0440u0438u0442u0438u0447u0435u0441u043au0438u0445 u0440u0435u0441u0443u0440u0441u043eu0432 u0434u043bu044f u0443u043bu0443u0447u0448u0435u043du0438u044f LCP */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={imageUrl} as="image" />
      
      {/* JSON-LD u0441u0442u0440u0443u043au0442u0443u0440u0438u0440u043eu0432u0430u043du043du044bu0435 u0434u0430u043du043du044bu0435 */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalJsonLd) }}
      />
    </Head>
  );
}
