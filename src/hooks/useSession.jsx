"use client";

import { SessionContext } from "@/providers/SessionProviders";
import React, { useContext } from "react";

const useSession = () => {
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    return {};
  }

  return sessionContext;
};

export default useSession;
