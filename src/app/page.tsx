import type { Metadata } from "next";
import { BadgeCheck, Building2, ClipboardCheck, MessageSquareMore } from "lucide-react";
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

const homeFaqs = [
    {
        question: "What makes Starbright Real Estate different?",
        answer:
            "Starbright focuses on verified property opportunities, clearer listing information, and guided support from first enquiry to inspection.",
    },
    {
        question: "How do I get Started?",
        answer:
            "Simply browse our verified listings, find a property that interests you, and use the contact options to ask questions or book an inspection. We're here to help you explore with confidence.",
    },
    {
        question: "Do you verify land and property documents before listing?",
        answer:
            "Yes. Starbright reviews available title information, legal documentation, and property details before approved listings go live.",
    },
    {
        question: "Can I book an inspection before making payment?",
        answer:
            "Yes. You can contact Starbright through the website or WhatsApp to arrange an inspection and ask questions before moving forward.",
    },
    {
        question: "Which kinds of properties are featured on the platform?",
        answer:
            "Starbright highlights land, residential homes, and commercial spaces that meet its review and verification requirements.",
    },
    {
        question: "Do I need to pay before inspecting a property?",
        answer:
            "No. We encourage physical inspection first. You can view, verify the property and ask any questions you have before making a payment or final decision on a property.",
    },
];

export const metadata: Metadata = {
    title: "Verified Properties You Can Explore With Confidence",
    description:
        "Explore verified property listings with guided inspections, fast enquiries, and clearer property information.",
    keywords: [
        ...primaryKeywords,
        "real estate listings",
        "verified properties",
        "property inspections",
    ],
    alternates: {
        canonical: "/",
    },
};

export default function HomePage() {
    const serviceHighlights = [
        {
            icon: Building2,
            title: "Verified Listings",
            description:
                "Browse land, houses, and commercial properties that have been reviewed before going live.",
        },
        {
            icon: ClipboardCheck,
            title: "Clear Documentation",
            description:
                "See key listing details, verification notes, and property information in one place.",
        },
        {
            icon: MessageSquareMore,
            title: "Guided Enquiries",
            description:
                "Book inspections and contact the team quickly when you find a property you like.",
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
                        <div className="premium-card p-6 md:p-10">
                            <p className="section-overline mb-4">Why Starbright</p>
                            <h2 className="section-heading !text-2xl md:!text-3xl mb-4 text-left">
                                A Simpler Way to Discover Verified Property Opportunities
                            </h2>
                            <div className="section-divider !mx-0 mb-6" />
                            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
                                Starbright Real Estate and Properties is focused on helping people
                                discover verified land, residential, and commercial listings with
                                a more straightforward enquiry and inspection process.
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

                        <div className="premium-card h-full p-6 md:p-10">
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

            <section className="section-padding bg-background">
                <div className="container-premium">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="section-overline mb-4">FAQs</p>
                        <h2 className="section-heading !text-2xl md:!text-3xl">
                            Answers To Common Questions About Starbright Real Estate
                        </h2>
                        <div className="section-divider mb-6" />
                        <p className="text-muted-foreground leading-relaxed">
                            A few quick answers about listings, inspections, verification, and how Starbright works.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 lg:mt-10 lg:grid-cols-2">
                        {homeFaqs.map((faq) => (
                            <div key={faq.question} className="premium-card p-5 sm:p-6">
                                <h3 className="text-base font-semibold text-foreground">
                                    {faq.question}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Testimonials />
            <CTABand />
            <Footer />
        </main>
    );
}
