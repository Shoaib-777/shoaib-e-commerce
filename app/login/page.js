import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginWrapper from "./LoginWrapper";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  // If already logged in, redirect to profile
  if (session) {
    redirect("/profile");
  }

  // Otherwise render the client-side login form
  return <LoginWrapper/>;
}
