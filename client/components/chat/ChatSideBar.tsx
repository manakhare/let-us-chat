import React from "react";
import { GroupChatUserType } from "@/types";

export default function ChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  return (
    <div className="hidden md:block dark:bg-slate-900 h-screen overflow-y-scroll w-1/5 bg-muted px-2">
      <h1 className="text-2xl font-extrabold py-4 flex justify-center items-center">Users</h1>
      {users.length > 0 &&
        users.map((item, index) => (
          <div key={index} className="bg-white rounded-md p-2 my-5 dark:border-slate-700 dark:border dark:shadow-lg dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:via-50% dark:to-slate-950 dark:text-slate-100">
            <p className="font-bold"> {item.name}</p>
            <p>
              Joined : <span>{new Date(item.created_at).toDateString()}</span>
            </p>
          </div>
        ))}
    </div>
  );
}