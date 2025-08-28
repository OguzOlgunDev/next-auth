"use client";

import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function AuthButton() {
  const { data: session } = useSession();

  if (!session) return <LoginButton />;
  return <LogoutButton />;
}
