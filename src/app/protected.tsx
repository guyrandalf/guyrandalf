// src/app/protected/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";

export default function ProtectedPage() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session, router]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return <p>Protected Content</p>;
}
