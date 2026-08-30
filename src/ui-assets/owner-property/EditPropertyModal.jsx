"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, Tooltip, toast } from "@heroui/react";
import { Pencil } from "@gravity-ui/icons";

const propertyTypes = [
  "apartment",
  "villa",
  "room",
  "office",
  "house",
  "studio",
];
const rentTypes = ["monthly", "weekly", "daily"];

export default function EditPropertyModal({ property }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    title: property.title || "",
    description: property.description || "",
    location: property.location || "",
    propertyType: property.propertyType || "",
    rent: property.rent ?? "",
    rentType: property.rentType || "monthly",
    bedrooms: property.bedrooms ?? "",
    bathrooms: property.bathrooms ?? "",
    size: property.size ?? "",
    extraFeatures: property.extraFeatures || "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/property/${property._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            rent: Number(form.rent),
            bedrooms: Number(form.bedrooms),
            bathrooms: Number(form.bathrooms),
            size: Number(form.size),
          }),
        },
      );

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Property updated", {
        description: `"${form.title}" has been saved successfully.`,
      });

      setIsOpen(false); // modal auto close
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.danger("Update failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full border border-default-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F0DADD] focus:border-[#A61C3C] transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
  const labelClass = "block text-xs font-medium text-default-600 mb-1.5";

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Tooltip content="Edit property">
        <Button isIconOnly size="sm" variant="tertiary">
          <Pencil className="size-4" />
        </Button>
      </Tooltip>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[640px]">
            <Modal.CloseTrigger isDisabled={saving} />

            <Modal.Header>
              <Modal.Icon className="bg-[#FBE7EA] text-[#8C1C2B]">
                <Pencil className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Property</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Title</label>
                  <input
                    type="text"
                    value={form.title}
                    disabled={saving}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea
                    value={form.description}
                    disabled={saving}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    rows={3}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    value={form.location}
                    disabled={saving}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Property Type</label>
                  <select
                    value={form.propertyType}
                    disabled={saving}
                    onChange={(e) =>
                      handleChange("propertyType", e.target.value)
                    }
                    className={`${inputClass} capitalize bg-white cursor-pointer`}
                  >
                    <option value="">Select type</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type} className="capitalize">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Rent (৳)</label>
                  <input
                    type="number"
                    value={form.rent}
                    disabled={saving}
                    onChange={(e) => handleChange("rent", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Rent Type</label>
                  <select
                    value={form.rentType}
                    disabled={saving}
                    onChange={(e) => handleChange("rentType", e.target.value)}
                    className={`${inputClass} capitalize bg-white cursor-pointer`}
                  >
                    {rentTypes.map((type) => (
                      <option key={type} value={type} className="capitalize">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Bedrooms</label>
                  <input
                    type="number"
                    value={form.bedrooms}
                    disabled={saving}
                    onChange={(e) => handleChange("bedrooms", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Bathrooms</label>
                  <input
                    type="number"
                    value={form.bathrooms}
                    disabled={saving}
                    onChange={(e) => handleChange("bathrooms", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Size (sqft)</label>
                  <input
                    type="number"
                    value={form.size}
                    disabled={saving}
                    onChange={(e) => handleChange("size", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Extra Features</label>
                  <input
                    type="text"
                    value={form.extraFeatures}
                    disabled={saving}
                    onChange={(e) =>
                      handleChange("extraFeatures", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" slot="close" isDisabled={saving}>
                Cancel
              </Button>

              <Button
                onPress={handleSubmit}
                isDisabled={saving}
                className="bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] text-white"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
