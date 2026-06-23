import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  noindex?: boolean;
}

const SITE_NAME = "YugAI Command Center";
const BASE_URL = "https://yugai.vercel.app";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  "Explore Yug Sathavara's AI-powered portfolio featuring Full Stack Development, AI Projects, Recruiter Dashboard, Project Case Studies, and an interactive AI Career Twin.";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogUrl,
  canonical,
  noindex = false,
}: SEOProps) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | AI Career Twin & Full Stack Developer Portfolio`;
  const pageOgTitle = ogTitle ?? pageTitle;
  const pageOgDescription = ogDescription ?? description;
  const pageOgUrl = ogUrl ?? BASE_URL;
  const pageCanonical = canonical ?? (ogUrl ?? BASE_URL);

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={pageOgTitle} />
      <meta property="og:description" content={pageOgDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageOgUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageOgTitle} />
      <meta name="twitter:description" content={pageOgDescription} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="canonical" href={pageCanonical} />
    </Helmet>
  );
}
