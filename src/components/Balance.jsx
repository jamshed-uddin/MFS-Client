"use client";

import React from "react";
import { useGetSystemBalanceQuery } from "@/redux/APIs/baseApi";
import useSession from "@/hooks/useSession";
import BalanceCard from "./BalanceCard";

const Balance = () => {
  const { user, userLoading, isAdmin } = useSession();

  const { data: systemBalance, isLoading: systemBalanceLoading } =
    useGetSystemBalanceQuery(undefined, { skip: !isAdmin });

  return (
    <div>
      {/* balance */}
      <div className="grid grid-cols-1 md:grid-cols-2  lg:gap-3 space-y-4 md:space-y-0">
        {/* user and agent balance */}
        <BalanceCard
          balance={user?.balance}
          balanceLoading={userLoading}
          name={"Balance"}
        />
        {!userLoading && isAdmin && (
          <BalanceCard
            balance={systemBalance}
            balanceLoading={systemBalanceLoading}
            name={"System balance"}
          />
        )}
      </div>
    </div>
  );
};

export default Balance;
