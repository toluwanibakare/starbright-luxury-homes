"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";

interface ListingCommentsProps {
    listingId: string;
    listingTitle: string;
}

interface ListingComment {
    id: string;
    name: string;
    message: string;
    createdAt: string;
}

const getStorageKey = (listingId: string) => `starbright-comments-${listingId}`;

export default function ListingComments({ listingId, listingTitle }: ListingCommentsProps) {
    const [comments, setComments] = useState<ListingComment[]>([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(getStorageKey(listingId));
            if (!raw) return;
            const parsed = JSON.parse(raw) as ListingComment[];
            if (Array.isArray(parsed)) {
                setComments(parsed);
            }
        } catch {
            window.localStorage.removeItem(getStorageKey(listingId));
        }
    }, [listingId]);

    useEffect(() => {
        window.localStorage.setItem(getStorageKey(listingId), JSON.stringify(comments));
    }, [comments, listingId]);

    const formattedCount = useMemo(
        () => `${comments.length} ${comments.length === 1 ? "Comment" : "Comments"}`,
        [comments.length]
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setComments((current) => [
            {
                id: `${Date.now()}`,
                name: name.trim(),
                message: message.trim(),
                createdAt: new Date().toISOString(),
            },
            ...current,
        ]);

        setName("");
        setMessage("");
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
                        <label className="block text-xs font-medium text-foreground mb-1.5">Comment</label>
                        <textarea
                            rows={4}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            placeholder="Share your thoughts or ask a question about this property..."
                        />
                    </div>
                    <button type="submit" className="premium-btn-primary !py-3 !px-8">
                        Post Comment
                    </button>
                </form>
            </motion.div>

            <div className="space-y-4">
                {comments.length > 0 ? (
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
                                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
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
                            No comments yet. Be the first to share a question or observation about this listing.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
