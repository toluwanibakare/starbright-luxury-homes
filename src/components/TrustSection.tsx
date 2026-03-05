"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, SearchCheck, Scale, Handshake } from "lucide-react";
import { trustFeatures } from "@/data/mockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    ClipboardCheck,
    SearchCheck,
    Scale,
    Handshake,
};

const TrustSection = () => {
    return (
        <section className="section-padding bg-background">
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="section-overline mb-4">Why Trust Us</p>
                    <h2 className="section-heading mb-4">Our Verification Process</h2>
                    <div className="section-divider mb-5" />
                    <p className="section-desc">
                        Every property goes through a rigorous 4-step verification before listing.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trustFeatures.map((feature, i) => {
                        const IconComp = iconMap[feature.iconName];
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="premium-card p-8 text-center group"
                            >
                                {/* Step number */}
                                <div className="relative mx-auto mb-5">
                                    <div
                                        className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                        style={{ background: "var(--gradient-brand)" }}
                                    >
                                        {IconComp && <IconComp className="w-6 h-6 text-white" />}
                                    </div>
                                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center">
                                        {i + 1}
                                    </span>
                                </div>
                                <h3 className="font-display font-semibold text-foreground mb-2 text-[15px]">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
