"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <PageBreadcrumbHero
                    overline="Get in Touch"
                    title="Contact Us"
                    description="We&apos;d love to hear from you. Reach out anytime."
                    backgroundImage="/images/hero-4.jpg"
                    crumbs={[
                        { label: "Home", href: "/" },
                        { label: "Contact" },
                    ]}
                />
            </motion.div>

            <div className="container-premium section-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xl font-bold text-foreground font-display mb-6">
                            Send Us a Message
                        </h2>
                        <form
                            className="space-y-5"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="hero-search-input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+234..."
                                        className="hero-search-input w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="hero-search-input w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Subject
                                </label>
                                <select className="hero-search-input w-full">
                                    <option>General Enquiry</option>
                                    <option>Schedule Inspection</option>
                                    <option>List My Property</option>
                                    <option>Partnership</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell us how we can help..."
                                    className="hero-search-input w-full resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="premium-btn-primary w-full sm:w-auto"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-xl font-bold text-foreground font-display mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-5">
                                {[
                                    { icon: Phone, label: "Phone", value: "+234 800 000 0000" },
                                    {
                                        icon: Mail,
                                        label: "Email",
                                        value: "hello@starbrightproperties.com",
                                    },
                                    { icon: MapPin, label: "Office", value: "Lagos, Nigeria" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-4">
                                        <div
                                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: "var(--gradient-brand)" }}
                                        >
                                            <item.icon className="w-4.5 h-4.5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                                {item.label}
                                            </p>
                                            <p className="text-sm font-medium text-foreground">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="premium-card p-6">
                            <h3 className="font-bold text-foreground font-display mb-3">
                                Prefer WhatsApp?
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Chat with us directly for faster responses.
                            </p>
                            <a
                                href="https://wa.me/2348000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="premium-btn-whatsapp flex items-center gap-2"
                            >
                                <WhatsAppIcon className="w-4 h-4" />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
