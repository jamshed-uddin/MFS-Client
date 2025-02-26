"use client";
import PageTitle from "@/components/PageTitle";
import TransactionForm from "@/components/TransactionForm";
import React from "react";

const SendMoney = () => {
  const submitSendMoney = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <PageTitle>Send money</PageTitle>
      <TransactionForm submitTransaction={submitSendMoney} />
    </div>
  );
};

export default SendMoney;
