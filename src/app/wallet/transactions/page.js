import PageTitle from "@/components/PageTitle";
import TransactionsList from "@/components/TransactionsList";
import TransactionsTab from "@/components/TransactionsTab";
import getTransactions from "@/utils/getTransactions";
import React from "react";

const Transactions = async ({ searchParams }) => {
  const params = await searchParams;
  const validQueries = ["type", "status"];

  const validQueryParams = (searchParams, validQueries) => {
    const queries = {};

    validQueries.forEach((key) => {
      if (key in searchParams) {
        queries[key] = searchParams[key];
      }
    });

    return new URLSearchParams(queries).toString();
  };

  const validParams = validQueryParams(params, validQueries);

  const transactions = await getTransactions(`/transactions?${validParams}`);

  return (
    <div>
      <PageTitle>Transactions</PageTitle>

      <TransactionsTab />
      <TransactionsList transactions={transactions?.data} />
    </div>
  );
};

export default Transactions;
