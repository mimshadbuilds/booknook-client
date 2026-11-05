'use client'

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, UserRoundCheck } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

const AuthUserPage = () => {
    const { data: session, error, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const authLinks = [
    { label: "Login", href: "/signin" },
    { label: "Sign Up", href: "/signup" },
    ]

    const linkClass =
        "text-[13px] font-medium transition-colors hover:text-[#234b3c] dark:hover:text-[#dce8df]"

    const handleSignOut = async () => {
        const { error } = await authClient.signOut();

        if (error) return;
        router.push("/signin");
        router.refresh();
};
    if(isPending) return null;

    if (error || !user) {
        return (
            <div className="flex items-center gap-4">
                {authLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`text-slate-800 dark:text-[#dce8df] ${linkClass}`}>
                        {link.label}
                    </Link>
                ))}
            </div>
        )
    }

    return (
        <div className="relative z-60 flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger aria-label="Account menu" className="flex items-center gap-2 rounded-full p-1 transition hover:bg-[#f0f5f0] dark:hover:bg-[#26382e]">
                    <Avatar className="size-8 shrink-0 rounded-full ring-2 ring-[#07883e]/20">
                        <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"} className="object-cover" />
                        <AvatarFallback className="bg-[#f0f5f0] text-xs font-semibold dark:bg-[#26382e] dark:text-[#dce8df]">
                            {(user?.name ?? "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="hidden max-w-40 truncate text-sm font-semibold text-[#17251b] dark:text-[#dce8df] sm:block">{user.name}</span>
                    <ChevronDown className="size-4 text-[#69766b] dark:text-[#aab8ae]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="w-64 rounded-2xl border border-[#dce5dd] bg-[#fbfdfb] p-2 shadow-lg dark:border-[#34443b] dark:bg-[#202f27]">
                    <div className="px-3 py-2">
                        <p className="truncate font-semibold text-[#17251b] dark:text-[#f0f2ed]">{user?.name}</p>
                        <p className="mt-1 truncate text-sm text-[#69766b] dark:text-[#aab8ae]">{user?.email}</p>
                    </div>
                     
                    <DropdownMenuSeparator className="bg-[#e5ebe5] dark:bg-[#34443b]" />
                    <DropdownMenuItem onClick={() => router.push("/profile")} className="mt-1 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#17251b] focus:bg-[#f0f5f0] dark:text-[#f0f2ed] dark:focus:bg-[#26382e]">
                        <UserRoundCheck size={18} />
                        My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-300 dark:focus:bg-red-950/50 dark:focus:text-red-200">
                        <span>↪</span>
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default AuthUserPage;