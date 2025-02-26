"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };
  return (
    <div
      onClick={handleLogout}
      className="flex  text-blue-500 text-sm font-medium cursor-pointer"
    >
      {" "}
      <ArrowRightStartOnRectangleIcon className="w-4 " />
      Logout
    </div>
  );
};

export default LogoutButton;
