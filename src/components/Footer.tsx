import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[hsl(220,25%,12%)] text-white">
            <div className="container-premium section-padding !py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="mb-5">
                            <Image
                                src="/images/starbright_logo.png"
                                alt="Starbright Real Estate"
                                width={160}
                                height={50}
                                className="h-12 w-auto brightness-0 invert"
                            />
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed mb-6">
                            Nigeria&apos;s trusted platform for verified land and property listings. We ensure every property is inspected and documented.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 text-white/70">
                            Quick Links
                        </h4>
                        <div className="space-y-3">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/listings", label: "Listings" },
                                { to: "/about", label: "About Us" },
                                { to: "/contact", label: "Contact" },
                            ].map((link) => (
                                <Link
                                    key={link.to}
                                    href={link.to}
                                    className="group flex items-center gap-1.5 text-sm text-white/45 hover:text-white/90 transition-colors"
                                >
                                    {link.label}
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 text-white/70">
                            Categories
                        </h4>
                        <div className="space-y-3">
                            {["Land", "Houses", "Commercial Properties"].map((cat) => (
                                <Link
                                    key={cat}
                                    href="/listings"
                                    className="group flex items-center gap-1.5 text-sm text-white/45 hover:text-white/90 transition-colors"
                                >
                                    {cat}
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 text-white/70">
                            Contact
                        </h4>
                        <div className="space-y-4 text-sm text-white/45">
                            <a href="tel:+2348000000000" className="flex items-center gap-3 hover:text-white/80 transition-colors">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span>+234 800 000 0000</span>
                            </a>
                            <a href="mailto:hello@starbrightproperties.com" className="flex items-center gap-3 hover:text-white/80 transition-colors">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span>hello@starbrightproperties.com</span>
                            </a>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span>Lagos, Nigeria</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/8 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/30">
                        &copy; {currentYear} Starbright Real Estate & Properties. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/about" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/about" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                            Terms of Service
                        </Link>
                        <a
                            href="https://tmb.it.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white/30 hover:text-white transition-colors flex items-center gap-1 font-medium border-l border-white/10 pl-6"
                        >
                            Built by <span className="text-white/60">TMB</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
