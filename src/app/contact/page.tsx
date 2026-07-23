import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with Starbright Real Estate & Properties. Enquire about verified properties, book inspections, or reach our team in Lagos, Nigeria.",
    alternates: { canonical: `${siteConfig.url}/contact` },
    openGraph: {
        title: `Contact Us | ${siteConfig.name}`,
        description:
            "Get in touch with Starbright Real Estate & Properties. Enquire about verified properties or book inspections.",
        url: `${siteConfig.url}/contact`,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: "website",
        images: [
            {
                url: "/images/hero-1.jpg",
                width: 1200,
                height: 630,
                alt: "Contact Starbright Real Estate & Properties",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `Contact Us | ${siteConfig.name}`,
        description:
            "Get in touch with Starbright Real Estate & Properties. Enquire about verified properties or book inspections.",
        images: ["/images/hero-1.jpg"],
    },
    robots: { index: true, follow: true },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
