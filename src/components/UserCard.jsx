"use client";

import React, { useState } from "react";
import Toggler from "./Toggler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useUpdateUserStatusMutation } from "@/redux/APIs/baseApi";
import { useNetworkState } from "@uidotdev/usehooks";

const UserCard = ({ user }) => {
  const router = useRouter();
  const { _id, name, role, status, email, mobileNumber, balance, isActive } =
    user;

  const { online } = useNetworkState();

  const [updateUser, { isLoading }] = useUpdateUserStatusMutation();

  const [userStatus, setUserStatus] = useState(status);

  const [isUserActive, setIsUserActive] = useState(!!isActive);

  const updateUserHandler = async () => {
    try {
      const res = updateUser({
        userId: _id,
        data: { isActive: isUserActive, status: userStatus },
      });

      if (res.error) {
        throw Error(res?.error?.data?.message);
      }

      toast.success("User active status updated");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const onToggle = (isChecked) => {
    setIsUserActive(isChecked);
  };

  console.log(
    "user" + name + "blocked: " + isUserActive + "status:" + userStatus
  );

  return (
    <div className="grid grid-cols-7 place-content-start gap-6 py-2.5 even:bg-gray-50 border-b border-gray-300">
      <h3 className="font-medium">{name}</h3>
      <h3>{role}</h3>
      <h3>{email}</h3>
      <h3>{mobileNumber}</h3>
      <h3>{balance}</h3>
      <div className="flex items-center gap-2">
        <Toggler onToggle={onToggle} isChecked={isUserActive} />
      </div>

      {/* user status */}
      {role === "agent" && (
        <div className="flex  gap-2 shrink-0">
          <select
            className="selectStyle"
            name="status"
            value={userStatus}
            onChange={(e) => setUserStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <Button
            className={"!btn-sm"}
            disabled={
              (status === userStatus && isActive === isUserActive) ||
              isLoading ||
              !online
            }
            loading={isLoading}
            onClick={updateUserHandler}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
