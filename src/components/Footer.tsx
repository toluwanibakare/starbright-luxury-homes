"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const Footer = () => {
    const { settings } = useSettings();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[hsl(220,25%,12%)] text-white">
            <div className="container-premium section-padding !py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    <div className="lg:col-span-1">
                        <div className="mb-5">
                            <Image
                                src="/images/starbright_logo.png"
                                alt="Starbright Real Estate & Properties"
                                width={200}
                                height={60}
                                className="h-[60px] w-auto brightness-0 invert"
                            />
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed mb-6">
                            Verified property listings, guided inspections, and straightforward enquiries for buyers looking for clearer property opportunities.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 text-white/70">
                            Quick Links
                        </h4>
                        <nav className="space-y-3">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Listings", href: "/listings" },
                                { label: "About", href: "/about" },
                                { label: "Contact", href: "/contact" },
                                { label: "Privacy Policy", href: "/privacy-policy" },
                                { label: "Terms of Service", href: "/terms-of-service" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-sm text-white/45 hover:text-white/90 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 text-white/70">
                            Property Types
                        </h4>
                        <nav className="space-y-3">
                            {[
                                { label: "Houses", href: "/listings?category=house" },
                                { label: "Lands", href: "/listings?category=land" },
                                { label: "Commercial", href: "/listings?category=commercial" },
                            ].map((cat) => (
                                <Link
                                    key={cat.label}
                                    href={cat.href}
                                    className="group flex items-center gap-1.5 text-sm text-white/45 hover:text-white/90 transition-colors"
                                >
                                    {cat.label}
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 text-white/70">
                            Contact
                        </h4>
                        <div className="space-y-4 text-sm text-white/45">
                            <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <div className="space-y-2">
                                    <a href={`tel:${settings.whatsapp_number.replace(/[^0-9]/g, "")}`} className="block hover:text-white/80 transition-colors">
                                        {settings.whatsapp_number}
                                    </a>
                                </div>
                            </div>
                            <a href={`mailto:${settings.support_email}`} className="flex items-center gap-3 hover:text-white/80 transition-colors">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span>{settings.support_email}</span>
                            </a>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span>Peak Park Estate, Oribanwa, Ibeju-Lekki, Lagos.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/8 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/30">
                        &copy; {currentYear} Starbright Real Estate & Properties. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy-policy" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                            Terms of Service
                        </Link>
                        <a
                            href="https://tmb.it.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white/30 hover:text-white transition-colors flex items-center gap-1 font-medium border-l border-white/10 pl-6"
                        >
                            Built by <span className="text-white/60">TMB</span>
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
