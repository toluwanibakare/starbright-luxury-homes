import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { primaryKeywords, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: `${siteConfig.name} | Verified Real Estate Across Africa`,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: primaryKeywords,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: `${siteConfig.name} | Verified Real Estate Across Africa`,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        type: "website",
        images: [
            {
                url: "/images/hero-1.jpg",
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} verified real estate solutions across Africa`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${siteConfig.name} | Verified Real Estate Across Africa`,
        description: siteConfig.description,
        images: ["/images/hero-1.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const organizationLd = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: siteConfig.legalName,
        url: siteConfig.url,
        description: siteConfig.description,
        areaServed: "Africa",
        image: `${siteConfig.url}/images/hero-1.jpg`,
    };

    const websiteLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "en-NG",
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen" suppressHydrationWarning>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
                />
                <Providers>{children}</Providers>
                <ScrollToTopButton />
            </body>
        </html>
    );
}
