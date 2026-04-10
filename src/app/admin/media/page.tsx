"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Video, FolderOpen } from "lucide-react";
import { useListings } from "@/components/providers/ListingsProvider";

export default function MediaPage() {
    const { listings, isLoading, error } = useListings();
    const assets = useMemo(
        () => [
            {
                name: "Property Images",
                type: "Image",
                size: `${listings.reduce((count, item) => count + item.images.length, 0)} files`,
                icon: ImageIcon,
            },
            {
                name: "Property Videos",
                type: "Video",
                size: `${listings.filter((item) => item.video).length} files`,
                icon: Video,
            },
            {
                name: "Listings With Media",
                type: "Folder",
                size: `${listings.filter((item) => item.media && item.media.length > 0).length} listings`,
                icon: FolderOpen,
            },
        ],
        [listings]
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Media</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Organize images and videos used across listings and marketing pages.
                </p>
            </div>

            {isLoading ? (
                <div className="premium-card p-6">
                    <p className="text-sm text-muted-foreground">Loading media summary...</p>
                </div>
            ) : error ? (
                <div className="premium-card p-6">
                    <p className="text-sm text-muted-foreground">{error}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {assets.map((asset, index) => (
                        <motion.div
                            key={asset.name}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                            className="premium-card p-5"
                        >
                            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <asset.icon size={20} />
                            </div>
                            <h3 className="font-semibold text-foreground">{asset.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{asset.type}</p>
                            <p className="text-xs text-muted-foreground mt-3">{asset.size}</p>
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="premium-card p-6">
                <h2 className="text-base font-semibold text-foreground mb-4">Upload Queue</h2>
                <div className="rounded-2xl border-2 border-dashed border-border bg-muted/20 p-8 text-center">
                    <p className="text-sm font-medium text-foreground">Media uploads are now handled when creating properties</p>
                    <p className="text-xs text-muted-foreground mt-2">
                        This page reflects media already attached to properties in the backend.
                    </p>
                </div>
            </div>
        </div>
    );
}
