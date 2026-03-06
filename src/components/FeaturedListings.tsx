"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { listings } from "@/data/mockData";
import ListingCard from "./ListingCard";

const FeaturedListings = () => {
    return (
        <section className="section-padding bg-background">
            <div className="container-premium">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="section-overline mb-4">Curated Selection</p>
                    <h2 className="section-heading mb-4">Featured Listings</h2>
                    <div className="section-divider mb-5" />
                    <p className="section-desc">
                        Hand-picked, verified properties across Nigeria.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
                    {listings.map((listing, i) => (
                        <ListingCard key={listing.id} listing={listing} index={i} />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link href="/listings" className="premium-btn-outline">
                        View All Listings
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedListings;
