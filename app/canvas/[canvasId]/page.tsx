import { Room } from "@/components/room";
import Canvas from "./_components/canvas";
import { Loading } from "./_components/loading";
interface CanvasIdProps {
  params: {
    canvasId: string;
  };
}
const CanvasIdPage = ({ params }: CanvasIdProps) => {
  return (
    <Room roomId={params.canvasId} fallback={<Loading />}>
      <Canvas canvasId={params.canvasId} />
    </Room>
  );
};

export default CanvasIdPage;
