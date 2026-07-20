"use client";

import { useEffect, useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";

export interface Settings {
  admin_name: string;
  admin_email: string;
  whatsapp_number: string;
  support_email: string;
}

const defaults: Settings = {
  admin_name: "Starbright Admin",
  admin_email: "admin@starbrightproperties.com.ng",
  whatsapp_number: "+234 703 376 4029",
  support_email: "hello@starbrightproperties.com",
};

let globalSettings: Settings | null = null;
let globalPromise: Promise<Settings> | null = null;

function sanitizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, "").replace(/^0+/, "");
}

function getWaLink(phone: string, text: string): string {
  const clean = sanitizePhone(phone);
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(globalSettings ?? defaults);
  const [loading, setLoading] = useState(!globalSettings);

  useEffect(() => {
    if (globalSettings) {
      setSettings(globalSettings);
      setLoading(false);
      return;
    }

    if (globalPromise) {
      globalPromise.then((s) => {
        globalSettings = s;
        setSettings(s);
        setLoading(false);
      });
      return;
    }

    globalPromise = (async () => {
      try {
        const res = await apiFetch<Record<string, string>>("/settings");
        const data: Settings = {
          admin_name: res.data.admin_name ?? defaults.admin_name,
          admin_email: res.data.admin_email ?? defaults.admin_email,
          whatsapp_number: res.data.whatsapp_number ?? defaults.whatsapp_number,
          support_email: res.data.support_email ?? defaults.support_email,
        };
        return data;
      } catch {
        return defaults;
      }
    })();

    globalPromise.then((s) => {
      globalSettings = s;
      setSettings(s);
      setLoading(false);
    });
  }, []);

  const waLink = (text: string) => getWaLink(settings.whatsapp_number, text);

  return { settings, loading, waLink, sanitizePhone };
}
