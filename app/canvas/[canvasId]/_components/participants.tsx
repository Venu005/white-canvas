import { Skeleton } from "@/components/ui/skeleton";

const Participants = () => {
  return (
    <div className="absolute h-12 top-2 right-2  bg-white rounded-md  p-3 flex items-center shadow-md">
      Participants
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2  bg-white rounded-md  p-3 flex items-center shadow-md w-[100px]">
      <Skeleton className="h-full  w-full bg-muted-400" />
    </div>
  );
};

export default Participants;
