"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    MapPin,
    BadgeCheck,
    ArrowLeft,
    MessageCircle,
    FileText,
    Ruler,
    Tag,
    Hash,
    Play,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { listings, formatPrice } from "@/data/mockData";

export default function ListingDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const listing = listings.find((l) => l.slug === slug);

    if (!listing) {
        notFound();
    }

    const related = listings.filter((l) => l.id !== listing.id).slice(0, 3);

    const infoCards = [
        { icon: Ruler, label: "Size", value: listing.size },
        { icon: FileText, label: "Documents", value: listing.documentsStatus },
        { icon: Tag, label: "Category", value: listing.category },
        { icon: Hash, label: "Listing ID", value: listing.listingId },
    ];

    const inspectionSteps = [
        {
            step: 1,
            title: "Schedule",
            desc: "Contact us via WhatsApp to book an inspection date.",
        },
        {
            step: 2,
            title: "Site Visit",
            desc: "Our team meets you at the property for a guided tour.",
        },
        {
            step: 3,
            title: "Document Review",
            desc: "We walk you through all title documents and verifications.",
        },
        {
            step: 4,
            title: "Secure Purchase",
            desc: "Complete your purchase with legal guidance and protection.",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 container-premium px-5 sm:px-8 lg:px-12">
                <Link
                    href="/listings"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Listings
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-3"
                        >
                            <div className="aspect-[16/9] rounded-xl overflow-hidden">
                                <img
                                    src={listing.images[0]}
                                    alt={listing.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {listing.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className="aspect-[4/3] rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Title & Price */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                {listing.verified && (
                                    <span className="verified-badge">
                                        <BadgeCheck className="w-3.5 h-3.5" /> Verified
                                    </span>
                                )}
                                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                                    {listing.category}
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground font-display mb-3">
                                {listing.title}
                            </h1>
                            <div className="flex items-center gap-2 text-muted-foreground mb-5">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{listing.location}</span>
                            </div>
                            <p className="text-2xl md:text-3xl font-bold premium-gradient-text">
                                {formatPrice(listing.price)}
                            </p>
                        </motion.div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {infoCards.map((info) => (
                                <div key={info.label} className="premium-card p-4 text-center">
                                    <info.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                                        {info.label}
                                    </p>
                                    <p className="text-sm font-semibold text-foreground capitalize">
                                        {info.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-bold text-foreground font-display mb-3">
                                Description
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {listing.description}
                            </p>
                        </div>

                        {/* Video Placeholder */}
                        <div className="premium-card aspect-video flex items-center justify-center bg-muted/50 rounded-xl">
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                                    style={{ background: "var(--gradient-brand)" }}
                                >
                                    <Play className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Property video coming soon
                                </p>
                            </div>
                        </div>

                        {/* Inspection Steps */}
                        <div>
                            <h2 className="text-lg font-bold text-foreground font-display mb-6">
                                Inspection Process
                            </h2>
                            <div className="space-y-6">
                                {inspectionSteps.map((step) => (
                                    <div key={step.step} className="flex gap-4">
                                        <div
                                            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                                            style={{ background: "var(--gradient-brand)" }}
                                        >
                                            {step.step}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <div className="premium-card p-6 space-y-5">
                                <h3 className="font-bold text-foreground text-lg font-display">
                                    Interested?
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Contact us to schedule an inspection or learn more about this
                                    property.
                                </p>
                                <a
                                    href={`https://wa.me/2348000000000?text=Hi, I'm interested in ${listing.title} (${listing.listingId})`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="premium-btn-whatsapp w-full"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Chat on WhatsApp
                                </a>
                                <Link
                                    href="/contact"
                                    className="premium-btn-outline w-full"
                                >
                                    Send Enquiry
                                </Link>
                                <div className="border-t border-border pt-4">
                                    <p className="text-xs text-muted-foreground">
                                        Listing ID: {listing.listingId}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <div className="mt-20 mb-16">
                        <h2 className="text-2xl font-bold text-foreground font-display mb-8">
                            Related Properties
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                            {related.map((l, i) => (
                                <ListingCard key={l.id} listing={l} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
