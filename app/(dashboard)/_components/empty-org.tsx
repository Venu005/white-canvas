import { Button } from "@/components/ui/button";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { DialogContent, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/canvas_board.svg"
        alt="when empty render"
        height={350}
        width={350}
      />
      <h2 className="text-2xl font-semibold">Welcome to Canvas!!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <div className="mt-4">
            <Button size= "lg">Let&apos;s Go</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmptyOrg;
