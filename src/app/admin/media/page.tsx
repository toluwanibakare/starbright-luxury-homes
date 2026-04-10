"use client";

import { motion } from "framer-motion";
import { ImageIcon, Video, FolderOpen } from "lucide-react";

const assets = [
    { name: "Hero Banner", type: "Image", size: "2.4 MB", icon: ImageIcon },
    { name: "Lekki Duplex Tour", type: "Video", size: "14.2 MB", icon: Video },
    { name: "Brand Logo", type: "Image", size: "520 KB", icon: ImageIcon },
    { name: "Listing Gallery Pack", type: "Folder", size: "8 files", icon: FolderOpen },
];

export default function MediaPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Media</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Organize images and videos used across listings and marketing pages.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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

            <div className="premium-card p-6">
                <h2 className="text-base font-semibold text-foreground mb-4">Upload Queue</h2>
                <div className="rounded-2xl border-2 border-dashed border-border bg-muted/20 p-8 text-center">
                    <p className="text-sm font-medium text-foreground">Drag media here when uploads are connected</p>
                    <p className="text-xs text-muted-foreground mt-2">
                        This page is responsive and ready for a future upload integration.
                    </p>
                </div>
            </div>
        </div>
    );
}
