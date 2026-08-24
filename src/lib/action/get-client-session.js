"use client";

import { authClient } from "@/lib/auth-client";

export async function getClientSession() {
  const { data } = await authClient.getSession();

  return data;
}
