"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/auth";
    }
  }, [user]);

  return (
    <main style={{ padding: "4rem", textAlign: "center" }}>
      
    </main>
  );
}