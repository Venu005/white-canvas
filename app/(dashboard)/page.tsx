"use client";

import Boardlist from "./_components/boardlist";
import EmptyOrg from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";
// addind empty  states for favotietes and search
interface HomeProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}
export default function Home({ searchParams }: HomeProps) {
  const { organization } = useOrganization();
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? <EmptyOrg /> : <Boardlist orgId = {organization.id} query = {searchParams}/>}
    </div>
  );
}
