import type { MetadataRoute } from "next";

const SITE_URL = "https://www.dhee.org.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/services",
    "/resources",
    "/contact",
    "/book-appointment",
    "/privacy",
    "/disclaimer",
    "/terms",
  ];

  return pages.map((page) => ({
    url: `${SITE_URL}${page}`,
  }));
}
