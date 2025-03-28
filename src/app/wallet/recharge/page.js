"use client";

import PageTitle from "@/components/PageTitle";
import TransactionForm from "@/components/TransactionForm";
import useSession from "@/hooks/useSession";
import { useAddTransactionMutation } from "@/redux/APIs/baseApi";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Recharge = () => {
  const router = useRouter();
  const [addTransaction, { isLoading }] = useAddTransactionMutation();

  const { isAgent } = useSession();

  useEffect(() => {
    if (!isAgent) router.push("/wallet");
  }, [isAgent, router]);

  const submitBalanceRecharge = async (e) => {
    e.preventDefault();
    const currentTarget = e.currentTarget;
    const formData = new FormData(currentTarget);
    const data = Object.fromEntries(formData);

    if (data.note.length > 50) {
      return toast.error("Note must be within 50 character");
    }

    const transactionData = {
      ...data,
      type: "balance_recharge",
    };

    try {
      const res = await addTransaction({
        url: "/recharge",
        data: transactionData,
      });

      if (res.error) {
        console.log(res.error);
        throw Error(res?.error?.data?.message);
      }

      router.push("/wallet");

      toast.success("Balance recharge request sent and under review", {
        duration: 6000,
      });
    } catch (error) {
      toast.error(error.message || "Balance request failed");
    }
  };

  return (
    <div>
      <PageTitle>Balance recharge</PageTitle>

      <TransactionForm
        submitInProgress={isLoading}
        submitTransaction={submitBalanceRecharge}
      />
    </div>
  );
};

export default Recharge;
