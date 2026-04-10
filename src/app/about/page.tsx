"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import { BadgeCheck, FileSearch, MapPinned, MessageCircleMore, Building2 } from "lucide-react";

const highlights = [
    {
        title: "Verified Listings Only",
        description: "Every property is reviewed before it appears on Starbright, so buyers see clearer and safer options.",
        icon: BadgeCheck,
    },
    {
        title: "Document Checks",
        description: "We review title documents and key property records before a listing goes live.",
        icon: FileSearch,
    },
    {
        title: "Physical Inspection",
        description: "Our team checks the property location and confirms what is being presented to buyers.",
        icon: MapPinned,
    },
    {
        title: "Guided Communication",
        description: "Buyers can contact the team for inspections, questions, and next steps in plain terms.",
        icon: MessageCircleMore,
    },
];

const faqs = [
    {
        question: "Can I list my property on Starbright?",
        answer: "Yes. Contact the admin on WhatsApp or through the contact page first. Our team will review the property, inspect it, and verify the documents before deciding whether it can be published.",
    },
    {
        question: "How quickly can I close a property transaction?",
        answer: "The timing depends on the property, the documents available, and how quickly both sides provide the needed information. Simple deals can move fast, while larger transactions usually take longer because of legal review and payment steps.",
    },
    {
        question: "Do you help with inspections?",
        answer: "Yes. Once you are interested in a property, you can book an inspection on WhatsApp and our team will guide you on the available date and next steps.",
    },
    {
        question: "What areas do you currently cover?",
        answer: "Coverage may vary by listing, so the best step is to contact the team directly about the property or location you are interested in.",
    },
    {
        question: "What should I prepare before making an enquiry?",
        answer: "It helps to note the listing ID, your budget range, preferred location, and any questions you want answered before an inspection.",
    },
    {
        question: "Can I request more details before visiting a property?",
        answer: "Yes. Use the Request Enquiry button on a listing or visit the contact page. Share the listing ID and our team will respond with the relevant details.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <PageBreadcrumbHero
                overline="About"
                title="How Starbright Works"
                description="A simpler way to browse verified properties and speak with a responsive team."
                backgroundImage="/images/hero-4.jpg"
                crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
            />

            <div className="container-premium px-5 sm:px-8 lg:px-12 py-12 space-y-12">
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {highlights.map((item) => (
                        <div key={item.title} className="premium-card p-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <item.icon size={22} />
                            </div>
                            <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
                            <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                        </div>
                    ))}
                </section>

                <section className="premium-card p-6 sm:p-8">
                    <div className="max-w-3xl">
                        <p className="section-overline mb-3">What We Focus On</p>
                        <h2 className="text-3xl font-bold text-foreground font-display">Clearer property buying, fewer surprises</h2>
                        <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-7">
                            Starbright focuses on verified real estate opportunities and straightforward communication. The priority is helping buyers discover quality properties, ask the right questions, schedule inspections, and move forward with more confidence.
                        </p>
                    </div>
                </section>

                <section className="premium-card p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <Building2 size={22} />
                        </div>
                        <div>
                            <p className="section-overline mb-1">FAQ</p>
                            <h2 className="text-2xl font-bold text-foreground font-display">Helpful Questions</h2>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="rounded-2xl border border-border p-5">
                                <h3 className="text-base font-semibold text-foreground">{faq.question}</h3>
                                <p className="text-sm text-muted-foreground mt-2 leading-7">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
