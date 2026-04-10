"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Eye, Pencil, Trash2 } from "lucide-react";
import { useListings } from "@/components/providers/ListingsProvider";
import { formatPrice } from "@/data/mockData";

const statusOptions = ["All", "Active", "Pending", "Sold"];
const categoryOptions = ["All", "land", "house", "commercial"];

const statusMap: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Sold: "bg-primary/10 text-primary",
};

export default function PropertiesPage() {
    const router = useRouter();
    const { listings, deleteListing } = useListings();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");

    const filtered = listings.filter((property) => {
        const matchSearch =
            property.title.toLowerCase().includes(search.toLowerCase()) ||
            property.location.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "All" || property.category === category;
        const matchStatus = status === "All" || property.status === status;
        return matchSearch && matchCategory && matchStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground font-display">Properties</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage every property users can see and every listing still under review.
                    </p>
                </div>
                <Link href="/admin/add-property" className="premium-btn-primary !py-2.5 !px-5 !text-xs self-start">
                    + Add Property
                </Link>
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-4">
                <div className="flex flex-col xl:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search properties..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xl:w-[360px]">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all capitalize"
                        >
                            {categoryOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option === "All" ? "All Categories" : option}
                                </option>
                            ))}
                        </select>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                            {statusOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option === "All" ? "All Status" : option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[860px]">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Property</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((property) => (
                                <tr key={property.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
                                                <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-foreground truncate max-w-[220px]">{property.title}</p>
                                                <p className="text-xs text-muted-foreground capitalize">{property.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground">{property.location}</td>
                                    <td className="px-5 py-3 font-semibold text-foreground whitespace-nowrap">{formatPrice(property.price)}</td>
                                    <td className="px-5 py-3">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusMap[property.status]}`}>
                                            {property.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground text-xs">
                                        {new Date(property.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                className="p-2 rounded-lg hover:bg-muted transition-colors"
                                                title="View"
                                                onClick={() => router.push(`/listings/${property.slug}`)}
                                            >
                                                <Eye size={15} className="text-muted-foreground" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Edit">
                                                <Pencil size={15} className="text-muted-foreground" />
                                            </button>
                                            <button
                                                className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                                                title="Delete"
                                                onClick={() => {
                                                    if (window.confirm(`Delete "${property.title}"?`)) {
                                                        deleteListing(property.id);
                                                    }
                                                }}
                                            >
                                                <Trash2 size={15} className="text-destructive/70" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                        Showing {filtered.length} of {listings.length} properties
                    </p>
                    <div className="text-xs text-muted-foreground">
                        Optimized for desktop and mobile scrolling
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
