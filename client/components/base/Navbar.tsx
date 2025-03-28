"use client";
import React, {useState} from "react";
import Link from "next/link";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";
import LoginModal from "../auth/LoginModal";
import { ModeToggle } from "../common/ThemeChange";


export default function Navbar({ user }: { user?: CustomUser | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  return (
    <nav className="p-6 flex justify-between items-center bg-white shadow-sm bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:shadow-sm dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <h1 className="text-xl md:text-2xl font-extrabold pl-10">QuickChat</h1>

      {/* Desktop View: Navbar items */}
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700 pr-10 hidden md:flex">
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

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center space-x-2 z-60">
        <button
          onClick={toggleMenu}
          // className="text-gray-700 dark:text-slate-100"
          className="p-5 text-gray-700 dark:text-slate-100 cursor-pointer z-60"
        >
          {isMenuOpen ? (
            <div className="text-white font-bold text-2xl w-full z-60">X</div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
        {/* Side Menu: Mobile View */}
      </div>
        <div
          className={`fixed inset-0 bg-white z-50 transition-all duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden flex flex-col items-center justify-start py-10 space-y-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100`}
        >
          <div onClick={toggleMenu} className="dark:text-slate-100 font-bold text-2xl">X</div>
          <div className="flex flex-col items-center justify-center space-y-6 w-full">
            <Link href="/" className="dark:text-slate-100 text-lg font-semibold" onClick={toggleMenu}>Home</Link>
            <Link href="#features" className="dark:text-slate-100 text-lg font-semibold" onClick={toggleMenu}>Features</Link>
            <ModeToggle />
            
            {!user ? (
              <LoginModal />
            ) : (
              <Link href="/dashboard" onClick={toggleMenu}>
                <Button>Dashboard</Button>
              </Link>
            )}
          </div>
        </div>

    </nav>
  );
}





// return (
//     <nav className="p-6 flex justify-between items-center bg-white shadow-sm bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:shadow-sm dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
//       <h1 className="text-xl md:text-2xl font-extrabold pl-10">QuickChat</h1>
//       <div className="flex items-center space-x-2 md:space-x-6 text-gray-700 pr-10">
//         <Link href="/" className="dark:text-slate-100">Home</Link>
//         <Link href="#features" className="dark:text-slate-100">Features</Link>
//         <ModeToggle />
        
//         {!user ? (
//           <LoginModal />
//         ) : (
//           <Link href="/dashboard">
//             <Button>Dashboard</Button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );