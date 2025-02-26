"use client";
import PageTitle from "@/components/PageTitle";
import TransactionForm from "@/components/TransactionForm";
import handleSubmitTransaction from "@/utils/handleSubmitTransaction";
import React, { useState } from "react";

const SendMoney = () => {
  const [loading, setLoading] = useState(false);
  const submitSendMoney = async (e) => {
    e.preventDefault();
    const currentTarget = e.currentTarget;
    const formData = new FormData(currentTarget);
    const transactionData = Object.fromEntries(formData);

    console.log(transactionData);

    try {
      // const data = await handleSubmitTransaction('/sendmoney', )
    } catch (error) {}
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
