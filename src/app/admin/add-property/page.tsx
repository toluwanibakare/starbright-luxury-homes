"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Video, CheckCircle2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useListings } from "@/components/providers/ListingsProvider";
import type { Category, ListingStatus } from "@/data/mockData";
import { ApiError, getListingFallbackImage } from "@/lib/api";

const categories = ["Land", "House", "Commercial"];
const locations = [
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

export default function AddPropertyPage() {
    const router = useRouter();
    const { addListing } = useListings();
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: "",
        category: "",
        location: "",
        address: "",
        propertyType: "",
        price: "",
        size: "",
        description: "",
        documentsStatus: "",
        inspectionInfo: "",
        bedrooms: "",
        bathrooms: "",
        toilets: "",
        verified: true,
        status: "Active" as ListingStatus,
    });

    const imagePreviews = useMemo(
        () => imageFiles.map((file) => URL.createObjectURL(file)),
        [imageFiles]
    );

    const updateForm = (field: string, value: string | boolean) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const removeImage = (index: number) => {
        setImageFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
    };

    const handleSubmit = async (status: ListingStatus) => {
        if (
            !form.title ||
            !form.category ||
            !form.location ||
            !form.price ||
            !form.size ||
            !form.description ||
            !form.documentsStatus
        ) {
            setFeedback("Please complete all required property fields before continuing.");
            return;
        }

        setIsSubmitting(true);
        setFeedback(null);

        try {
            await addListing({
                title: form.title,
                category: form.category as Category,
                location: form.location,
                address: form.address || form.location,
                propertyType: form.propertyType || form.category,
                price: Number(form.price),
                size: form.size,
                description: form.description,
                documentsStatus: form.documentsStatus,
                verified: form.verified,
                status,
                inspectionInfo: form.inspectionInfo,
                bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
                bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
                toilets: form.toilets ? Number(form.toilets) : null,
                imageFiles,
                videoFile,
            });

            router.push("/admin/properties");
        } catch (error) {
            setFeedback(
                error instanceof ApiError
                    ? error.message
                    : "Unable to create the property right now."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex items-start gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    aria-label="Go back"
                    className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors"
                >
                    <ArrowLeft size={16} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-foreground font-display">Add Property</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Create a new property listing and upload its media to the backend.
                    </p>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="premium-card p-6 space-y-5">
                    <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">Property Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Luxury 4 Bedroom Duplex in Lekki"
                                value={form.title}
                                onChange={(event) => updateForm("title", event.target.value)}
                                className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Category</label>
                                <select
                                    value={form.category}
                                    onChange={(event) => updateForm("category", event.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category.toLowerCase()}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Location</label>
                                <select
                                    value={form.location}
                                    onChange={(event) => updateForm("location", event.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                >
                                    <option value="">Select location</option>
                                    {locations.map((location) => (
                                        <option key={location} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Address</label>
                                <input
                                    type="text"
                                    placeholder="Full property address"
                                    value={form.address}
                                    onChange={(event) => updateForm("address", event.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Property Type</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Detached duplex, serviced plot"
                                    value={form.propertyType}
                                    onChange={(event) => updateForm("propertyType", event.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Price (NGN)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 185000000"
                                    value={form.price}
                                    onChange={(event) => updateForm("price", event.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Property Size</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 450 sqm"
                                    value={form.size}
                                    onChange={(event) => updateForm("size", event.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Bedrooms</label>
                                <input
                                    type="number"
                                    value={form.bedrooms}
                                    onChange={(event) => updateForm("bedrooms", event.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Bathrooms</label>
                                <input
                                    type="number"
                                    value={form.bathrooms}
                                    onChange={(event) => updateForm("bathrooms", event.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Toilets</label>
                                <input
                                    type="number"
                                    value={form.toilets}
                                    onChange={(event) => updateForm("toilets", event.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">Description</label>
                            <textarea
                                rows={5}
                                placeholder="Describe the property in detail..."
                                value={form.description}
                                onChange={(event) => updateForm("description", event.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="premium-card p-6 space-y-5">
                    <h3 className="text-sm font-semibold text-foreground">Verification & Documents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">Document Status</label>
                            <input
                                type="text"
                                placeholder="e.g. C of O verified"
                                value={form.documentsStatus}
                                onChange={(event) => updateForm("documentsStatus", event.target.value)}
                                className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">Verification Status</label>
                            <div className="flex items-center gap-3 h-10">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.verified}
                                        onChange={(event) => updateForm("verified", event.target.checked)}
                                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                                    />
                                    <span className="text-sm text-foreground flex items-center gap-1">
                                        <CheckCircle2 size={14} className="text-emerald-600" />
                                        Verified
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Inspection Information</label>
                        <textarea
                            rows={3}
                            placeholder="What should a buyer know about inspection and access?"
                            value={form.inspectionInfo}
                            onChange={(event) => updateForm("inspectionInfo", event.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Listing Status</label>
                        <select
                            value={form.status}
                            onChange={(event) => updateForm("status", event.target.value as ListingStatus)}
                            className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Sold">Sold</option>
                        </select>
                    </div>
                </div>

                <div className="premium-card p-6 space-y-5">
                    <h3 className="text-sm font-semibold text-foreground">Media</h3>

                    <div>
                        <label className="block text-xs font-medium text-foreground mb-2">Property Images</label>
                        <label className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/20 block cursor-pointer">
                            <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm font-medium text-foreground">Choose property images</p>
                            <p className="text-xs text-muted-foreground mt-1">You can upload multiple images.</p>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(event) =>
                                    setImageFiles(Array.from(event.target.files ?? []))
                                }
                            />
                        </label>

                        {imagePreviews.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                                {imagePreviews.map((img, index) => (
                                    <div key={img} className="relative group rounded-lg overflow-hidden bg-muted aspect-square">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-card shadow-md"
                                            >
                                                <X size={14} className="text-destructive" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : form.category ? (
                            <div className="mt-4 rounded-lg overflow-hidden bg-muted aspect-video max-w-sm">
                                <img
                                    src={getListingFallbackImage(form.category as Category)}
                                    alt="Fallback preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-foreground mb-2">Property Video</label>
                        <label className="rounded-xl border border-border bg-muted/20 p-4 block cursor-pointer">
                            <div className="flex items-center gap-3 mb-3">
                                <Video size={20} className="text-muted-foreground" />
                                <p className="text-sm text-foreground font-medium">
                                    {videoFile ? videoFile.name : "Choose an MP4/MOV video file"}
                                </p>
                            </div>
                            <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(event) => setVideoFile(event.target.files?.[0] ?? null)}
                            />
                        </label>
                    </div>
                </div>

                {feedback ? (
                    <p className="text-sm text-muted-foreground">{feedback}</p>
                ) : null}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button
                        className="premium-btn-primary !py-3 !px-8 disabled:opacity-60"
                        onClick={() => void handleSubmit(form.status)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Publish Property"}
                    </button>
                    <button
                        className="premium-btn-outline !py-3 !px-8 disabled:opacity-60"
                        onClick={() => void handleSubmit("Pending")}
                        disabled={isSubmitting}
                    >
                        Save as Draft
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
