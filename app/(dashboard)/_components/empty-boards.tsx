"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { createBoard } from "@/convex/board";
import useApiMutation from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { toast } from "sonner";

const EmptyBoards = () => {
  const { mutate, pending } = useApiMutation(api.board.createBoard);
  const { organization } = useOrganization();
  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Canvas created successfully");
        // redirect to the created board --my idea use link from nextjs

      })
      .catch(() => {
        toast.error("Failed to create canvas");
      });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="./note.svg" alt="search-img" height={200} width={200} />

      <h2 className="text-2xl font-semibold mt-6">
        Create your canvas <span>🌚</span>
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating canvas for your team!!
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={onClick} disabled={pending}>
          Create your canvas
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
