import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center px-5">
                <p className="section-overline mb-4">Error 404</p>
                <h1 className="text-6xl md:text-8xl font-bold font-display premium-gradient-text mb-4">
                    404
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                    Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="premium-btn-primary"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Home
                </Link>
            </div>
        </div>
    );
}
