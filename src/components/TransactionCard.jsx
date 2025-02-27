"use client";

import clsx from "clsx";
import React, { useState } from "react";
import PriceTag from "./PriceTag";
import ModalClient from "./ModalClient";
import formatDate from "@/utils/formatDate";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { requestClient } from "@/utils/requestClient";
import toast from "react-hot-toast";
import useSession from "@/hooks/useSession";

const TransactionCard = ({ transaction }) => {
  const { isAdmin } = useSession();
  const {
    _id,
    status,
    type,
    createdAt,
    updatedAt,
    amount,
    adminFee,
    agentFee,
    senderMobile,
    receiverMobile,
  } = transaction;
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const statusStyle = clsx("text-xs rounded-lg px-1 border", {
    "border-yellow-400 bg-yellow-200": status === "pending",
    "border-green-400 bg-green-200": status === "completed",
    "border-red-400 bg-red-200": status === "rejected",
  });

  const handleSelectChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleApproval = async () => {
    if (status === "completed") return;
    if (!isAdmin) return;

    try {
      setLoading(true);
      const res = await requestClient(`/transactions/${_id}`, {
        method: "PUT",
        body: JSON.stringify({ status: selectedStatus }),
      });
      console.log(res);
      toast.success(`Transaction ${selectedStatus}`);
      closeModal();
    } catch (error) {
      toast.error(error.message || "Something wrong with approval update");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <ModalClient
          open={isOpen}
          close={closeModal}
          internalCloseButton={true}
        >
          <div>
            {/* id and status */}
            <div className="flex  gap-2 ">
              <h2 className="text-sm font-medium">{_id}</h2>
              <span className={statusStyle}>{status}</span>
            </div>

            {/* date */}
            <div className="text-xs mb-4">
              {formatDate(createdAt || updatedAt)}
            </div>

            {/* sender and receiver */}
            <div className="mb-4">
              <h3 className="flex justify-between">
                <span className="font-medium">Sender:</span> {senderMobile}
              </h3>
              <h3 className="flex justify-between">
                <span className="font-medium">Receiver:</span> {receiverMobile}
              </h3>
            </div>

            {/* amount and fees */}
            <div>
              <h3 className="flex justify-between items-center">
                Amount: <PriceTag price={amount} className={"text-sm"} />
              </h3>
              <h3 className="flex justify-between items-center">
                Fee:{" "}
                <PriceTag price={adminFee + agentFee} className={"text-sm"} />
              </h3>
              <h3 className="flex justify-between items-center">
                Total:{" "}
                <PriceTag
                  price={adminFee + agentFee + amount}
                  className={"text-sm"}
                />
              </h3>
            </div>

            {/* admin approval */}
            {isAdmin && (
              <div className="mt-3">
                <h3 className="font-medium mb-2">Approve transaction</h3>
                <div className="flex items-center gap-2">
                  <select
                    name="status"
                    id="status"
                    className="select select-sm select-bordered"
                    value={selectedStatus}
                    disabled={status === "completed"}
                    onChange={handleSelectChange}
                  >
                    {["pending", "completed", "rejected"].map((sta, idx) => (
                      <option key={sta} value={sta}>
                        {sta}
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={handleApproval}
                    className={"!btn-sm"}
                    loading={loading}
                  >
                    {" "}
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ModalClient>
      )}
      <div
        onClick={openModal}
        className="cursor-pointer border border-gray-400 rounded-lg p-2"
      >
        {/* id status and amount */}
        <div className="lg:flex justify-between">
          <div className="flex  gap-2">
            <h2 className="text-sm font-medium">{_id}</h2>
            <span className={statusStyle}>{status}</span>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm">{type.split("_").join(" ")}</h3>.
            <h3>
              <PriceTag price={amount} className={"text-sm"} />
            </h3>
          </div>
        </div>

        {/* server and receiver */}
        <div className="flex items-center gap-3 text-sm mt-1">
          <h3>{senderMobile}</h3>
          <h4>
            <ArrowRightIcon className="w-4 text-blue-500" />
          </h4>{" "}
          <h3>{receiverMobile}</h3>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
