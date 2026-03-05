import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <PageBreadcrumbHero
                overline="Error 404"
                title="Page Not Found"
                description="The page you requested does not exist or has been moved."
                backgroundImage="/images/hero-1.jpg"
                crumbs={[
                    { label: "Home", href: "/" },
                    { label: "404" },
                ]}
            />
            <div className="container-premium py-20 px-5 text-center">
                <h1 className="text-6xl md:text-8xl font-bold font-display premium-gradient-text mb-4">
                    404
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link href="/" className="premium-btn-primary">
                    <ArrowLeft className="w-4 h-4" />
                    Return to Home
                </Link>
            </div>
            <Footer />
        </div>
    );
}
