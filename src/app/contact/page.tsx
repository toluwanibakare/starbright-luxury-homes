"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const faqs = [
    {
        question: "How do I book an inspection?",
        answer:
            "Use the Book Inspection on WhatsApp button or send a request through the form. Once we confirm the property is available, our team will help you schedule a suitable time.",
    },
    {
        question: "Can I ask about a listing before visiting?",
        answer:
            "Yes. Add the listing ID in your message and tell us what you want to know. We can help with pricing, location, documents, and inspection details.",
    },
    {
        question: "Can I list my property on Starbright?",
        answer:
            "Yes. Contact the admin on WhatsApp or through this page first. The team will review the location and documents before deciding if it qualifies for listing. For now, properties must be within South West Nigeria.",
    },
    {
        question: "How soon will I get a response?",
        answer:
            "We aim to respond as quickly as possible during business hours. WhatsApp is usually the fastest route for urgent support or inspection requests.",
    },
];

function ContactEnquiryForm() {
    const searchParams = useSearchParams();
    const listingId = searchParams.get("listingId") ?? "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-card p-6 sm:p-8"
        >
            <h2 className="text-2xl font-bold text-foreground font-display">Request Enquiry</h2>
            <p className="text-sm text-muted-foreground mt-2">
                Fill the form and our team will respond with the next steps.
            </p>

            <form className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Full Name</label>
                        <input type="text" className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Email Address</label>
                        <input type="email" className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Phone Number</label>
                        <input type="tel" className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Listing ID</label>
                        <input
                            type="text"
                            defaultValue={listingId}
                            placeholder="e.g. STB-001"
                            className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Message</label>
                    <textarea
                        rows={6}
                        defaultValue={listingId ? `Hello, I would like more information about listing ${listingId}.` : ""}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                </div>

                <button type="submit" className="premium-btn-primary !py-3 !px-8">
                    Send Request
                </button>
            </form>
        </motion.div>
    );
}

function ContactEnquiryFormFallback() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-card p-6 sm:p-8"
        >
            <h2 className="text-2xl font-bold text-foreground font-display">Request Enquiry</h2>
            <p className="text-sm text-muted-foreground mt-2">
                Fill the form and our team will respond with the next steps.
            </p>

            <form className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Full Name</label>
                        <input type="text" className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Email Address</label>
                        <input type="email" className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Phone Number</label>
                        <input type="tel" className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Listing ID</label>
                        <input
                            type="text"
                            placeholder="e.g. STB-001"
                            className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Message</label>
                    <textarea
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                </div>

                <button type="submit" className="premium-btn-primary !py-3 !px-8">
                    Send Request
                </button>
            </form>
        </motion.div>
    );
}

export default function ContactPage() {

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <PageBreadcrumbHero
                overline="Contact"
                title="Talk To Starbright"
                description="Reach our team for inspections, support, and property enquiries."
                backgroundImage="/images/hero-2.jpg"
                crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
            />

            <div className="container-premium px-5 sm:px-8 lg:px-12 py-12 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
                    <Suspense fallback={<ContactEnquiryFormFallback />}>
                        <ContactEnquiryForm />
                    </Suspense>

                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 }}
                            className="premium-card p-6"
                        >
                            <h3 className="text-lg font-semibold text-foreground">Quick Contact</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                For urgent help, reach the team directly.
                            </p>

                            <div className="mt-5 space-y-3">
                                <a
                                    href="https://wa.me/2347033764029?text=Hello%20Starbright%2C%20I%20need%20support."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="premium-btn-whatsapp w-full flex items-center justify-center gap-2"
                                >
                                    <WhatsAppIcon className="w-4 h-4 text-black" />
                                    Contact Support on WhatsApp
                                </a>
                                <a
                                    href="mailto:support@starbrightproperties.com"
                                    className="premium-btn-outline w-full"
                                >
                                    Email Support
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.14 }}
                            className="premium-card p-6"
                        >
                            <h3 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h3>
                            <div className="mt-5 space-y-4">
                                {faqs.map((faq, index) => (
                                    <motion.div
                                        key={faq.question}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="rounded-2xl border border-border p-4"
                                    >
                                        <h4 className="text-sm font-semibold text-foreground">{faq.question}</h4>
                                        <p className="text-sm text-muted-foreground mt-2 leading-7">{faq.answer}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
