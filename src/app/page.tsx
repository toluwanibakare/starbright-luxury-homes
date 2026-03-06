import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import Categories from "@/components/Categories";
import TrustSection from "@/components/TrustSection";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";
import { listings } from "@/data/mockData";
import { primaryKeywords, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Luxury Homes, Land, and Commercial Property in Lagos",
    description:
        "Explore verified luxury homes in Lekki and Ikoyi, investment land in Epe and Ajah, and premium commercial property in Victoria Island.",
    keywords: [
        ...primaryKeywords,
        "Lagos luxury real estate",
        "verified houses for sale in Nigeria",
        "commercial property investment Lagos",
    ],
    alternates: {
        canonical: "/",
    },
};

export default function HomePage() {
    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Featured Verified Properties in Lagos",
        itemListElement: listings.slice(0, 6).map((listing, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Residence",
                name: listing.title,
                description: listing.description,
                url: `${siteConfig.url}/listings/${listing.slug}`,
                address: {
                    "@type": "PostalAddress",
                    addressLocality: listing.location,
                    addressCountry: "NG",
                },
            },
        })),
    };

    return (
        <main className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
            />
            <Navbar />
            <Hero />
            <FeaturedListings />
            <Categories />
            <TrustSection />

            <section className="container-premium section-padding">
                <h2 className="section-heading !text-2xl md:!text-3xl mb-4">
                    Verified Real Estate in Lagos for Buyers and Investors
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-4xl">
                    Starbright Luxury Homes helps clients buy luxury homes in Lagos, secure verified
                    land for sale in Ajah and Epe, and access premium commercial property in
                    Victoria Island. Every listing includes title-document checks, physical
                    inspection, and guided purchase support so your investment stays protected.
                </p>
            </section>

            <Testimonials />
            <CTABand />
            <Footer />
        </main>
    );
}
