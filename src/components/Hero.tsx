"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const slides = [
    {
        image: "/images/hero-1.jpg",
        headline: "Verified Properties,\nReal Confidence",
        sub: "Only thoroughly verified land and properties make it to our platform — so you can buy with peace of mind.",
    },
    {
        image: "/images/hero-2.jpg",
        headline: "Find Land & Homes\nYou Can Trust",
        sub: "Every listing is inspected, documented, and ready for secure purchase across Nigeria.",
    },
    {
        image: "/images/hero-3.jpg",
        headline: "Premium Living,\nZero Compromise",
        sub: "Discover luxury apartments and homes in Nigeria's most sought-after locations.",
    },
    {
        image: "/images/hero-4.jpg",
        headline: "Only Verified Listings,\nNo Stories",
        sub: "We eliminate fraud so you can invest with complete peace of mind.",
    },
];

const nigeriaStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT Abuja",
];

const categoryOptions = ["All", "Land", "Houses", "Commercial"];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
    const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

    useEffect(() => {
        const timer = setInterval(next, 7000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className="relative h-[100svh] w-full overflow-hidden bg-neutral-900">
            {/* Background Images */}
            <AnimatePresence>
                <motion.div
                    key={current}
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].headline}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-start sm:justify-center container-premium px-5 sm:px-8 pt-24 sm:pt-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center max-w-4xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 }}
                            className="inline-block mb-3 md:mb-6"
                        >
                            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium text-white/60 border border-white/15 rounded-full px-4 md:px-5 py-1.5 md:py-2 backdrop-blur-sm bg-white/5">
                                Starbright Real Estate & Properties
                            </span>
                        </motion.div>

                        <h1 className="font-display text-[28px] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.2] md:leading-[1.1] mb-3 md:mb-6 text-white whitespace-pre-line px-2 text-balance">
                            {slides[current].headline}
                        </h1>

                        <p className="text-xs sm:text-lg max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed text-white/75 font-light px-4">
                            {slides[current].sub}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 px-6 sm:px-0">
                            <Link href="/listings" className="premium-btn-primary w-full sm:w-auto !py-3 md:!py-3.5 !px-8 text-xs md:text-sm">
                                <Search className="w-4 h-4" />
                                Browse Listings
                            </Link>
                            <a
                                href="https://wa.me/2348000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="premium-btn w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 !py-3 md:!py-3.5 !px-8 text-xs md:text-sm"
                            >
                                <WhatsAppIcon className="w-4 h-4" />
                                Request Inspection
                            </a>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="w-full max-w-4xl mt-6 md:mt-12 px-2 sm:px-0"
                >
                    <div className="bg-white/95 backdrop-blur-xl rounded-xl p-3 md:p-2 shadow-2xl border border-white/20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                            <select className="hero-search-input !bg-muted/50 !border-transparent h-10 md:h-auto text-xs md:text-sm">
                                <option>All States</option>
                                <option>All Locations</option>
                                {nigeriaStates.map((state) => (
                                    <option key={state}>{state}</option>
                                ))}
                            </select>
                            <select className="hero-search-input !bg-muted/50 !border-transparent h-10 md:h-auto text-xs md:text-sm">
                                {categoryOptions.map((category) => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Min Price"
                                className="hero-search-input !bg-muted/50 !border-transparent h-10 md:h-auto text-xs md:text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Max Price"
                                className="hero-search-input !bg-muted/50 !border-transparent h-10 md:h-auto text-xs md:text-sm"
                            />
                            <Link
                                href="/listings"
                                className="premium-btn-primary !rounded-lg text-xs h-10 md:h-auto flex items-center justify-center lg:col-span-1 sm:col-span-2 lg:mt-0"
                            >
                                <Search className="w-4 h-4" />
                                Search
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Arrows */}
            <button
                onClick={prev}
                className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md items-center justify-center transition-all hover:bg-white/25 text-white border border-white/10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={next}
                className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md items-center justify-center transition-all hover:bg-white/25 text-white border border-white/10"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicators */}
            <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 items-center gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all duration-500 ${i === current
                            ? "w-8 h-2 bg-white"
                            : "w-2 h-2 bg-white/35 hover:bg-white/50"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
