import ChatBase from '@/components/chat/ChatBase';
import { fetchChatMessages } from '@/fetch/chatsFetch';
import { fetchChatGroup } from '@/fetch/groupChatFetch';
import { fetchChatUsers } from '@/fetch/userFetch';
import { GroupChatType, GroupChatUserType, MessageType } from '@/types';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function chat({ params } : {params: { id: string }}) {

  if(params.id.length !== 36) return notFound();

  const group: GroupChatType | null = await fetchChatGroup(params.id);
  if(group==null) return notFound()

  const users: Array<GroupChatUserType> | [] = await fetchChatUsers(params.id);
  const chats: Array<MessageType> | [] = await fetchChatMessages(params.id);

  // console.log("The chats are: ", chats);
  
    
  return (
    <div>
        <ChatBase group={group} users={users} oldMessages={chats}/>    
    </div>
  )
}
