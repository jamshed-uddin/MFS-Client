"use client";

import { makeStore } from "@/redux/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }) => {
  const storeRef = useRef(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
