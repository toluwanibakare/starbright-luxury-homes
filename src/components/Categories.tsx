"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Mountain, Building2 } from "lucide-react";
import { categories } from "@/data/mockData";
import { useListings } from "@/components/providers/ListingsProvider";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Mountain,
    Home,
    Building2,
};

const Categories = () => {
    const { listings } = useListings();
    const categoryCounts = useMemo(
        () => ({
            land: listings.filter((item) => item.category === "land" && item.status === "Active").length,
            house: listings.filter((item) => item.category === "house" && item.status === "Active").length,
            commercial: listings.filter((item) => item.category === "commercial" && item.status === "Active").length,
        }),
        [listings]
    );

    return (
        <section className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="section-overline mb-4">Browse By Type</p>
                    <h2 className="section-heading mb-4">Property Categories</h2>
                    <div className="section-divider" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, i) => {
                        const IconComp = iconMap[cat.iconName];
                        return (
                            <motion.div
                                key={cat.value}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.12 }}
                                viewport={{ once: true }}
                            >
                                <Link href={`/listings?category=${cat.value}`} className="block group">
                                    <div className="premium-card p-10 text-center">
                                        <div
                                            className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                            style={{ background: "var(--gradient-brand)" }}
                                        >
                                            {IconComp && <IconComp className="w-7 h-7 text-white" />}
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-2 font-display group-hover:text-primary transition-colors">
                                            {cat.label}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {categoryCounts[cat.value]} verified listings
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Categories;
