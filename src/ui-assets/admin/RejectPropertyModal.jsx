"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, Tooltip, toast } from "@heroui/react";
import { CircleXmark } from "@gravity-ui/icons";

export default function RejectPropertyModal({ property }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState(property.rejectionFeedback || "");
  const [submitting, setSubmitting] = useState(false);

  const handleReject = async () => {
    console.log("1. Button clicked. Feedback:", feedback);

    if (!feedback.trim()) {
      toast.warning("Please write the reason for rejection");
      return;
    }

    setSubmitting(true);

    const url = `${process.env.NEXT_PUBLIC_URL}/api/property/${property._id}`;
    console.log("2. Sending PATCH to:", url);

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "rejected",
          rejectionFeedback: feedback.trim(),
        }),
      });

      console.log("3. Response status:", res.status);

      const data = await res.json();
      console.log("4. Response body:", data);

      if (!res.ok) throw new Error("Failed");

      toast.success("Property rejected", {
        description: "The owner can now see your feedback.",
      });

      setIsOpen(false);
      router.refresh();
    } catch (err) {
      console.error("5. Error:", err);
      toast.danger("Failed to reject property");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Tooltip
        content={
          property.status === "rejected"
            ? "Edit rejection feedback"
            : "Reject with feedback"
        }
      >
        <Button isIconOnly size="sm" variant="danger-soft">
          <CircleXmark className="size-4" />
        </Button>
      </Tooltip>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[480px]">
            <Modal.CloseTrigger isDisabled={submitting} />

            <Modal.Header>
              <Modal.Icon className="bg-danger-soft text-danger-soft-foreground">
                <CircleXmark className="size-5" />
              </Modal.Icon>
              <Modal.Heading>
                {property.status === "rejected"
                  ? "Edit Rejection Feedback"
                  : "Reject Property"}
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-4">
                <div className="bg-default-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-default-800">
                    {property.title}
                  </p>
                  <p className="text-xs text-default-500 mt-0.5">
                    Listed by {property.ownerName}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-default-600 mb-1.5">
                    Reason for rejection *
                  </label>
                  <textarea
                    value={feedback}
                    rows={4}
                    disabled={submitting}
                    placeholder="Explain what needs to be fixed — missing details, unclear photos, pricing issues, etc."
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full border border-default-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F0DADD] focus:border-[#A61C3C] transition-colors disabled:opacity-60"
                  />
                  <p className="text-xs text-default-400 mt-1.5">
                    The owner will see this message.
                  </p>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" slot="close" isDisabled={submitting}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onPress={handleReject}
                isDisabled={submitting}
              >
                {submitting
                  ? "Saving..."
                  : property.status === "rejected"
                    ? "Update Feedback"
                    : "Reject Property"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
