"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";

export default function NavbarWrapper({ session }) {
  return (
    <SessionProvider session={session}>
      <Navbar />
    </SessionProvider>
  );
}
