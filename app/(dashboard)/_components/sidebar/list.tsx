"use client";

import { useOrganizationList } from "@clerk/nextjs";
import Item from "./item";

// contains the List of organizations created by the user

const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;
  return (
    <ul className="space-y-4">
      {userMemberships.data?.map((member) => (
        <Item
          id={member.organization.id}
          key={member.organization.id}
          name={member.organization.name}
          imageUrl={member.organization.imageUrl}
        />
      ))}
    </ul>
  );
};

export default List;
