"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquareMore, Send } from "lucide-react";
import {
    ApiError,
    type ApiComment,
    type ApiInquiry,
    apiFetch,
} from "@/lib/api";

export default function MessagesPage() {
    const [inquiries, setInquiries] = useState<ApiInquiry[]>([]);
    const [comments, setComments] = useState<ApiComment[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isReplying, setIsReplying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const loadData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [inquiryResponse, commentResponse] = await Promise.all([
                apiFetch<ApiInquiry[]>("/inquiries"),
                apiFetch<ApiComment[]>("/comments"),
            ]);

            setInquiries(inquiryResponse.data);
            setComments(commentResponse.data);

            if (!selectedId && inquiryResponse.data.length > 0) {
                setSelectedId(inquiryResponse.data[0].id);
            }
        } catch (err) {
            setError(
                err instanceof ApiError
                    ? err.message
                    : "Unable to load admin messages right now."
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const contactInquiries = useMemo(
        () => inquiries.filter((item) => item.source === "contact_page"),
        [inquiries]
    );

    const selectedInquiry = useMemo(
        () => contactInquiries.find((item) => item.id === selectedId) ?? contactInquiries[0] ?? null,
        [contactInquiries, selectedId]
    );

    useEffect(() => {
        if (!selectedInquiry || selectedInquiry.is_read) {
            return;
        }

        void apiFetch(`/inquiries/${selectedInquiry.id}/read`, {
            method: "PATCH",
            body: JSON.stringify({ is_read: true }),
        })
            .then(() => {
                setInquiries((current) =>
                    current.map((item) =>
                        item.id === selectedInquiry.id ? { ...item, is_read: 1 } : item
                    )
                );
            })
            .catch(() => undefined);
    }, [selectedInquiry]);

    const handleReply = async () => {
        if (!selectedInquiry || !replyMessage.trim()) {
            setFeedback("Write a reply before sending.");
            return;
        }

        setIsReplying(true);
        setFeedback(null);

        try {
            await apiFetch(`/inquiries/${selectedInquiry.id}/reply`, {
                method: "POST",
                body: JSON.stringify({ message: replyMessage.trim() }),
            });

            setReplyMessage("");
            setFeedback(`Reply sent to ${selectedInquiry.email}.`);
            setInquiries((current) =>
                current.map((item) =>
                    item.id === selectedInquiry.id ? { ...item, is_read: 1 } : item
                )
            );
        } catch (err) {
            setFeedback(
                err instanceof ApiError ? err.message : "Unable to send the reply right now."
            );
        } finally {
            setIsReplying(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Messages</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Contact-form enquiries are shown here. Live chats are hidden for now, and comments still appear below.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Contact Messages", value: String(contactInquiries.length), icon: Mail },
                    {
                        label: "Unread Messages",
                        value: String(contactInquiries.filter((item) => !item.is_read).length),
                        icon: MessageSquareMore,
                    },
                    {
                        label: "Comments",
                        value: String(comments.length),
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

            <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
                <div className="premium-card p-3">
                    <h2 className="text-base font-semibold text-foreground px-3 py-2">Contact Messages</h2>
                    <div className="space-y-2 mt-2">
                        {isLoading ? (
                            <p className="px-3 py-4 text-sm text-muted-foreground">Loading enquiries...</p>
                        ) : error ? (
                            <p className="px-3 py-4 text-sm text-muted-foreground">{error}</p>
                        ) : contactInquiries.length === 0 ? (
                            <p className="px-3 py-4 text-sm text-muted-foreground">No contact messages yet.</p>
                        ) : (
                            contactInquiries.map((inquiry) => (
                                <button
                                    key={inquiry.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedId(inquiry.id);
                                        setFeedback(null);
                                    }}
                                    className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                                        selectedInquiry?.id === inquiry.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:bg-muted/40"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-medium text-foreground truncate">{inquiry.name}</p>
                                            <p className="text-sm text-muted-foreground truncate mt-1">
                                                {inquiry.subject || inquiry.message}
                                            </p>
                                        </div>
                                        {!inquiry.is_read ? (
                                            <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                                        ) : null}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {new Date(inquiry.created_at).toLocaleString("en-NG", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                <div className="premium-card p-6">
                    {selectedInquiry ? (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div>
                                    <h2 className="text-xl font-semibold text-foreground">{selectedInquiry.name}</h2>
                                    <p className="text-sm text-muted-foreground mt-1">{selectedInquiry.email}</p>
                                    {selectedInquiry.phone ? (
                                        <p className="text-sm text-muted-foreground">{selectedInquiry.phone}</p>
                                    ) : null}
                                </div>
                                <div className="text-sm text-muted-foreground sm:text-right">
                                    <p className="uppercase tracking-wider text-xs">{selectedInquiry.source}</p>
                                    <p className="mt-1">
                                        {new Date(selectedInquiry.created_at).toLocaleString("en-NG", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-border bg-muted/20 p-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Subject
                                </p>
                                <p className="text-sm text-foreground mt-2">
                                    {selectedInquiry.subject || "Website contact enquiry"}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-border bg-muted/20 p-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Message
                                </p>
                                <p className="text-sm text-foreground mt-2 whitespace-pre-line leading-7">
                                    {selectedInquiry.message}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Reply By Email
                                </label>
                                <textarea
                                    rows={6}
                                    value={replyMessage}
                                    onChange={(event) => setReplyMessage(event.target.value)}
                                    className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                                    placeholder={`Reply to ${selectedInquiry.name}...`}
                                />
                                {feedback ? <p className="text-sm text-muted-foreground">{feedback}</p> : null}
                                <button
                                    type="button"
                                    onClick={() => void handleReply()}
                                    disabled={isReplying}
                                    className="premium-btn-primary !py-3 !px-6 disabled:opacity-60"
                                >
                                    <Send className="w-4 h-4" />
                                    {isReplying ? "Sending..." : "Send Reply"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Select a message to view details.</p>
                    )}
                </div>
            </div>

            <div className="premium-card p-6">
                <h2 className="text-base font-semibold text-foreground mb-4">Recent Comments</h2>
                {comments.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No comments yet.</p>
                ) : (
                    <div className="space-y-4">
                        {comments.slice(0, 8).map((comment, index) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="rounded-2xl border border-border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                            >
                                <div>
                                    <p className="font-medium text-foreground">{comment.name}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{comment.message}</p>
                                </div>
                                <div className="text-sm text-muted-foreground sm:text-right">
                                    <p className="uppercase tracking-wider text-xs">{comment.status}</p>
                                    <p className="text-xs mt-1">
                                        {new Date(comment.created_at).toLocaleString("en-NG", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
