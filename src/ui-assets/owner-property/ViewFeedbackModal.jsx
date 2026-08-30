"use client";

import { useState } from "react";
import { Button, Modal, Tooltip } from "@heroui/react";
import { Eye } from "@gravity-ui/icons";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ViewFeedbackModal({ property }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Tooltip content="View rejection feedback">
        <Button isIconOnly size="sm" variant="danger-soft">
          <Eye className="size-4" />
        </Button>
      </Tooltip>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[440px]">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-danger-soft text-danger-soft-foreground">
                <Eye className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Rejection Feedback</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-4">
                <div className="bg-default-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-default-800">
                    {property.title}
                  </p>
                  {property.rejectedAt && (
                    <p className="text-xs text-default-500 mt-0.5">
                      Rejected on {formatDate(property.rejectedAt)}
                    </p>
                  )}
                </div>

                <div className="border-l-4 border-danger rounded-r-lg bg-danger-soft/30 px-4 py-3">
                  <p className="text-sm text-default-700 leading-relaxed">
                    {property.rejectionFeedback || "No feedback was provided."}
                  </p>
                </div>

                <p className="text-xs text-default-400">
                  Update your listing based on this feedback and it will be
                  reviewed again.
                </p>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" className="w-full">
                Got it
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
