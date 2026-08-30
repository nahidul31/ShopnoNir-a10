"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, Tooltip, toast } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";

export default function DeletePropertyModal({ property, token }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/property/${property._id}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        },
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
        <Button isIconOnly size="sm" variant="danger-soft">
          <TrashBin className="size-4" />
        </Button>
      </Tooltip>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[420px]">
            <Modal.CloseTrigger isDisabled={deleting} />

            <Modal.Header>
              <Modal.Icon className="bg-danger-soft text-danger-soft-foreground">
                <TrashBin className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Delete Property</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-4">
                <div className="bg-default-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-default-800">
                    {property.title}
                  </p>
                  <p className="text-xs text-default-500 mt-0.5">
                    {property.location}
                  </p>
                </div>

                <p className="text-sm text-default-700 leading-relaxed">
                  This property will be permanently removed from the platform.
                  This action cannot be undone.
                </p>
              </div>
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
