"use client";

import { motion } from "framer-motion";
import {
    Award,
    Building2,
    CheckCircle2,
    Eye,
    Globe2,
    Handshake,
    Shield,
    Target,
    Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";

const values = [
    {
        icon: Shield,
        title: "Trust",
        desc: "We verify properties thoroughly so clients can transact without fear or uncertainty.",
    },
    {
        icon: Eye,
        title: "Transparency",
        desc: "We guide every client with clear documentation, inspections, and honest communication.",
    },
    {
        icon: Users,
        title: "Client-First",
        desc: "We prioritize client satisfaction and long-term relationships at every stage.",
    },
    {
        icon: Award,
        title: "Excellence",
        desc: "We uphold high standards across sales, construction, management, and support services.",
    },
];

const differentiators = [
    "Rigorous property verification to ensure all listings are authentic and legal.",
    "Comprehensive services from property sales to construction and facilities management.",
    "A customer-first approach focused on satisfaction, trust, and lasting relationships.",
    "A pan-African reach supported by practical local expertise.",
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <PageBreadcrumbHero
                    overline="Our Story"
                    title="About Starbright Real Estate & Properties"
                    description="Transforming how people buy, sell, build, and manage properties across Africa."
                    backgroundImage="/images/hero-2.jpg"
                    crumbs={[
                        { label: "Home", href: "/" },
                        { label: "About" },
                    ]}
                />
            </motion.div>

            <div className="container-premium section-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="section-overline mb-4">Who We Are</p>
                        <h2 className="section-heading !text-2xl md:!text-3xl mb-6">
                            Introducing Starbright Real Estate and Properties
                        </h2>
                        <div className="section-divider !mx-0 mb-6" />
                        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                            <p>
                                Starbright Real Estate and Properties is a fast-rising real estate
                                company across Africa, dedicated to transforming the way people
                                buy, sell, and manage properties.
                            </p>
                            <p>
                                We specialize in a full spectrum of real estate services,
                                including the selling and buying of landed properties,
                                construction, property management, procurement, and facilities
                                management. Our commitment to excellence and innovation has
                                quickly positioned us as a trusted partner in the African real
                                estate landscape.
                            </p>
                            <p>
                                Starbright was founded to bridge the gap in the real estate market
                                for safe, reliable, and verified property transactions. In many
                                parts of Africa, buyers face fraud, unclear land titles, and poor
                                property management. We were created to offer a trustworthy
                                platform backed by professional verification and ethical
                                standards.
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
                            { num: "6", label: "Core Service Areas" },
                            { num: "100%", label: "Verified-First Approach" },
                            { num: "Pan-African", label: "Market Outlook" },
                            { num: "End-to-End", label: "Property Solutions" },
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="premium-card p-8"
                    >
                        <div
                            className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center"
                            style={{ background: "var(--gradient-brand)" }}
                        >
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <p className="section-overline mb-3">Our Mission</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            To provide safe, verified, and high-quality real estate solutions that
                            empower individuals and businesses to invest confidently in
                            properties across Africa.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="premium-card p-8"
                    >
                        <div
                            className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center"
                            style={{ background: "var(--gradient-brand)" }}
                        >
                            <Globe2 className="w-5 h-5 text-white" />
                        </div>
                        <p className="section-overline mb-3">Our Vision</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            To become the leading real estate company in Africa, recognized for
                            integrity, innovation, and excellence in property development,
                            management, and investment services.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="section-overline mb-4">What We Do</p>
                        <h2 className="section-heading !text-2xl md:!text-3xl mb-6">
                            End-to-End Real Estate Solutions
                        </h2>
                        <div className="section-divider !mx-0 mb-6" />
                        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                            <p>
                                At Starbright, we provide end-to-end real estate solutions.
                                Whether you are looking to purchase verified land or property,
                                sell your estate, manage a property efficiently, or undertake
                                construction projects, our team ensures a seamless, transparent,
                                and professional process.
                            </p>
                            <p>
                                Our goal is to make property dealings smooth, safe, and rewarding
                                for both buyers and sellers while supporting broader property
                                operations through procurement and facilities management.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="premium-card p-8"
                    >
                        <div
                            className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center"
                            style={{ background: "var(--gradient-brand)" }}
                        >
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-4">
                            What Makes Starbright Different
                        </h3>
                        <div className="space-y-4">
                            {differentiators.map((item) => (
                                <div key={item} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="premium-card p-8"
                    >
                        <div
                            className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center"
                            style={{ background: "var(--gradient-brand)" }}
                        >
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-4">
                            How We Verify Lands and Properties
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Every land and property listed with Starbright undergoes a thorough
                            verification process, including title checks, legal documentation
                            review, and on-site inspections. This ensures our clients only deal
                            with genuine, secure, and market-ready properties.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="premium-card p-8"
                    >
                        <div
                            className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center"
                            style={{ background: "var(--gradient-brand)" }}
                        >
                            <Handshake className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-4">
                            Our Commitment to Buyers
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We help buyers purchase safe, verified properties with confidence,
                            eliminating the stress and uncertainty often associated with real
                            estate transactions. Your investment is safe with Starbright, and
                            your satisfaction is our priority.
                        </p>
                    </motion.div>
                </div>

                <div className="text-center mb-14">
                    <p className="section-overline mb-4">Our Values</p>
                    <h2 className="section-heading !text-3xl mb-4">What We Stand For</h2>
                    <div className="section-divider" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="premium-card p-8 text-center group"
                        >
                            <div
                                className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                style={{ background: "var(--gradient-brand)" }}
                            >
                                <value.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-display font-semibold text-foreground mb-2">
                                {value.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <CTABand />
            <Footer />
        </div>
    );
}
