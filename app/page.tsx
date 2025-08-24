"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      window.location.href = "/dashboard";
    }
  }, [user]);

  return (
    <main style={{ padding: "4rem", textAlign: "center" }}>
      <h1>Welcome to the Example Auth App</h1>
      <p>Please <a href="/auth" style={{ color: "#0070f3" }}>Login</a> to continue</p>
    </main>
  );
}