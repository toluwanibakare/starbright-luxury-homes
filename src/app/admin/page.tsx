"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Building2,
    CheckCircle2,
    ShoppingBag,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
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
    BarChart,
    Bar,
} from "recharts";

const stats = [
    { label: "Total Listings", value: "48", change: "+12%", up: true, icon: Building2, color: "text-primary bg-primary/10" },
    { label: "Available", value: "32", change: "+5%", up: true, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "Sold", value: "16", change: "+8%", up: true, icon: ShoppingBag, color: "text-secondary bg-secondary/10" },
    { label: "Inquiries", value: "124", change: "-3%", up: false, icon: MessageSquare, color: "text-blue-600 bg-blue-50" },
];

const recentListings = [
    { title: "Luxury 4BR Duplex — Lekki", location: "Lekki Phase 1", price: "₦185,000,000", status: "Active", date: "Mar 4, 2026" },
    { title: "Premium 3BR Apartment — Ikoyi", location: "Ikoyi", price: "₦120,000,000", status: "Active", date: "Mar 3, 2026" },
    { title: "Verified Plot — Epe", location: "Epe", price: "₦15,000,000", status: "Pending", date: "Mar 2, 2026" },
    { title: "Commercial Office — VI", location: "Victoria Island", price: "₦350,000,000", status: "Active", date: "Mar 1, 2026" },
    { title: "5BR Mansion — Banana Island", location: "Banana Island", price: "₦950,000,000", status: "Sold", date: "Feb 28, 2026" },
];

const recentInquiries = [
    { name: "Adebayo J.", property: "Luxury 4BR Duplex", time: "2 hours ago" },
    { name: "Chioma O.", property: "Verified Plot — Epe", time: "5 hours ago" },
    { name: "Emeka N.", property: "Commercial Office — VI", time: "1 day ago" },
];

const analyticsTrend = [
    { month: "Oct", views: 340, inquiries: 45, deals: 8 },
    { month: "Nov", views: 420, inquiries: 52, deals: 10 },
    { month: "Dec", views: 380, inquiries: 48, deals: 9 },
    { month: "Jan", views: 510, inquiries: 67, deals: 13 },
    { month: "Feb", views: 480, inquiries: 61, deals: 12 },
    { month: "Mar", views: 560, inquiries: 74, deals: 16 },
];

const leadSourceData = [
    { source: "Website", leads: 46 },
    { source: "WhatsApp", leads: 31 },
    { source: "Referrals", leads: 18 },
    { source: "Instagram", leads: 15 },
    { source: "Walk-ins", leads: 9 },
];

const propertyTypeData = [
    { name: "Houses", value: 24, color: "#0ea5e9" },
    { name: "Land", value: 14, color: "#10b981" },
    { name: "Commercial", value: 10, color: "#f59e0b" },
];

const statusColors: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Sold: "bg-primary/10 text-primary",
};

export default function AdminDashboard() {
    const latestMonth = analyticsTrend[analyticsTrend.length - 1];
    const inquiryRate = ((latestMonth.inquiries / latestMonth.views) * 100).toFixed(1);
    const closeRate = ((latestMonth.deals / latestMonth.inquiries) * 100).toFixed(1);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Welcome back. Here&apos;s an overview of your properties.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="premium-card p-5"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                                <p className="text-3xl font-bold text-foreground mt-2 font-display">{stat.value}</p>
                            </div>
                            <div className={`p-2.5 rounded-xl ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-3">
                            {stat.up ? (
                                <ArrowUpRight size={14} className="text-emerald-600" />
                            ) : (
                                <ArrowDownRight size={14} className="text-destructive" />
                            )}
                            <span className={`text-xs font-semibold ${stat.up ? "text-emerald-600" : "text-destructive"}`}>
                                {stat.change}
                            </span>
                            <span className="text-xs text-muted-foreground">vs last month</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="premium-card p-5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Inquiry Rate</p>
                    <p className="text-2xl font-bold text-foreground mt-2 font-display">{inquiryRate}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Inquiries from property views ({latestMonth.month})</p>
                </div>
                <div className="premium-card p-5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Close Rate</p>
                    <p className="text-2xl font-bold text-foreground mt-2 font-display">{closeRate}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Deals closed from inquiries ({latestMonth.month})</p>
                </div>
                <div className="premium-card p-5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Top Lead Source</p>
                    <p className="text-2xl font-bold text-foreground mt-2 font-display">{leadSourceData[0].source}</p>
                    <p className="text-xs text-muted-foreground mt-1">{leadSourceData[0].leads} qualified leads this month</p>
                </div>
                <div className="premium-card p-5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Best Segment</p>
                    <p className="text-2xl font-bold text-foreground mt-2 font-display">{propertyTypeData[0].name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{propertyTypeData[0].value} active listings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="xl:col-span-2 premium-card p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">Performance Trend</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">Views and inquiries over the last 6 months</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                            <TrendingUp size={14} />
                            +18%
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
                                <Area type="monotone" dataKey="inquiries" stroke="#10b981" strokeWidth={2} fill="url(#inquiriesFill)" name="Inquiries" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="premium-card p-6"
                >
                    <h3 className="text-sm font-semibold text-foreground mb-4">Listing Mix</h3>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={propertyTypeData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={86} paddingAngle={3}>
                                    {propertyTypeData.map((entry) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38 }}
                    className="lg:col-span-2 premium-card p-6"
                >
                    <div className="mb-5">
                        <h3 className="text-sm font-semibold text-foreground">Lead Sources</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Where inquiries are coming from</p>
                    </div>
                    <div className="h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={leadSourceData} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                                <XAxis dataKey="source" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="leads" radius={[6, 6, 0, 0]} fill="#f59e0b" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="premium-card p-6"
                >
                    <h3 className="text-sm font-semibold text-foreground mb-4">Recent Inquiries</h3>
                    <div className="space-y-4">
                        {recentInquiries.map((inq) => (
                            <div key={inq.name} className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
                                    {inq.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">{inq.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{inq.property}</p>
                                    <p className="text-[10px] text-muted-foreground/70 mt-0.5">{inq.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Listings Table */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="premium-card overflow-hidden"
            >
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Recent Listings</h3>
                    <a href="/admin/properties" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                        View All <Eye size={12} />
                    </a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Property</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Location</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentListings.map((listing) => (
                                <tr key={listing.title} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{listing.title}</td>
                                    <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{listing.location}</td>
                                    <td className="px-6 py-4 font-semibold text-foreground">{listing.price}</td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusColors[listing.status]}`}>
                                            {listing.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-xs hidden lg:table-cell">{listing.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
