"use client";
import PageTitle from "@/components/PageTitle";
import TransactionForm from "@/components/TransactionForm";
import useSession from "@/hooks/useSession";
import handleSubmitTransaction from "@/utils/handleSubmitTransaction";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SendMoney = () => {
  const router = useRouter();
  const { revalidateUser } = useSession();
  const [loading, setLoading] = useState(false);
  const submitSendMoney = async (e) => {
    e.preventDefault();
    const currentTarget = e.currentTarget;
    const formData = new FormData(currentTarget);
    const data = Object.fromEntries(formData);

    if (data.note.length > 50) {
      return toast.error("Note must be within 50 character");
    }

    const transactionData = {
      ...data,
      type: "send_money",
    };

    try {
      setLoading(true);
      const data = await handleSubmitTransaction("/sendmoney", transactionData);
      console.log(data);
      router.push("/wallet");
      revalidateUser();
      toast.success("Send money successful", { duration: 6000 });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle>Send money</PageTitle>
      <TransactionForm
        submitTransaction={submitSendMoney}
        submitInProgress={loading}
      />
    </div>
  );
};

export default SendMoney;
