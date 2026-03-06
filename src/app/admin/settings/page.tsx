"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Phone, User, Shield } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage website and account settings</p>
            </div>

            {/* Website Details */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-6 space-y-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary"><Globe size={18} /></div>
                    <h3 className="text-sm font-semibold text-foreground">Website Details</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Website Name</label>
                        <input type="text" defaultValue="Starbright Real Estate & Properties" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Website URL</label>
                        <input type="text" defaultValue="https://starbrightluxuryhomes.com" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Meta Description</label>
                        <textarea rows={3} defaultValue="Discover verified land, luxury homes, and commercial properties across Nigeria. Buy and invest with confidence through document-checked, inspection-backed listings." className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                    </div>
                </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="premium-card p-6 space-y-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600"><Phone size={18} /></div>
                    <h3 className="text-sm font-semibold text-foreground">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Phone Number</label>
                        <input type="tel" defaultValue="+234 800 000 0000" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">WhatsApp Number</label>
                        <input type="tel" defaultValue="+234 800 000 0000" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-foreground mb-1.5">Email Address</label>
                        <input type="email" defaultValue="info@starbrightproperties.com" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-foreground mb-1.5">Office Address</label>
                        <input type="text" defaultValue="Lagos, Nigeria" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                </div>
            </motion.div>

            {/* Admin Account */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="premium-card p-6 space-y-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10 text-secondary"><User size={18} /></div>
                    <h3 className="text-sm font-semibold text-foreground">Admin Account</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Admin Name</label>
                        <input type="text" defaultValue="Starbright Admin" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Admin Email</label>
                        <input type="email" defaultValue="admin@starbrightproperties.com" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                </div>
            </motion.div>

            {/* Save */}
            <div className="flex items-center gap-3">
                <button className="premium-btn-primary !py-3 !px-8">Save Settings</button>
                <button className="premium-btn-outline !py-3 !px-8">Cancel</button>
            </div>
        </div>
    );
}
