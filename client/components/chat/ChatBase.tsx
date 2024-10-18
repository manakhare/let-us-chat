"use client"

import ChatSidebar from './ChatSideBar';
import { GroupChatType, GroupChatUserType, MessageType } from '@/types';
import ChatNav from './ChatNav';
import { useEffect, useState } from 'react';
import ChatUserDialog from './ChatUserDialog';
import Chats from './Chats';


export default function ChatBase({group , users, oldMessages} : {group: GroupChatType, users: Array<GroupChatUserType> | [], oldMessages: Array<MessageType> | []}) {
    const [dialogOpen, setDialogOpen] = useState(true);
    const [chatUser, setChatUser] = useState<GroupChatUserType>()

    useEffect(() => {
        const data = localStorage.getItem(group.id);
        
        if(data) {
            const parsedData = JSON.parse(data);
            // console.log("The parsed data is: ", parsedData);            
            setChatUser(parsedData);
        }
    }, [group])    


  return (
    <div className='flex'>
        <ChatSidebar users={users} />
        <div className='w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white'>
            {dialogOpen ? 
                <ChatUserDialog open={dialogOpen} setOpen={setDialogOpen} group={group} />
                :
                <ChatNav chatGroup={group} users={users} />
            }

            <Chats group={group} chatUser={chatUser} oldMessages={oldMessages}/>
        </div>
    </div>
  )
}
