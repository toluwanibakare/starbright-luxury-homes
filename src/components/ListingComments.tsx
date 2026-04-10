"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import { ApiError, type ApiComment, apiFetch } from "@/lib/api";

interface ListingCommentsProps {
    listingId: string;
    listingTitle: string;
}

export default function ListingComments({ listingId, listingTitle }: ListingCommentsProps) {
    const [comments, setComments] = useState<ApiComment[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadComments = async () => {
            setIsLoading(true);

            try {
                const response = await apiFetch<ApiComment[]>("/comments");
                if (!mounted) {
                    return;
                }

                setComments(
                    response.data.filter(
                        (comment) =>
                            comment.status === "approved" &&
                            String(comment.property_id ?? "") === listingId
                    )
                );
            } catch (error) {
                if (mounted) {
                    setFeedback(
                        error instanceof ApiError
                            ? error.message
                            : "Unable to load comments right now."
                    );
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        void loadComments();

        return () => {
            mounted = false;
        };
    }, [listingId]);

    const formattedCount = useMemo(
        () => `${comments.length} ${comments.length === 1 ? "Comment" : "Comments"}`,
        [comments.length]
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            setFeedback("Please complete your name, email, and comment.");
            return;
        }

        setIsSubmitting(true);
        setFeedback(null);

        try {
            await apiFetch<ApiComment>("/comments", {
                method: "POST",
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    message: message.trim(),
                    page_type: "listing_detail",
                    property_id: Number(listingId),
                }),
            });

            setName("");
            setEmail("");
            setMessage("");
            setFeedback("Comment submitted successfully. It will appear after approval.");
        } catch (error) {
            setFeedback(
                error instanceof ApiError
                    ? error.message
                    : "Unable to submit your comment right now."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
            >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <MessageSquareText size={22} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-foreground font-display">Comments</h2>
                    <p className="text-sm text-muted-foreground">{formattedCount} on {listingTitle}</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="premium-card p-6"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-foreground mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Comment</label>
                        <textarea
                            rows={4}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            placeholder="Share your thoughts or ask a question about this property..."
                        />
                    </div>
                    {feedback ? (
                        <p className="text-sm text-muted-foreground">{feedback}</p>
                    ) : null}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="premium-btn-primary !py-3 !px-8 disabled:opacity-60"
                    >
                        {isSubmitting ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            </motion.div>

            <div className="space-y-4">
                {isLoading ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="premium-card p-6"
                    >
                        <p className="text-sm text-muted-foreground">Loading comments...</p>
                    </motion.div>
                ) : comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.04 }}
                            className="premium-card p-5"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <p className="font-semibold text-foreground">{comment.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(comment.created_at).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 leading-7">
                                {comment.message}
                            </p>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="premium-card p-6"
                    >
                        <p className="text-sm text-muted-foreground">
                            No approved comments yet. Be the first to ask a question about this listing.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
