import type { MetadataRoute } from "next";
import { listings } from "@/data/mockData";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: siteConfig.url,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteConfig.url}/listings`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${siteConfig.url}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${siteConfig.url}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];

    const listingRoutes: MetadataRoute.Sitemap = listings.map((listing) => ({
        url: `${siteConfig.url}/listings/${listing.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
    }));

    return [...staticRoutes, ...listingRoutes];
}
