"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { removeAccount, selectAccount } from "@/redux/features/profile";

const Profile = () => {
  const router = useRouter();
  const auth = useSelector(selectAccount);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    ).then((res) => res.json());
    console.log(res);
    dispatch(removeAccount());
    router.push("/");
  };

  const goDashboard = () => {
    if (auth) router.push("/dashboard");
  };

  if (!auth) {
    return null;
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
            <Avatar className="h-9 w-9 cursor-pointer transition-opacity hover:opacity-80">
              <AvatarImage src={auth?.image} alt="User" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                JD
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">
                {auth?.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={goDashboard}
            className="text-destructive focus:text-destructive"
          >
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
