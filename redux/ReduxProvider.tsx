"use client";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { setAccount } from "./features/profile";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const [storeInstance] = useState(() => store());

  useEffect(() => {
    const unsubscribe = setupListeners(storeInstance.dispatch);
    return unsubscribe;
  }, [storeInstance]);

  return (
    <Provider store={storeInstance}>
      <AuthUser> {children} </AuthUser>
    </Provider>
  );
};

export default ReduxProvider;

const AuthUser = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authme = async () => {
      const storedAccount = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      ).then((res) => res.json());
      if (storedAccount) {
        dispatch(setAccount(storedAccount));
      }
    };
    authme();
  }, []);

  return children;
};
