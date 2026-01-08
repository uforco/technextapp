import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const LoginBtn = () => {
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
