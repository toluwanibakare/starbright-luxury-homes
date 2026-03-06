"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon, Video, CheckCircle2 } from "lucide-react";

const categories = ["Land", "House", "Commercial"];
const locations = ["Lekki Phase 1, Lagos", "Ikoyi, Lagos", "Victoria Island, Lagos", "Ajah, Lagos", "Epe, Lagos", "Banana Island, Lagos", "Abuja", "Port Harcourt", "Ibadan", "Enugu"];

export default function AddPropertyPage() {
    const [images, setImages] = useState<string[]>(["/images/listing-1.jpg", "/images/listing-2.jpg"]);
    const [uploading, setUploading] = useState(false);

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Add Property</h1>
                <p className="text-sm text-muted-foreground mt-1">Create a new property listing</p>
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Basic Info */}
                <div className="premium-card p-6 space-y-5">
                    <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">Property Title</label>
                            <input type="text" placeholder="e.g. Luxury 4 Bedroom Duplex in Lekki" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Category</label>
                                <select className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                                    <option value="">Select category</option>
                                    {categories.map((c) => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Location</label>
                                <select className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                                    <option value="">Select location</option>
                                    {locations.map((l) => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Price (₦)</label>
                                <input type="number" placeholder="e.g. 185000000" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-foreground mb-1.5">Property Size</label>
                                <input type="text" placeholder="e.g. 450 sqm" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">Description</label>
                            <textarea rows={5} placeholder="Describe the property in detail..." className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                        </div>
                    </div>
                </div>

                {/* Verification */}
                <div className="premium-card p-6 space-y-5">
                    <h3 className="text-sm font-semibold text-foreground">Verification & Documents</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">Document Status</label>
                            <input type="text" placeholder="e.g. C of O verified" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">Verification Status</label>
                            <div className="flex items-center gap-3 h-10">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20" />
                                    <span className="text-sm text-foreground flex items-center gap-1">
                                        <CheckCircle2 size={14} className="text-emerald-600" />
                                        Verified
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Property Features</label>
                        <textarea rows={3} placeholder="Swimming pool, BQ, 24/7 security, fitted kitchen..." className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                    </div>
                </div>

                {/* Media */}
                <div className="premium-card p-6 space-y-5">
                    <h3 className="text-sm font-semibold text-foreground">Media</h3>

                    {/* Image upload area */}
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-2">Property Images</label>
                        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer bg-muted/20">
                            <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm font-medium text-foreground">Drop images here or click to upload</p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 10MB</p>
                        </div>

                        {/* Preview */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                                {images.map((img, i) => (
                                    <div key={i} className="relative group rounded-lg overflow-hidden bg-muted aspect-square">
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
                            </div>
                        )}
                    </div>

                    {/* Video upload */}
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-2">Property Video</label>
                        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/40 transition-colors cursor-pointer bg-muted/20">
                            <Video size={28} className="mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm font-medium text-foreground">Upload video tour</p>
                            <p className="text-xs text-muted-foreground mt-1">MP4, MOV up to 100MB</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                    <button className="premium-btn-primary !py-3 !px-8">Publish Property</button>
                    <button className="premium-btn-outline !py-3 !px-8">Save as Draft</button>
                </div>
            </motion.div>
        </div>
    );
}
