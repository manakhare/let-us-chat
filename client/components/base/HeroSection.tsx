import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import LoginModal from "../auth/LoginModal";

export default function HeroSection({ user }: { user?: CustomUser | null }) {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gradient-to-b from-gray-50 to-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-950">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 dark:text-slate-200">
        Instant Chat Links for Seamless Conversations
      </h1>
      <p className="text-xl text-gray-600 mb-8 dark:text-slate-400">
        QuickChat makes it effortless to create secure chat links and start
        conversations in seconds.
      </p>
      {user ? 
      (<Link href="/dashboard">
        <Button size="lg" className="animate-pulse">
          Start Chatting
        </Button>
      </Link>) : (
        <LoginModal />
      )}

      <div className="mt-12 w-full max-w-5xl flex justify-center">
        {/* Placeholder for Illustration/Image */}
        <img
          src="/images/conversation.svg"
          alt="Illustration"
          className="w-full h-auto"
        />
      </div>  
    </section>
  );
}