"use client";

import useSession from "@/hooks/useSession";
import { requestClient } from "@/utils/requestClient";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import React, { useState } from "react";
import useSWR from "swr";
import PriceTag from "./PriceTag";

const BalanceCard = ({ balance, name }) => {
  const [showBalance, setShowBalance] = useState({
    balance: false,
    systemBalance: false,
  });

  Cookies.set("hello", "hello there");
  return (
    <div
      className={`border border-blue-500 rounded-xl h-20 w-full p-2 relative `}
    >
      <h3 className="text-sm font-medium mb-2">{name}</h3>

      <h3
        className={`transition-all duration-500 ${
          !showBalance.balance ? "blur-sm" : "blur-none"
        }`}
      >
        {" "}
        {/* ${balance} */}
        <PriceTag price={balance} />
      </h3>
      <span className="absolute top-1 right-1 cursor-pointer z-40">
        {showBalance.balance ? (
          <EyeIcon
            className="w-4"
            onClick={() => setShowBalance((p) => ({ ...p, balance: false }))}
          />
        ) : (
          <EyeSlashIcon
            className="w-4"
            onClick={() => setShowBalance((p) => ({ ...p, balance: true }))}
          />
        )}
      </span>
    </div>
  );
};

const Balance = () => {
  const { user, isAdmin } = useSession();
  const { data: totalBalance } = useSWR("/users/systembalance", async (url) => {
    if (!isAdmin) return;
    const data = await requestClient(url);
    return data?.totalBalance;
  });

  console.log(isAdmin);

  return (
    <div>
      {/* balance */}
      <div className="grid grid-cols-1 md:grid-cols-2  lg:gap-3 space-y-4 md:space-y-0">
        {/* user and agent balance */}
        <BalanceCard balance={user?.balance} name={"Balance"} />
        {isAdmin && (
          <BalanceCard balance={totalBalance} name={"System balance"} />
        )}
      </div>
    </div>
  );
};

export default Balance;
