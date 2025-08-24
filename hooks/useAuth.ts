import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

const STORAGE_KEY = "auth_user";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const userData = JSON.parse(saved);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  function login(userData: User) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
    router.push("/dashboard");
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    router.push("/auth");
  }

  return { user, login, logout, loading };
}