export const siteConfig = {
    name: "Starbright Real Estate & Properties",
    legalName: "Starbright Real Estate & Properties",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://starbrightproperties.com.ng",
    description:
        "Discover verified property listings with guided inspections, secure enquiries, and a clearer buying experience.",
    locale: "en_NG",
    email: "hello@starbrightproperties.com",
    phone: "+234 703 376 4029",
    address: {
        street: "Lekki Phase 1",
        city: "Lagos",
        region: "Lagos",
        country: "Nigeria",
    },
    social: {
        facebook: "https://facebook.com/starbrightpropertiesng",
        instagram: "https://instagram.com/starbrightpropertiesng",
        linkedin: "https://linkedin.com/company/starbrightpropertiesng",
    },
};

export const primaryKeywords = [
    "verified properties in Nigeria",
    "trusted real estate company Nigeria",
    "buy land with verified C of O",
    "buy house in Lekki Lagos",
    "commercial property Nigeria",
    "property inspection Lagos",
    "property verification Nigeria",
    "secure property transactions Nigeria",
    "Starbright Real Estate & Properties",
    "real estate agents Lagos Nigeria",
    "buy property in Lekki",
    "land for sale in Lagos with documents",
];

export const keywordClusters = {
    transactional: [
        "buy property with verification",
        "buy land with verified documentation",
        "verified real estate listings",
        "request property inspection",
        "affordable houses for sale in Lagos",
        "land for sale in Lekki Phase 1",
    ],
    localIntent: [
        "real estate company in Lagos",
        "property investment opportunities Nigeria",
        "verified homes for sale in Lagos",
        "verified land for sale in Lagos",
        "commercial property listings Lagos",
        "luxury homes in Lekki",
        "duplex for sale in Ikoyi",
    ],
    trustIntent: [
        "how to avoid property fraud in Nigeria",
        "verified C of O property Lagos",
        "real estate legal verification Nigeria",
        "authentic land documents Nigeria",
        "secure land buying process Nigeria",
    ],
};

export const defaultMeta = {
    ogImage: "/images/hero-1.jpg",
    ogImageAlt: "Starbright Real Estate — verified property listings across Nigeria",
    twitterHandle: "@starbrightng",
};
