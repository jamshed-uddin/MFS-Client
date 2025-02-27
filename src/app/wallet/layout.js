import Logo from "@/components/Logo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";

const Wallet = async ({ children }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/");
  }
  return (
    <div className="max-w-2xl mx-auto  h-screen bg-white bg-opacity-50 p-2">
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <Logo />

      {children}
    </div>
  );
};

export default Wallet;
