"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import { motion } from "framer-motion";
import Image from "next/image";
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
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
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

const services = [
    "Residential lands and houses",
    "Newly built and fairly used residential properties",
    "Commercial properties",
    "Hotels",
    "Filling stations",
    "Schools",
    "Shopping malls",
    "Office complexes",
    "Investment estates",
    "Construction and property development",
    "Property acquisition and sales",
    "Short-let apartment bookings in your preferred locations across Lagos",
];

const priorities = [
    "Authentic and legally verified property titles",
    "Strategic and rapidly developing locations",
    "High return on investment and capital appreciation",
    "Security and accessibility of the environment",
    "Infrastructure and future development potential",
    "Transparent pricing with no hidden charges",
    "Professional guidance throughout the buying and selling process",
    "Flexible payment options tailored to your financial capacity",
    "Excellent customer service before, during, and after every transaction",
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

                {/* Welcome + Founders */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start"
                >
                    <motion.div
                        variants={fadeUp}
                        className="premium-card p-6 sm:p-8 lg:p-10 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.10),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.10),transparent_30%)] pointer-events-none" />
                        <div className="relative max-w-4xl">
                            <p className="section-overline mb-3">About Starbright</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display leading-tight">
                                Welcome to Star Bright Real Estate and Properties
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground mt-5 leading-8">
                                At Star Bright Real Estate and Properties, we believe that owning genuine real estate should not be a privilege reserved for a few — it should be an opportunity available to every Nigerian and every investor seeking value, security, and long-term wealth.
                            </p>
                            <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-8">
                                The company is led by its visionary founders and Chief Executive Officers, Dr. Oluwadamilola Adenike and Amb. Tunde Busari, a husband-and-wife team united by integrity, excellence, and a passion for transforming lives through authentic real estate investments. Their vision was born out of the growing need to protect Nigerians from fraudulent land transactions and to provide access to affordable, legally verified properties with complete peace of mind.
                            </p>
                            <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-8">
                                Our commitment is simple: every property we market or facilitate is carefully verified to ensure it has the appropriate legal documentation, including Certificate of Occupancy (C of O), Government Approval, Building Approval where applicable, and other relevant title documents. We are dedicated to helping our clients invest with confidence, knowing their properties are genuine, secure, and free from unnecessary legal complications.
                            </p>
                            <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-8">
                                At Star Bright Real Estate and Properties, affordability meets excellence. We offer some of the most competitive property prices in the market, complemented by flexible and convenient installment payment plans, making it easier for individuals, families, and corporate organizations to achieve their property ownership dreams without unnecessary financial pressure.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUp}
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
                                Your investment is protected with Starbright, and your satisfaction remains at the center of everything we do. From verification to final decision, we ensure every step is clear, secure, and handled with the highest level of professionalism.
                            </p>
                        </blockquote>

                        <div className="mt-10">
                            <p className="text-sm font-semibold text-foreground">Starbright Commitment</p>
                            <p className="text-sm text-muted-foreground mt-2 leading-7">
                                We help buyers purchase safe, verified properties with confidence, removing the stress and uncertainty often associated with real estate transactions.
                            </p>
                        </div>
                    </motion.div>
                </motion.section>

                {/* Founders */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-center"
                >
                    <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted">
                        <Image
                            src="/founders.jpeg"
                            alt="Dr. Oluwadamilola Adenike & Amb. Tunde Busari — Founders, Starbright Real Estate"
                            fill
                            className="object-contain"
                        />
                    </motion.div>
                    <motion.div custom={1} variants={fadeUp} className="premium-card p-6 sm:p-8">
                        <p className="section-overline mb-3">Our Founders</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                            Dr. Oluwadamilola Adenike & Amb. Tunde Busari
                        </h2>
                        <p className="text-sm text-muted-foreground mt-2 font-medium">
                            Chief Executive Officers &amp; Co-Founders
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground mt-5 leading-8">
                            A husband-and-wife team united by integrity, excellence, and a passion for transforming lives through authentic real estate investments. Their vision was born out of the growing need to protect Nigerians from fraudulent land transactions and to provide access to affordable, legally verified properties with complete peace of mind.
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-8">
                            Under their leadership, Star Bright Real Estate and Properties has grown into a trusted partner for buyers, sellers, and investors across Nigeria — offering everything from verified land and houses to commercial assets, construction, and property management.
                        </p>
                    </motion.div>
                </motion.section>

                {/* Mission + Vision */}
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
                            To build lasting relationships founded on trust, integrity, professionalism, and exceptional service while helping our clients build generational wealth through smart real estate investments.
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
                            To become the leading real estate company in Africa, recognized for integrity, innovation, and excellence in property development, management, and investment services.
                        </p>
                    </motion.div>
                </motion.section>

                {/* Core Values */}
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

                {/* Services & Portfolio */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    <motion.div variants={fadeUp} className="premium-card p-6 sm:p-8">
                        <p className="section-overline mb-3">Our Portfolio</p>
                        <h2 className="text-2xl font-bold text-foreground font-display mb-5">
                            What we offer
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {services.map((service) => (
                                <div key={service} className="flex items-start gap-2.5">
                                    <BadgeCheck size={16} className="text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm text-muted-foreground">{service}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div custom={1} variants={fadeUp} className="premium-card p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <SearchCheck size={22} />
                            </div>
                            <div>
                                <p className="section-overline mb-1">What We Prioritize</p>
                                <h2 className="text-2xl font-bold text-foreground font-display">
                                    Every wise investor should know
                                </h2>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {priorities.map((item) => (
                                <div key={item} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                                        <ArrowRight size={10} />
                                    </div>
                                    <span className="text-sm text-muted-foreground">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.section>

                {/* Highlights */}
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

                {/* CTA Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="premium-card p-6 sm:p-8 lg:p-10 overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08),transparent_28%)] pointer-events-none" />
                    <motion.div variants={fadeUp} className="relative max-w-3xl">
                        <p className="section-overline mb-3">Star Bright Real Estate and Properties</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display leading-tight">
                            Where integrity meets investment, dreams become reality, and every property transaction shines with confidence.
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground mt-5 leading-8">
                            Whether you are buying your first plot of land, searching for your dream home, expanding your investment portfolio, or acquiring commercial assets, Star Bright Real Estate and Properties is your trusted partner in building generational wealth through smart real estate investments.
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
