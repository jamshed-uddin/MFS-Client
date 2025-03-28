"use client";

import { useState } from "react";
import PriceTag from "./PriceTag";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const BalanceCard = ({ balance, name, balanceLoading, balanceError }) => {
  const [showBalance, setShowBalance] = useState({
    balance: false,
    systemBalance: false,
  });

  return (
    <div
      className={`text-white bg-blue-600 rounded-xl h-20 w-full p-2 relative `}
    >
      <h3 className="text-sm font-medium mb-2">{name}</h3>

      {balanceLoading ? (
        <h3>...</h3>
      ) : (
        <h3
          className={`transition-all duration-500 text-xl font-medium select-none ${
            !showBalance.balance ? "blur-[7px]" : "blur-none"
          }`}
        >
          {" "}
          {/* ${balance} */}
          <PriceTag price={balance} />
        </h3>
      )}
      <span className="absolute top-1 right-1 cursor-pointer z-40">
        {showBalance.balance ? (
          <EyeIcon
            className="w-4"
            onClick={() => setShowBalance((p) => ({ ...p, balance: false }))}
          />
        ) : (
          <EyeSlashIcon
            className="w-4"
            onClick={() => setShowBalance((p) => ({ ...p, balance: true }))}
          />
        )}
      </span>
    </div>
  );
};

export default BalanceCard;
