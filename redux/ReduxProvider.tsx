"use client";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { removeAccount, setAccount } from "./features/profile";

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
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!data.ok || data.status !== 200) {
        dispatch(removeAccount());
        return;
      }
      const storedAccount = await data.json();
      if (data.ok && data.status == 200 && storedAccount) {
        dispatch(setAccount(storedAccount));
      }
    };
    authme();
  }, []);

  return children;
};
