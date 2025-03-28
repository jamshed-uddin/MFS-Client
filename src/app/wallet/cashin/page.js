"use client";

import PageTitle from "@/components/PageTitle";
import TransactionForm from "@/components/TransactionForm";
import useSession from "@/hooks/useSession";
import { useAddTransactionMutation } from "@/redux/APIs/baseApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Cashin = () => {
  const router = useRouter();
  const { isAgent } = useSession();
  const [addTransaction, { isLoading }] = useAddTransactionMutation();

  useEffect(() => {
    if (!isAgent) router.push("/wallet");
  }, [isAgent, router]);

  const submitCashin = async (e) => {
    e.preventDefault();
    const currentTarget = e.currentTarget;
    const formData = new FormData(currentTarget);
    const data = Object.fromEntries(formData);

    if (data.note.length > 50) {
      return toast.error("Note must be within 50 character");
    }

    const transactionData = {
      ...data,
      type: "cash_in",
    };

    try {
      const res = await addTransaction({
        url: "/cashin",
        data: transactionData,
      });

      if (res.error) {
        console.log(res.error);
        throw Error(res?.error?.data?.message);
      }

      router.push("/wallet");

      toast.success("Cash in successful", { duration: 6000 });
    } catch (error) {
      toast.error(error.message || "Cash in failed");
    }
  };

  return (
    <div>
      <PageTitle>Cash in</PageTitle>
      <TransactionForm
        submitTransaction={submitCashin}
        submitInProgress={isLoading}
      />
    </div>
  );
};

export default Cashin;
