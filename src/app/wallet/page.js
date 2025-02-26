import Balance from "@/components/Balance";
import Menu from "@/components/Menu";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const WalletHome = () => {
  return (
    <div className="space-y-10">
      {/* name and number */}
      <div className="flex justify-between items-start">
        <div className="">
          <h2 className="text-xl font-medium">John doe</h2>
          <h3 className="text-sm">+32433243244</h3>
        </div>

        <div className="flex  text-blue-500 text-sm font-medium cursor-pointer">
          {" "}
          <ArrowRightStartOnRectangleIcon className="w-4 " />
          Logout
        </div>
      </div>
      <Balance balance={4000} />

      {/* menu */}
      <Menu />

      {/* recent transaction */}
      <div>
        <h2>Recent transactions</h2>
      </div>
    </div>
  );
};

export default WalletHome;
