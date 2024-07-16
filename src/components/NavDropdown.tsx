"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "~/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { Button } from "./ui/button";

export default function NavDropDown() {

    const router = useRouter();
    const session = useSession();

    if (!session.data?.user) {
        return (
            <Button onClick={() => router.push('/api/auth/signin')}>
                Login
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {session.data.user.image && <img className="rounded-full" width={35} height={35} src={session.data.user.image} />}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-sm" side="bottom" align="end" sideOffset={20}>
                <DropdownMenuItem onClick={() => router.push('/blog')}>My Posts</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/')}>Explore</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/blog/create')}>Create Post</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}