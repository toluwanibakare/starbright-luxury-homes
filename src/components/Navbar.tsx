"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/listings", label: "Listings" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const showSolid = scrolled || !isHome;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showSolid
                ? "bg-white/95 backdrop-blur-xl border-b border-border/40 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="container-premium flex items-center justify-between h-[100px] px-5 sm:px-8 lg:px-12">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 relative z-10">
                    <Image
                        src="/images/starbright_logo.png"
                        alt="Starbright Real Estate"
                        width={240}
                        height={80}
                        className={`h-20 w-auto transition-all duration-300 ${!showSolid ? "brightness-0 invert" : ""}`}
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-2">
                    <motion.div className="flex items-center gap-1" onMouseLeave={() => setHoveredPath(null)}>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onMouseEnter={() => setHoveredPath(link.path)}
                                    className={`relative px-5 py-2.5 text-[14px] font-medium tracking-wide transition-colors duration-300 rounded-lg group ${isActive
                                        ? "text-primary"
                                        : showSolid
                                            ? "text-foreground/70 hover:text-foreground"
                                            : "text-white/70 hover:text-white"
                                        }`}
                                >
                                    <span className="relative z-10">{link.label}</span>

                                    {/* Hover Indicator (Pill) */}
                                    {hoveredPath === link.path && (
                                        <motion.span
                                            layoutId="nav-hover"
                                            className={`absolute inset-0 rounded-lg -z-0 ${showSolid ? "bg-muted/60" : "bg-white/10"
                                                }`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}

                                    {/* Active Indicator (Line) */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-indicator"
                                            className="absolute bottom-1.5 left-5 right-5 h-[3px] rounded-full z-20"
                                            style={{
                                                background: "var(--gradient-brand)",
                                                boxShadow: "0 2px 8px -1px hsla(0, 60%, 40%, 0.4)"
                                            }}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex items-center gap-3">
                    <a
                        href="tel:+2348000000000"
                        className={`text-[13px] font-medium transition-colors flex items-center gap-1.5 ${showSolid ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"
                            }`}
                    >
                        <Phone className="w-3.5 h-3.5" />
                        +234 800 000 0000
                    </a>
                    <a
                        href="https://wa.me/2348000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="premium-btn-primary text-xs !py-2.5 !px-5"
                    >
                        Get in Touch
                        <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`lg:hidden relative z-10 p-2 rounded-md transition-colors ${showSolid ? "text-foreground" : "text-white"
                        }`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden bg-white border-b border-border"
                    >
                        <div className="px-5 py-6 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${pathname === link.path
                                        ? "text-primary bg-primary/5"
                                        : "text-foreground hover:bg-muted/50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-border mt-4">
                                <a
                                    href="https://wa.me/2348000000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="premium-btn-primary w-full text-xs !py-3"
                                >
                                    Get in Touch
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
