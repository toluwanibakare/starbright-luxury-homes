import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { primaryKeywords, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: `${siteConfig.name} — Verified Real Estate Across Nigeria`,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: primaryKeywords,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: `${siteConfig.name} — Verified Real Estate Across Nigeria`,
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
                alt: `${siteConfig.name} — verified real estate solutions across Nigeria`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${siteConfig.name} — Verified Real Estate Across Nigeria`,
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
    verification: {
        google: "w6R9HUH0wDaIEUJAxYxSWkt4bDG_J5Qyj0vJ2TnAvWQ",
    },
    other: {
        "geo.region": "NG-LA",
        "geo.placename": "Lagos",
        "geo.position": "6.4541;3.4210",
        "ICBM": "6.4541, 3.4210",
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
        areaServed: ["NG", "Africa"],
        image: `${siteConfig.url}/images/hero-1.jpg`,
        logo: `${siteConfig.url}/images/logo.png`,
        foundingDate: "2020",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            addressRegion: siteConfig.address.region,
            addressCountry: siteConfig.address.country,
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "127",
            bestRating: "5",
        },
        sameAs: Object.values(siteConfig.social).filter(Boolean),
    };

    const websiteLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "en-NG",
        publisher: { "@type": "RealEstateAgent", name: siteConfig.legalName },
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${siteConfig.url}/listings?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    const localBusinessLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: siteConfig.legalName,
        image: `${siteConfig.url}/images/hero-1.jpg`,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            addressRegion: siteConfig.address.region,
            addressCountry: siteConfig.address.country,
        },
        openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
        ],
        priceRange: "₦₦₦₦",
    };

    return (
        <html lang="en-NG" suppressHydrationWarning>
            <body className="min-h-screen" suppressHydrationWarning>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
                <Providers>{children}</Providers>
                <ScrollToTopButton />
            </body>
        </html>
    );
}
