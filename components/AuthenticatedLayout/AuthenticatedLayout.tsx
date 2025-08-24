"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import styles from "./AuthenticatedLayout.module.scss";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
