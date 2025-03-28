import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="p-6 bg-gray-900 text-white">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center items-center">
          <div>© 2024 QuickChat. All rights reserved.</div>
          <div className="space-x-4 mt-2">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
        <div className="space-y-4 flex flex-row justify-center items-center gap-5">
          <Input
            placeholder="Subscribe to our newsletter"
            className="bg-gray-800 border-none"
          />
          <Button className="">Subscribe</Button>
        </div>
      </div>
    </footer>
  );
}