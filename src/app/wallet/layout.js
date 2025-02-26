import Logo from "@/components/Logo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Wallet = async ({ children }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/");
  }
  return (
    <div className="max-w-2xl mx-auto  h-screen bg-white bg-opacity-50 p-2">
      <Logo />

      {children}
    </div>
  );
};

export default Wallet;
