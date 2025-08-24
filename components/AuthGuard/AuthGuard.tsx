"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading, isLoggingOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !isLoggingOut) {
      router.push("/auth");
    }
  }, [user, loading, isLoggingOut, router]);

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || isLoggingOut) {
    return null;
  }

  return <>{children}</>;
}
