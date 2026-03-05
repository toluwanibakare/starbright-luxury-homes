"use client";

import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Crumb = {
    label: string;
    href?: string;
};

type PageBreadcrumbHeroProps = {
    overline: string;
    title: string;
    description?: string;
    backgroundImage: string;
    crumbs: Crumb[];
};

export default function PageBreadcrumbHero({
    overline,
    title,
    description,
    backgroundImage,
    crumbs,
}: PageBreadcrumbHeroProps) {
    return (
        <div
            className="relative pt-28 pb-12 section-padding !pb-10 overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(120deg, hsla(220, 25%, 14%, 0.8), hsla(0, 60%, 20%, 0.55)), url('${backgroundImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container-premium relative z-10">
                <Breadcrumb className="mb-5">
                    <BreadcrumbList className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit text-white/80">
                        {crumbs.map((crumb, index) => (
                            <BreadcrumbItem key={`${crumb.label}-${index}`}>
                                {index > 0 && (
                                    <BreadcrumbSeparator className="text-white/60" />
                                )}
                                {crumb.href ? (
                                    <BreadcrumbLink asChild className="hover:text-white">
                                        <Link href={crumb.href}>{crumb.label}</Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage className="text-white font-medium">
                                        {crumb.label}
                                    </BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>

                <p className="text-[11px] uppercase tracking-[0.25em] text-white/80 font-semibold font-body mb-3">
                    {overline}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
                    {title}
                </h1>
                {description && (
                    <p className="text-white/85 max-w-2xl text-sm md:text-base">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
