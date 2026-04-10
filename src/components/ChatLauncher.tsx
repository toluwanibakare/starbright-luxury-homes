"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, X } from "lucide-react";
import {
    ApiError,
    type ApiChatMessage,
    type ApiConversation,
    apiFetch,
} from "@/lib/api";

const CHAT_STORAGE_KEY = "starbright-live-chat";

interface StoredChatSession {
    conversationId: number | null;
    name: string;
    email: string;
}

const getStoredSession = (): StoredChatSession | null => {
    try {
        const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
        if (!raw) {
            return null;
        }

        return JSON.parse(raw) as StoredChatSession;
    } catch {
        return null;
    }
};

const saveStoredSession = (session: StoredChatSession) => {
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(session));
};

const clearStoredSession = () => {
    window.localStorage.removeItem(CHAT_STORAGE_KEY);
};

export function ChatLauncher() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [userInfoSubmitted, setUserInfoSubmitted] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [starterMessage, setStarterMessage] = useState("");
    const [messageText, setMessageText] = useState("");
    const [conversationId, setConversationId] = useState<number | null>(null);
    const [conversation, setConversation] = useState<ApiConversation | null>(null);
    const [messages, setMessages] = useState<ApiChatMessage[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);

    const loadMessages = useCallback(async () => {
        if (!conversationId || !userEmail.trim()) {
            return;
        }

        try {
            const response = await apiFetch<{
                conversation: ApiConversation;
                messages: ApiChatMessage[];
            }>(`/chats/${conversationId}/messages?email=${encodeURIComponent(userEmail.trim())}`);

            setConversation(response.data.conversation);
            setMessages(response.data.messages);
        } catch (error) {
            if (error instanceof ApiError && error.status === 409) {
                clearStoredSession();
                setConversationId(null);
                setUserInfoSubmitted(false);
                setFeedback("This conversation expired. Start a new one to continue chatting.");
                return;
            }

            setFeedback(
                error instanceof ApiError
                    ? error.message
                    : "Unable to load live chat messages right now."
            );
        }
    }, [conversationId, userEmail]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const session = getStoredSession();
        if (!session) {
            return;
        }

        setUserName(session.name);
        setUserEmail(session.email);
        setConversationId(session.conversationId);
        setUserInfoSubmitted(Boolean(session.conversationId));
    }, [open]);

    useEffect(() => {
        if (!open || !userInfoSubmitted || !conversationId) {
            return;
        }

        void loadMessages();
        const intervalId = window.setInterval(() => {
            void loadMessages();
        }, 12000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [conversationId, loadMessages, open, userInfoSubmitted]);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages, open]);

    if (!pathname || pathname.startsWith("/admin") || pathname === "/contact") {
        return null;
    }

    const handleStartChat = async () => {
        if (!userName.trim() || !userEmail.trim() || !starterMessage.trim()) {
            setFeedback("Please enter your name, email, and first message.");
            return;
        }

        setIsSubmitting(true);
        setFeedback(null);

        try {
            const response = await apiFetch<{
                conversation: ApiConversation;
                message?: ApiChatMessage | null;
                messages: ApiChatMessage[];
            }>("/chats/start", {
                method: "POST",
                body: JSON.stringify({
                    name: userName.trim(),
                    email: userEmail.trim(),
                    message: starterMessage.trim(),
                }),
            });

            const nextConversation = response.data.conversation;
            setConversation(nextConversation);
            setConversationId(nextConversation.id);
            setMessages(response.data.messages);
            setUserInfoSubmitted(true);
            setStarterMessage("");
            saveStoredSession({
                conversationId: nextConversation.id,
                name: userName.trim(),
                email: userEmail.trim(),
            });
        } catch (error) {
            setFeedback(
                error instanceof ApiError ? error.message : "Unable to start chat right now."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSendMessage = async () => {
        if (!conversationId || !messageText.trim()) {
            return;
        }

        setIsSubmitting(true);
        setFeedback(null);

        try {
            const response = await apiFetch<{
                conversationId: number;
                message: ApiChatMessage | null;
                status: string;
            }>(`/chats/${conversationId}/message`, {
                method: "POST",
                body: JSON.stringify({
                    email: userEmail.trim(),
                    message: messageText.trim(),
                }),
            });

            setMessages((current) =>
                response.data.message ? [...current, response.data.message] : current
            );
            setMessageText("");
            void loadMessages();
        } catch (error) {
            if (error instanceof ApiError && error.status === 409) {
                clearStoredSession();
                setConversationId(null);
                setConversation(null);
                setMessages([]);
                setUserInfoSubmitted(false);
                setFeedback("This conversation is no longer active. Start a new chat to continue.");
            } else {
                setFeedback(
                    error instanceof ApiError
                        ? error.message
                        : "Unable to send your message right now."
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetChat = () => {
        clearStoredSession();
        setConversationId(null);
        setConversation(null);
        setMessages([]);
        setUserInfoSubmitted(false);
        setStarterMessage("");
        setMessageText("");
        setFeedback(null);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
            {open && (
                <div
                    ref={modalRef}
                    className="relative w-[320px] rounded-[28px] border border-border bg-card p-4 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl text-sm text-foreground"
                >
                    <div className="mb-3 flex items-center gap-3">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
                            <MessageCircle size={18} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground">Live support</p>
                            <p className="text-[12px] text-muted-foreground whitespace-nowrap">
                                Real messages from your backend
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="absolute right-3 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        aria-label="Close chat"
                    >
                        <X size={13} />
                    </button>

                    <div className="flex flex-col gap-3 rounded-[28px] bg-background p-3 text-xs text-muted-foreground shadow-sm shadow-slate-950/5">
                        <div className="flex items-center justify-between">
                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-500">
                                Online
                            </span>
                            <span className="text-[11px]">
                                {conversation?.status === "active" ? "Conversation active" : "Start chatting"}
                            </span>
                        </div>

                        {!userInfoSubmitted ? (
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-foreground">Welcome!</p>
                                    <p className="text-xs text-muted-foreground">
                                        Share your details and first message to begin a live conversation.
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-foreground mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={userName}
                                        onChange={(event) => setUserName(event.target.value)}
                                        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-foreground mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={userEmail}
                                        onChange={(event) => setUserEmail(event.target.value)}
                                        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-foreground mb-1">First Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us what you need help with..."
                                        value={starterMessage}
                                        onChange={(event) => setStarterMessage(event.target.value)}
                                        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                                    />
                                </div>
                                {feedback ? <p className="text-xs text-muted-foreground">{feedback}</p> : null}
                                <button
                                    type="button"
                                    onClick={handleStartChat}
                                    disabled={isSubmitting}
                                    className="w-full rounded-lg bg-primary text-primary-foreground py-2 text-xs font-medium transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Starting..." : "Start Chat"}
                                </button>
                            </div>
                        ) : (
                            <div
                                ref={messagesRef}
                                className="h-[260px] overflow-y-auto space-y-3 pr-2"
                            >
                                {messages.length > 0 ? (
                                    messages.map((message) => {
                                        const isAdmin = message.sender_type === "admin";
                                        return (
                                            <div
                                                key={message.id}
                                                className={`flex ${isAdmin ? "justify-start" : "justify-end"}`}
                                            >
                                                <div
                                                    className={`max-w-[80%] rounded-3xl px-3 py-2 text-[13px] shadow-sm ${
                                                        isAdmin
                                                            ? "bg-muted text-foreground"
                                                            : "bg-primary text-primary-foreground"
                                                    }`}
                                                >
                                                    <p>{message.message}</p>
                                                    <p
                                                        className={`mt-2 text-[10px] ${
                                                            isAdmin
                                                                ? "text-muted-foreground"
                                                                : "text-primary-foreground/80"
                                                        }`}
                                                    >
                                                        {new Date(message.created_at).toLocaleTimeString("en-NG", {
                                                            hour: "numeric",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-xs text-muted-foreground">
                                        No messages yet. Send one below to continue the conversation.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {userInfoSubmitted ? (
                        <div className="mt-4 rounded-[28px] border border-border bg-background p-3 space-y-3">
                            <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-2.5">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={messageText}
                                    onChange={(event) => setMessageText(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            event.preventDefault();
                                            void handleSendMessage();
                                        }
                                    }}
                                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                                />
                                <button
                                    type="button"
                                    onClick={() => void handleSendMessage()}
                                    disabled={isSubmitting || !messageText.trim()}
                                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            {feedback ? <p className="text-xs text-muted-foreground">{feedback}</p> : null}
                            <button
                                type="button"
                                onClick={resetChat}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Start a new conversation
                            </button>
                        </div>
                    ) : null}
                </div>
            )}

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`group relative inline-flex items-center overflow-hidden rounded-full text-white shadow-xl shadow-primary/20 transition-all duration-300 ease-out ${
                    open
                        ? "w-auto bg-gradient-to-r from-primary to-primary/90 px-4 py-0"
                        : "h-14 w-14 bg-gradient-to-r from-primary/80 via-primary/90 to-primary/100"
                } hover:px-4`}
            >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center">
                    <MessageCircle size={22} />
                </span>
                <span
                    className={`ml-2 overflow-hidden text-sm font-semibold transition-all duration-300 ${
                        open
                            ? "max-w-[140px] opacity-100"
                            : "max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100"
                    }`}
                >
                    Live Chat
                </span>
            </button>
        </div>
    );
}
