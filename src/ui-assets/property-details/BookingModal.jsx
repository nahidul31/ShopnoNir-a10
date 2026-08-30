"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, toast } from "@heroui/react";
import { Calendar } from "@gravity-ui/icons";

export default function BookingModal({ property, user }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    moveInDate: "",
    contactNumber: "",
    notes: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!form.moveInDate || !form.contactNumber) {
      toast.warning("Move-in date and contact number are required");
      return;
    }

    const params = new URLSearchParams({
      propertyId: property._id,
      moveInDate: form.moveInDate,
      contactNumber: form.contactNumber,
      notes: form.notes,
    });

    setIsOpen(false);
    router.push(`/payment?${params.toString()}`);
  };

  const inputClass =
    "w-full border border-default-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F0DADD] focus:border-[#A61C3C] transition-colors";
  const labelClass = "block text-xs font-medium text-default-600 mb-1.5";

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        size="lg"
        radius="full"
        className="w-full font-semibold bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] text-white"
      >
        Book Now
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[480px]">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-[#FBE7EA] text-[#8C1C2B]">
                <Calendar className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Book This Property</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-4">
                {/* Property summary */}
                <div className="bg-default-50 rounded-xl p-3">
                  <p className="font-medium text-sm text-default-800">
                    {property.title}
                  </p>
                  <p className="text-xs text-default-500 mt-0.5">
                    {property.location}
                  </p>
                  <p className="text-sm font-semibold text-[#8C1C2B] mt-1">
                    ৳{property.rent} /
                    {property.rentType === "monthly" ? "mo" : property.rentType}
                  </p>
                </div>

                {/* User info */}
                <div>
                  <label className={labelClass}>Your Info</label>
                  <div className="bg-default-50 rounded-lg px-3 py-2">
                    <p className="text-sm font-medium text-default-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-default-500">{user?.email}</p>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Move-in Date *</label>
                  <input
                    type="date"
                    value={form.moveInDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleChange("moveInDate", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Contact Number *</label>
                  <input
                    type="tel"
                    value={form.contactNumber}
                    placeholder="01XXXXXXXXX"
                    onChange={(e) =>
                      handleChange("contactNumber", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Additional Notes</label>
                  <textarea
                    value={form.notes}
                    rows={3}
                    placeholder="Anything the owner should know?"
                    onChange={(e) => handleChange("notes", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" slot="close">
                Cancel
              </Button>
              <Button
                onPress={handleConfirm}
                className="bg-gradient-to-r from-[#A61C3C] to-[#4A0E1A] text-white"
              >
                Proceed to Payment
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
