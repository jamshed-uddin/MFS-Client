import React from "react";
import TransactionCard from "./TransactionCard";

const TransactionsList = ({ transactions }) => {
  return (
    <div>
      {!transactions?.length ? (
        <div>No transaction found</div>
      ) : (
        <div className="space-y-2">
          {transactions?.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
