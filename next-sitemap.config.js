// @ts-check

/** @type {import("next-sitemap").IConfig} */
export default {
  siteUrl:
    process.env.SITE_URL ??
    process.env.VERCEL_URL ??
    "https://ducanh-filmhot.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
};
