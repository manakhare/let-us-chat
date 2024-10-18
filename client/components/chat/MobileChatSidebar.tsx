"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { GroupChatUserType } from "@/types";

export default function MobileChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="bg-white dark:bg-slate-900">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold flex justify-center items-center">Users</SheetTitle>
        </SheetHeader>
        <div>
          {users.length > 0 &&
            users.map((item, index) => (
              <div key={index} className="bg-white dark:border-slate-800 dark:border dark:shadow-lg dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:via-50% dark:to-slate-950 dark:text-slate-100 rounded-md p-4 m-2">
                <p className="font-bold  dark:text-slate-100"> {item.name}</p>
                <p className="dark:text-slate-100 text-slate-900">
                  Joined :{" "}
                  <span className="dark:">{new Date(item.created_at).toDateString()}</span>
                </p>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}