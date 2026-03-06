"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Grid3X3, List, Trash2, Download, Search, Upload } from "lucide-react";

const mediaItems = [
    { id: "1", src: "/images/listing-1.jpg", name: "listing-1.jpg", size: "2.4 MB", property: "Luxury 4BR Duplex", date: "Mar 4, 2026" },
    { id: "2", src: "/images/listing-2.jpg", name: "listing-2.jpg", size: "1.8 MB", property: "Premium 3BR Apartment", date: "Mar 3, 2026" },
    { id: "3", src: "/images/listing-3.jpg", name: "listing-3.jpg", size: "3.1 MB", property: "Verified Plot Epe", date: "Mar 2, 2026" },
    { id: "4", src: "/images/listing-4.jpg", name: "listing-4.jpg", size: "2.7 MB", property: "Commercial Office VI", date: "Mar 1, 2026" },
    { id: "5", src: "/images/listing-5.jpg", name: "listing-5.jpg", size: "4.2 MB", property: "5BR Mansion", date: "Feb 28, 2026" },
    { id: "6", src: "/images/listing-6.jpg", name: "listing-6.jpg", size: "1.5 MB", property: "Estate Land Ajah", date: "Feb 27, 2026" },
    { id: "7", src: "/images/hero-1.jpg", name: "hero-1.jpg", size: "5.1 MB", property: "Hero Banner", date: "Feb 25, 2026" },
    { id: "8", src: "/images/hero-2.jpg", name: "hero-2.jpg", size: "4.8 MB", property: "Hero Banner", date: "Feb 25, 2026" },
];

export default function MediaPage() {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string[]>([]);

    const filtered = mediaItems.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.property.toLowerCase().includes(search.toLowerCase()));

    const toggleSelect = (id: string) => {
        setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground font-display">Media Library</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage property images and videos</p>
                </div>
                <button className="premium-btn-primary !py-2.5 !px-5 !text-xs self-start">
                    <Upload size={14} /> Upload Files
                </button>
            </div>

            {/* Toolbar */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-4">
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input type="text" placeholder="Search media..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-9 pl-9 pr-4 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button onClick={() => setView("grid")} className={`p-2 transition-colors ${view === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                            <Grid3X3 size={16} />
                        </button>
                        <button onClick={() => setView("list")} className={`p-2 transition-colors ${view === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                            <List size={16} />
                        </button>
                    </div>
                    {selected.length > 0 && (
                        <button className="premium-btn !py-2 !px-4 !text-xs text-destructive border border-destructive/20 hover:bg-destructive/10">
                            <Trash2 size={14} /> Delete ({selected.length})
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Grid view */}
            {view === "grid" ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.04 }}
                            onClick={() => toggleSelect(item.id)}
                            className={`premium-card overflow-hidden cursor-pointer group ${selected.includes(item.id) ? "ring-2 ring-primary" : ""}`}
                        >
                            <div className="aspect-square relative bg-muted">
                                <img src={item.src} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                {selected.includes(item.id) && (
                                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                        <span className="text-[10px] text-primary-foreground font-bold">✓</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{item.size} · {item.property}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="premium-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">File</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Property</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Size</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Date</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item) => (
                                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                <img src={item.src} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-sm font-medium text-foreground">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground text-sm hidden sm:table-cell">{item.property}</td>
                                    <td className="px-5 py-3 text-muted-foreground text-sm hidden md:table-cell">{item.size}</td>
                                    <td className="px-5 py-3 text-muted-foreground text-xs hidden lg:table-cell">{item.date}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Download size={15} className="text-muted-foreground" /></button>
                                            <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 size={15} className="text-destructive/70" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </div>
    );
}
