"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

const LoginModal = ({text}: {text?: string}) => {

    const handleLogin = () => {
        signIn("google", {
            callbackUrl: "/dashboard",
            redirect: true
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Getting Started
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Welcome to LetUsChat!</DialogTitle>
                    <DialogDescription>
                        With LetUsChat, you can now create instant secure chat links within seconds
                    </DialogDescription>
                </DialogHeader>
                <Button variant="outline" onClick={handleLogin}>
                    <Image
                        src="/images/google.png"
                        className="mr-4"
                        width={25}
                        height={25}
                        alt="Google logo"
                    />
                    Continue with Google
                </Button>
            </DialogContent>
        </Dialog>

    )
}

export default LoginModal