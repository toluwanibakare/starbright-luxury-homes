"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useListings } from "@/components/providers/ListingsProvider";
import { ApiError, apiFetch } from "@/lib/api";

const contactReasons = [
    { value: "general", label: "General enquiry" },
    { value: "property", label: "Property enquiry" },
    { value: "inspection", label: "Book inspection" },
    { value: "support", label: "Customer support" },
    { value: "partnership", label: "Partnership or business" },
] as const;

const contactReasonLabels: Record<(typeof contactReasons)[number]["value"], string> = {
    general: "General enquiry",
    property: "Property enquiry",
    inspection: "Book inspection",
    support: "Customer support",
    partnership: "Partnership or business",
};

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
        question: "What documents should I expect when buying a property?",
        answer:
            "Depending on the property type, you can expect documents like the Certificate of Occupancy (C of O), Deed of Assignment, Survey Plan, and Receipts of Payment. We can provide specific details for any listing you're interested in.",
    },
    {
        question: "How soon will I get a response?",
        answer:
            "We aim to respond as quickly as possible during business hours. WhatsApp is usually the fastest route for urgent support or inspection requests.",
    },
];

function ContactEnquiryForm() {
    const searchParams = useSearchParams();
    const { getListingByCode } = useListings();
    const listingId = searchParams.get("listingId") ?? "";
    const defaultReason: (typeof contactReasons)[number]["value"] = listingId ? "property" : "general";
    const matchedListing = useMemo(
        () => (listingId ? getListingByCode(listingId) : undefined),
        [getListingByCode, listingId]
    );
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: listingId
            ? `Hello, I would like more information about listing ${listingId}.`
            : "",
    });
    const [contactReason, setContactReason] =
        useState<(typeof contactReasons)[number]["value"]>(defaultReason);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    const updateForm = (field: keyof typeof form, value: string) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim() || !contactReason) {
            setFeedback("Please complete your name, email, reason for contact, and message.");
            return;
        }

        setIsSubmitting(true);
        setFeedback(null);
        const reasonLabel = contactReasonLabels[contactReason];
        const subject = listingId ? `${reasonLabel} for ${listingId}` : reasonLabel;

        try {
            await apiFetch("/contact", {
                method: "POST",
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim() || null,
                    subject,
                    message: form.message.trim(),
                    source: "contact_page",
                    property_id: matchedListing ? Number(matchedListing.id) : null,
                }),
            });

            setForm({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
            setContactReason(defaultReason);
            setFeedback(`${reasonLabel} sent successfully.`);
        } catch (error) {
            setFeedback(
                error instanceof ApiError
                    ? error.message
                    : "Unable to send your enquiry right now."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-card p-5 sm:p-8"
        >
            <h2 className="text-2xl font-bold text-foreground font-display">Send A Message</h2>
            <p className="text-sm text-muted-foreground mt-2">
                Choose why you are contacting us and our team will respond with the right next steps.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Full Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(event) => updateForm("name", event.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Email Address</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(event) => updateForm("email", event.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Phone Number</label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(event) => updateForm("phone", event.target.value)}
                            className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Reason For Contact</label>
                        <select
                            value={contactReason}
                            onChange={(event) =>
                                setContactReason(event.target.value as (typeof contactReasons)[number]["value"])
                            }
                            className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                            {contactReasons.map((reason) => (
                                <option key={reason.value} value={reason.value}>
                                    {reason.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Listing ID</label>
                        <input
                            type="text"
                            value={listingId}
                            readOnly
                            placeholder="Optional"
                            className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none"
                        />
                    </div>
                    <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Selected Category
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground">
                            {contactReasonLabels[contactReason]}
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Message</label>
                    <textarea
                        rows={6}
                        value={form.message}
                        onChange={(event) => updateForm("message", event.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                </div>

                {feedback ? (
                    <p className="text-sm text-muted-foreground">{feedback}</p>
                ) : null}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="premium-btn-primary w-full sm:w-auto !py-3 !px-8 disabled:opacity-60"
                >
                    {isSubmitting ? "Sending..." : "Send Message"}
                </button>
            </form>
        </motion.div>
    );
}

function ContactEnquiryFormFallback() {
    return (
        <div className="premium-card p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-foreground font-display">Request Enquiry</h2>
            <p className="text-sm text-muted-foreground mt-2">
                Loading enquiry form...
            </p>
        </div>
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

            <div className="container-premium space-y-10 px-4 py-10 sm:px-8 sm:py-12 lg:px-12">
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
                            className="premium-card p-5 sm:p-6"
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
                                    Contact Us on WhatsApp
                                </a>
                                <a
                                    href="mailto:hello@starbrightproperties.com"
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
                            className="premium-card p-5 sm:p-6"
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
