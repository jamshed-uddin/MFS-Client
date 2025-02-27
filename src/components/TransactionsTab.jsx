"use client";

import useSession from "@/hooks/useSession";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const transactionTypes = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Send money",
    value: "send_money",
  },
  {
    name: "Cash in",
    value: "cash_in",
  },
  {
    name: "Cash out",
    value: "cash_out",
  },
  {
    name: "Withdrawal",
    value: "withdrawal",
  },
  {
    name: "Balance recharge",
    value: "balance_recharge",
  },
];
const TransactionsTab = () => {
  const { user } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectTab = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }

    router.push(`/wallet/transactions?${params?.toString()}`, {
      scroll: false,
    });
  };

  const roleBasedFilters = {
    admin: transactionTypes,
    agent: transactionTypes.filter(({ value }) =>
      ["cash_in", "withdrawal", "balance_recharge", "all"].includes(value)
    ),
    user: transactionTypes.filter(({ value }) =>
      ["send_money", "cash_out", "all"].includes(value)
    ),
  };

  return (
    <div className="flex flex-nowrap gap-2 mb-4 overflow-x-auto hide-scrollbar ">
      {roleBasedFilters[user?.role]?.map(({ name, value }) => (
        <div
          onClick={() => handleSelectTab(value)}
          key={value}
          className={clsx(
            "border border-blue-500 px-2 rounded-lg shrink-0 text-sm py-0.5 font-medium cursor-pointer",
            {
              "bg-blue-500 text-white":
                value === searchParams.get("type")?.toString(),
            }
          )}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default TransactionsTab;
