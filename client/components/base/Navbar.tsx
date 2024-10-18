"use client";
import React from "react";
import Link from "next/link";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";
import LoginModal from "../auth/LoginModal";
import { ModeToggle } from "../common/ThemeChange";


export default function Navbar({ user }: { user?: CustomUser | null }) {
return (
    <nav className="p-6 flex justify-between items-center bg-white shadow-sm bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:shadow-sm dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <h1 className="text-xl md:text-2xl font-extrabold pl-10">QuickChat</h1>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700 pr-10">
        <Link href="/" className="dark:text-slate-100">Home</Link>
        <Link href="#features" className="dark:text-slate-100">Features</Link>
        <ModeToggle />
        
        {!user ? (
          <LoginModal />
        ) : (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}