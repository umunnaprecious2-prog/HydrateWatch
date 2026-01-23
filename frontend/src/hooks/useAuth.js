"use client";

import { useAuth as useAuthContext } from "@/src/contexts/AuthContext";

export function useAuth() {
  return useAuthContext();
}
