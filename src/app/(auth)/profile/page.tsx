
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfilePanel from "./ProfilePanel";

export const metadata = {
    title: "My Profile | BookNook",
    description: "View and update your BookNook account profile.",
};

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/signin");
    }

    const user = session.user;

    return <ProfilePanel user={user} />;
}
