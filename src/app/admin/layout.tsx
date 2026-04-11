"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Building2,
    PlusCircle,
    ImageIcon,
    FolderOpen,
    MessageSquare,
    Settings,
    Menu,
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { type ApiInquiry, apiFetch } from "@/lib/api";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/properties", label: "Properties", icon: Building2 },
    { href: "/admin/add-property", label: "Add Property", icon: PlusCircle },
    { href: "/admin/media", label: "Media", icon: ImageIcon },
    { href: "/admin/categories", label: "Categories", icon: FolderOpen },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

const isActiveLink = (pathname: string, href: string) => {
    if (href === "/admin") {
        return pathname === "/admin";
    }

    return pathname.startsWith(href);
};

function SidebarNav({ pathname }: { pathname: string }) {
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);

    useEffect(() => {
        let mounted = true;

        void apiFetch<ApiInquiry[]>("/inquiries")
            .then((response) => {
                if (!mounted) {
                    return;
                }

                const unreadCount = response.data.filter(
                    (item) => item.source === "contact_page" && !item.is_read
                ).length;

                setUnreadMessageCount(unreadCount);
            })
            .catch(() => {
                if (mounted) {
                    setUnreadMessageCount(0);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="h-full flex flex-col">
            <Link
                href="/admin"
                className="flex items-center justify-center px-6 py-3 border-b border-border text-center"
            >
                <Image
                    src="/images/starbright_logo.png"
                    alt="Starbright"
                    width={110}
                    height={110}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                    priority
                />
            </Link>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const active = isActiveLink(pathname, item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                                active
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                            <item.icon size={18} />
                            <span className="flex-1">{item.label}</span>
                            {item.href === "/admin/messages" && unreadMessageCount > 0 ? (
                                <span
                                    className={`inline-flex min-w-6 items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                        active
                                            ? "bg-white/20 text-primary-foreground"
                                            : "bg-primary/10 text-primary"
                                    }`}
                                >
                                    {unreadMessageCount}
                                </span>
                            ) : null}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="rounded-2xl bg-muted/60 p-4 text-center">
                    <p className="text-sm font-medium text-foreground">Need help?</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Manage listings, enquiries, and media from one place.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-md">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="flex min-h-screen">
                <aside className="hidden lg:block w-64 border-r border-border bg-card">
                    <SidebarNav pathname={pathname} />
                </aside>

                <div className="flex-1 min-w-0">
                    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
                        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    Starbright
                                </p>
                                <h1 className="text-base sm:text-lg font-semibold text-foreground">
                                    Admin Workspace
                                </h1>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href="/"
                                    className="hidden sm:inline-flex premium-btn-outline !py-2 !px-4 !text-xs"
                                >
                                    View Website
                                </Link>

                                <Sheet>
                                    <SheetTrigger className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground">
                                        <Menu size={18} />
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-[290px] p-0">
                                        <SidebarNav pathname={pathname} />
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </header>

                    <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">{children}</main>
                </div>
            </div>
        </div>
    );
}
