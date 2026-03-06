import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
    title: "Starbright Real Estate & Properties — Verified Luxury Properties in Nigeria",
    description:
        "Discover verified land, luxury homes, and commercial properties across Lagos, Nigeria. Every listing is inspected, documented, and fraud-free.",
    keywords: ["real estate", "Nigeria", "Lagos", "verified properties", "luxury homes", "land for sale"],
    openGraph: {
        title: "Starbright Real Estate & Properties",
        description: "Nigeria's trusted platform for verified luxury properties.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
