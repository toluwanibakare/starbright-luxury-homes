export type Category = "land" | "house" | "commercial";

export interface Listing {
    id: string;
    slug: string;
    title: string;
    price: number;
    location: string;
    category: Category;
    verified: boolean;
    images: string[];
    description: string;
    size: string;
    documentsStatus: string;
    listingId: string;
}

export const listings: Listing[] = [
    {
        id: "1",
        slug: "luxury-4-bedroom-duplex-lekki",
        title: "Luxury 4 Bedroom Duplex in Lekki Phase 1",
        price: 185000000,
        location: "Lekki Phase 1, Lagos",
        category: "house",
        verified: true,
        images: ["/images/listing-1.jpg", "/images/listing-5.jpg"],
        description:
            "A stunning 4-bedroom fully detached duplex with modern finishes, spacious living areas, fitted kitchen, BQ, swimming pool, and 24/7 security. Located in the heart of Lekki Phase 1 with easy access to major roads and amenities.",
        size: "450 sqm",
        documentsStatus: "C of O verified",
        listingId: "STB-001",
    },
    {
        id: "2",
        slug: "premium-3-bedroom-apartment-ikoyi",
        title: "Premium 3 Bedroom Apartment in Ikoyi",
        price: 120000000,
        location: "Ikoyi, Lagos",
        category: "house",
        verified: true,
        images: ["/images/listing-2.jpg", "/images/listing-1.jpg"],
        description:
            "Elegantly designed 3-bedroom apartment with panoramic views, smart home features, gymnasium, rooftop lounge, and underground parking. Located in prime Ikoyi with waterfront access.",
        size: "280 sqm",
        documentsStatus: "Governor's Consent",
        listingId: "STB-002",
    },
    {
        id: "3",
        slug: "verified-plot-epe",
        title: "Verified 1000sqm Plot in Epe",
        price: 15000000,
        location: "Epe, Lagos",
        category: "land",
        verified: true,
        images: ["/images/listing-3.jpg", "/images/listing-4.jpg"],
        description:
            "Fully verified 1000 square meter plot in a fast-developing area of Epe. Government approved layout with proper road network and drainage. Perfect for residential or investment purposes.",
        size: "1000 sqm",
        documentsStatus: "Gazette verified",
        listingId: "STB-003",
    },
    {
        id: "4",
        slug: "commercial-office-victoria-island",
        title: "Prime Commercial Office Space — Victoria Island",
        price: 350000000,
        location: "Victoria Island, Lagos",
        category: "commercial",
        verified: true,
        images: ["/images/listing-4.jpg", "/images/listing-2.jpg"],
        description:
            "Grade A office space spanning 3 floors with modern amenities, backup power, fiber optic connectivity, conference rooms, and dedicated parking. Prime Victoria Island location near major business hubs.",
        size: "1200 sqm",
        documentsStatus: "C of O verified",
        listingId: "STB-004",
    },
    {
        id: "5",
        slug: "5-bedroom-mansion-banana-island",
        title: "5 Bedroom Waterfront Mansion — Banana Island",
        price: 950000000,
        location: "Banana Island, Lagos",
        category: "house",
        verified: true,
        images: ["/images/listing-5.jpg", "/images/listing-1.jpg"],
        description:
            "Ultra-luxury 5-bedroom waterfront mansion with private jetty, infinity pool, home cinema, wine cellar, staff quarters, and landscaped gardens. The pinnacle of Lagos luxury living.",
        size: "800 sqm",
        documentsStatus: "C of O verified",
        listingId: "STB-005",
    },
    {
        id: "6",
        slug: "estate-land-ajah",
        title: "Gated Estate Land in Ajah — 500sqm",
        price: 25000000,
        location: "Ajah, Lagos",
        category: "land",
        verified: true,
        images: ["/images/listing-6.jpg", "/images/listing-3.jpg"],
        description:
            "500 square meter plot in a fully gated and serviced estate in Ajah. Features include perimeter fencing, good road network, 24/7 security, and proximity to major landmarks including the Lekki-Epe Expressway.",
        size: "500 sqm",
        documentsStatus: "Registered Survey",
        listingId: "STB-006",
    },
];

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    }).format(price);
};

// Icons are now referenced by name — rendered using lucide-react in components
export const categories = [
    { value: "land", label: "Land", iconName: "Mountain" as const, count: 24 },
    { value: "house", label: "Houses", iconName: "Home" as const, count: 38 },
    { value: "commercial", label: "Commercial", iconName: "Building2" as const, count: 12 },
];

export const locations = [
    "All Locations",
    "Lekki Phase 1, Lagos",
    "Ikoyi, Lagos",
    "Victoria Island, Lagos",
    "Ajah, Lagos",
    "Epe, Lagos",
    "Banana Island, Lagos",
    "Abuja",
    "Port Harcourt",
    "Ibadan",
    "Enugu",
];

export const testimonials = [
    {
        name: "Adebayo Johnson",
        role: "Property Investor",
        text: "Starbright gave me complete confidence in my land purchase. The verification process was transparent and professional. I've bought 3 properties through them.",
        avatar: "AJ",
    },
    {
        name: "Chioma Okafor",
        role: "First-time Buyer",
        text: "As a first-time buyer, I was terrified of land scams. Starbright's team walked me through every document and inspection step. Truly a game changer.",
        avatar: "CO",
    },
    {
        name: "Emeka Nwosu",
        role: "Real Estate Developer",
        text: "The quality of listings and verification standards on Starbright is unmatched. It's become my go-to platform for sourcing development land in Lagos.",
        avatar: "EN",
    },
];

// Trust features now use lucide icon names instead of emojis
export const trustFeatures = [
    {
        title: "Document Verification",
        description:
            "Every listing undergoes thorough document checks — C of O, Survey, Gazette, and more.",
        iconName: "ClipboardCheck" as const,
    },
    {
        title: "Physical Inspection",
        description:
            "Our team visits every property before listing to confirm location, boundaries, and condition.",
        iconName: "SearchCheck" as const,
    },
    {
        title: "Legal Review",
        description:
            "In-house legal experts review title documents to protect you from disputes and fraud.",
        iconName: "Scale" as const,
    },
    {
        title: "Guided Purchase",
        description:
            "From first visit to final payment, we guide you through a secure, transparent purchase process.",
        iconName: "Handshake" as const,
    },
];
