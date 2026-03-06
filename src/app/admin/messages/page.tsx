"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MailOpen, Trash2, Clock } from "lucide-react";

const messages = [
    { id: "1", name: "Adebayo Johnson", email: "adebayo@email.com", subject: "Interested in Lekki Duplex", message: "I would like to schedule an inspection for the 4-bedroom duplex in Lekki Phase 1.", property: "Luxury 4BR Duplex", time: "2 hours ago", read: false },
    { id: "2", name: "Chioma Okafor", email: "chioma@email.com", subject: "Land verification inquiry", message: "Can you provide more details about the verification process for the Epe plot?", property: "Verified Plot Epe", time: "5 hours ago", read: false },
    { id: "3", name: "Emeka Nwosu", email: "emeka@email.com", subject: "Commercial property details", message: "I'm a real estate developer looking for office space in VI. Please share more details.", property: "Commercial Office VI", time: "1 day ago", read: true },
    { id: "4", name: "Funke Adeyemi", email: "funke@email.com", subject: "Banana Island mansion", message: "Is the Banana Island mansion still available? I would like to arrange a viewing.", property: "5BR Mansion", time: "2 days ago", read: true },
];

export default function MessagesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Messages</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage inquiries and messages from potential buyers</p>
            </div>

            <div className="space-y-3">
                {messages.map((msg, i) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className={`premium-card p-5 cursor-pointer ${!msg.read ? "border-l-[3px] border-l-primary" : ""}`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg flex-shrink-0 ${!msg.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                                {msg.read ? <MailOpen size={18} /> : <Mail size={18} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className={`text-sm truncate ${!msg.read ? "font-bold text-foreground" : "font-medium text-foreground"}`}>{msg.name}</h3>
                                    <span className="text-[10px] text-muted-foreground flex-shrink-0 flex items-center gap-1">
                                        <Clock size={10} /> {msg.time}
                                    </span>
                                </div>
                                <p className="text-xs font-semibold text-foreground mt-1">{msg.subject}</p>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{msg.message}</p>
                                <p className="text-[10px] text-primary mt-2">Re: {msg.property}</p>
                            </div>
                            <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors flex-shrink-0">
                                <Trash2 size={14} className="text-destructive/60" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
