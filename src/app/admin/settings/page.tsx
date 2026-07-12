"use client";

import { useEffect, useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import { CheckCircle2, Loader2 } from "lucide-react";

interface Settings {
  admin_name: string;
  admin_email: string;
  whatsapp_number: string;
  support_email: string;
}

const defaultSettings: Settings = {
  admin_name: "Starbright Admin",
  admin_email: "admin@starbrightproperties.com",
  whatsapp_number: "+234 703 376 4029",
  support_email: "hello@starbrightproperties.com",
};

export default function SettingsPage() {
  const [form, setForm] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadSettings = async () => {
      try {
        const res = await apiFetch<Settings>("/settings");
        if (mounted && res.data) {
          setForm({
            admin_name: res.data.admin_name ?? defaultSettings.admin_name,
            admin_email: res.data.admin_email ?? defaultSettings.admin_email,
            whatsapp_number: res.data.whatsapp_number ?? defaultSettings.whatsapp_number,
            support_email: res.data.support_email ?? defaultSettings.support_email,
          });
        }
      } catch {
        if (mounted) setFeedback({ type: "error", message: "Could not load settings." });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    void loadSettings();
    return () => { mounted = false; };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await apiFetch<Settings>("/settings", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      if (res.data) {
        setForm({
          admin_name: res.data.admin_name ?? form.admin_name,
          admin_email: res.data.admin_email ?? form.admin_email,
          whatsapp_number: res.data.whatsapp_number ?? form.whatsapp_number,
          support_email: res.data.support_email ?? form.support_email,
        });
      }
      setFeedback({ type: "success", message: "Settings saved successfully." });
    } catch (err) {
      setFeedback({
        type: "error",
        message: err instanceof ApiError ? err.message : "Failed to save settings.",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof Settings, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-display">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update contact information, response channels, and admin preferences.
        </p>
      </div>

      {feedback ? (
        <div className={`premium-card p-4 flex items-center gap-2 ${feedback.type === "success" ? "text-emerald-600" : "text-destructive"}`}>
          {feedback.type === "success" ? <CheckCircle2 size={16} /> : null}
          <p className="text-sm font-medium">{feedback.message}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="premium-card p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground">Admin Account</h2>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Admin Name</label>
            <input
              type="text"
              value={form.admin_name}
              onChange={(e) => updateField("admin_name", e.target.value)}
              className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Admin Email</label>
            <input
              type="email"
              value={form.admin_email}
              onChange={(e) => updateField("admin_email", e.target.value)}
              className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="premium-card p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground">Contact Channels</h2>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">WhatsApp Number</label>
            <input
              type="text"
              value={form.whatsapp_number}
              onChange={(e) => updateField("whatsapp_number", e.target.value)}
              className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">Support Email</label>
            <input
              type="email"
              value={form.support_email}
              onChange={(e) => updateField("support_email", e.target.value)}
              className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => void handleSave()}
          disabled={saving}
          className="premium-btn-primary !py-2.5 !px-6 !text-sm disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
