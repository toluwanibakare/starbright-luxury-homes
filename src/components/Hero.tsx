"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const slides = [
    {
        image: "/images/hero-1.jpg",
        headline: "Verified Properties,\nReal Confidence",
        sub: "Only thoroughly verified land and properties make it to our platform — so you can buy with peace of mind.",
    },
    {
        image: "/images/hero-2.jpg",
        headline: "Find Land & Homes\nYou Can Trust",
        sub: "Every listing is inspected, documented, and ready for secure purchase across Lagos and beyond.",
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
            <div className="relative z-10 h-full flex flex-col items-center justify-center container-premium px-5 sm:px-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center max-w-4xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 }}
                            className="inline-block mb-6"
                        >
                            <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-white/60 border border-white/15 rounded-full px-5 py-2 backdrop-blur-sm bg-white/5">
                                Starbright Real Estate
                            </span>
                        </motion.div>

                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.1] mb-6 text-white whitespace-pre-line">
                            {slides[current].headline}
                        </h1>

                        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-white/75 font-light">
                            {slides[current].sub}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link href="/listings" className="premium-btn-primary !py-3.5 !px-8">
                                <Search className="w-4 h-4" />
                                Browse Listings
                            </Link>
                            <a
                                href="https://wa.me/2348000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="premium-btn bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 !py-3.5 !px-8"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Request Inspection
                            </a>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="w-full max-w-4xl mt-12"
                >
                    <div className="bg-white/95 backdrop-blur-xl rounded-xl p-2 shadow-2xl border border-white/20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                            <select className="hero-search-input !bg-muted/50 !border-transparent">
                                <option>All Locations</option>
                                <option>Lekki, Lagos</option>
                                <option>Ikoyi, Lagos</option>
                                <option>Victoria Island</option>
                                <option>Ajah, Lagos</option>
                            </select>
                            <select className="hero-search-input !bg-muted/50 !border-transparent">
                                <option>All Categories</option>
                                <option>Land</option>
                                <option>Houses</option>
                                <option>Commercial</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Min Price"
                                className="hero-search-input !bg-muted/50 !border-transparent"
                            />
                            <input
                                type="text"
                                placeholder="Max Price"
                                className="hero-search-input !bg-muted/50 !border-transparent"
                            />
                            <Link
                                href="/listings"
                                className="premium-btn-primary !rounded-lg text-xs"
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
                className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/25 text-white border border-white/10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={next}
                className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/25 text-white border border-white/10"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
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
