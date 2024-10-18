import React from 'react'
import ProfileMenu from '../auth/ProfileMenu'
import { ModeToggle } from '../common/ThemeChange'
import Link from 'next/link'

export default function DashNav({name, image} : {name:string, image?:string}) {
    
  return (
    <nav className="py-6 px-10 flex justify-between items-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 bg-white shadow-sm dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <h1 className="text-xl md:text-2xl font-extrabold tracking-wide">
        <Link href="/dashboard">LetUsChat</Link></h1>
      <div className="flex items-center cursor-pointer space-x-2 md:space-x-6 text-gray-700">
        <ModeToggle />
       <ProfileMenu name={name} image={image} />
      </div>
    </nav>
  )
}
