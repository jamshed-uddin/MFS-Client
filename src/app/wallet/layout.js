import Logo from "@/components/Logo";
import SessionProviders from "@/providers/SessionProviders";
import StoreProvider from "@/providers/StoreProvider";
import { getCookiesAsync } from "@/utils/cookieOpsAsync";

import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";

const Wallet = async ({ children }) => {
  const { token } = await getCookiesAsync("session");
  if (!token) {
    redirect("/");
  }
  return (
    <div className="max-w-2xl mx-auto bg-white bg-opacity-50 p-2  h-screen overflow-y-auto overflow-x-hidden hide-scrollbar ">
      <Toaster
        toastOptions={{
          duration: 30000,
          style: {
            borderRadius: "1.3rem",
            margin: "0 0",
            padding: "0.2rem 1.2rem",
            backdropFilter: "blur(10px)",
          },
        }}
      />
      <Logo />

      <div className="h-max pb-10">
        <StoreProvider>
          <SessionProviders>{children}</SessionProviders>
        </StoreProvider>
      </div>
    </div>
  );
};

export default Wallet;
