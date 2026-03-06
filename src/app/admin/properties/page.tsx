"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { listings, formatPrice, type Listing } from "@/data/mockData";

const statusOptions = ["All", "Active", "Pending", "Sold"];
const categoryOptions = ["All", "land", "house", "commercial"];

const statusMap: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Sold: "bg-primary/10 text-primary",
};

// Extend mock data with status
const propertiesData = listings.map((l, i) => ({
    ...l,
    status: i === 4 ? "Sold" : i === 2 ? "Pending" : "Active",
    dateAdded: `Mar ${6 - i}, 2026`,
}));

export default function PropertiesPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");

    const filtered = propertiesData.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === "All" || p.category === category;
        const matchStatus = status === "All" || p.status === status;
        return matchSearch && matchCat && matchStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground font-display">Properties</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage all property listings</p>
                </div>
                <Link href="/admin/add-property" className="premium-btn-primary !py-2.5 !px-5 !text-xs self-start">
                    + Add Property
                </Link>
            </div>

            {/* Filters */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search properties..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-9 pl-9 pr-4 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="h-9 px-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all capitalize"
                        >
                            {categoryOptions.map((c) => (
                                <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
                            ))}
                        </select>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="h-9 px-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                            {statusOptions.map((s) => (
                                <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Table */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Property</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Location</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Status</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Date</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p) => (
                                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
                                                <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-foreground truncate max-w-[200px]">{p.title}</p>
                                                <p className="text-xs text-muted-foreground capitalize">{p.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground hidden lg:table-cell">{p.location}</td>
                                    <td className="px-5 py-3 font-semibold text-foreground whitespace-nowrap">{formatPrice(p.price)}</td>
                                    <td className="px-5 py-3 hidden sm:table-cell">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusMap[p.status]}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground text-xs hidden md:table-cell">{p.dateAdded}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="View">
                                                <Eye size={15} className="text-muted-foreground" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Edit">
                                                <Pencil size={15} className="text-muted-foreground" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Delete">
                                                <Trash2 size={15} className="text-destructive/70" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">Showing {filtered.length} of {propertiesData.length} properties</p>
                    <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><ChevronLeft size={16} className="text-muted-foreground" /></button>
                        <button className="w-8 h-8 rounded-md text-xs font-semibold bg-primary text-primary-foreground">1</button>
                        <button className="w-8 h-8 rounded-md text-xs font-medium text-muted-foreground hover:bg-muted transition-colors">2</button>
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><ChevronRight size={16} className="text-muted-foreground" /></button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
