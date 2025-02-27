"use client";

import PageTitle from "@/components/PageTitle";
import TransactionForm from "@/components/TransactionForm";
import useSession from "@/hooks/useSession";
import handleSubmitTransaction from "@/utils/handleSubmitTransaction";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Withdraw = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { isAgent } = useSession();

  useEffect(() => {
    if (!isAgent) router.push("/wallet");
  }, [isAgent, router]);

  const submitWithdrawal = async (e) => {
    e.preventDefault();
    const currentTarget = e.currentTarget;
    const formData = new FormData(currentTarget);
    const data = Object.fromEntries(formData);

    if (data.note.length > 50) {
      return toast.error("Note must be within 50 character");
    }

    const transactionData = {
      ...data,
      type: "withdrawal",
    };

    try {
      setLoading(true);
      const data = await handleSubmitTransaction(
        "/withdrawal",
        transactionData
      );

      router.push("/wallet");
      revalidateUser();
      toast.success("Withdrawal request sent and under review", {
        duration: 6000,
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle>Withdraw</PageTitle>
      <TransactionForm
        submitTransaction={submitWithdrawal}
        submitInProgress={loading}
      />
    </div>
  );
};

export default Withdraw;
