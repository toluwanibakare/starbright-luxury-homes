import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";
import ListingsPageClient from "./ListingsPageClient";

export const metadata: Metadata = {
    title: "All Property Listings",
    description:
        "Browse verified property listings across Nigeria — houses, land, and commercial properties in Lagos, Abuja, Port Harcourt and beyond.",
    alternates: { canonical: `${siteConfig.url}/listings` },
    openGraph: {
        title: `All Property Listings | ${siteConfig.name}`,
        description:
            "Browse verified property listings across Nigeria — houses, land, and commercial properties.",
        url: `${siteConfig.url}/listings`,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: "website",
        images: [
            {
                url: "/images/listing-1.jpg",
                width: 1200,
                height: 630,
                alt: "Explore verified property listings from Starbright Real Estate across Nigeria.",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `All Property Listings | ${siteConfig.name}`,
        description:
            "Browse verified property listings across Nigeria — houses, land, and commercial properties.",
        images: ["/images/listing-1.jpg"],
    },
    robots: { index: true, follow: true },
};

export default function ListingsPage() {
    return <ListingsPageClient />;
}
