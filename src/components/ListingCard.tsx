"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, BadgeCheck, ArrowUpRight } from "lucide-react";
import { type Listing, formatPrice } from "@/data/mockData";

interface ListingCardProps {
    listing: Listing;
    index?: number;
}

const ListingCard = ({ listing, index = 0 }: ListingCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
        >
            <Link href={`/listings/${listing.slug}`} className="block group">
                <div className="premium-card overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                            {listing.verified && (
                                <span className="verified-badge !bg-white/90 backdrop-blur-sm !text-emerald-700">
                                    <BadgeCheck className="w-3.5 h-3.5" />
                                    Verified
                                </span>
                            )}
                        </div>
                        <div className="absolute top-3 right-3">
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-[11px] font-medium uppercase tracking-wider text-foreground/70">
                                {listing.category}
                            </span>
                        </div>

                        {/* Hover arrow */}
                        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight className="w-4 h-4 text-foreground" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <h3 className="font-display font-semibold text-[15px] text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                            {listing.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-xs">{listing.location}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                            <span className="text-lg font-bold premium-gradient-text">{formatPrice(listing.price)}</span>
                            <span className="text-xs text-muted-foreground font-medium">{listing.size}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ListingCard;
