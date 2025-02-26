"use client";

import React, { useState } from "react";
import Button from "./Button";
import ReceiverNumber from "./ReceiverNumber";

const TransactionForm = ({ submitTransaction, submitInProgress }) => {
  const [receiverNumber, setReceiverNumber] = useState("");
  const inputStyle =
    "input  border-b bg-inherit border-b-gray-400 rounded-none outline-none focus:outline-none focus:border-0 focus:border-b focus:border-b-gray-400 w-full px-1";

  return (
    <form onSubmit={submitTransaction} className="space-y-4">
      {/* receiver number */}
      <ReceiverNumber />
      {/* amount*/}
      <div className="">
        <label className={"text-sm font-medium"}>Amount</label>
        <input
          name="amount"
          type="text"
          inputMode="numeric"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
          }}
          className={inputStyle}
          placeholder="Amount"
          required
        />

        <div className="flex justify-between text-sm font-medium">
          <h2>Useable balance: 1000</h2>
        </div>
      </div>
      {/* receiver number */}
      <div className="">
        <label className={"text-sm font-medium"}>Note</label>
        <input
          name="note"
          type="text"
          className={inputStyle}
          placeholder="Note"
        />
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default TransactionForm;
