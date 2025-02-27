import Balance from "@/components/Balance";
import LogoutButton from "@/components/LogoutButton";
import Menu from "@/components/Menu";
import NameNumber from "@/components/NameNumber";
import RecentTransactions from "@/components/RecentTransactions";

import React from "react";

const WalletHome = () => {
  return (
    <div className="space-y-10">
      {/* name and number */}
      <div className="flex justify-between items-start">
        <NameNumber />

        <LogoutButton />
      </div>
      <Balance balance={4000} />

      {/* menu */}
      <Menu />

      {/* recent transaction */}
      <div>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default WalletHome;
