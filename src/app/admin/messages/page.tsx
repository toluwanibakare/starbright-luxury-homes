"use client";

import { motion } from "framer-motion";
import { Mail, PhoneCall, MessageSquareMore } from "lucide-react";

const messages = [
    { name: "Tolu A.", subject: "Inspection request for STB-001", channel: "WhatsApp", time: "10 mins ago" },
    { name: "Ada N.", subject: "Need payment breakdown", channel: "Email", time: "1 hour ago" },
    { name: "Segun K.", subject: "Availability for Ikoyi property", channel: "Contact Form", time: "Today" },
];

export default function MessagesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Messages</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Review incoming enquiries and follow-up requests from buyers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Email", value: "12", icon: Mail },
                    { label: "Calls", value: "4", icon: PhoneCall },
                    { label: "Enquiries", value: "19", icon: MessageSquareMore },
                ].map((item) => (
                    <div key={item.label} className="premium-card p-5">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                            <item.icon size={20} />
                        </div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                        <p className="text-3xl font-bold text-foreground mt-2 font-display">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="premium-card p-6">
                <h2 className="text-base font-semibold text-foreground mb-4">Recent Enquiries</h2>
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <motion.div
                            key={message.name + message.subject}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="rounded-2xl border border-border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                        >
                            <div>
                                <p className="font-medium text-foreground">{message.name}</p>
                                <p className="text-sm text-muted-foreground mt-1">{message.subject}</p>
                            </div>
                            <div className="text-sm text-muted-foreground sm:text-right">
                                <p>{message.channel}</p>
                                <p className="text-xs mt-1">{message.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
