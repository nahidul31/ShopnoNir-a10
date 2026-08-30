"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, Tooltip, toast } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";

export default function DeletePropertyModal({ property }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/property/${property._id}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Property deleted", {
        description: `"${property.title}" has been removed.`,
      });

      setIsOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.danger("Delete failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Tooltip content="Delete property">
        <Button isIconOnly size="sm" variant="tertiary">
          <TrashBin className="size-4 text-danger" />
        </Button>
      </Tooltip>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[420px]">
            <Modal.CloseTrigger isDisabled={deleting} />

            <Modal.Header>
              <Modal.Icon className="bg-danger-100 text-danger-600">
                <TrashBin className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Delete Property</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-sm text-default-600 leading-relaxed">
                <span className="font-medium text-default-800">
                  {property.title}
                </span>{" "}
                will be permanently removed from the platform. This action
                cannot be undone.
              </p>

              <p className="text-xs text-default-400 mt-3">
                Owner: {property.ownerName} · {property.location}
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" slot="close" isDisabled={deleting}>
                Cancel
              </Button>

              <Button
                onPress={handleDelete}
                isDisabled={deleting}
                className="bg-danger-500 text-white"
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
