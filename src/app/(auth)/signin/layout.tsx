import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In | BookNook",
    description: "Sign in to your BookNook account to manage your shared library and borrows.",
};

export default function SignInLayout({ children }: LayoutProps<"/signin">) {
    return children;
}
