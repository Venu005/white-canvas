"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import useApiMutation from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

const Actions = ({ children, side, sideOffset, id, title }: ActionProps) => {
  const { mutate, pending } = useApiMutation(api.board.deleteBoard);
  const { onOpen } = useRenameModal();
  const oncopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy link to clipboard");
      });
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => {
        toast.success("Canvas Deleted");
      })
      .catch(() => {
        toast.error("Failed to delete canvas");
      });
  };
  // const onUpdate = () => {

  //   updateBoard({ id, title: "New Canvas" })
  //     .then(() => {
  //       toast.success("Canvas Renamed");
  //     })
  //     .catch(() => {
  //       toast.error("Failed to rename canvas");
  //     });
  // };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem onClick={oncopyLink} className="p-3 cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          Copy Canvas Link
        </DropdownMenuItem>
        {/* renaming the canvas  */}
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className="p-3 cursor-pointer"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete Canvas?"
          description="This will delete the entire canvas 😣"
          onConfirm={onDelete}
        >
          <Button
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
            variant="ghost"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
