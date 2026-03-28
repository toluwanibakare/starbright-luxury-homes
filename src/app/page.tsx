import type { Metadata } from "next";
import { BadgeCheck, Building2, ClipboardCheck, Wrench } from "lucide-react";
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
    title: "Verified Property Services Across Africa",
    description:
        "Explore verified real estate solutions across Africa, including property sales, buying support, construction, property management, procurement, and facilities management.",
    keywords: [
        ...primaryKeywords,
        "real estate services in Africa",
        "verified properties across Africa",
        "property management company Africa",
    ],
    alternates: {
        canonical: "/",
    },
};

export default function HomePage() {
    const serviceHighlights = [
        {
            icon: Building2,
            title: "Property Sales and Acquisition",
            description: "Buy and sell landed properties with guided support and verified documentation.",
        },
        {
            icon: ClipboardCheck,
            title: "Management and Procurement",
            description: "Run estates and property operations more efficiently with professional oversight.",
        },
        {
            icon: Wrench,
            title: "Construction and Facilities",
            description: "Execute projects confidently with end-to-end delivery and maintenance support.",
        },
    ];

    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Featured Verified Properties by Starbright",
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

            <section className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
                <div className="container-premium">
                    <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
                        <div className="premium-card p-8 md:p-10">
                            <p className="section-overline mb-4">Beyond Listings</p>
                            <h2 className="section-heading !text-2xl md:!text-3xl mb-4 text-left">
                                Verified Real Estate Solutions for Buyers, Sellers, and Investors
                            </h2>
                            <div className="section-divider !mx-0 mb-6" />
                            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
                                Starbright Real Estate and Properties helps clients buy and sell
                                verified land and property, manage estates efficiently, and
                                execute construction, procurement, and facilities management
                                projects with confidence.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {serviceHighlights.map((item) => (
                                    <div key={item.title} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                                        <div
                                            className="w-11 h-11 rounded-2xl mb-4 flex items-center justify-center"
                                            style={{ background: "var(--gradient-brand)" }}
                                        >
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="font-display text-base font-semibold text-foreground mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="premium-card p-8 md:p-10 h-full">
                            <div
                                className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center"
                                style={{ background: "var(--gradient-brand)" }}
                            >
                                <BadgeCheck className="w-5 h-5 text-white" />
                            </div>
                            <p className="section-overline mb-4">Why It Matters</p>
                            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                                Every opportunity is backed by real verification
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                Every listing is supported by title checks, legal documentation
                                review, physical inspections, and guided professional support so
                                clients can move forward with more clarity and less risk.
                            </p>
                            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
                                <p className="text-sm font-medium text-foreground leading-relaxed">
                                    Starbright is built to make property transactions feel safer,
                                    smoother, and more rewarding from first enquiry to final
                                    decision.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />
            <CTABand />
            <Footer />
        </main>
    );
}
