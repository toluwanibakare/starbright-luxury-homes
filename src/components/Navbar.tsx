"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/listings", label: "Listings" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isIslandExpanded, setIsIslandExpanded] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const pathname = usePathname();
    const heroNavbarPaths = ["/", "/about", "/contact", "/listings", "/privacy-policy", "/terms-of-service"];
    const hasHeroNavbar = heroNavbarPaths.includes(pathname);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const showSolid = hasHeroNavbar ? scrolled : true;
    const activeLink = navLinks.find((link) => link.path === pathname) ?? navLinks[0];
    const desktopExpanded = !showSolid || isIslandExpanded;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            <div
                className={`container-premium px-3 sm:px-6 lg:px-8 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    showSolid ? "pt-2 md:pt-3" : "pt-0"
                }`}
            >
                <div
                    onMouseEnter={() => showSolid && setIsIslandExpanded(true)}
                    onMouseLeave={() => {
                        setIsIslandExpanded(false);
                        setHoveredPath(null);
                    }}
                    className={`pointer-events-auto flex items-center justify-between transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        showSolid
                            ? desktopExpanded
                                ? "h-[58px] md:h-[64px] rounded-[20px] bg-white/78 backdrop-blur-2xl shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] px-4 sm:px-6 lg:px-8 lg:w-full"
                                : "h-[58px] md:h-[64px] rounded-[20px] bg-white/82 backdrop-blur-2xl shadow-[0_16px_38px_-26px_rgba(15,23,42,0.28)] px-4 sm:px-5 lg:px-6 lg:w-fit lg:mx-auto gap-4"
                            : "h-[75px] md:h-[100px] bg-transparent px-4 sm:px-6 lg:px-8"
                    }`}
                >
                    <Link href="/" className="flex items-center gap-2.5 relative z-10">
                        <Image
                            src="/images/starbright_logo.png"
                            alt="Starbright Real Estate & Properties"
                            width={300}
                            height={100}
                            className={`w-auto transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                showSolid
                                    ? "h-[56px] md:h-[62px]"
                                    : "h-[75px] md:h-[96px] brightness-0 invert"
                            }`}
                            priority
                        />
                    </Link>

                    <div className="hidden lg:flex items-center gap-2">
                        <motion.div
                            className="flex items-center gap-1"
                        >
                            {(desktopExpanded ? navLinks : [activeLink]).map((link) => {
                                const isActive = pathname === link.path;

                                return (
                                    <Link
                                        key={link.path}
                                        href={link.path}
                                        onMouseEnter={() => desktopExpanded && setHoveredPath(link.path)}
                                        className={`relative px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-[420ms] group ${
                                            isActive
                                                ? "text-primary"
                                                : showSolid
                                                    ? "text-foreground/70 hover:text-foreground"
                                                    : "text-white/70 hover:text-white"
                                        }`}
                                    >
                                        <span className="relative z-10">{link.label}</span>

                                        {desktopExpanded && hoveredPath === link.path && !isActive && (
                                            <motion.span
                                                layoutId="nav-hover"
                                                className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full z-20"
                                                style={{
                                                    background: showSolid
                                                        ? "hsla(220, 15%, 20%, 0.28)"
                                                        : "rgba(255, 255, 255, 0.95)",
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                            />
                                        )}

                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-indicator"
                                                className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full z-20"
                                                style={{
                                                    background: "var(--gradient-brand)",
                                                    boxShadow: "0 2px 8px -1px hsla(0, 60%, 40%, 0.4)",
                                                }}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </motion.div>
                    </div>

                    <div
                        className={`hidden lg:flex items-center gap-2.5 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            desktopExpanded ? "opacity-100" : "pointer-events-none w-0 opacity-0 overflow-hidden"
                        }`}
                    >
                        <a
                            href="tel:+2347033764029"
                            className={`text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                                showSolid
                                    ? "text-muted-foreground hover:text-foreground"
                                    : "text-white/70 hover:text-white"
                            }`}
                        >
                            <Phone className="w-3.5 h-3.5" />
                            +234 703 376 4029
                        </a>
                        <a
                            href="https://wa.me/2347033764029"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`premium-btn-primary text-[11px] ${showSolid ? "!py-1.5 !px-3.5" : "!py-2.5 !px-5"}`}
                        >
                            <WhatsAppIcon className={`${showSolid ? "w-3.5 h-3.5" : "w-4 h-4"}`} />
                            Get in Touch
                            <ChevronRight className={`${showSolid ? "w-3 h-3" : "w-3.5 h-3.5"}`} />
                        </a>
                    </div>

                    <button
                        className={`lg:hidden relative z-10 p-2 rounded-md transition-colors ${
                            showSolid ? "text-foreground" : "text-white"
                        }`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.18 }}
                            className={`pointer-events-auto lg:hidden mt-2 overflow-hidden rounded-2xl border border-border/80 bg-white/95 backdrop-blur-xl shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] ${
                                showSolid ? "" : "mx-3 sm:mx-6"
                            }`}
                        >
                            <div className="px-5 py-6 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        href={link.path}
                                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                            pathname === link.path
                                                ? "text-primary bg-primary/5"
                                                : "text-foreground hover:bg-muted/50"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t border-border mt-4">
                                    <a
                                        href="https://wa.me/2347033764029"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="premium-btn-primary w-full text-xs !py-3"
                                    >
                                        <WhatsAppIcon className="w-4 h-4" />
                                        Get in Touch
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
