"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      // Fallback redirect if user is absent
      window.location.href = "/auth";
    }
  }, [user]);

  if (!user) return null;

  return (
    <main className={styles.container}>
      <h1>Welcome to the Dashboard</h1>
      <p className={styles.greeting}>
        Hello, {user.name.first} {user.name.last}!
      </p>

      <img
        src={user.picture.large}
        alt={`Profile picture of ${user.name.first}`}
        className={styles.avatar}
      />

      <button onClick={logout} className={styles.logoutButton}>
        Logout
      </button>
    </main>
  );
}