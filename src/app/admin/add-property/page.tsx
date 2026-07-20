"use client";

import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, X, Video, CheckCircle2, ArrowLeft, Home, Mountain,
  Building2, MapPin, ChevronDown, AlertCircle
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useListings } from "@/components/providers/ListingsProvider";
import type { Category, ListingStatus } from "@/data/mockData";
import { ApiError, getListingFallbackImage } from "@/lib/api";

const MAJOR_LOCATIONS = [
  "Lekki Phase 1, Lagos",
  "Ikoyi, Lagos",
  "Victoria Island, Lagos",
  "Ajah, Lagos",
  "Epe, Lagos",
  "Banana Island, Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Enugu",
  "Uyo",
  "Calabar",
  "Benin City",
  "Abeokuta",
  "Owerri",
];

type PropertyType = "house" | "land" | "commercial" | null;

const typeIcons: Record<string, React.ReactNode> = {
  house: <Home size={32} />,
  land: <Mountain size={32} />,
  commercial: <Building2 size={32} />,
};

const typeLabels: Record<string, string> = {
  house: "House",
  land: "Land",
  commercial: "Commercial",
};

const furnishedOptions = ["", "furnished", "unfurnished", "semi-furnished"];
const landUseOptions = ["", "residential", "commercial", "agricultural", "mixed"];

interface FormState {
  title: string;
  location: string;
  address: string;
  propertyType: string;
  price: string;
  size: string;
  description: string;
  documentsStatus: string;
  inspectionInfo: string;
  bedrooms: string;
  bathrooms: string;
  toilets: string;
  furnished: string;
  landUse: string;
  floorLevel: string;
  parkingSpaces: string;
  yearBuilt: string;
  verified: boolean;
}

const emptyForm: FormState = {
  title: "",
  location: "",
  address: "",
  propertyType: "",
  price: "",
  size: "",
  description: "",
  documentsStatus: "",
  inspectionInfo: "",
  bedrooms: "",
  bathrooms: "",
  toilets: "",
  furnished: "",
  landUse: "",
  floorLevel: "",
  parkingSpaces: "",
  yearBuilt: "",
  verified: true,
};

function FormField({
  label, required, error, children
}: {
  label: string; required?: boolean; error?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1.5">
        {label}
        {required ? <span className="text-destructive ml-0.5">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-[11px] text-destructive mt-1 flex items-center gap-1">
          <AlertCircle size={10} />
          This field is required
        </p>
      ) : null}
    </div>
  );
}

function AddPropertyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addListing } = useListings();

  const initialType = searchParams.get("type") as PropertyType;
  const [selectedType, setSelectedType] = useState<PropertyType>(initialType || null);
  const [showTypeModal, setShowTypeModal] = useState(!initialType);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState<FormState>(emptyForm);

  const [locationOpen, setLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const locationRef = useRef<HTMLDivElement>(null);

  const filteredLocations = MAJOR_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  useEffect(() => {
    if (initialType && !selectedType) {
      setSelectedType(initialType);
      setShowTypeModal(false);
    }
  }, [initialType, selectedType]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const imagePreviews = useMemo(
    () => imageFiles.map((file) => URL.createObjectURL(file)),
    [imageFiles]
  );

  const updateForm = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const publishRequiredFields: (keyof FormState)[] = [
    "title", "location", "price", "size", "description", "documentsStatus",
  ];

  const validatePublish = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    for (const field of publishRequiredFields) {
      if (!form[field] || (typeof form[field] === "string" && form[field].trim() === "")) {
        newErrors[field] = true;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = (status: ListingStatus) => {
    const base = {
      title: form.title,
      category: selectedType as Category,
      location: form.location,
      address: form.address || form.location,
      propertyType: form.propertyType || selectedType || undefined,
      price: form.price || "0",
      size: form.size || "",
      description: form.description,
      documentsStatus: form.documentsStatus,
      verified: form.verified,
      status,
      inspectionInfo: form.inspectionInfo,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
      toilets: form.toilets ? Number(form.toilets) : null,
      imageFiles: imageFiles.length > 0 ? imageFiles : undefined,
      videoFile: videoFile || null,
    };

    if (selectedType === "house") {
      return {
        ...base,
        furnished: form.furnished || null,
        floorLevel: form.floorLevel ? Number(form.floorLevel) : null,
        parkingSpaces: form.parkingSpaces ? Number(form.parkingSpaces) : null,
        yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : null,
      };
    }

    if (selectedType === "land") {
      return {
        ...base,
        landUse: form.landUse || null,
      };
    }

    if (selectedType === "commercial") {
      return {
        ...base,
        floorLevel: form.floorLevel ? Number(form.floorLevel) : null,
        parkingSpaces: form.parkingSpaces ? Number(form.parkingSpaces) : null,
      };
    }

    return base;
  };

  const handlePublish = async () => {
    if (!selectedType) return;
    if (!validatePublish()) return;

    setIsSubmitting(true);
    setFeedback(null);
    setDraftSaved(false);

    try {
      await addListing(buildPayload("Active") as never);
      router.push("/admin/properties");
    } catch (error) {
      setFeedback(
        error instanceof ApiError
          ? error.message
          : "Unable to create the property right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!selectedType) return;
    setIsSubmitting(true);
    setFeedback(null);
    setDraftSaved(false);
    setErrors({});

    try {
      await addListing(buildPayload("Pending") as never);
      setDraftSaved(true);
      setForm(emptyForm);
      setImageFiles([]);
      setVideoFile(null);
    } catch (error) {
      setFeedback(
        error instanceof ApiError
          ? error.message
          : "Unable to save draft right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectType = (type: PropertyType) => {
    setSelectedType(type);
    setShowTypeModal(false);
    setForm(emptyForm);
    setImageFiles([]);
    setVideoFile(null);
    setErrors({});
    setFeedback(null);
  };

  const resetType = () => {
    setSelectedType(null);
    setShowTypeModal(true);
    setForm(emptyForm);
    setImageFiles([]);
    setVideoFile(null);
    setErrors({});
  };

  if (showTypeModal || !selectedType) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-foreground font-display">Add Property</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Select the type of property you want to list
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(["house", "land", "commercial"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => selectType(type)}
              className="premium-card p-8 text-center hover:border-primary/40 transition-all group cursor-pointer"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 text-primary mb-4 group-hover:bg-primary/10 transition-colors">
                {typeIcons[type]}
              </div>
              <h3 className="text-lg font-semibold text-foreground font-display">{typeLabels[type]}</h3>
              <p className="text-xs text-muted-foreground mt-1.5">
                {type === "house" ? "Duplexes, bungalows, apartments & more" : ""}
                {type === "land" ? "Plots, acreages, estate lands & more" : ""}
                {type === "commercial" ? "Office spaces, retail shops & more" : ""}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={resetType}
          aria-label="Go back"
          className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground font-display">
              {typeLabels[selectedType]}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold capitalize">
              {typeIcons[selectedType]}
              {selectedType}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Create a new {selectedType} listing and upload its media.
          </p>
        </div>
      </div>

      <motion.div
        key={selectedType}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Basic Information */}
        <div className="premium-card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>
          <div className="space-y-4">
            <FormField label="Property Title" required error={errors.title}>
              <input
                type="text"
                placeholder="e.g. Luxury 4 Bedroom Duplex in Lekki"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                className={`w-full h-10 px-4 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                  errors.title ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"
                }`}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Location" required error={errors.location}>
                <div ref={locationRef} className="relative">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Type or select a location"
                    value={locationSearch || form.location}
                    onChange={(e) => {
                      setLocationSearch(e.target.value);
                      updateForm("location", e.target.value);
                      setLocationOpen(true);
                    }}
                    onFocus={() => setLocationOpen(true)}
                    className={`w-full h-10 pl-9 pr-9 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.location ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setLocationOpen(!locationOpen)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <AnimatePresence>
                    {locationOpen && filteredLocations.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute top-full mt-1 left-0 right-0 z-20 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto"
                      >
                        {filteredLocations.map((loc) => (
                          <li key={loc}>
                            <button
                              type="button"
                              className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                              onClick={() => {
                                updateForm("location", loc);
                                setLocationSearch("");
                                setLocationOpen(false);
                              }}
                            >
                              {loc}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </FormField>

              <FormField label="Address">
                <input
                  type="text"
                  placeholder="Full property address"
                  value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Property Type">
                <input
                  type="text"
                  placeholder={
                    selectedType === "house" ? "e.g. Detached duplex, bungalow" :
                    selectedType === "land" ? "e.g. Residential plot, commercial plot" :
                    "e.g. Office space, retail shop"
                  }
                  value={form.propertyType}
                  onChange={(e) => updateForm("propertyType", e.target.value)}
                  className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </FormField>

              <FormField label="Price (NGN)" required error={errors.price}>
                <input
                  type="number"
                  placeholder="e.g. 185000000"
                  value={form.price}
                  onChange={(e) => updateForm("price", e.target.value)}
                  className={`w-full h-10 px-4 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                    errors.price ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"
                  }`}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Property Size" required error={errors.size}>
                <input
                  type="text"
                  placeholder="e.g. 450 sqm"
                  value={form.size}
                  onChange={(e) => updateForm("size", e.target.value)}
                  className={`w-full h-10 px-4 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                    errors.size ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"
                  }`}
                />
              </FormField>

              {selectedType === "house" && (
                <FormField label="Furnished">
                  <select
                    value={form.furnished}
                    onChange={(e) => updateForm("furnished", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    {furnishedOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt ? opt.charAt(0).toUpperCase() + opt.slice(1).replace("-", " ") : "Not specified"}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}

              {selectedType === "land" && (
                <FormField label="Land Use">
                  <select
                    value={form.landUse}
                    onChange={(e) => updateForm("landUse", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    {landUseOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt ? opt.charAt(0).toUpperCase() + opt.slice(1) : "Not specified"}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}
            </div>

            {/* House-specific: bedrooms, bathrooms, toilets */}
            {selectedType === "house" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Bedrooms">
                  <input
                    type="number"
                    value={form.bedrooms}
                    onChange={(e) => updateForm("bedrooms", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </FormField>
                <FormField label="Bathrooms">
                  <input
                    type="number"
                    value={form.bathrooms}
                    onChange={(e) => updateForm("bathrooms", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </FormField>
                <FormField label="Toilets">
                  <input
                    type="number"
                    value={form.toilets}
                    onChange={(e) => updateForm("toilets", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </FormField>
              </div>
            )}

            {/* House-specific extras */}
            {selectedType === "house" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Year Built">
                  <input
                    type="number"
                    placeholder="e.g. 2020"
                    value={form.yearBuilt}
                    onChange={(e) => updateForm("yearBuilt", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </FormField>
                <FormField label="Floor Level">
                  <input
                    type="number"
                    placeholder="e.g. 1"
                    value={form.floorLevel}
                    onChange={(e) => updateForm("floorLevel", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </FormField>
                <FormField label="Parking Spaces">
                  <input
                    type="number"
                    placeholder="e.g. 2"
                    value={form.parkingSpaces}
                    onChange={(e) => updateForm("parkingSpaces", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </FormField>
              </div>
            )}

            {/* Commercial-specific extras */}
            {selectedType === "commercial" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Floor Level">
                  <input
                    type="number"
                    placeholder="e.g. 3"
                    value={form.floorLevel}
                    onChange={(e) => updateForm("floorLevel", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </FormField>
                <FormField label="Parking Spaces">
                  <input
                    type="number"
                    placeholder="e.g. 5"
                    value={form.parkingSpaces}
                    onChange={(e) => updateForm("parkingSpaces", e.target.value)}
                    className="w-full h-10 px-4 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </FormField>
              </div>
            )}

            <FormField label="Description" required error={errors.description}>
              <textarea
                rows={5}
                placeholder="Describe the property in detail..."
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none ${
                  errors.description ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"
                }`}
              />
            </FormField>
          </div>
        </div>

        {/* Verification & Documents */}
        <div className="premium-card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Verification & Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Document Status" required error={errors.documentsStatus}>
              <input
                type="text"
                placeholder="e.g. C of O verified"
                value={form.documentsStatus}
                onChange={(e) => updateForm("documentsStatus", e.target.value)}
                className={`w-full h-10 px-4 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                  errors.documentsStatus ? "border-destructive bg-destructive/5" : "border-border bg-muted/30"
                }`}
              />
            </FormField>

            <FormField label="Verification Status">
              <div className="flex items-center gap-3 h-10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.verified}
                    onChange={(e) => updateForm("verified", e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-foreground flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    Verified
                  </span>
                </label>
              </div>
            </FormField>
          </div>
          <FormField label="Inspection Information">
            <textarea
              rows={3}
              placeholder="What should a buyer know about inspection and access?"
              value={form.inspectionInfo}
              onChange={(e) => updateForm("inspectionInfo", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </FormField>
        </div>

        {/* Media */}
        <div className="premium-card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Media</h3>

          <div>
            <label className="block text-xs font-medium text-foreground mb-2">Property Images</label>
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/20 block cursor-pointer">
              <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">Choose property images</p>
              <p className="text-xs text-muted-foreground mt-1">You can upload multiple images.</p>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))}
              />
            </label>

            {imagePreviews.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {imagePreviews.map((img, index) => (
                  <div key={img} className="relative group rounded-lg overflow-hidden bg-muted aspect-square">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-card shadow-md"
                      >
                        <X size={14} className="text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-lg overflow-hidden bg-muted aspect-video max-w-sm">
                <img
                  src={getListingFallbackImage(selectedType as Category)}
                  alt="Fallback preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-2">Property Video</label>
            <label className="rounded-xl border border-border bg-muted/20 p-4 block cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <Video size={20} className="text-muted-foreground" />
                <p className="text-sm text-foreground font-medium">
                  {videoFile ? videoFile.name : "Choose an MP4/MOV video file"}
                </p>
              </div>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
        </div>

        {feedback ? (
          <p className="text-sm text-destructive">{feedback}</p>
        ) : null}

        {draftSaved ? (
          <div className="premium-card p-4 bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900">
            <p className="text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} />
              Draft saved successfully. You can continue adding more listings.
            </p>
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <button
            className="premium-btn-primary !py-3 !px-8 disabled:opacity-60"
            onClick={handlePublish}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Publish Property"}
          </button>
          <button
            className="premium-btn-outline !py-3 !px-8 disabled:opacity-60"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save as Draft"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AddPropertyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground text-sm">Loading...</div>}>
      <AddPropertyForm />
    </Suspense>
  );
}
