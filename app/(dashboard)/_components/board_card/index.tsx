"use client";

import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";

interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}
const BoardCard = ({
  id,
  title,
  authorName,
  authorId,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  //1.rendering info on who created the canvas and when from the current day
  // 2.create footer
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });
  return (
    <Link href={`/canvas/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};
BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg  overflow-hidden">
      <Skeleton  className="h-full w-full"/>
    </div>
  );
};

export default BoardCard;
