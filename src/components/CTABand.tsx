"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const CTABand = () => {
    return (
        <section className="relative overflow-hidden py-24">
            <div className="absolute inset-0" style={{ background: "var(--gradient-brand)" }} />
            <div className="absolute inset-0 bg-black/15" />

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 container-premium px-5 sm:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 font-display text-white leading-tight">
                        Ready to Find Your Property?
                    </h2>
                    <p className="text-base md:text-lg mb-10 max-w-lg mx-auto text-white/80 font-light">
                        Book a free inspection today. Our team will guide you through every step of the process.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://wa.me/2348000000000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="premium-btn bg-white text-foreground hover:bg-white/90 !py-3.5 !px-8 shadow-lg"
                        >
                            <WhatsAppIcon className="w-4 h-4" />
                            Book Inspection on WhatsApp
                        </a>
                        <Link
                            href="/contact"
                            className="premium-btn border border-white/30 text-white hover:bg-white/10 !py-3.5 !px-8"
                        >
                            Contact Us
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTABand;
