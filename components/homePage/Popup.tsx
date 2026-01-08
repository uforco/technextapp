"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

const Popup = () => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    // Show popup after a short delay on first load
    const timer = setTimeout(() => {
      setShowWelcomePopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Dialog open={showWelcomePopup} onOpenChange={setShowWelcomePopup}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            {/* <Sparkles className="h-8 w-8" /> */}
            <p className=" text-6xl ">😵</p>
          </div>
          <DialogTitle className="text-2xl">Welcome to Shortify!</DialogTitle>
          <DialogDescription className="text-base pt-0 text-red-500 font-bold ">
            <h1 className=" w-full text-center ">Notice</h1>
            This website is hosted on a free server. If the server is inactive,
            the first request may take 30–40 seconds to wake up. Please refresh
            or revisit shortly if the site doesn’t load immediately. Thank you
            for your patience.
          </DialogDescription>
        </DialogHeader>
        <p className="text-center text-xs text-muted-foreground mt-2">
          <Link href="https://technext-server.onrender.com/">
            https://technext-server.onrender.com
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
