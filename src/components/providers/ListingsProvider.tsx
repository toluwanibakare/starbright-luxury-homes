"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { listings as seedListings, type Category, type Listing, type ListingStatus } from "@/data/mockData";

const STORAGE_KEY = "starbright:listings";

interface ListingInput {
    title: string;
    price: number;
    location: string;
    category: Category;
    verified: boolean;
    images: string[];
    video?: string;
    description: string;
    size: string;
    documentsStatus: string;
    status: ListingStatus;
}

interface ListingsContextValue {
    listings: Listing[];
    publicListings: Listing[];
    addListing: (input: ListingInput) => Listing;
    deleteListing: (id: string) => void;
    getListingBySlug: (slug: string) => Listing | undefined;
}

const ListingsContext = createContext<ListingsContextValue | undefined>(undefined);

const normalizeSlug = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const formatListingId = (count: number) => `STB-${String(count).padStart(3, "0")}`;

const ensureUniqueSlug = (baseSlug: string, existingListings: Listing[]) => {
    let slug = baseSlug;
    let suffix = 2;

    while (existingListings.some((listing) => listing.slug === slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
    }

    return slug;
};

const sortByCreatedAtDesc = (data: Listing[]) =>
    [...data].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

export function ListingsProvider({ children }: { children: ReactNode }) {
    const [listings, setListings] = useState<Listing[]>(() => sortByCreatedAtDesc(seedListings));

    useEffect(() => {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        try {
            const parsed = JSON.parse(saved) as Listing[];
            if (Array.isArray(parsed) && parsed.length > 0) {
                setListings(sortByCreatedAtDesc(parsed));
            }
        } catch {
            window.localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
    }, [listings]);

    const addListing = useCallback((input: ListingInput) => {
        let createdListing: Listing | undefined;

        setListings((current) => {
            const nextNumber = current.length + 1;
            const baseSlug = normalizeSlug(input.title) || `listing-${nextNumber}`;
            const listing: Listing = {
                id: crypto.randomUUID(),
                slug: ensureUniqueSlug(baseSlug, current),
                listingId: formatListingId(nextNumber),
                createdAt: new Date().toISOString(),
                ...input,
            };

            createdListing = listing;
            return sortByCreatedAtDesc([listing, ...current]);
        });

        return createdListing!;
    }, []);

    const deleteListing = useCallback((id: string) => {
        setListings((current) => current.filter((listing) => listing.id !== id));
    }, []);

    const getListingBySlug = useCallback(
        (slug: string) => listings.find((listing) => listing.slug === slug),
        [listings]
    );

    const value = useMemo(
        () => ({
            listings,
            publicListings: listings.filter((listing) => listing.status === "Active"),
            addListing,
            deleteListing,
            getListingBySlug,
        }),
        [addListing, deleteListing, getListingBySlug, listings]
    );

    return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}

export function useListings() {
    const context = useContext(ListingsContext);

    if (!context) {
        throw new Error("useListings must be used within a ListingsProvider");
    }

    return context;
}
