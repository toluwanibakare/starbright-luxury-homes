"use client";

import { motion } from "framer-motion";
import { Shield, Users, Eye, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";

const values = [
    {
        icon: Shield,
        title: "Trust",
        desc: "We verify every listing so you never have to worry about fraud.",
    },
    {
        icon: Eye,
        title: "Transparency",
        desc: "Full document disclosure and guided inspections on every property.",
    },
    {
        icon: Users,
        title: "Client-First",
        desc: "Your goals drive everything we do — from listing to closing.",
    },
    {
        icon: Award,
        title: "Excellence",
        desc: "We set the highest standards for property listings in Nigeria.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <PageBreadcrumbHero
                    overline="Our Story"
                    title="About Starbright"
                    description="Building trust in Nigerian real estate, one verified listing at a time."
                    backgroundImage="/images/hero-2.jpg"
                    crumbs={[
                        { label: "Home", href: "/" },
                        { label: "About" },
                    ]}
                />
            </motion.div>

            <div className="container-premium section-padding">
                {/* Story + Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="section-overline mb-4">Who We Are</p>
                        <h2 className="section-heading !text-2xl md:!text-3xl mb-6">
                            Redefining Real Estate in Nigeria
                        </h2>
                        <div className="section-divider !mx-0 mb-6" />
                        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                            <p>
                                Starbright Real Estate & Properties was founded with a singular
                                mission: to eliminate fraud and uncertainty from property
                                transactions in Nigeria.
                            </p>
                            <p>
                                We understand that buying land or a home is one of the biggest
                                decisions anyone makes. That&apos;s why every property on our
                                platform undergoes rigorous verification — from document checks
                                to physical inspections — before it ever reaches a buyer.
                            </p>
                            <p>
                                Our team of real estate professionals, legal experts, and
                                surveyors work together to ensure that when you buy through
                                Starbright, you buy with complete confidence.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-5"
                    >
                        {[
                            { num: "200+", label: "Properties Verified" },
                            { num: "150+", label: "Happy Clients" },
                            { num: "5+", label: "Years of Trust" },
                            { num: "100%", label: "Verification Rate" },
                        ].map((stat) => (
                            <div key={stat.label} className="premium-card p-7 text-center">
                                <p className="text-3xl font-bold premium-gradient-text mb-1 font-display">
                                    {stat.num}
                                </p>
                                <p className="text-xs text-muted-foreground font-medium">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Values */}
                <div className="text-center mb-14">
                    <p className="section-overline mb-4">Our Values</p>
                    <h2 className="section-heading !text-3xl mb-4">What We Stand For</h2>
                    <div className="section-divider" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="premium-card p-8 text-center group"
                        >
                            <div
                                className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                style={{ background: "var(--gradient-brand)" }}
                            >
                                <v.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-display font-semibold text-foreground mb-2">
                                {v.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <CTABand />
            <Footer />
        </div>
    );
}
