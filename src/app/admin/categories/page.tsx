"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mountain, Home, Building2, Pencil, Trash2 } from "lucide-react";

const categoriesData = [
    { name: "Land", icon: Mountain, count: 24, color: "text-emerald-600 bg-emerald-50" },
    { name: "Houses", icon: Home, count: 38, color: "text-primary bg-primary/10" },
    { name: "Commercial", icon: Building2, count: 12, color: "text-secondary bg-secondary/10" },
];

export default function CategoriesPage() {
    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground font-display">Categories</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage property categories</p>
                </div>
                <button className="premium-btn-primary !py-2.5 !px-5 !text-xs">+ Add Category</button>
            </div>

            <div className="space-y-3">
                {categoriesData.map((cat, i) => (
                    <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="premium-card p-5 flex items-center gap-4"
                    >
                        <div className={`p-3 rounded-xl ${cat.color}`}>
                            <cat.icon size={22} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
                            <p className="text-xs text-muted-foreground">{cat.count} properties</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="p-2 rounded-lg hover:bg-muted transition-colors"><Pencil size={15} className="text-muted-foreground" /></button>
                            <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 size={15} className="text-destructive/70" /></button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
