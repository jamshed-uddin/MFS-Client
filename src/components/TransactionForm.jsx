"use client";

import React, { useState } from "react";
import Button from "./Button";
import ReceiverNumber from "./ReceiverNumber";
import useSession from "@/hooks/useSession";
import { usePathname } from "next/navigation";
import PinInput from "./PinInput";
import { useNetworkState } from "@uidotdev/usehooks";

const TransactionForm = ({ submitTransaction, submitInProgress }) => {
  const pathname = usePathname();
  const { online } = useNetworkState();

  const { user } = useSession();

  const inputStyle =
    "input  border-b bg-inherit border-b-gray-400 rounded-none outline-none focus:outline-none focus:border-0 focus:border-b focus:border-b-gray-400 w-full px-1";

  return (
    <form
      className="space-y-4"
      onSubmit={submitTransaction}
      data-testid="transactionForm"
    >
      {/* receiver number */}
      {/* withdrawal and recharge request goes to admin and while receiver is admin it's handled in server */}
      {pathname !== "/wallet/withdraw" && pathname !== "/wallet/recharge" && (
        <ReceiverNumber />
      )}
      {/* amount*/}
      <div className="">
        <label className={"text-sm font-medium"} htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
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
          <h2>Useable balance: {user?.balance}</h2>
        </div>
      </div>
      {/* receiver number */}
      <div className="">
        <div className="flex justify-between">
          <label className={"text-sm font-medium"} htmlFor="note">
            Note
          </label>
          <h4 className="text-sm ">50 character</h4>
        </div>
        <input
          id="note"
          name="note"
          type="text"
          className={inputStyle}
          placeholder="Note"
        />
      </div>

      <div className="">
        <label className={"text-sm font-medium"} htmlFor="pin">
          Pin
        </label>
        <PinInput className={inputStyle} />
      </div>

      <div>
        <Button
          type="submit"
          disabled={submitInProgress || !online}
          loading={submitInProgress}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
