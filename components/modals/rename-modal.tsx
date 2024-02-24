"use client";

import { useRenameModal } from "@/store/use-rename-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useApiMutation from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);
  // this method is not very efficient not recommended
  const { mutate, pending } = useApiMutation(api.board.updateBoard);
  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({ id: initialValues.id, title })
      .then(() => {
        toast.success("Canvas Renamed");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to rename canvas");
      });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Canvas Title</DialogTitle>
          <DialogDescription>
            Enter a new title for your canvas
          </DialogDescription>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              disabled={pending}
              required
              maxLength={75}
              placeholder="Name your canvas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={pending}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
