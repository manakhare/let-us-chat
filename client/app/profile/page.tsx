import Profile from '@/components/profile/Profile'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import DashNav from '@/components/dashboard/DashNav';

export default async function profilePage() {
    const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className='bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:bg-gradient-to-b dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 min-h-screen'>
        <DashNav name={session?.user?.name || "Anonymous"} image={session?.user?.image || undefined}/>
        <Profile email={session?.user?.email || undefined} name={session?.user?.name || "Anonymous"} image={session?.user?.image || undefined}/>
    </div>
  )
}
