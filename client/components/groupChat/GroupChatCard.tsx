import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import { GroupChatType } from "@/types";

export default function GroupChatCard({
  group,
  user,
}: {
  group: GroupChatType;
  user: CustomUser | undefined;
}) {
  return (
    <Card className="dark:border-slate-700 dark:border dark:shadow-lg dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:via-50% dark:to-slate-950 dark:text-slate-100">
      <CardHeader className="flex-row justify-between items-center ">
        <CardTitle className="text-2xl">{group.title}</CardTitle>
        <GroupChatCardMenu user={user} group={group} />
      </CardHeader>
      <CardContent>
        <p>
          Passcode : <strong>{group.passcode}</strong>
        </p>
        <p>Created At :{new Date(group.created_at).toDateString()}</p>
      </CardContent>
    </Card>
  );
}