import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "Read the terms governing access to and use of the Starbright Real Estate & Properties website, listings, enquiries, comments, and support channels.",
    alternates: {
        canonical: "/terms-of-service",
    },
};

const sections = [
    {
        title: "1. Acceptance of Terms",
        body: "By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree, you should not use the website or rely on its services.",
    },
    {
        title: "2. Website Purpose",
        body: "This website is provided by Starbright Real Estate & Properties to showcase property information, receive enquiries, support inspection requests, facilitate communication, and publish related content. Website content is for general informational and commercial communication purposes unless expressly stated otherwise.",
    },
    {
        title: "3. Listings and Property Information",
        body: "We aim to present property information as accurately as reasonably possible, but availability, pricing, specifications, status, supporting details, and other listing information may change at any time. A website listing does not by itself create a binding sale, reservation, agency obligation, or legal representation unless separately agreed in writing.",
    },
    {
        title: "4. No Automatic Guarantee of Transaction",
        body: "Submitting an enquiry, booking an inspection, or communicating with our team does not guarantee that a property remains available, that a transaction will be completed, or that any party will proceed with a sale, purchase, lease, or related arrangement.",
    },
    {
        title: "5. User Responsibilities",
        body: "You agree to provide accurate information when using contact forms, chat, comments, or other website features. You must not use the website for spam, fraud, harassment, impersonation, unlawful conduct, or publication of false, abusive, defamatory, or misleading content.",
    },
    {
        title: "6. Comments and User Submissions",
        body: "Any content you submit through comments, forms, or chat must comply with applicable law and these terms. We reserve the right to review, moderate, reject, edit, restrict, or remove user submissions at our discretion without prior notice.",
    },
    {
        title: "7. Inspections and Communication",
        body: "Inspection arrangements, viewing availability, and follow-up communication are subject to scheduling, property availability, operational constraints, and confirmation by our team. We may decline, reschedule, or cancel requests where necessary.",
    },
    {
        title: "8. Intellectual Property",
        body: "Unless otherwise stated, the website design, branding, logos, text, layout, and original website content are owned by or used with permission by Starbright Real Estate & Properties. You may not reproduce, republish, distribute, or commercially exploit website content without appropriate permission.",
    },
    {
        title: "9. Third-Party Services",
        body: "The website may link to or integrate with third-party services such as WhatsApp, email providers, maps, hosting providers, or external websites. We are not responsible for the separate content, policies, or performance of those external services.",
    },
    {
        title: "10. Disclaimer",
        body: "The website and its contents are provided on an 'as is' and 'as available' basis. To the fullest extent permitted by law, we do not make guarantees that the website will always be uninterrupted, error-free, fully up to date, or suitable for every particular purpose.",
    },
    {
        title: "11. Limitation of Liability",
        body: "To the fullest extent permitted by law, Starbright Real Estate & Properties will not be liable for indirect, incidental, special, consequential, or business-related losses arising from use of or inability to use the website, reliance on website content, delays in communication, third-party service failures, or property decisions made by users.",
    },
    {
        title: "12. Indemnity",
        body: "You agree to indemnify and hold Starbright Real Estate & Properties harmless from claims, liabilities, damages, losses, and expenses arising from your misuse of the website, your submitted content, your breach of these terms, or your violation of applicable law or third-party rights.",
    },
    {
        title: "13. Suspension or Restriction",
        body: "We may suspend, restrict, or terminate access to any part of the website or its interactive features at any time if we believe it is necessary for security, maintenance, moderation, legal compliance, or protection of our platform and users.",
    },
    {
        title: "14. Governing Law",
        body: "These terms shall be governed by and interpreted in accordance with applicable laws in the relevant jurisdiction where Starbright Real Estate & Properties operates or enforces its contractual and legal rights, subject to any mandatory legal requirements.",
    },
    {
        title: "15. Changes to These Terms",
        body: "We may update these Terms of Service from time to time. Continued use of the website after changes are posted will be treated as acceptance of the revised terms unless applicable law requires otherwise.",
    },
    {
        title: "16. Contact",
        body: "If you have questions about these Terms of Service, please contact Starbright Real Estate & Properties through the website contact page or official support channels published on the site.",
    },
];

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <PageBreadcrumbHero
                overline="Legal"
                title="Terms of Service"
                description="The terms that govern access to and use of the Starbright website and its related features."
                backgroundImage="/images/hero-3.jpg"
                crumbs={[
                    { label: "Home", href: "/" },
                    { label: "Terms of Service" },
                ]}
            />

            <div className="container-premium px-5 sm:px-8 lg:px-12 py-12">
                <div className="premium-card p-6 sm:p-8 lg:p-10">
                    <div className="max-w-4xl space-y-8">
                        <p className="text-sm text-muted-foreground">
                            Effective date: April 10, 2026
                        </p>

                        {sections.map((section) => (
                            <section key={section.title} className="space-y-3">
                                <h2 className="text-xl font-semibold text-foreground font-display">
                                    {section.title}
                                </h2>
                                <p className="text-sm sm:text-base leading-7 text-muted-foreground">
                                    {section.body}
                                </p>
                            </section>
                        ))}

                        <div className="rounded-2xl border border-border bg-muted/30 p-5">
                            <p className="text-sm text-muted-foreground leading-7">
                                These terms are a practical website-use framework and should not be treated as a substitute for bespoke legal drafting for your business, contracts, or regulatory obligations. For formal legal review, consult a qualified lawyer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
