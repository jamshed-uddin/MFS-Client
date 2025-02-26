"use client";

import { requestClient } from "@/utils/requestClient";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { createContext } from "react";
import useSWR from "swr";

export const SessionContext = createContext(null);

const SessionProviders = ({ children }) => {
  const token = Cookies.get("token");
  let userId = null;

  if (
    token !== "undefined" &&
    typeof token === "string" &&
    token.trim().length > 0
  ) {
    try {
      console.log("inside if block");
      const decoded = jwtDecode(token);
      userId = decoded?._id || null;
    } catch (error) {
      console.log("failed to decode");
      console.error("JWT Decode Error:", error);
    }
  }

  const key = token ? `user-available-${token}` : null;
  const {
    data: user,
    mutate,
    isLoading,
  } = useSWR(
    key ? `/users/${userId}` : null,
    async (url) => {
      if (!token) return;
      const data = await requestClient(url);

      return data?.data;
    },
    { revalidateOnFocus: true }
  );

  const isLoggedIn = () => {
    return !!token;
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const isAgent = () => {
    return user?.role === "agent";
  };

  console.log(user);

  const value = {
    user: user,
    userLoading: isLoading,
    revalidateUser: mutate,
    isLoggedIn: isLoggedIn(),
    isAdmin: isAdmin(),
    isAgent: isAgent(),
  };
  return (
    <SessionContext.Provider value={value || {}}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProviders;
