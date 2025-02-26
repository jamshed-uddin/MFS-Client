"use client";

import React, { useState } from "react";

const TransactionForm = ({ submitTransaction, submitInProgress }) => {
  const [receiverNumber, setReceiverNumber] = useState("");
  const inputStyle =
    "input  border-b bg-inherit border-b-gray-400 rounded-none outline-none focus:outline-none focus:border-0 focus:border-b focus:border-b-gray-400 w-full px-1";

  console.log(cookieStore.get("hello"));
  return (
    <form onSubmit={submitTransaction} className="space-y-4">
      {/* receiver number */}
      <div className="">
        <label className={"text-sm font-medium"}>Receiver number</label>
        <input
          type="text"
          className={inputStyle}
          placeholder="Receiver number"
        />
      </div>
      {/* amount*/}
      <div className="">
        <label className={"text-sm font-medium"}>Amount</label>
        <input type="text" className={inputStyle} placeholder="Amount" />

        <div className="flex justify-between text-sm font-medium">
          <h2>Useable balance: 1000</h2>
        </div>
      </div>
      {/* receiver number */}
      <div className="">
        <label className={"text-sm font-medium"}>Note</label>
        <input type="text" className={inputStyle} placeholder="Note" />
      </div>
    </form>
  );
};

export default TransactionForm;
