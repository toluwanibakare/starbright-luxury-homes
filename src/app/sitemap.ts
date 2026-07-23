import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { apiConfig } from "@/lib/api";

async function fetchAllSlugs(): Promise<string[]> {
    try {
        const res = await fetch(`${apiConfig.baseUrl}/properties`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const body = await res.json();
        if (!body?.success) return [];
        const data = body.data;
        if (!Array.isArray(data)) return [];
        return data
            .filter((p: { status?: string; slug?: string }) => p.status !== "draft" && p.slug)
            .map((p: { slug: string }) => p.slug);
    } catch {
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const slugs = await fetchAllSlugs();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: siteConfig.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${siteConfig.url}/listings`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${siteConfig.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${siteConfig.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${siteConfig.url}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];

    const listingRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
        url: `${siteConfig.url}/listings/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
    }));

    return [...staticRoutes, ...listingRoutes];
}
