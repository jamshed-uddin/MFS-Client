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
    <div className="max-w-2xl mx-auto bg-white bg-opacity-50 p-2  h-screen overflow-y-auto overflow-x-hidden hide-scrollbar ">
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <Logo />

      <div className=" h-max pb-10">{children}</div>
    </div>
  );
};

export default Wallet;
