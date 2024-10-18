import DashNav from '@/components/dashboard/DashNav'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import CreateChat from '@/components/groupChat/CreateChat'
import { fetchChatGroups } from "@/fetch/groupChatFetch";
import { GroupChatType } from '@/types';
import GroupChatCard from '@/components/groupChat/GroupChatCard';

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const chatGroups: Array<GroupChatType> | [] = await fetchChatGroups(session?.user?.token)
  
  // console.log("The groups are: ", chatGroups); 
  return (
    <div className='bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:bg-gradient-to-b dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 min-h-screen'>
      <DashNav name={session?.user?.name || "Anonymous"} image={session?.user?.image || undefined} />

      <div className='container px-10'>
        <div className='flex justify-center mt-10'>
          <CreateChat user={session?.user} />
        </div>

        <div className="grid py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chatGroups.length > 0 &&
            chatGroups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user} />
            ))}
        </div>  
      </div>


    </div>
  )
}
