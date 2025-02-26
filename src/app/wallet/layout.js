import Logo from "@/components/Logo";
import React from "react";

const Wallet = ({ children }) => {
  return (
    <div className="max-w-2xl mx-auto  h-screen bg-white bg-opacity-50 p-2">
      <Logo />

      {children}
    </div>
  );
};

export default Wallet;
