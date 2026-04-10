"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/mockData";

const Testimonials = () => {
    return (
        <section className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="section-overline mb-4">Testimonials</p>
                    <h2 className="section-heading mb-4">What Our Customers Say</h2>
                    <div className="section-divider" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12 }}
                            viewport={{ once: true }}
                            className="premium-card p-8 relative"
                        >
                            {/* Quote icon */}
                            <Quote className="w-8 h-8 text-primary/10 absolute top-6 right-6" />

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-5">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Quote text */}
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                    style={{ background: "var(--gradient-brand)" }}
                                >
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
