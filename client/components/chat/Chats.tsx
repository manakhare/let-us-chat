import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { MessageType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { GroupChatType, GroupChatUserType } from "@/types";
// import { useRouter } from "next/navigation";


export default function  Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: GroupChatType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const router = useRouter();
  

  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const currentUser: string = localStorage.getItem("name");

  const socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
    };
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      // console.log("The message is", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };
    socket.emit("message", payload);
    // window.location.reload();
    // router.reload()
    setMessage("");
    setMessages([...messages, payload]);
    
  };

  return (
    <div className="flex flex-col h-[94vh] p-4 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-2 w-full">
          {messages.map((message) => (
            <div
               key={message.id}>
                {message.name === chatUser?.name ? 
                  <div className="flex w-full flex-col">
                    <div className="font-thin text-xs self-end">
                      {message.name || "Anonymous"}
                    </div>
                    <div className="max-w-sm rounded-lg p-2 bg-gradient-to-r from-blue-400 to-blue-600  text-white self-end">
                      {message.message}
                    </div>
                  </div>
                  :
                  <div className="flex w-full flex-col">
                    <div className="font-thin text-xs self-start">
                      {message.name || "Anonymous"}
                    </div>
                    <div className="max-w-sm rounded-lg p-2 dark:text-slate-100 dark:bg-gradient-to-r dark:from-gray-600 dark:to-gray-500 bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start">
                      {message.message}
                    </div>
                  </div>
                  }
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg dark:border dark:focus:ring-2 dark:focus:outline-none dark:outline-1 dark:outline-slate-300 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-100"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}