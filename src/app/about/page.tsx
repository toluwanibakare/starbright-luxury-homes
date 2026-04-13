"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import { motion } from "framer-motion";
import {
    BadgeCheck,
    FileSearch,
    MapPinned,
    MessageCircleMore,
    Building2,
    Target,
    Medal,
    Eye,
    ShieldCheck,
    Handshake,
    SearchCheck,
    Lightbulb,
    ArrowRight,
    Quote,
} from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const highlights = [
    {
        title: "Verified Property Transactions",
        description: "Every land and property goes through title checks, legal documentation review, and on site inspections before it is presented.",
        icon: BadgeCheck,
    },
    {
        title: "Comprehensive Real Estate Services",
        description: "Beyond buying and selling, Starbright also supports construction, property management, procurement, and facilities management.",
        icon: FileSearch,
    },
    {
        title: "Pan African Reach",
        description: "We are building trusted real estate solutions across Africa with local expertise and a broad service vision.",
        icon: MapPinned,
    },
    {
        title: "Customer First Approach",
        description: "Every process is designed to make property dealings smooth, safe, transparent, and rewarding for both buyers and sellers.",
        icon: MessageCircleMore,
    },
];

const coreValues = [
    {
        title: "Integrity",
        description: "We operate with honesty, ethical standards, and a strong commitment to secure and transparent property transactions.",
        icon: ShieldCheck,
    },
    {
        title: "Excellence",
        description: "We are dedicated to delivering high quality real estate solutions with professionalism and attention to detail.",
        icon: Medal,
    },
    {
        title: "Innovation",
        description: "We embrace smarter and more reliable ways to improve how people buy, sell, and manage properties across Africa.",
        icon: Lightbulb,
    },
    {
        title: "Client Commitment",
        description: "We put client satisfaction first by building trust, creating long term relationships, and guiding every step with care.",
        icon: Handshake,
    },
];

const stats = [
    {
        value: "Full",
        label: "Real estate solutions",
        note: "From buying and selling to construction, procurement, and facilities management.",
    },
    {
        value: "Safe",
        label: "Verified transactions",
        note: "Each listed property goes through proper checks before it is presented.",
    },
    {
        value: "Africa",
        label: "Growth vision",
        note: "Built to serve clients across the African real estate landscape.",
    },
    {
        value: "Trust",
        label: "Client priority",
        note: "A customer first approach focused on confidence, clarity, and long term value.",
    },
];

const faqs = [
    {
        question: "Can I list my property on Starbright?",
        answer: "Yes. Contact the admin on WhatsApp or through the contact page first. Our team will review the property, inspect it, and verify the documents before deciding whether it can be published.",
    },
    {
        question: "How quickly can I close a property transaction?",
        answer: "The timing depends on the property, the documents available, and how quickly both sides provide the needed information. Simple deals can move fast, while larger transactions usually take longer because of legal review and payment steps.",
    },
    {
        question: "Do you help with inspections?",
        answer: "Yes. Once you are interested in a property, you can book an inspection on WhatsApp and our team will guide you on the available date and next steps.",
    },
    {
        question: "What areas do you currently cover?",
        answer: "Coverage may vary by listing, so the best step is to contact the team directly about the property or location you are interested in.",
    },
    {
        question: "What should I prepare before making an enquiry?",
        answer: "It helps to note the listing ID, your budget range, preferred location, and any questions you want answered before an inspection.",
    },
    {
        question: "Can I request more details before visiting a property?",
        answer: "Yes. Use the Request Enquiry button on a listing or visit the contact page. Share the listing ID and our team will respond with the relevant details.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <PageBreadcrumbHero
                overline="About"
                title="About Starbright"
                description="Learn who we are, what we stand for, and how Starbright delivers trusted property listings."
                backgroundImage="/images/hero-4.jpg"
                crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
            />

            <div className="container-premium px-5 sm:px-8 lg:px-12 py-12 space-y-12">
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch"
                >
                    <motion.div
                        variants={fadeUp}
                        className="premium-card p-6 sm:p-8 lg:p-10 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.10),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.10),transparent_30%)] pointer-events-none" />
                        <div className="relative max-w-4xl">
                            <p className="section-overline mb-3">About Starbright</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display leading-tight">
                                Fast rising real estate solutions built on trust, excellence, and innovation
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground mt-5 leading-8">
                                Starbright Real Estate and Properties is a fast-rising real estate company across Africa, dedicated
                                to transforming the way people buy, sell, and manage properties. We specialize in a full spectrum
                                of real estate services, including the selling and buying of landed properties, construction,
                                property management, procurement, and facilities management. Our commitment to excellence and
                                innovation has quickly positioned us as a trusted partner in the African real estate landscape.
                            </p>
                            <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-8">
                                At Starbright, we provide end to end real estate solutions. Whether you are looking to purchase a
                                verified land or property, sell your estate, manage your property efficiently, or undertake
                                construction projects, our team ensures a seamless, transparent, and professional process. Our goal
                                is to make property dealings smooth, safe, and rewarding for both buyers and sellers.
                            </p>
                            <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-8">
                                Starbright Real Estate was founded to bridge the gap in the real estate market for safe, reliable,
                                and verified property transactions. In many parts of Africa, property buyers often face challenges
                                such as fraud, unclear land titles, and poor property management. Starbright was created to provide
                                a trustworthy platform where every property transaction is backed by professional verification and
                                ethical standards.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="premium-card p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-primary/[0.06] via-background to-orange-500/[0.06]"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <Quote size={24} />
                            </div>
                            <div className="h-px flex-1 bg-border mt-7" />
                        </div>

                        <blockquote className="mt-6">
                            <p className="text-xl sm:text-2xl font-semibold text-foreground leading-relaxed font-display">
                                Your investment is protected with Starbright, and your satisfaction remains at the center of everything we do. From verification to final decision, we ensure every step is clear, secure, and handled with the highest level of professionalism.                            </p>
                        </blockquote>
                      
                        <div className="mt-10">
                            <p className="text-sm font-semibold text-foreground">Starbright Commitment</p>
                            <p className="text-sm text-muted-foreground mt-2 leading-7">
                                We help buyers purchase safe, verified properties with confidence, removing the stress and
                                uncertainty often associated with real estate transactions.
                            </p>
                        </div>
                    </motion.div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
                >
                    {stats.map((item, index) => (
                        <motion.div
                            key={item.label}
                            custom={index}
                            variants={fadeUp}
                            className="premium-card p-6"
                        >
                            <p className="text-3xl sm:text-4xl font-bold font-display text-foreground">{item.value}</p>
                            <h3 className="text-base font-semibold text-foreground mt-3">{item.label}</h3>
                            <p className="text-sm text-muted-foreground mt-2 leading-7">{item.note}</p>
                        </motion.div>
                    ))}
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    <motion.div variants={fadeUp} className="premium-card p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <Target size={22} />
                            </div>
                            <div>
                                <p className="section-overline mb-1">Mission</p>
                                <h2 className="text-2xl font-bold text-foreground font-display">What drives us</h2>
                            </div>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-8">
                            To provide safe, verified, and high-quality real estate solutions that empower individuals and
                            businesses to invest confidently in properties across Africa.
                        </p>
                    </motion.div>

                    <motion.div custom={1} variants={fadeUp} className="premium-card p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <Eye size={22} />
                            </div>
                            <div>
                                <p className="section-overline mb-1">Vision</p>
                                <h2 className="text-2xl font-bold text-foreground font-display">Where we are going</h2>
                            </div>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-8">
                            To become the leading real estate company in Africa, recognized for integrity, innovation, and
                            excellence in property development, management, and investment services.
                        </p>
                    </motion.div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="premium-card p-6 sm:p-8"
                >
                    <motion.div variants={fadeUp} className="max-w-3xl mb-8">
                        <p className="section-overline mb-3">Core Values</p>
                        <h2 className="text-3xl font-bold text-foreground font-display">
                            The principles behind how we work
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {coreValues.map((item, index) => (
                            <motion.div
                                key={item.title}
                                custom={index}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className="rounded-3xl border border-border bg-background/70 p-5 transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                    <item.icon size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                                <p className="text-sm text-muted-foreground mt-2 leading-7">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
                >
                    {highlights.map((item, index) => (
                        <motion.div
                            key={item.title}
                            custom={index}
                            variants={fadeUp}
                            className="premium-card p-6 transition-transform duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <item.icon size={22} />
                            </div>
                            <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
                            <p className="text-sm text-muted-foreground mt-2 leading-7">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.section>

                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="premium-card p-6 sm:p-8 lg:p-10 overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08),transparent_28%)] pointer-events-none" />
                    <motion.div variants={fadeUp} className="relative max-w-3xl">
                        <p className="section-overline mb-3">What We Focus On</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display leading-tight">
                            Clearer property buying,{" "}
                            <span className="line-through decoration-2 opacity-40">fewer</span>{" "}
                            <span className="text-primary">No</span> surprises
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground mt-5 leading-8">
                            Unlike many real estate companies, Starbright stands out through a rigorous property verification
                            process, comprehensive services, a customer first approach, and a Pan African vision backed by local
                            expertise. Every land and property listed with Starbright undergoes title checks, legal documentation
                            review, and on site inspections to ensure clients only deal with genuine, secure, and market ready
                            properties.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-foreground">
                            Verified process
                            <ArrowRight size={16} className="text-primary" />
                            Better buying confidence
                        </div>
                    </motion.div>
                </motion.section>
            </div>

            <CTABand />
            <Footer />
        </div>
    );
}