"use client";
import PageTitle from "@/components/PageTitle";
import TransactionForm from "@/components/TransactionForm";
import { useAddTransactionMutation } from "@/redux/APIs/baseApi";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SendMoney = () => {
  const router = useRouter();
  const [addTransaction, { isLoading }] = useAddTransactionMutation();

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
      const res = await addTransaction({
        url: "/sendmoney",
        data: transactionData,
      });

      if (res.error) {
        console.log(res.error);
        throw Error(res?.error?.data?.message);
      }
      router.push("/wallet");
      toast.success("Send money successful", { duration: 6000 });
    } catch (error) {
      toast.error(error.message || "Send money failed");
    }
  };

  return (
    <div>
      <PageTitle>Send money</PageTitle>
      <TransactionForm
        submitTransaction={submitSendMoney}
        submitInProgress={isLoading}
      />
    </div>
  );
};

export default SendMoney;
