import React from "react";
import PageTitle from "./PageTitle";
import TransactionsList from "./TransactionsList";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import getTransactions from "@/utils/getTransactions";

const RecentTransactions = async () => {
  const transactions = await getTransactions("/transactions?limit=5");

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>Recent transactions</PageTitle>
        <Link
          href={"/wallet/transactions"}
          className="text-sm text-blue-500 font-medium"
        >
          See all <ArrowRightIcon className="w-4 inline" />
        </Link>
      </div>
      <TransactionsList transactions={transactions?.data} />
    </div>
  );
};

export default RecentTransactions;
