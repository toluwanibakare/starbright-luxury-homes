import type { Metadata } from "next";
import { siteConfig, defaultMeta } from "@/lib/seo";
import { apiConfig, type ApiProperty, buildAssetUrl } from "@/lib/api";
import ListingDetailClient from "./ListingDetailClient";

async function getProperty(slug: string): Promise<ApiProperty | null> {
    try {
        const res = await fetch(`${apiConfig.baseUrl}/properties/slug/${slug}`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) return null;
        const body = await res.json();
        return body?.success ? (body.data as ApiProperty) : null;
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const property = await getProperty(slug);

    if (!property) {
        return {
            title: "Property Not Found",
            robots: { index: false },
        };
    }

    const images = Array.isArray(property.media)
        ? property.media.filter((m) => m.file_type === "image")
        : [];
    const ogImage = images.length > 0
        ? buildAssetUrl(images[0].file_path)
        : `${siteConfig.url}${defaultMeta.ogImage}`;

    const description = property.description
        ? property.description.slice(0, 200)
        : `${property.title} — located in ${property.location}. ${siteConfig.description}`;

    return {
        title: property.title,
        description,
        alternates: { canonical: `${siteConfig.url}/listings/${property.slug}` },
        openGraph: {
            title: `${property.title} | ${siteConfig.name}`,
            description,
            url: `${siteConfig.url}/listings/${property.slug}`,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: "website",
            images: [{ url: ogImage, width: 1200, height: 630, alt: property.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${property.title} | ${siteConfig.name}`,
            description,
            images: [ogImage],
        },
        robots: { index: true, follow: true },
        other: {
            "article:published_time": property.created_at,
            "article:modified_time": property.updated_at,
        },
    };
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    return <ListingDetailClient params={params} />;
}
