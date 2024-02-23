"use client";

import { api } from "@/convex/_generated/api";
import useApiMutation from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";

import { Plus } from "lucide-react";
import { toast } from "sonner";

// button to create a new canvas

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.createBoard);
  const onClick = () => {
    mutate({
      orgId,
      title: "New Canvas",
    })
      .then((id) => {
        toast.success("Canvas created successfully");
        // later redirect to the canavas via the id
      })
      .catch(() => {
        toast.error("Failed to create canvas");
      });
  };
  return (
    <button
      disabled={pending || disabled}
      onClick={() => {
        onClick();
      }}
      className={cn(
        "col-span-1 aspect-[100/127] bg-amber-500 rounded-lg hover:bg-amber-600 flex flex-col items-center justify-center py-6",
        (disabled || pending) && "opacity-75 hover:bg-amber-500 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 stroke-1 text-white" />
      <p className="text-xs text-white font-semibold">New Canvas</p>
    </button>
  );
};

export default NewBoardButton;
