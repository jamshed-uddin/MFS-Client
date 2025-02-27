"use client";

import PageTitle from "@/components/PageTitle";
import TransactionForm from "@/components/TransactionForm";
import useSession from "@/hooks/useSession";
import handleSubmitTransaction from "@/utils/handleSubmitTransaction";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Cashin = () => {
  const router = useRouter();
  const { isAgent } = useSession();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const data = await handleSubmitTransaction("/cashin", transactionData);
      console.log(data);
      router.push("/wallet");
      revalidateUser();
      toast.success("Cash in successful", { duration: 6000 });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle>Cash in</PageTitle>
      <TransactionForm
        submitTransaction={submitCashin}
        submitInProgress={loading}
      />
    </div>
  );
};

export default Cashin;
