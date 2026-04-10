"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquareMore, PhoneCall } from "lucide-react";
import {
    ApiError,
    type ApiConversation,
    type ApiInquiry,
    apiFetch,
} from "@/lib/api";

export default function MessagesPage() {
    const [inquiries, setInquiries] = useState<ApiInquiry[]>([]);
    const [conversations, setConversations] = useState<ApiConversation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [inquiryResponse, conversationResponse] = await Promise.all([
                    apiFetch<ApiInquiry[]>("/inquiries"),
                    apiFetch<ApiConversation[]>("/admin/chats"),
                ]);

                if (!mounted) {
                    return;
                }

                setInquiries(inquiryResponse.data);
                setConversations(conversationResponse.data);
            } catch (err) {
                if (mounted) {
                    setError(
                        err instanceof ApiError
                            ? err.message
                            : "Unable to load admin messages right now."
                    );
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        void loadData();

        return () => {
            mounted = false;
        };
    }, []);

    const recentItems = useMemo(
        () =>
            [
                ...inquiries.map((inquiry) => ({
                    id: `inquiry-${inquiry.id}`,
                    name: inquiry.name,
                    subject: inquiry.subject || inquiry.message,
                    channel: inquiry.source,
                    time: inquiry.created_at,
                    status: inquiry.is_read ? "Read" : "Unread",
                })),
                ...conversations.map((conversation) => ({
                    id: `chat-${conversation.id}`,
                    name: conversation.name,
                    subject: `Live chat conversation (${conversation.status})`,
                    channel: "Live Chat",
                    time: conversation.last_message_at,
                    status: conversation.status,
                })),
            ]
                .sort(
                    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
                )
                .slice(0, 10),
        [conversations, inquiries]
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Messages</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Review incoming enquiries and live chat conversations from the backend.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Email Enquiries", value: String(inquiries.length), icon: Mail },
                    {
                        label: "Unread Enquiries",
                        value: String(inquiries.filter((item) => !item.is_read).length),
                        icon: PhoneCall,
                    },
                    {
                        label: "Live Chats",
                        value: String(conversations.length),
                        icon: MessageSquareMore,
                    },
                ].map((item) => (
                    <div key={item.label} className="premium-card p-5">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                            <item.icon size={20} />
                        </div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                        <p className="text-3xl font-bold text-foreground mt-2 font-display">
                            {isLoading ? "..." : item.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="premium-card p-6">
                <h2 className="text-base font-semibold text-foreground mb-4">Recent Activity</h2>
                {isLoading ? (
                    <p className="text-sm text-muted-foreground">Loading messages...</p>
                ) : error ? (
                    <p className="text-sm text-muted-foreground">{error}</p>
                ) : (
                    <div className="space-y-4">
                        {recentItems.map((message, index) => (
                            <motion.div
                                key={message.id}
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
                                    <p className="capitalize">{message.channel}</p>
                                    <p className="text-xs mt-1">
                                        {new Date(message.time).toLocaleString("en-NG", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                    <p className="text-xs mt-1 uppercase tracking-wider">{message.status}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
