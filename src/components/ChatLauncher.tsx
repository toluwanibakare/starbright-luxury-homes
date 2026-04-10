"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, X, Paperclip } from "lucide-react";

const sampleMessages = [
  {
    id: "1",
    sender: "admin",
    text: "Welcome to live chat! Ask about property details, pricing, viewings, or next steps, and our team replies within 5 minutes.",
    time: "Now",
  },
  {
    id: "2",
    sender: "user",
    text: "I want details about the Lekki duplex listing, please.",
    time: "1m ago",
  },
  {
    id: "3",
    sender: "admin",
    text: "Sure! Would you like pricing first or schedule a viewing?",
    time: "Just now",
  },
];

export function ChatLauncher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [userInfoSubmitted, setUserInfoSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  if (!pathname || pathname.startsWith("/admin") || pathname === "/contact") {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div ref={modalRef} className="relative w-[300px] rounded-[28px] border border-border bg-card p-4 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl text-sm text-foreground">
          <div className="mb-3 flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-primary text-primary-foreground">
              <MessageCircle size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">Live support</p>
              <p className="text-[12px] text-muted-foreground whitespace-nowrap">Messages are replied within 5 minutes</p>
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
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-500">Online</span>
              <span className="text-[11px]">Live now</span>
            </div>
            {!userInfoSubmitted ? (
              <div className="h-[240px] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Welcome!</p>
                    <p className="text-xs text-muted-foreground">To get started, please share your name and email so we can assist you better.</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Your Name</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (userName.trim() && userEmail.trim()) {
                      setUserInfoSubmitted(true);
                    }
                  }}
                  disabled={!userName.trim() || !userEmail.trim()}
                  className="w-full rounded-lg bg-primary text-primary-foreground py-2 text-xs font-medium transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Chat
                </button>
              </div>
            ) : (
              <div className="h-[240px] overflow-y-auto space-y-3 pr-2">
                {sampleMessages.map((message) => {
                  const isAdmin = message.sender === "admin";
                  return (
                    <div key={message.id} className={`flex ${isAdmin ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-[75%] rounded-3xl px-3 py-2 text-[13px] shadow-sm ${
                        isAdmin ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                      }`}>
                        <p>{message.text}</p>
                        <p className={`mt-2 text-[10px] ${isAdmin ? "text-muted-foreground" : "text-primary-foreground/80"}`}>{message.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 rounded-[28px] border border-border bg-background p-3">
            {userInfoSubmitted && (
              <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-2.5">
                <button type="button" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-muted/80">
                  <Paperclip size={16} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button type="button" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90">
                  <Send size={16} />
                </button>
              </div>
            )}
          </div>
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
        <span className={`ml-2 overflow-hidden text-sm font-semibold transition-all duration-300 ${
          open ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100"
        }`}>
          Live Chat
        </span>
      </button>
    </div>
  );
}
