"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, Key, Eye, EyeOff } from "lucide-react";

const ADMIN_EMAIL = "admin@starbrightproperties.com.ng";
const ADMIN_PASSWORD = "Master@123";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState(ADMIN_EMAIL);
    const [password, setPassword] = useState(ADMIN_PASSWORD);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (window.localStorage.getItem("starbright_admin_auth") === "authenticated") {
            router.replace("/admin");
        }
    }, [router]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            window.localStorage.setItem("starbright_admin_auth", "authenticated");
            router.replace("/admin");
            return;
        }

        setError("Invalid admin email or password.");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between rounded-3xl border border-border bg-card p-4">
                <Link href="/" className="text-sm font-semibold text-foreground hover:text-primary">
                    ← Back to site
                </Link>
                <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Admin portal</span>
            </div>

            <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck size={28} />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
                <p className="text-sm text-muted-foreground mt-2">Sign in with your admin email to access the dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-foreground mb-2">Admin Email</label>
                    <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-3xl border border-border bg-muted/30 py-3 pl-12 pr-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            placeholder="admin email"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-foreground mb-2">Password</label>
                    <div className="relative">
                        <Key className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-3xl border border-border bg-muted/30 py-3 pl-12 pr-12 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                            placeholder="password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted-foreground transition hover:bg-muted/80 hover:text-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                </div>

                {error ? <p className="text-sm text-destructive">{error}</p> : null}

                <button type="submit" className="w-full rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90">
                    Sign in
                </button>
            </form>

            <div className="rounded-3xl border border-border bg-muted/70 p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-2">Admin credentials</p>
                <p>Email: <span className="font-medium text-foreground">{ADMIN_EMAIL}</span></p>
                <p>Password: <span className="font-medium text-foreground">{ADMIN_PASSWORD}</span></p>
            </div>
        </div>
    );
}
