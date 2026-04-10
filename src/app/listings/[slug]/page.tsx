"use client";

import { useMemo, useState } from "react";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    BadgeCheck,
    ArrowLeft,
    FileText,
    Ruler,
    Tag,
    Hash,
    ChevronLeft,
    ChevronRight,
    PlayCircle,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import ListingComments from "@/components/ListingComments";
import { useListings } from "@/components/providers/ListingsProvider";
import { formatPrice } from "@/data/mockData";
import { getListingFallbackImage } from "@/lib/api";

type MediaItem =
    | { type: "image"; src: string }
    | { type: "video"; src: string };

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0.55,
        scale: 0.98,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? "-100%" : "100%",
        opacity: 0.55,
        scale: 0.98,
    }),
};

export default function ListingDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const { publicListings, getListingBySlug, isLoading } = useListings();
    const listing = getListingBySlug(slug);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    if (!isLoading && (!listing || listing.status !== "Active")) {
        notFound();
    }

    if (isLoading || !listing) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-5">
                <p className="text-sm text-muted-foreground">Loading property details...</p>
            </div>
        );
    }

    const media = useMemo<MediaItem[]>(() => {
        const items: MediaItem[] = listing.video ? [{ type: "video", src: listing.video }] : [];
        const imageItems = listing.images.length > 0
            ? listing.images.map((src) => ({ type: "image" as const, src }))
            : [{ type: "image" as const, src: getListingFallbackImage(listing.category) }];
        return [...items, ...imageItems];
    }, [listing.images, listing.video]);

    const activeMedia = media[activeIndex] ?? media[0];
    const related = publicListings.filter((l) => l.id !== listing.id).slice(0, 3);

    const infoCards = [
        { icon: Ruler, label: "Size", value: listing.size },
        { icon: FileText, label: "Documents", value: listing.documentsStatus },
        { icon: Tag, label: "Category", value: listing.category },
        { icon: Hash, label: "Listing ID", value: listing.listingId },
    ];

    const inspectionSteps = [
        {
            step: 1,
            title: "Send a message",
            desc: "Reach us on WhatsApp so we can confirm availability and answer questions.",
        },
        {
            step: 2,
            title: "Choose a date",
            desc: "We agree on a convenient inspection time for you and your team.",
        },
        {
            step: 3,
            title: "Inspect the property",
            desc: "You visit the site with our team and review the condition and location.",
        },
        {
            step: 4,
            title: "Proceed with enquiry",
            desc: "If you like it, we guide you on the next steps for documentation and payment.",
        },
    ];

    const showPrev = () => {
        setDirection(-1);
        setActiveIndex((current) => (current - 1 + media.length) % media.length);
    };

    const showNext = () => {
        setDirection(1);
        setActiveIndex((current) => (current + 1) % media.length);
    };

    const jumpToSlide = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="pt-10 container-premium px-5 sm:px-8 lg:px-12">
                <Link
                    href="/listings"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Listings
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            <div className="premium-card overflow-hidden p-0">
                                <div className="relative aspect-[16/9] bg-black overflow-hidden">
                                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                        <motion.div
                                            key={`${activeMedia.type}-${activeMedia.src}`}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{
                                                x: { type: "spring", stiffness: 260, damping: 28 },
                                                opacity: { duration: 0.28 },
                                                scale: { duration: 0.28 },
                                            }}
                                            className="absolute inset-0"
                                        >
                                            {activeMedia.type === "video" ? (
                                                <video
                                                    src={activeMedia.src}
                                                    controls
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src={activeMedia.src}
                                                    alt={listing.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    {media.length > 1 ? (
                                        <>
                                            <button
                                                onClick={showPrev}
                                                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md items-center justify-center transition-all hover:bg-white/25 text-white border border-white/10"
                                                aria-label="Previous media"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={showNext}
                                                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md items-center justify-center transition-all hover:bg-white/25 text-white border border-white/10"
                                                aria-label="Next media"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </>
                                    ) : null}
                                </div>
                            </div>

                            {media.length > 1 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {media.map((item, index) => (
                                        <motion.button
                                            key={`${item.type}-${item.src}-${index}`}
                                            onClick={() => jumpToSlide(index)}
                                            whileHover={{ y: -3 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`relative overflow-hidden rounded-xl border transition-all aspect-[4/3] ${
                                                index === activeIndex
                                                    ? "border-primary ring-2 ring-primary/20"
                                                    : "border-border hover:border-primary/40"
                                            }`}
                                        >
                                            {item.type === "video" ? (
                                                <>
                                                    <video
                                                        src={item.src}
                                                        className="w-full h-full object-cover bg-black"
                                                    />
                                                    <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                        <PlayCircle className="w-8 h-8 text-white" />
                                                    </span>
                                                </>
                                            ) : (
                                                <img
                                                    src={item.src}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            ) : null}
                        </motion.div>

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

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {infoCards.map((info, index) => (
                                <motion.div
                                    key={info.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="premium-card p-4 text-center"
                                >
                                    <info.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                                        {info.label}
                                    </p>
                                    <p className="text-sm font-semibold text-foreground capitalize">
                                        {info.value}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-lg font-bold text-foreground font-display mb-3">
                                Description
                            </h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {listing.description}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-lg font-bold text-foreground font-display mb-6">
                                Inspection Process
                            </h2>
                            <div className="space-y-6">
                                {inspectionSteps.map((step, index) => (
                                    <motion.div
                                        key={step.step}
                                        initial={{ opacity: 0, x: -18 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex gap-4"
                                    >
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
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <ListingComments listingId={listing.id} listingTitle={listing.title} />
                    </div>

                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="sticky top-10"
                        >
                            <div className="premium-card p-6 space-y-5">
                                <h3 className="font-bold text-foreground text-lg font-display">
                                    Interested?
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Contact us to book an inspection or ask for more details about this
                                    property.
                                </p>
                                <a
                                    href={`https://wa.me/2347033764029?text=Hello, I want to book an inspection for ${listing.title} (${listing.listingId}).`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="premium-btn-whatsapp w-full flex items-center justify-center gap-2"
                                >
                                    <WhatsAppIcon className="w-4 h-4 text-black" />
                                    Book Inspection on WhatsApp
                                </a>
                                <Link
                                    href={`/contact?listingId=${encodeURIComponent(listing.listingId)}`}
                                    className="premium-btn-outline w-full"
                                >
                                    Request Enquiry
                                </Link>
                                <div className="border-t border-border pt-4">
                                    <p className="text-xs text-muted-foreground">
                                        Listing ID: {listing.listingId}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="mt-20 mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold text-foreground font-display mb-8"
                        >
                            Related Properties
                        </motion.h2>
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
