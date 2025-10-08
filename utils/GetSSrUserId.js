//utils/GetSSrUserId.js
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getUserIDSSR() {
    const session = await getServerSession(authOptions); 
    return session?.user?.id || null;
}