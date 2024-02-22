import { Button } from "@/components/ui/button";
import Image from "next/image";

const EmptyBoards = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="./note.svg" alt="search-img" height={200} width={200} />

      <h2 className="text-2xl font-semibold mt-6">Create your canvas 🌚</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating canvas for your team!!
      </p>
      <div className="mt-6">
        <Button size="lg">Create your canvas</Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
