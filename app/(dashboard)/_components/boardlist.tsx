"use client";

import EmptyBoards from "./empty-boards";
import EmptyFav from "./empty-fav";
import EmptySearch from "./empty-search";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const Boardlist = ({ orgId, query }: BoardListProps) => {
  const data = []; // changing into api call later

  if (!data.length && query.search) {
    return <EmptySearch />;
  }
  if (!data.length && query.favorites) {
    return <EmptyFav />;
  }
  if (!data.length) {
    return <EmptyBoards />;
  }
};

export default Boardlist;
