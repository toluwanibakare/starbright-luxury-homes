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
import type { Category, Listing, ListingStatus } from "@/data/mockData";
import { ApiError, type ApiProperty, apiFetch, normalizeProperty } from "@/lib/api";

interface ListingInput {
    title: string;
    price: number;
    location: string;
    category: Category;
    verified: boolean;
    description: string;
    size: string;
    documentsStatus: string;
    status: ListingStatus;
    address?: string;
    propertyType?: string;
    inspectionInfo?: string;
    bedrooms?: number | null;
    bathrooms?: number | null;
    toilets?: number | null;
    imageFiles?: File[];
    videoFile?: File | null;
}

interface ListingsContextValue {
    listings: Listing[];
    publicListings: Listing[];
    isLoading: boolean;
    error: string | null;
    addListing: (input: ListingInput) => Promise<Listing>;
    deleteListing: (id: string) => Promise<void>;
    refreshListings: () => Promise<void>;
    getListingBySlug: (slug: string) => Listing | undefined;
    getListingByCode: (listingCode: string) => Listing | undefined;
}

const ListingsContext = createContext<ListingsContextValue | undefined>(undefined);

const mapFrontendStatusToBackend = (status: ListingStatus): ApiProperty["status"] => {
    switch (status) {
        case "Sold":
            return "sold";
        case "Pending":
            return "draft";
        case "Active":
        default:
            return "available";
    }
};

const parseSize = (value: string) => {
    const match = value.trim().match(/^([\d.,]+)\s*(.*)$/);
    if (!match) {
        return { sizeValue: 0, sizeUnit: "sqm" };
    }

    return {
        sizeValue: Number(match[1].replace(/,/g, "")),
        sizeUnit: match[2].trim() || "sqm",
    };
};

const createListingCode = () => `STB-${Date.now().toString().slice(-6)}`;

export function ListingsProvider({ children }: { children: ReactNode }) {
    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshListings = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await apiFetch<ApiProperty[]>("/properties");
            setListings(response.data.map(normalizeProperty));
        } catch (err) {
            const message =
                err instanceof ApiError ? err.message : "Unable to load properties right now.";
            setError(message);
            setListings([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void refreshListings();
    }, [refreshListings]);

    const addListing = useCallback(
        async (input: ListingInput) => {
            const { sizeValue, sizeUnit } = parseSize(input.size);
            const payload = {
                title: input.title,
                description: input.description,
                price: input.price,
                location: input.location,
                address: input.address?.trim() || input.location,
                category: input.category,
                property_type: input.propertyType?.trim() || input.category,
                status: mapFrontendStatusToBackend(input.status),
                verification_status: input.verified ? "Verified" : "Pending verification",
                size_value: sizeValue,
                size_unit: sizeUnit,
                listing_code: createListingCode(),
                documents_info: input.documentsStatus,
                inspection_info:
                    input.inspectionInfo?.trim() || "Inspection details available on request.",
                is_featured: false,
                bedrooms: input.bedrooms,
                bathrooms: input.bathrooms,
                toilets: input.toilets,
            };

            const created = await apiFetch<ApiProperty>("/properties", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            const createdId = created.data.id;

            if (input.imageFiles && input.imageFiles.length > 0) {
                const imageData = new FormData();
                for (const file of input.imageFiles) {
                    imageData.append("images", file);
                }

                await apiFetch(`/properties/${createdId}/images`, {
                    method: "POST",
                    body: imageData,
                });
            }

            if (input.videoFile) {
                const videoData = new FormData();
                videoData.append("video", input.videoFile);

                await apiFetch(`/properties/${createdId}/video`, {
                    method: "POST",
                    body: videoData,
                });
            }

            const refreshed = await apiFetch<ApiProperty>(`/properties/${createdId}`);
            const normalized = normalizeProperty(refreshed.data);

            setListings((current) => [normalized, ...current.filter((item) => item.id !== normalized.id)]);
            return normalized;
        },
        []
    );

    const deleteListing = useCallback(async (id: string) => {
        await apiFetch(`/properties/${id}`, {
            method: "DELETE",
        });

        setListings((current) => current.filter((listing) => listing.id !== id));
    }, []);

    const getListingBySlug = useCallback(
        (slug: string) => listings.find((listing) => listing.slug === slug),
        [listings]
    );

    const getListingByCode = useCallback(
        (listingCode: string) =>
            listings.find(
                (listing) => listing.listingId.toLowerCase() === listingCode.trim().toLowerCase()
            ),
        [listings]
    );

    const value = useMemo(
        () => ({
            listings,
            publicListings: listings.filter((listing) => listing.status === "Active"),
            isLoading,
            error,
            addListing,
            deleteListing,
            refreshListings,
            getListingBySlug,
            getListingByCode,
        }),
        [
            addListing,
            deleteListing,
            error,
            getListingByCode,
            getListingBySlug,
            isLoading,
            listings,
            refreshListings,
        ]
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
