"use client";

import React, { useState } from "react";
import Toggler from "./Toggler";
import toast from "react-hot-toast";
import { requestClient } from "@/utils/requestClient";
import { useRouter } from "next/navigation";

const UserCard = ({ user }) => {
  const router = useRouter();
  const { _id, name, email, mobileNumber, balance, isActive } = user;

  const [isBlocked, setIsBlocked] = useState(!isActive);

  const toggler = async (value) => {
    setIsBlocked(value);

    try {
      const data = await requestClient(`/users/${_id}/adminonlyuserupdates`, {
        method: "PUT",
        body: JSON.stringify({ isActive: isBlocked }),
      });

      toast.success("User active status updated");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-5 place-content-start gap-6 py-2.5 even:bg-gray-50 border-b border-gray-300">
      <h3 className="font-medium">{name}</h3>
      <h3>{email}</h3>
      <h3>{mobileNumber}</h3>
      <h3>{balance}</h3>
      <div className="flex items-center gap-2">
        <h3>{isBlocked ? "Blocked" : "Block"}</h3>
        <Toggler onToggle={toggler} isChecked={isBlocked} />
      </div>
    </div>
  );
};

export default UserCard;
