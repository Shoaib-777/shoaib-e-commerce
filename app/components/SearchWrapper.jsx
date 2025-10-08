"use client";

import { SessionProvider } from "next-auth/react";
import Search from "./Search";

export default function SearchWrapper({ session }) {
  return (
    <SessionProvider session={session}>
      <Search />
    </SessionProvider>
  );
}
