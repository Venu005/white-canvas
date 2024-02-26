"use client";

import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@/liveblocks.config";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";

interface CursorProps {
  connectionId: number;
}
export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  const name = info?.name || "Friend";
  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    // in order to render in an svg element  using foreignObject
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div className="absolute left-5 px-1.5 py-0.5 rounded-e-md text-xs text-white font-semibold" style={{backgroundColor: connectionIdToColor(connectionId)}}>
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
