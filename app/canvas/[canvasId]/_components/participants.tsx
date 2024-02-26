"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";
// bug - self name as some friend
const MAX_SHOWN_USERS = 2; //  3 users 2 +  self
export const Participants = () => {
  const users = useOthers();
  const self = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute h-12 top-2 right-2  bg-white rounded-md  p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "F"}
            />
          );
        })}
        {self && (
          <UserAvatar
            borderColor={connectionIdToColor(self.connectionId)}
            src={self.info?.picture}
            name={`${self.info?.name} (You)`}
            fallback={self.info?.name?.[0]}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2  bg-white rounded-md  p-3 flex items-center shadow-md w-[100px]">
      <Skeleton className="h-full  w-full bg-muted-400" />
    </div>
  );
};
