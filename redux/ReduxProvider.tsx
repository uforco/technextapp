"use client";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { setupListeners } from "@reduxjs/toolkit/query";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const [storeInstance] = useState(() => store());

  useEffect(() => {
    const unsubscribe = setupListeners(storeInstance.dispatch);
    return unsubscribe;
  }, [storeInstance]);

  return <Provider store={storeInstance}>{children}</Provider>;
};

export default ReduxProvider;
