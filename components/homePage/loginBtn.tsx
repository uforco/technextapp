"use client";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { selectAccount } from "@/redux/features/profile";

const LoginBtn = () => {
   
  const auth = useSelector(selectAccount);

  

  console.log(auth);

  return (
    <>
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
        </Link>

        <Link href="/dashboard">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
    </>
  );
};

export default LoginBtn;
