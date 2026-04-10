"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2,
    CheckCircle2,
    ShoppingBag,
    MonitorSmartphone,
    TrendingUp,
    ArrowUpRight,
    Eye,
} from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { useListings } from "@/components/providers/ListingsProvider";
import { formatPrice } from "@/data/mockData";
import { ApiError, type ApiInquiry, apiFetch } from "@/lib/api";

const analyticsTrend = [
    { month: "Oct", views: 340, inquiries: 45 },
    { month: "Nov", views: 420, inquiries: 52 },
    { month: "Dec", views: 380, inquiries: 48 },
    { month: "Jan", views: 510, inquiries: 67 },
    { month: "Feb", views: 480, inquiries: 61 },
    { month: "Mar", views: 560, inquiries: 74 },
];

const statusColors: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Sold: "bg-primary/10 text-primary",
};

export default function AdminDashboard() {
    const { listings, publicListings, isLoading, error } = useListings();
    const [inquiries, setInquiries] = useState<ApiInquiry[]>([]);
    const [inquiryError, setInquiryError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadInquiries = async () => {
            try {
                const response = await apiFetch<ApiInquiry[]>("/inquiries");
                if (mounted) {
                    setInquiries(response.data);
                }
            } catch (err) {
                if (mounted) {
                    setInquiryError(
                        err instanceof ApiError ? err.message : "Unable to load enquiries."
                    );
                }
            }
        };

        void loadInquiries();

        return () => {
            mounted = false;
        };
    }, []);

    const activeCount = listings.filter((listing) => listing.status === "Active").length;
    const soldCount = listings.filter((listing) => listing.status === "Sold").length;
    const pendingCount = listings.filter((listing) => listing.status === "Pending").length;
    const latestMonth = analyticsTrend[analyticsTrend.length - 1];
    const inquiryRate = ((latestMonth.inquiries / latestMonth.views) * 100).toFixed(1);

    const stats = [
        {
            label: "Total Listings",
            value: String(listings.length),
            note: "all admin records",
            icon: Building2,
            color: "text-primary bg-primary/10",
        },
        {
            label: "Live on Website",
            value: String(publicListings.length),
            note: "visible to users",
            icon: MonitorSmartphone,
            color: "text-sky-600 bg-sky-50",
        },
        {
            label: "Available",
            value: String(activeCount),
            note: `${pendingCount} pending`,
            icon: CheckCircle2,
            color: "text-emerald-600 bg-emerald-50",
        },
        {
            label: "Enquiries",
            value: String(inquiries.length),
            note: `${inquiries.filter((item) => !item.is_read).length} unread`,
            icon: ShoppingBag,
            color: "text-secondary bg-secondary/10",
        },
    ];

    const listingMix = useMemo(
        () => [
            {
                name: "Houses",
                value: listings.filter((listing) => listing.category === "house").length,
                color: "#0ea5e9",
            },
            {
                name: "Land",
                value: listings.filter((listing) => listing.category === "land").length,
                color: "#10b981",
            },
            {
                name: "Commercial",
                value: listings.filter((listing) => listing.category === "commercial").length,
                color: "#f59e0b",
            },
        ],
        [listings]
    );

    const recentListings = listings.slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground font-display">Dashboard</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Track what is live on the public site and what still needs review.
                    </p>
                </div>
                <Link href="/admin/add-property" className="premium-btn-primary !py-2.5 !px-5 !text-xs self-start">
                    Add New Property
                </Link>
            </div>

            {error ? (
                <div className="premium-card p-4">
                    <p className="text-sm text-muted-foreground">{error}</p>
                </div>
            ) : null}
            {inquiryError ? (
                <div className="premium-card p-4">
                    <p className="text-sm text-muted-foreground">{inquiryError}</p>
                </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="premium-card p-5"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    {stat.label}
                                </p>
                                <p className="text-3xl font-bold text-foreground mt-2 font-display">
                                    {isLoading && stat.label !== "Enquiries" ? "..." : stat.value}
                                </p>
                                <div className="flex items-center gap-1 mt-3 text-emerald-600">
                                    <ArrowUpRight size={14} />
                                    <span className="text-xs font-semibold">{stat.note}</span>
                                </div>
                            </div>
                            <div className={`p-2.5 rounded-xl ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 premium-card p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">Performance Trend</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Website traffic and enquiries
                            </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                            <TrendingUp size={14} />
                            {inquiryRate}% inquiry rate
                        </div>
                    </div>

                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsTrend} margin={{ top: 8, right: 12, left: -14, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.03} />
                                    </linearGradient>
                                    <linearGradient id="inquiriesFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.28} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.03} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: "12px" }} />
                                <Area type="monotone" dataKey="views" stroke="#0ea5e9" strokeWidth={2} fill="url(#viewsFill)" name="Views" />
                                <Area type="monotone" dataKey="inquiries" stroke="#10b981" strokeWidth={2} fill="url(#inquiriesFill)" name="Enquiries" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                    className="premium-card p-6"
                >
                    <h3 className="text-sm font-semibold text-foreground mb-4">Listing Mix</h3>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={listingMix} dataKey="value" nameKey="name" innerRadius={56} outerRadius={86} paddingAngle={3}>
                                    {listingMix.map((entry) => (
                                        <Cell key={entry.name} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: "12px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="premium-card overflow-hidden"
            >
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Recent Listings</h3>
                    <Link href="/admin/properties" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                        View All <Eye size={12} />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[700px]">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Property</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentListings.map((listing) => (
                                <tr key={listing.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{listing.title}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{listing.location}</td>
                                    <td className="px-6 py-4 font-semibold text-foreground">{formatPrice(listing.price)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusColors[listing.status]}`}>
                                            {listing.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-xs">
                                        {new Date(listing.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
