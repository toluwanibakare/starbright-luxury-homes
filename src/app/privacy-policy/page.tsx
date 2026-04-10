import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Read how Starbright Real Estate & Properties collects, uses, stores, and protects personal information across enquiries, comments, chat, and property requests.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

const sections = [
    {
        title: "1. Introduction",
        body: "This Privacy Policy explains how Starbright Real Estate & Properties collects, uses, stores, and protects personal information when you use this website, submit an enquiry, request an inspection, send a message, post a comment, or otherwise interact with our services.",
    },
    {
        title: "2. Information We Collect",
        body: "We may collect information you provide directly, including your name, email address, phone number, listing reference, message content, chat content, and any details you include when submitting an enquiry, request, or comment. We may also keep basic technical records such as browser or device information, timestamps, and page activity needed for site operation, security, and support.",
    },
    {
        title: "3. How We Use Your Information",
        body: "We use your information to respond to enquiries, schedule inspections, provide property information, manage comments, support live chat conversations, improve the website experience, maintain internal records, and protect the website from abuse, spam, fraud, or misuse.",
    },
    {
        title: "4. Property Enquiries and Contact Requests",
        body: "When you contact us through the website, your message may be stored in our systems and shared with the relevant Starbright team members handling customer support, inspections, sales, administration, or follow-up communication. We may contact you by email, phone, or WhatsApp where appropriate.",
    },
    {
        title: "5. Live Chat Records",
        body: "If you use live chat, your name, email, and messages may be stored so that conversations can continue smoothly and our team can respond effectively. Chat records may remain in our systems for service history, quality control, and operational support unless we decide to remove them.",
    },
    {
        title: "6. Comments and User Content",
        body: "If you submit a comment or other public-facing content, we may review, approve, reject, moderate, edit for formatting, or remove that content at our discretion. Please do not post confidential, unlawful, defamatory, misleading, or abusive content.",
    },
    {
        title: "7. Cookies and Local Storage",
        body: "This website may use browser storage, cookies, or similar technologies to improve usability, remember temporary preferences, preserve chat or comment progress where applicable, and support general site functionality.",
    },
    {
        title: "8. Sharing of Information",
        body: "We do not sell your personal information as part of normal website operations. We may share information internally with authorized personnel, with service providers helping us run the website or communications, where required for legal compliance, or where necessary to protect our rights, users, or business operations.",
    },
    {
        title: "9. Data Security",
        body: "We use reasonable administrative and technical measures to protect personal data from unauthorized access, misuse, or disclosure. However, no internet-based platform or storage system can be guaranteed to be completely secure.",
    },
    {
        title: "10. Retention",
        body: "We may retain personal information, enquiries, comments, and chat history for as long as reasonably necessary for customer support, operational recordkeeping, legal compliance, business needs, dispute resolution, and platform safety.",
    },
    {
        title: "11. Your Choices",
        body: "You may contact us to request corrections to information you have submitted, ask questions about how your information is being used, or request deletion where appropriate and legally permissible. Some records may still be retained where needed for compliance, operational, or legitimate business reasons.",
    },
    {
        title: "12. Third-Party Links and Services",
        body: "This website may include links to third-party services such as WhatsApp, email providers, or external sites. Once you leave our website or interact with those services, their own terms and privacy practices will apply.",
    },
    {
        title: "13. Children’s Privacy",
        body: "This website is not intended for children who are not legally able to engage in property-related transactions or submit personal information without proper authority. If we become aware that data was submitted improperly, we may remove it where appropriate.",
    },
    {
        title: "14. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. Continued use of the website after changes are published will be treated as acceptance of the updated policy unless applicable law requires a different process.",
    },
    {
        title: "15. Contact",
        body: "For privacy-related questions, you can contact Starbright Real Estate & Properties through the website contact page, our published support channels, or our official email addresses shown on the site.",
    },
];

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <PageBreadcrumbHero
                overline="Legal"
                title="Privacy Policy"
                description="How we collect, use, store, and protect information shared through the Starbright website."
                backgroundImage="/images/hero-2.jpg"
                crumbs={[
                    { label: "Home", href: "/" },
                    { label: "Privacy Policy" },
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
                                This policy is provided for general website and operational use. If you need formal legal advice on privacy compliance, regulatory obligations, or contract terms, you should consult a qualified legal professional.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
