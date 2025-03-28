"use client";

import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import LogoutButton from "./LogoutButton";
import ModalClient from "./ModalClient";
import useSession from "@/hooks/useSession";
import Button from "./Button";
import PinInput from "./PinInput";
import toast from "react-hot-toast";

const SettingDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState({
    currentPin: "",
    newPin: "",
  });
  const [loading, setLoading] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const changePinHandler = () => {
    try {
      setLoading(true);

      // changepin

      setLoading(false);
    } catch (error) {
      toast.error(error.message || "Failed to change pin");
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
          {/* change pin */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Current pin</label>
              <PinInput className={"w-full mt-1"} />
            </div>
            <div>
              <label className="block text-sm font-medium">New pin</label>
              <PinInput className={"w-full mt-1"} />
            </div>
            <div className="mt-2 flex justify-end">
              <Button
                onClick={changePinHandler}
                loading={loading}
                disabled={loading}
                className=" !btn-sm  w-fit"
              >
                Save
              </Button>
            </div>
          </div>
        </ModalClient>
      )}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="m-1">
          <Cog8ToothIcon className="w-6" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm z-40"
        >
          <li className="pl-1">
            <button onClick={openModal}>Profile</button>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </>
  );
};

export default SettingDropdown;
