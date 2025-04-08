import type { APIRoute } from "astro";

const robots = (sitemapUrl: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapUrl.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL("/sitemap-index.xml", site);
  return new Response(robots(sitemapUrl));
};
