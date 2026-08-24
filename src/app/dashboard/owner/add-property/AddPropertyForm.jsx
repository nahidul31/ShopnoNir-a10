"use client";

import { useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import { Button, Chip, Toast, toast } from "@heroui/react";

import { createNewProperty } from "@/lib/action/create-property";

const fieldClass =
  "w-full [color-scheme:light] rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-800 outline-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10";
const fieldWithIconClass = `${fieldClass} pl-10`;
const labelClass = "mb-1.5 block text-sm font-medium text-neutral-700";
const errorClass =
  "mt-1 flex items-center gap-1 text-xs font-medium text-red-500";

// imgbb config — set in .env.local as NEXT_PUBLIC_IMGBB_API_KEY=xxxxxxxx
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";
const MAX_IMAGE_MB = 10;
const MAX_IMAGES = 8;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

function Field({ label, required, error, icon, children }) {
  return (
    <div>
      <label className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <Icon icon={icon} width={18} />
          </span>
        )}
        {children}
      </div>
      {error && (
        <p className={errorClass}>
          <Icon icon="gravity-ui:circle-exclamation" width={12} />
          {error}
        </p>
      )}
    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm shadow-neutral-200/50">
      <div className="flex items-center gap-2.5 border-b border-neutral-100 bg-neutral-50/60 px-6 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Icon icon={icon} width={18} />
        </span>
        <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
      </div>
      <div className="flex flex-col gap-5 px-6 py-6">{children}</div>
    </div>
  );
}

const PROPERTY_TYPES = [
  { key: "apartment", label: "Apartment" },
  { key: "house", label: "House" },
  { key: "villa", label: "Villa" },
  { key: "office", label: "Office Space" },
  { key: "shop", label: "Shop / Commercial" },
  { key: "land", label: "Land / Plot" },
];

const RENT_TYPES = [
  { key: "monthly", label: "Monthly" },
  { key: "weekly", label: "Weekly" },
  { key: "daily", label: "Daily" },
];

const AMENITIES = [
  { key: "wifi", label: "Wi-Fi", icon: "gravity-ui:wi-fi" },
  { key: "parking", label: "Parking", icon: "gravity-ui:car" },
  { key: "ac", label: "Air Conditioning", icon: "gravity-ui:snowflake" },
  { key: "lift", label: "Elevator", icon: "gravity-ui:arrow-up-arrow-down" },
  { key: "security", label: "24/7 Security", icon: "gravity-ui:shield-check" },
  { key: "generator", label: "Generator / Backup", icon: "gravity-ui:bolt" },
  { key: "gas", label: "Gas Line", icon: "gravity-ui:fire" },
  { key: "furnished", label: "Furnished", icon: "gravity-ui:sofa" },
];

export default function AddPropertyForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    propertyType: "",
    rent: "",
    rentType: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    extraFeatures: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
  });

  const [amenities, setAmenities] = useState([]);

  // Each item: { file, previewUrl, id, uploadedUrl, uploading, progress, error }
  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const toggleAmenity = (key) => {
    setAmenities((prev) =>
      prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key],
    );
  };

  // Validate a single file before it's ever queued for upload
  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Unsupported file type. Use PNG, JPG, or WEBP.";
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      return `File is too large. Max ${MAX_IMAGE_MB}MB.`;
    }
    return null;
  };

  // Uploads a single file to imgbb using XHR (gives us real progress events)
  // and returns the hosted URL. Retries once on network/5xx failure.
  const uploadToImgbb = (file, { onProgress, attempt = 1 } = {}) => {
    return new Promise((resolve, reject) => {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!apiKey) {
        reject(
          new Error(
            "IMGBB API key missing. Set NEXT_PUBLIC_IMGBB_API_KEY in your .env.local file.",
          ),
        );
        return;
      }

      const body = new FormData();
      body.append("image", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${IMGBB_UPLOAD_URL}?key=${apiKey}`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = () => {
        let data;
        try {
          data = JSON.parse(xhr.responseText);
        } catch {
          data = null;
        }

        if (xhr.status >= 200 && xhr.status < 300 && data?.success) {
          resolve(data.data.url);
          return;
        }

        // Retry once on server-side/transient errors
        const isRetryable = xhr.status === 0 || xhr.status >= 500;
        if (isRetryable && attempt < 2) {
          uploadToImgbb(file, { onProgress, attempt: attempt + 1 })
            .then(resolve)
            .catch(reject);
          return;
        }

        reject(new Error(data?.error?.message || "Image upload failed"));
      };

      xhr.onerror = () => {
        if (attempt < 2) {
          uploadToImgbb(file, { onProgress, attempt: attempt + 1 })
            .then(resolve)
            .catch(reject);
          return;
        }
        reject(new Error("Network error while uploading image"));
      };

      xhr.send(body);
    });
  };

  const uploadImage = useCallback((imgEntry) => {
    uploadToImgbb(imgEntry.file, {
      onProgress: (progress) => {
        setImages((prev) =>
          prev.map((item) =>
            item.id === imgEntry.id ? { ...item, progress } : item,
          ),
        );
      },
    })
      .then((url) => {
        setImages((prev) =>
          prev.map((item) =>
            item.id === imgEntry.id
              ? { ...item, uploadedUrl: url, uploading: false, progress: 100 }
              : item,
          ),
        );
      })
      .catch((err) => {
        setImages((prev) =>
          prev.map((item) =>
            item.id === imgEntry.id
              ? { ...item, uploading: false, error: err.message }
              : item,
          ),
        );
        toast.danger(`Image upload failed: ${err.message}`);
      });
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = ""; // allow re-selecting the same file
    if (files.length === 0) return;

    const remainingSlots = MAX_IMAGES - images.length;
    if (remainingSlots <= 0) {
      toast.warning(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const accepted = [];
    for (const file of files.slice(0, remainingSlots)) {
      const validationError = validateFile(file);
      if (validationError) {
        toast.danger(`${file.name}: ${validationError}`);
        continue;
      }
      accepted.push(file);
    }

    if (files.length > remainingSlots) {
      toast.warning(`Only ${remainingSlots} more image(s) can be added.`);
    }

    if (accepted.length === 0) return;

    const withPreview = accepted.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      uploadedUrl: null,
      uploading: true,
      progress: 0,
      error: null,
    }));

    setImages((prev) => [...prev, ...withPreview]);
    withPreview.forEach(uploadImage);
  };

  const retryImage = (id) => {
    setImages((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, uploading: true, error: null, progress: 0 }
          : item,
      ),
    );
    const target = images.find((item) => item.id === id);
    if (target) uploadImage(target);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  };

  const validate = () => {
    const next = {};
    if (!formData.title.trim()) next.title = "Property title is required";
    if (!formData.description.trim())
      next.description = "Description is required";
    if (!formData.location.trim()) next.location = "Location is required";
    if (!formData.propertyType) next.propertyType = "Select a property type";
    if (!formData.rent) next.rent = "Rent amount is required";
    if (!formData.rentType) next.rentType = "Select a rent type";
    if (!formData.ownerName.trim()) next.ownerName = "Owner name is required";
    if (!formData.ownerPhone.trim())
      next.ownerPhone = "Owner phone is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (images.some((img) => img.uploading)) {
      toast.warning("Some images are still uploading. Please wait.");
      return;
    }

    if (images.some((img) => img.error)) {
      toast.warning("Remove or retry failed image uploads before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const imageUrls = images
        .filter((img) => img.uploadedUrl)
        .map((img) => img.uploadedUrl);

      const payload = {
        ...formData,
        amenities,
        images: imageUrls,
        status: "pending",
      };

      const result = await createNewProperty(payload);

      if (result?.insertedId) {
        toast.success("Property added successfully");

        // reset form after a successful submission
        setFormData({
          title: "",
          description: "",
          location: "",
          propertyType: "",
          rent: "",
          rentType: "",
          bedrooms: "",
          bathrooms: "",
          size: "",
          extraFeatures: "",
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
        });
        setAmenities([]);
        images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        setImages([]);
      } else {
        toast.danger("Upload failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.danger("Upload failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const anyUploading = images.some((img) => img.uploading);

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toast.Provider placement="top" />
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
            <Icon icon="gravity-ui:house" width={24} height={24} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Add New Property
            </h1>
            <p className="text-sm text-neutral-500">
              Fill in the details below to list a new property
            </p>
          </div>
          <Chip color="warning" variant="flat" className="ml-auto">
            <div className="flex items-center gap-1">
              <Icon icon="gravity-ui:clock" width={16} />
              <span>Status: Pending</span>
            </div>
          </Chip>
        </div>

        {/* Basic Info */}
        <Section icon="gravity-ui:list-ul" title="Basic Information">
          <Field
            label="Property Title"
            required
            error={errors.title}
            icon="gravity-ui:tag"
          >
            <input
              type="text"
              className={fieldWithIconClass}
              placeholder="e.g. Spacious 3-Bed Apartment in Gulshan"
              value={formData.title}
              onChange={(e) => handleChange("title")(e.target.value)}
              required
            />
          </Field>

          <Field label="Description" required error={errors.description}>
            <textarea
              className={`${fieldClass} min-h-[110px] resize-y`}
              placeholder="Describe the property — layout, condition, nearby landmarks, etc."
              value={formData.description}
              onChange={(e) => handleChange("description")(e.target.value)}
              required
            />
          </Field>

          <Field
            label="Location"
            required
            error={errors.location}
            icon="gravity-ui:geo-pin"
          >
            <input
              type="text"
              className={fieldWithIconClass}
              placeholder="e.g. Road 12, Gulshan 1, Dhaka"
              value={formData.location}
              onChange={(e) => handleChange("location")(e.target.value)}
              required
            />
          </Field>

          <Field
            label="Property Type"
            required
            error={errors.propertyType}
            icon="gravity-ui:layers"
          >
            <select
              className={`${fieldWithIconClass} appearance-none`}
              value={formData.propertyType}
              onChange={(e) => handleChange("propertyType")(e.target.value)}
              required
            >
              <option value="">Select property type</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type.key} value={type.key}>
                  {type.label}
                </option>
              ))}
            </select>
            <Icon
              icon="gravity-ui:chevron-down"
              width={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
          </Field>
        </Section>

        {/* Pricing */}
        <Section icon="gravity-ui:wallet" title="Pricing">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Rent (Price)" required error={errors.rent}>
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
                ৳
              </span>
              <input
                type="number"
                className={fieldWithIconClass}
                placeholder="e.g. 25000"
                value={formData.rent}
                onChange={(e) => handleChange("rent")(e.target.value)}
                required
              />
            </Field>
            <Field
              label="Rent Type"
              required
              error={errors.rentType}
              icon="gravity-ui:calendar"
            >
              <select
                className={`${fieldWithIconClass} appearance-none`}
                value={formData.rentType}
                onChange={(e) => handleChange("rentType")(e.target.value)}
                required
              >
                <option value="">Select rent type</option>
                {RENT_TYPES.map((type) => (
                  <option key={type.key} value={type.key}>
                    {type.label}
                  </option>
                ))}
              </select>
              <Icon
                icon="gravity-ui:chevron-down"
                width={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
            </Field>
          </div>
        </Section>

        {/* Property Details */}
        <Section icon="gravity-ui:ruler" title="Property Details">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field label="Bedrooms" icon="gravity-ui:bed">
              <input
                type="number"
                className={fieldWithIconClass}
                placeholder="e.g. 3"
                value={formData.bedrooms}
                onChange={(e) => handleChange("bedrooms")(e.target.value)}
              />
            </Field>
            <Field label="Bathrooms" icon="gravity-ui:bath">
              <input
                type="number"
                className={fieldWithIconClass}
                placeholder="e.g. 2"
                value={formData.bathrooms}
                onChange={(e) => handleChange("bathrooms")(e.target.value)}
              />
            </Field>
            <Field label="Property Size" icon="gravity-ui:frame">
              <input
                type="text"
                className={fieldWithIconClass}
                placeholder="e.g. 1450 sqft"
                value={formData.size}
                onChange={(e) => handleChange("size")(e.target.value)}
              />
            </Field>
          </div>
        </Section>

        {/* Amenities */}
        <Section icon="gravity-ui:star" title="Amenities">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {AMENITIES.map((item) => {
              const selected = amenities.includes(item.key);
              return (
                <Button
                  type="button"
                  key={item.key}
                  onPress={() => toggleAmenity(item.key)}
                  aria-pressed={selected}
                  variant={selected ? "flat" : "bordered"}
                  color={selected ? "success" : "default"}
                  startContent={<Icon icon={item.icon} width={18} />}
                  className={`justify-start rounded-xl text-sm ${
                    selected
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-neutral-200 text-neutral-600"
                  }`}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </Section>

        {/* Images — imgbb powered upload ----------------------------------------------*/}
        <Section icon="gravity-ui:picture" title="Images">
          <label
            htmlFor="property-images"
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-10 text-center transition-colors ${
              images.length >= MAX_IMAGES
                ? "cursor-not-allowed border-neutral-200 text-neutral-300"
                : "cursor-pointer border-neutral-300 text-neutral-500 hover:border-emerald-400 hover:text-emerald-600"
            }`}
          >
            <Icon icon="gravity-ui:cloud-arrow-up-in" width={28} />
            <span className="text-sm font-medium">
              {images.length >= MAX_IMAGES
                ? `Maximum ${MAX_IMAGES} images reached`
                : "Click to upload images"}
            </span>
            <span className="text-xs text-neutral-400">
              PNG, JPG, WEBP up to {MAX_IMAGE_MB}MB each · {images.length}/
              {MAX_IMAGES} used
            </span>
            <input
              id="property-images"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              className="hidden"
              disabled={images.length >= MAX_IMAGES}
              onChange={handleImageUpload}
            />
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-lg border border-neutral-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.uploadedUrl || img.previewUrl}
                    alt="Property"
                    className="h-28 w-full object-cover"
                  />

                  {img.uploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/50">
                      <Icon
                        icon="gravity-ui:arrows-rotate-left"
                        width={20}
                        className="animate-spin text-white"
                      />
                      <span className="text-[10px] font-medium text-white">
                        {img.progress}%
                      </span>
                    </div>
                  )}

                  {img.error && (
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-red-600/90 px-1.5 py-1 text-[10px] font-medium text-white">
                      <span className="truncate">Failed</span>
                      <button
                        type="button"
                        onClick={() => retryImage(img.id)}
                        className="shrink-0 underline underline-offset-2"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  <Button
                    type="button"
                    isIconOnly
                    size="sm"
                    radius="full"
                    onPress={() => removeImage(img.id)}
                    className="absolute right-1.5 top-1.5 h-6 w-6 min-w-0 bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Icon icon="gravity-ui:xmark" width={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Extra Features */}
        <Section icon="gravity-ui:plus" title="Extra Features">
          <textarea
            className={`${fieldClass} min-h-[90px] resize-y`}
            placeholder="Any additional features not covered above (e.g. rooftop access, pet-friendly, near metro station)"
            value={formData.extraFeatures}
            onChange={(e) => handleChange("extraFeatures")(e.target.value)}
          />
        </Section>

        {/* Owner Information */}
        <Section icon="gravity-ui:person" title="Owner Information">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="Owner Name"
              required
              error={errors.ownerName}
              icon="gravity-ui:person"
            >
              <input
                type="text"
                className={fieldWithIconClass}
                placeholder="Full name"
                value={formData.ownerName}
                onChange={(e) => handleChange("ownerName")(e.target.value)}
                required
              />
            </Field>
            <Field
              label="Phone Number"
              required
              error={errors.ownerPhone}
              icon="gravity-ui:phone"
            >
              <input
                type="tel"
                className={fieldWithIconClass}
                placeholder="e.g. 01XXXXXXXXX"
                value={formData.ownerPhone}
                onChange={(e) => handleChange("ownerPhone")(e.target.value)}
                required
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Email Address" icon="gravity-ui:envelope">
                <input
                  type="email"
                  className={fieldWithIconClass}
                  placeholder="owner@example.com"
                  value={formData.ownerEmail}
                  onChange={(e) => handleChange("ownerEmail")(e.target.value)}
                />
              </Field>
            </div>
          </div>
        </Section>

        <hr className="my-2 border-neutral-200" />

        {/* Status + Submit */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-2 text-sm text-neutral-500">
            <Icon icon="gravity-ui:circle-info" width={16} />
            New listings are set to{" "}
            <strong className="text-neutral-700">Pending</strong> until reviewed
            by an admin.
          </p>
          <div className="flex w-full gap-3 sm:w-auto">
            <Button
              variant="flat"
              color="default"
              type="button"
              className="flex-1 sm:flex-none"
            >
              Save as Draft
            </Button>
            <Button
              color="success"
              type="submit"
              isLoading={submitting}
              isDisabled={anyUploading}
              className="flex-1 text-white sm:flex-none"
              startContent={
                !submitting && <Icon icon="gravity-ui:check" width={18} />
              }
            >
              Submit Property
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
