import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up | BookNook",
    description: "Join BookNook to borrow, share, and discover books in your community.",
};

export default function SignUpLayout({ children }: LayoutProps<"/signup">) {
    return children;
}
