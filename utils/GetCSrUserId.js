//utils/GetCSrUserId.js
"use client";
import { useSession } from "next-auth/react";

export function getUserIDCSR() {
  const { data: session } = useSession();
  return session?.user?.id || null;
}
