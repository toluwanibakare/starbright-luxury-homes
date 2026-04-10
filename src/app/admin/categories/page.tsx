"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Home, Mountain, Building2 } from "lucide-react";
import { useListings } from "@/components/providers/ListingsProvider";

export default function CategoriesPage() {
    const { listings, isLoading, error } = useListings();
    const categories = useMemo(
        () => [
            {
                name: "House",
                listings: listings.filter((item) => item.category === "house").length,
                icon: Home,
                note: "Residential homes and apartments",
            },
            {
                name: "Land",
                listings: listings.filter((item) => item.category === "land").length,
                icon: Mountain,
                note: "Plots and estate land",
            },
            {
                name: "Commercial",
                listings: listings.filter((item) => item.category === "commercial").length,
                icon: Building2,
                note: "Offices, shops, and mixed-use spaces",
            },
        ],
        [listings]
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Categories</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Keep your listing types organized and easy to filter.
                </p>
            </div>

            {isLoading ? (
                <div className="premium-card p-6">
                    <p className="text-sm text-muted-foreground">Loading category counts...</p>
                </div>
            ) : error ? (
                <div className="premium-card p-6">
                    <p className="text-sm text-muted-foreground">{error}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                            className="premium-card p-6"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <category.icon size={22} />
                            </div>
                            <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
                            <p className="text-sm text-muted-foreground mt-1">{category.note}</p>
                            <p className="text-xs text-muted-foreground mt-4">{category.listings} listings</p>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
