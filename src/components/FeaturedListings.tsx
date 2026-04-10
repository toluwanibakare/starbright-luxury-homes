"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useListings } from "@/components/providers/ListingsProvider";
import ListingCard from "./ListingCard";

const FeaturedListings = () => {
    const { publicListings, isLoading, error } = useListings();

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
                        Hand-picked, verified opportunities curated by Starbright.
                    </p>
                </motion.div>

                {/* Horizontal Scroll */}
                {isLoading ? (
                    <div className="text-center mb-14">
                        <p className="text-sm text-muted-foreground">Loading featured listings...</p>
                    </div>
                ) : error ? (
                    <div className="text-center mb-14">
                        <p className="text-sm text-muted-foreground">{error}</p>
                    </div>
                ) : (
                    <div className="flex overflow-x-auto gap-7 mb-14 pb-2 scrollbar-hide">
                        {publicListings.slice(0, 6).map((listing, i) => (
                            <div key={listing.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                                <ListingCard listing={listing} index={i} />
                            </div>
                        ))}
                    </div>
                )}

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
