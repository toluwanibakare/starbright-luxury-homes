"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, X, Video, CheckCircle2, ArrowLeft, Home, Mountain,
  Building2, MapPin, ChevronDown, AlertCircle, Loader2
} from "lucide-react";
import { useListings } from "@/components/providers/ListingsProvider";
import type { Category, ListingStatus } from "@/data/mockData";
import { ApiError, type ApiProperty, apiFetch, buildAssetUrl } from "@/lib/api";

const MAJOR_LOCATIONS = [
  "Lekki Phase 1, Lagos", "Ikoyi, Lagos", "Victoria Island, Lagos",
  "Ajah, Lagos", "Epe, Lagos", "Banana Island, Lagos", "Abuja",
  "Port Harcourt", "Ibadan", "Enugu", "Uyo", "Calabar",
  "Benin City", "Abeokuta", "Owerri",
];

const typeLabels: Record<string, string> = {
  house: "House", land: "Land", commercial: "Commercial",
};

const furnishedOptions = ["", "furnished", "unfurnished", "semi-furnished"];
const landUseOptions = ["", "residential", "commercial", "agricultural", "mixed"];

interface FormState {
  title: string; location: string; address: string; propertyType: string;
  price: string; size: string; description: string; documentsStatus: string;
  inspectionInfo: string; bedrooms: string; bathrooms: string; toilets: string;
  furnished: string; landUse: string; floorLevel: string; parkingSpaces: string;
  yearBuilt: string; verified: boolean;
}

const formatNumber = (value: string): string => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const parseFormattedNumber = (value: string): string => value.replace(/,/g, "");

function FormField({ label, required, error, children }: {
  label: string; required?: boolean; error?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1.5">
        {label}{required ? <span className="text-destructive ml-0.5">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-[11px] text-destructive mt-1 flex items-center gap-1">
          <AlertCircle size={10} />This field is required
        </p>
      ) : null}
    </div>
  );
}

function EditPropertyForm({ id }: { id: string }) {
  const router = useRouter();
  const { addListing, updateListing } = useListings();

  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<ApiProperty | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [revealedDelete, setRevealedDelete] = useState<number | null>(null);

  const [form, setForm] = useState<FormState>({
    title: "", location: "", address: "", propertyType: "", price: "", size: "",
    description: "", documentsStatus: "", inspectionInfo: "", bedrooms: "",
    bathrooms: "", toilets: "", furnished: "", landUse: "", floorLevel: "",
    parkingSpaces: "", yearBuilt: "", verified: true,
  });

  const [locationOpen, setLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const locationRef = useRef<HTMLDivElement>(null);

  const filteredLocations = MAJOR_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiFetch<ApiProperty>("/properties/" + id);
        const p = res.data;
        setProperty(p);
        const media = Array.isArray(p.media) ? p.media : [];
        setExistingImages(
          media.filter((m) => m.file_type === "image").map((m) => buildAssetUrl(m.file_path))
        );
        setForm({
          title: p.title || "",
          location: p.location || "",
          address: p.address || "",
          propertyType: p.property_type || "",
          price: String(p.price ?? ""),
          size: p.size_value ? `${p.size_value} ${p.size_unit}` : "",
          description: p.description || "",
          documentsStatus: p.documents_info || "",
          inspectionInfo: p.inspection_info || "",
          bedrooms: p.bedrooms != null ? String(p.bedrooms) : "",
          bathrooms: p.bathrooms != null ? String(p.bathrooms) : "",
          toilets: p.toilets != null ? String(p.toilets) : "",
          furnished: p.furnished || "",
          landUse: p.land_use || "",
          floorLevel: p.floor_level != null ? String(p.floor_level) : "",
          parkingSpaces: p.parking_spaces != null ? String(p.parking_spaces) : "",
          yearBuilt: p.year_built != null ? String(p.year_built) : "",
          verified: !/pending|unverified|not.verified|review/i.test(p.verification_status || ""),
        });
      } catch (err) {
        setFeedback(err instanceof ApiError ? err.message : "Failed to load property.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { setRevealedDelete(null); }, [imageFiles]);

  const allPreviews = useMemo(() => {
    const fromFiles = imageFiles.map((file) => URL.createObjectURL(file));
    return [...existingImages, ...fromFiles];
  }, [existingImages, imageFiles]);

  const updateForm = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const publishRequiredFields = (): (keyof FormState)[] => {
    const fields: (keyof FormState)[] = ["title", "location", "price", "description", "documentsStatus"];
    if (property?.category !== "house") fields.push("size");
    return fields;
  };

  const allPublishFieldsFilled = (): boolean => {
    return publishRequiredFields().every((f) => {
      const v = form[f]; return v !== "" && v !== undefined && v !== null;
    });
  };

  const validatePublish = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    for (const field of publishRequiredFields()) {
      if (!form[field] || (typeof form[field] === "string" && form[field].trim() === "")) {
        newErrors[field] = true;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = (status: ListingStatus) => {
    const cat = property?.category as Category;
    const base = {
      title: form.title, category: cat, location: form.location,
      address: form.address || form.location, propertyType: form.propertyType || cat,
      price: form.price || "0", size: form.size || "", description: form.description,
      documentsStatus: form.documentsStatus, verified: form.verified, status,
      inspectionInfo: form.inspectionInfo,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
      toilets: form.toilets ? Number(form.toilets) : null,
      imageFiles: imageFiles.length > 0 ? imageFiles : undefined,
      videoFile: videoFile || null, landUse: null, furnished: null,
      floorLevel: null, parkingSpaces: null, yearBuilt: null,
    };
    if (cat === "house") return { ...base, furnished: form.furnished || null, floorLevel: form.floorLevel ? Number(form.floorLevel) : null, parkingSpaces: form.parkingSpaces ? Number(form.parkingSpaces) : null, yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : null };
    if (cat === "land") return { ...base, landUse: form.landUse || null };
    if (cat === "commercial") return { ...base, floorLevel: form.floorLevel ? Number(form.floorLevel) : null, parkingSpaces: form.parkingSpaces ? Number(form.parkingSpaces) : null };
    return base;
  };

  const handlePublish = async () => {
    if (!validatePublish()) return;
    setIsSubmitting(true); setFeedback(null); setDraftSaved(false);
    try {
      await updateListing(id, buildPayload("Active") as never);
      router.push("/admin/properties");
    } catch (error) {
      setFeedback(error instanceof ApiError ? error.message : "Unable to update the property.");
    } finally { setIsSubmitting(false); }
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true); setFeedback(null); setDraftSaved(false); setErrors({});
    try {
      await updateListing(id, buildPayload("Pending") as never);
      setDraftSaved(true);
    } catch (error) {
      setFeedback(error instanceof ApiError ? error.message : "Unable to save draft.");
    } finally { setIsSubmitting(false); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!property) {
    return <div className="py-20 text-center text-muted-foreground">Property not found.</div>;
  }

  const cat = property.category as Category;
  const selectedType = cat;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-start gap-3">
        <button type="button" onClick={() => router.push("/admin/properties")} aria-label="Go back" className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground font-display">Edit {typeLabels[cat]}</h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold capitalize">{cat}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Update this {cat} listing.</p>
        </div>
      </div>

      <motion.div
        key={id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="premium-card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>
          <div className="space-y-4">
            <FormField label="Property Title" required error={errors.title}>
              <input type="text" placeholder="e.g. Luxury 4 Bedroom Duplex in Lekki" value={form.title} onChange={(e) => updateForm("title", e.target.value)}
                className={`w-full h-10 px-4 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.title ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"}`} />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Location" required error={errors.location}>
                <div ref={locationRef} className="relative">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input type="text" placeholder="Type or select a location" value={locationSearch || form.location}
                    onChange={(e) => { setLocationSearch(e.target.value); updateForm("location", e.target.value); setLocationOpen(true); }}
                    onFocus={() => setLocationOpen(true)}
                    className={`w-full h-10 pl-9 pr-9 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.location ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"}`} />
                  <button type="button" onClick={() => setLocationOpen(!locationOpen)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"><ChevronDown size={14} /></button>
                  <AnimatePresence>{locationOpen && filteredLocations.length > 0 && (
                    <motion.ul initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                      className="absolute top-full mt-1 left-0 right-0 z-20 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredLocations.map((loc) => (
                        <li key={loc}><button type="button" className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                          onClick={() => { updateForm("location", loc); setLocationSearch(""); setLocationOpen(false); }}>{loc}</button></li>
                      ))}
                    </motion.ul>
                  )}</AnimatePresence>
                </div>
              </FormField>

              <FormField label="Address">
                <input type="text" placeholder="Full property address" value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Property Type">
                <input type="text"
                  placeholder={cat === "house" ? "e.g. Detached duplex, bungalow" : cat === "land" ? "e.g. Residential plot" : "e.g. Office space"}
                  value={form.propertyType} onChange={(e) => updateForm("propertyType", e.target.value)}
                  className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
              </FormField>

              <FormField label="Price (NGN)" required error={errors.price}>
                <input type="text" inputMode="numeric" placeholder="e.g. 185,000,000"
                  value={form.price ? formatNumber(form.price) : ""}
                  onChange={(e) => updateForm("price", parseFormattedNumber(e.target.value))}
                  className={`w-full h-10 px-4 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.price ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"}`} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Property Size" required={cat !== "house"} error={errors.size}>
                <input type="text" placeholder={cat === "house" ? "e.g. 450 sqm (optional)" : "e.g. 450 sqm"}
                  value={form.size} onChange={(e) => updateForm("size", e.target.value)}
                  className={`w-full h-10 px-4 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.size ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"}`} />
              </FormField>

              {cat === "house" && (
                <FormField label="Furnished">
                  <select value={form.furnished} onChange={(e) => updateForm("furnished", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                    {furnishedOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt ? opt.charAt(0).toUpperCase() + opt.slice(1).replace("-", " ") : "Not specified"}</option>
                    ))}
                  </select>
                </FormField>
              )}

              {cat === "land" && (
                <FormField label="Land Use">
                  <select value={form.landUse} onChange={(e) => updateForm("landUse", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                    {landUseOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt ? opt.charAt(0).toUpperCase() + opt.slice(1) : "Not specified"}</option>
                    ))}
                  </select>
                </FormField>
              )}
            </div>

            {cat === "house" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Bedrooms"><input type="number" value={form.bedrooms} onChange={(e) => updateForm("bedrooms", e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></FormField>
                  <FormField label="Bathrooms"><input type="number" value={form.bathrooms} onChange={(e) => updateForm("bathrooms", e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></FormField>
                  <FormField label="Toilets"><input type="number" value={form.toilets} onChange={(e) => updateForm("toilets", e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></FormField>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Year Built"><input type="number" placeholder="e.g. 2020" value={form.yearBuilt} onChange={(e) => updateForm("yearBuilt", e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></FormField>
                  <FormField label="Floor Level"><input type="number" placeholder="e.g. 1" value={form.floorLevel} onChange={(e) => updateForm("floorLevel", e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></FormField>
                  <FormField label="Parking Spaces"><input type="number" placeholder="e.g. 2" value={form.parkingSpaces} onChange={(e) => updateForm("parkingSpaces", e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></FormField>
                </div>
              </>
            )}

            {cat === "commercial" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Floor Level"><input type="number" placeholder="e.g. 3" value={form.floorLevel} onChange={(e) => updateForm("floorLevel", e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></FormField>
                <FormField label="Parking Spaces"><input type="number" placeholder="e.g. 5" value={form.parkingSpaces} onChange={(e) => updateForm("parkingSpaces", e.target.value)} className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" /></FormField>
              </div>
            )}

            <FormField label="Description" required error={errors.description}>
              <textarea rows={5} placeholder="Describe the property in detail..." value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none ${errors.description ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"}`} />
            </FormField>
          </div>
        </div>

        <div className="premium-card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Verification & Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Document Status" required error={errors.documentsStatus}>
              <input type="text" placeholder="e.g. C of O verified" value={form.documentsStatus}
                onChange={(e) => updateForm("documentsStatus", e.target.value)}
                className={`w-full h-10 px-4 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.documentsStatus ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"}`} />
            </FormField>
            <FormField label="Verification Status">
              <div className="flex items-center gap-3 h-10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.verified} onChange={(e) => updateForm("verified", e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20" />
                  <span className="text-sm text-foreground flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-emerald-600" />Verified
                  </span>
                </label>
              </div>
            </FormField>
          </div>
          <FormField label="Inspection Information">
            <textarea rows={3} placeholder="What should a buyer know about inspection and access?" value={form.inspectionInfo}
              onChange={(e) => updateForm("inspectionInfo", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
          </FormField>
        </div>

        <div className="premium-card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Media</h3>
          <div>
            <label className="block text-xs font-medium text-foreground mb-2">Property Images</label>
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/20 block cursor-pointer">
              <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">Choose property images</p>
              <p className="text-xs text-muted-foreground mt-1">You can upload multiple images.</p>
              <input type="file" accept="image/*" multiple className="hidden"
                onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))} />
            </label>
            {allPreviews.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {allPreviews.map((img, index) => (
                  <div key={img + index} className="relative group rounded-lg overflow-hidden bg-muted aspect-square"
                    onClick={() => setRevealedDelete(revealedDelete === index ? null : index)}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 transition-colors flex items-center justify-center ${revealedDelete === index ? "bg-foreground/30" : "bg-foreground/0 group-hover:bg-foreground/30"}`}>
                      <button type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index < existingImages.length) removeExistingImage(index);
                          else removeNewImage(index - existingImages.length);
                        }}
                        className={`transition-opacity p-1.5 rounded-full bg-card shadow-md ${revealedDelete === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                        <X size={14} className="text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground mb-2">Property Video</label>
            <div className="relative">
              <label className={`rounded-xl border ${videoFile ? "border-primary/30 bg-primary/5" : "border-border bg-muted/20"} p-4 block cursor-pointer`}>
                <div className="flex items-center gap-3">
                  <Video size={20} className="text-muted-foreground shrink-0" />
                  <p className="text-sm text-foreground font-medium truncate flex-1">
                    {videoFile ? videoFile.name : "Choose an MP4/MOV video file"}
                  </p>
                </div>
                <input type="file" accept="video/*" className="hidden"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)} />
              </label>
              {videoFile ? (
                <button type="button" onClick={() => setVideoFile(null)}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 transition-colors" title="Remove video">
                  <X size={12} />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {feedback ? <p className="text-sm text-destructive">{feedback}</p> : null}
        {draftSaved ? (
          <div className="premium-card p-4 bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900">
            <p className="text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} />Draft saved successfully.
            </p>
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <button className="premium-btn-primary !py-3 !px-8 disabled:opacity-60" onClick={handlePublish}
            disabled={isSubmitting || !allPublishFieldsFilled()}>
            {isSubmitting ? "Saving..." : "Update & Publish"}
          </button>
          <button className="premium-btn-outline !py-3 !px-8 disabled:opacity-60" onClick={handleSaveDraft} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save as Draft"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground text-sm">Loading...</div>}>
      <EditPropertyForm id={id} />
    </Suspense>
  );
}
