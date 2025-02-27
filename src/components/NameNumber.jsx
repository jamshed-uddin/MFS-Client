"use client";

import useSession from "@/hooks/useSession";
import React from "react";

export const NameNumberCard = ({ name, number }) => {
  return (
    <div>
      <h2 className="text-xl font-medium">{name}</h2>
      <h3 className="text-sm">{number}</h3>
    </div>
  );
};

const NameNumber = () => {
  const { user } = useSession();

  return <NameNumberCard name={user?.name} number={user?.mobileNumber} />;
};

export default NameNumber;
