"use client";

import PageTitle from "@/components/PageTitle";
import TransactionForm from "@/components/TransactionForm";
import useSession from "@/hooks/useSession";
import handleSubmitTransaction from "@/utils/handleSubmitTransaction";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Recharge = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const data = await handleSubmitTransaction("/recharge", transactionData);
      console.log(data);
      router.push("/wallet");
      revalidateUser();
      toast.success("Balance recharge request sent and under review", {
        duration: 6000,
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle>Balance recharge</PageTitle>

      <TransactionForm
        submitInProgress={loading}
        submitTransaction={submitBalanceRecharge}
      />
    </div>
  );
};

export default Recharge;
