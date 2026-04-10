"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Video, CheckCircle2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useListings } from "@/components/providers/ListingsProvider";
import type { Category, ListingStatus } from "@/data/mockData";

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
    const [images, setImages] = useState<string[]>(["/images/listing-1.jpg", "/images/listing-2.jpg"]);
    const [videoUrl, setVideoUrl] = useState("");
    const [form, setForm] = useState({
        title: "",
        category: "",
        location: "",
        price: "",
        size: "",
        description: "",
        documentsStatus: "",
        verified: true,
        status: "Active" as ListingStatus,
    });

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const updateForm = (field: string, value: string | boolean) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSubmit = (status: ListingStatus) => {
        if (
            !form.title ||
            !form.category ||
            !form.location ||
            !form.price ||
            !form.size ||
            !form.description ||
            !form.documentsStatus
        ) {
            window.alert("Please complete all required property fields before continuing.");
            return;
        }

        addListing({
            title: form.title,
            category: form.category as Category,
            location: form.location,
            price: Number(form.price),
            size: form.size,
            description: form.description,
            documentsStatus: form.documentsStatus,
            verified: form.verified,
            images: images.length > 0 ? images : ["/images/listing-1.jpg"],
            video: videoUrl || undefined,
            status,
        });

        router.push("/admin/properties");
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
                        Create a new property listing for the public site or save it for later review.
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
                                onChange={(e) => updateForm("title", e.target.value)}
                                className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Category</label>
                                <select
                                    value={form.category}
                                    onChange={(e) => updateForm("category", e.target.value)}
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
                                    onChange={(e) => updateForm("location", e.target.value)}
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
                                <label className="block text-xs font-medium text-foreground mb-1.5">Price (NGN)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 185000000"
                                    value={form.price}
                                    onChange={(e) => updateForm("price", e.target.value)}
                                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Property Size</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 450 sqm"
                                    value={form.size}
                                    onChange={(e) => updateForm("size", e.target.value)}
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
                                onChange={(e) => updateForm("description", e.target.value)}
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
                                onChange={(e) => updateForm("documentsStatus", e.target.value)}
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
                                        onChange={(e) => updateForm("verified", e.target.checked)}
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
                        <label className="block text-xs font-medium text-foreground mb-1.5">Listing Status</label>
                        <select
                            value={form.status}
                            onChange={(e) => updateForm("status", e.target.value as ListingStatus)}
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
                        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/20">
                            <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm font-medium text-foreground">Image uploads can be connected here later</p>
                            <p className="text-xs text-muted-foreground mt-1">For now you can manage the placeholder gallery below.</p>
                        </div>

                        {images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                                {images.map((img, i) => (
                                    <div key={img + i} className="relative group rounded-lg overflow-hidden bg-muted aspect-square">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                                            <button
                                                onClick={() => removeImage(i)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-card shadow-md"
                                            >
                                                <X size={14} className="text-destructive" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {videoUrl ? (
                                    <div className="rounded-lg overflow-hidden bg-black aspect-square">
                                        <video src={videoUrl} controls className="w-full h-full object-cover" />
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-foreground mb-2">Property Video URL</label>
                        <div className="rounded-xl border border-border bg-muted/20 p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <Video size={20} className="text-muted-foreground" />
                                <p className="text-sm text-foreground font-medium">Paste a hosted MP4/MOV URL</p>
                            </div>
                            <input
                                type="url"
                                placeholder="https://example.com/property-tour.mp4"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="w-full h-10 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button className="premium-btn-primary !py-3 !px-8" onClick={() => handleSubmit(form.status)}>
                        Publish Property
                    </button>
                    <button className="premium-btn-outline !py-3 !px-8" onClick={() => handleSubmit("Pending")}>
                        Save as Draft
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
