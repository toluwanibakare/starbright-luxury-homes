import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Meet the founders of Starbright Real Estate & Properties — Dr. Oluwadamilola Adenike and Amb. Tunde Busari. Learn how we deliver verified real estate across Nigeria.",
    alternates: { canonical: `${siteConfig.url}/about` },
    openGraph: {
        title: `About Us | ${siteConfig.name}`,
        description:
            "Meet the founders of Starbright Real Estate & Properties — delivering verified real estate across Nigeria.",
        url: `${siteConfig.url}/about`,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: "website",
        images: [
            {
                url: "/founders.jpeg",
                width: 1200,
                height: 630,
                alt: "Dr. Oluwadamilola Adenike & Amb. Tunde Busari — Founders of Starbright Real Estate & Properties",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `About Us | ${siteConfig.name}`,
        description:
            "Meet the founders of Starbright Real Estate & Properties — delivering verified real estate across Nigeria.",
        images: ["/founders.jpeg"],
    },
    robots: { index: true, follow: true },
};

export default function AboutPage() {
    return <AboutPageClient />;
}
