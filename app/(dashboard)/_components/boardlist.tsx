import EmptyBoards from "./empty-boards";
import EmptyFav from "./empty-fav";
import EmptySearch from "./empty-search";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import BoardCard from "./board_card";
import NewBoardButton from "./new-board-button";
interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const Boardlist = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId }); // changing into api call later
  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite Canvas" : "Team Canvas"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }
  if (!data.length && query.search) {
    return <EmptySearch />;
  }
  if (!data.length && query.favorites) {
    return <EmptyFav />;
  }
  if (!data.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite Canvas" : "Team Canvas"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Boardlist;
