"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

const slides = [
    {
        image: "/images/hero-1.jpg",
        headline: "Genuine Properties, \nReal Confidence",
        sub: "Only thoroughly verified lands and properties make it to our platform, so you can make decisions with more confidence.",
    },
    {
        image: "/images/hero-2.jpg",
        headline: "Find Trusted Lands And Properties, All Verified",
        sub: "Browse carefully reviewed listings and contact our team when you are ready to book an inspection.",
    },
    {
        image: "/images/hero-3.jpg",
        headline: "Safe Transactions,\nStronger Investments",
        sub: "Every listing is inspected, documented, and prepared for secure transactions backed by professional verification.",
    },
    {
        image: "/images/hero-4.jpg",
        headline: "Checked With Care,\nReady For Enquiry",
        sub: "Our verification process is designed to keep reviews, inspections, and buyer communication clear and consistent.",
    },
];

const nigeriaStates = [
    "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
    "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa",
    "Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger",
    "Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT Abuja",
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
            <AnimatePresence>
                <motion.div
                    key={current}
                    initial={{ scale: 1.02, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].headline}
                        className="h-full w-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />

            {/* 🔥 MAIN CONTAINER FIX */}
            <div className="relative z-10 flex h-full flex-col items-center justify-start container-premium px-5 pt-40 sm:px-8 sm:pt-36 lg:pt-40">
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mt-0 max-w-4xl text-center sm:mt-2 lg:mt-0"
                    >
                        
                        {/* 🔥 BADGE PUSHED UP */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="mb-4 inline-block md:mb-5 -mt-6 md:-mt-8"
                        >
                            <span className="inline-block max-w-[220px] text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 border border-white/15 rounded-full bg-white/5 px-4 py-1.5 backdrop-blur-sm sm:max-w-none md:px-5 md:py-2 md:text-[11px] md:tracking-[0.3em]">
                                Verified Listings You Can Trust
                            </span>
                        </motion.div>

                        {/* 🔥 H1 WIDER */}
                        <h1 className="font-display mb-3 whitespace-pre-line px-2 text-[24px] font-bold leading-[1.2] text-white text-balance sm:text-[3.15rem] md:mb-6 md:text-6xl md:leading-[1.08] lg:text-[4.1rem] max-w-5xl mx-auto">
                            {slides[current].headline}
                        </h1>

                        <p className="mx-auto mb-6 max-w-2xl px-4 text-xs font-light leading-relaxed text-white/75 sm:text-lg md:mb-8">
                            {slides[current].sub}
                        </p>

                        <div className="flex flex-col items-center justify-center gap-2.5 px-6 sm:flex-row sm:px-0">
                            <Link href="/listings" className="premium-btn-primary w-full !px-8 !py-3 text-xs sm:w-auto md:!py-3.5 md:text-sm">
                                <Search className="h-4 w-4" />
                                Browse Listings
                            </Link>
                            <Link
                                href="/contact"
                                className="premium-btn w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 !py-3 md:!py-3.5 !px-8 text-xs md:text-sm"
                            >
                                Request Inspection
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* 🔥 SEARCH FIX (NO CUTTING) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="mt-4 w-full max-w-4xl px-2 sm:px-0 md:mt-8"
                >
                    <div className="rounded-xl border border-white/20 bg-white/95 p-3 shadow-2xl backdrop-blur-xl md:p-2">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
                            <select className="hero-search-input !bg-muted/50 !border-transparent h-10 text-xs md:h-auto md:text-sm">
                                <option>All States</option>
                                <option>All Locations</option>
                                {nigeriaStates.map((state) => (
                                    <option key={state}>{state}</option>
                                ))}
                            </select>

                            <select className="hero-search-input !bg-muted/50 !border-transparent h-10 text-xs md:h-auto md:text-sm">
                                {categoryOptions.map((category) => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>

                            <input type="text" placeholder="Min Price" className="hero-search-input !bg-muted/50 !border-transparent h-10 text-xs md:h-auto md:text-sm" />

                            <input type="text" placeholder="Max Price" className="hero-search-input !bg-muted/50 !border-transparent h-10 text-xs md:h-auto md:text-sm" />

                            <Link href="/listings" className="premium-btn-primary !rounded-lg flex h-10 items-center justify-center text-xs sm:col-span-2 lg:col-span-1 md:h-auto">
                                <Search className="h-4 w-4" />
                                Search
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* controls unchanged */}
        </section>
    );
};

export default Hero;