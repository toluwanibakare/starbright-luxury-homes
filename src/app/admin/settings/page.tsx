"use client";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-foreground font-display">Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Update contact information, response channels, and admin preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="premium-card p-6 space-y-4">
                    <h2 className="text-base font-semibold text-foreground">Admin Account</h2>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Admin Name</label>
                        <input type="text" defaultValue="Starbright Admin" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Admin Email</label>
                        <input type="email" defaultValue="admin@starbrightproperties.com" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                </div>

                <div className="premium-card p-6 space-y-4">
                    <h2 className="text-base font-semibold text-foreground">Contact Channels</h2>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">WhatsApp Number</label>
                        <input type="text" defaultValue="+234 703 376 4029" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Support Email</label>
                        <input type="email" defaultValue="hello@starbrightproperties.com" className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                </div>
            </div>
        </div>
    );
}
