import type { Listing } from "@/data/mockData";

export const apiConfig = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://starbrightproperties.com.ng",
    baseUrl:
        process.env.NEXT_PUBLIC_API_URL ?? "https://starbrightproperties.com.ng/api/v1",
};

const originFromBaseUrl = (() => {
    try {
        return new URL(apiConfig.baseUrl).origin;
    } catch {
        return apiConfig.siteUrl;
    }
})();

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta: Record<string, unknown> | null;
    error?: {
        statusCode?: number;
        details?: unknown;
    };
}

export interface ApiPropertyMedia {
    id: number;
    file_type: "image" | "video";
    file_path: string;
    file_name: string;
    mime_type: string;
    created_at: string;
}

export interface ApiProperty {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number | string;
    location: string;
    address: string;
    category: Listing["category"];
    property_type: string;
    status: "available" | "sold" | "featured" | "hidden" | "draft";
    is_featured: number | boolean;
    verification_status: string;
    bedrooms: number | null;
    bathrooms: number | null;
    toilets: number | null;
    size_value: number | string;
    size_unit: string;
    listing_code: string;
    documents_info: string;
    inspection_info: string;
    created_at: string;
    updated_at: string;
    media: ApiPropertyMedia[];
}

export interface ApiComment {
    id: number;
    name: string;
    email: string;
    message: string;
    property_id: number | null;
    page_type: string;
    status: "pending" | "approved" | "rejected";
    created_at: string;
    updated_at: string;
}

export interface ApiInquiry {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    source: string;
    property_id: number | null;
    is_read: number;
    created_at: string;
    updated_at: string;
}

export interface ApiConversation {
    id: number;
    name: string;
    email: string;
    status: "active" | "closed" | "expired" | "dormant";
    last_message_at: string;
    started_at: string;
    closed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface ApiChatMessage {
    id: number;
    conversation_id: number;
    sender_type: "user" | "admin";
    message: string;
    is_read: number;
    created_at: string;
}

export class ApiError extends Error {
    status: number;
    details: unknown;

    constructor(message: string, status: number, details?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}

export const buildApiUrl = (path: string) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${apiConfig.baseUrl}${normalizedPath}`;
};

export const buildAssetUrl = (path: string | null | undefined) => {
    if (!path) {
        return "";
    }

    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    return `${originFromBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

const parseJsonSafely = async <T>(response: Response): Promise<T | null> => {
    const text = await response.text();
    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text) as T;
    } catch {
        return null;
    }
};

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(buildApiUrl(path), {
        ...init,
        headers: {
            Accept: "application/json",
            ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
            ...(init?.headers ?? {}),
        },
        cache: "no-store",
    });

    const payload = await parseJsonSafely<ApiResponse<T>>(response);

    if (!response.ok || !payload?.success) {
        throw new ApiError(
            payload?.message ?? `Request failed with status ${response.status}.`,
            response.status,
            payload?.error?.details ?? payload?.meta
        );
    }

    return payload;
}

const normalizeSize = (value: number | string, unit: string) => {
    const numeric = Number(value);
    const formatted = Number.isFinite(numeric)
        ? new Intl.NumberFormat("en-NG", {
              maximumFractionDigits: Number.isInteger(numeric) ? 0 : 2,
          }).format(numeric)
        : String(value);

    return `${formatted} ${unit}`.trim();
};

const normalizeListingStatus = (status: ApiProperty["status"]): Listing["status"] => {
    switch (status) {
        case "sold":
            return "Sold";
        case "draft":
        case "hidden":
            return "Pending";
        case "available":
        case "featured":
        default:
            return "Active";
    }
};

const isVerified = (verificationStatus: string) =>
    !/(pending|unverified|not verified|review)/i.test(verificationStatus);

const fallbackImageByCategory: Record<Listing["category"], string> = {
    land: "/images/listing-3.jpg",
    house: "/images/listing-1.jpg",
    commercial: "/images/listing-4.jpg",
};

export const getListingFallbackImage = (category: Listing["category"]) =>
    fallbackImageByCategory[category];

export const normalizeProperty = (property: ApiProperty): Listing => {
    const media = Array.isArray(property.media) ? property.media : [];
    const images = media
        .filter((item) => item.file_type === "image")
        .map((item) => buildAssetUrl(item.file_path));
    const video = media.find((item) => item.file_type === "video");

    return {
        id: String(property.id),
        slug: property.slug,
        title: property.title,
        price: Number(property.price),
        location: property.location,
        category: property.category,
        verified: isVerified(property.verification_status),
        images: images.length > 0 ? images : [getListingFallbackImage(property.category)],
        video: video ? buildAssetUrl(video.file_path) : undefined,
        description: property.description,
        size: normalizeSize(property.size_value, property.size_unit),
        documentsStatus: property.documents_info,
        listingId: property.listing_code,
        status: normalizeListingStatus(property.status),
        createdAt: property.created_at,
        address: property.address,
        propertyType: property.property_type,
        backendStatus: property.status,
        isFeatured: Boolean(property.is_featured),
        verificationStatus: property.verification_status,
        inspectionInfo: property.inspection_info,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        toilets: property.toilets,
        media,
    };
};
