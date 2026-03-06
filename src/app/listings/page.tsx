"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import { listings, locations, categories, type Category } from "@/data/mockData";

export default function ListingsPage() {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("All Locations");
    const [category, setCategory] = useState<string>("all");
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        let result = [...listings];
        if (search)
            result = result.filter((l) =>
                l.title.toLowerCase().includes(search.toLowerCase())
            );
        if (location !== "All Locations")
            result = result.filter((l) => l.location === location);
        if (category !== "all")
            result = result.filter((l) => l.category === category);
        if (verifiedOnly) result = result.filter((l) => l.verified);
        if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
        if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
        return result;
    }, [search, location, category, verifiedOnly, sortBy]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <PageBreadcrumbHero
                    overline="Explore"
                    title="Property Listings"
                    description="Browse our collection of verified properties."
                    backgroundImage="/images/hero-3.jpg"
                    crumbs={[
                        { label: "Home", href: "/" },
                        { label: "Listings" },
                    ]}
                />
            </motion.div>

            <div className="container-premium px-5 sm:px-8 lg:px-12 py-10">
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search listings..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="hero-search-input w-full pl-11"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`premium-btn-outline text-xs !py-2.5 sm:w-auto ${showFilters ? "!border-primary !text-primary" : ""}`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                        {showFilters && <X className="w-3 h-3" />}
                    </button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="premium-card p-6 mb-8"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Location
                                </label>
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="hero-search-input w-full"
                                >
                                    {locations.map((l) => (
                                        <option key={l}>{l}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="hero-search-input w-full"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map((c) => (
                                        <option key={c.value} value={c.value}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Sort By
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="hero-search-input w-full"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Verified
                                </label>
                                <label className="flex items-center gap-3 hero-search-input cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={verifiedOnly}
                                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                                        className="accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm">Verified only</span>
                                </label>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Results */}
                <p className="text-sm text-muted-foreground mb-6">
                    {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
                </p>

                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {filtered.map((listing, i) => (
                            <ListingCard key={listing.id} listing={listing} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-lg text-muted-foreground">
                            No properties match your filters.
                        </p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
