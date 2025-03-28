"use client";

import { useGetUserDataQuery } from "@/redux/APIs/baseApi";
import { getCookies } from "@/utils/cookieOps";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
export const SessionContext = createContext(null);

const SessionProviders = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const { token } = getCookies("session");
    setUserId(jwtDecode(token)?._id.toString());
  }, []);

  const { data, isLoading, error } = useGetUserDataQuery(userId, {
    skip: !userId,
    refetchOnFocus: true,
  });

  console.log(data);
  // console.log(_id);

  const value = {
    user: data,
    userLoading: isLoading,
    isLoggedIn: !!userId,
    isAdmin: data?.role === "admin",
    isAgent: data?.role === "agent",
  };
  return (
    <SessionContext.Provider value={value || {}}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProviders;
