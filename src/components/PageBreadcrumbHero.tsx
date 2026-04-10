"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Crumb {
    label: string;
    href?: string;
}

interface PageBreadcrumbHeroProps {
    overline: string;
    title: string;
    description: string;
    backgroundImage: string;
    crumbs: Crumb[];
}

export default function PageBreadcrumbHero({
    overline,
    title,
    description,
    backgroundImage,
    crumbs,
}: PageBreadcrumbHeroProps) {
    const trail = crumbs.length > 0 ? crumbs : [{ label: title }];

    return (
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />

            <div className="relative z-10 container-premium px-5 sm:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/65 mb-4">
                        {overline}
                    </p>
                    <h1
                        className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight"
                        style={{ textShadow: "0 10px 30px rgba(0,0,0,0.45)" }}
                    >
                        {title}
                    </h1>
                    <p
                        className="text-sm sm:text-base text-white mt-4 max-w-2xl leading-7 font-medium"
                        style={{ textShadow: "0 8px 24px rgba(0,0,0,0.42)" }}
                    >
                        {description}
                    </p>

                    <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/85 backdrop-blur-sm">
                        {trail.map((crumb, index) => {
                            const isLast = index === trail.length - 1;
                            return (
                                <div key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                                    {crumb.href && !isLast ? (
                                        <Link href={crumb.href} className="hover:text-white transition-colors">
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className={isLast ? "text-white font-medium" : ""}>
                                            {crumb.label}
                                        </span>
                                    )}
                                    {!isLast ? <ChevronRight className="w-3 h-3 text-white/55" /> : null}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
