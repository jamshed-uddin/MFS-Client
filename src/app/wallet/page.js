import Balance from "@/components/Balance";

import Menu from "@/components/Menu";
import NameNumber from "@/components/NameNumber";
import RecentTransactions from "@/components/RecentTransactions";
import SettingDropdown from "@/components/SettingDropdown";
import { getCookiesAsync } from "@/utils/cookieOpsAsync";

import React from "react";

const WalletHome = async () => {
  const { token } = await getCookiesAsync("session");

  return (
    <div className="space-y-7">
      {/* name and number */}
      <div className="flex justify-between items-start">
        <NameNumber />

        <SettingDropdown />
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
