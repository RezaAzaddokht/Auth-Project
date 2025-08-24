"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthGuard from "@/components/AuthGuard";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <AuthGuard>
      <AuthenticatedLayout>
        <div className={styles.container}>
          <div className={styles.header}>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
          
          <h1>Welcome to the Dashboard</h1>
          
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <img
                src={user?.picture.large}
                alt={`Profile picture of ${user?.name.first}`}
                className={styles.avatar}
              />
              <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>
                  {user?.name.first} {user?.name.last}
                </h2>
                <p className={styles.profileUsername}>@{user?.login.username}</p>
                <p className={styles.profileLocation}>
                  📍 {user?.location.city}, {user?.location.country}
                </p>
              </div>
            </div>
            
            <div className={styles.profileDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📧</span>
                <div className={styles.detailContent}>
                  <label>Email</label>
                  <span>{user?.email}</span>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📱</span>
                <div className={styles.detailContent}>
                  <label>Phone</label>
                  <span>{user?.phone}</span>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🎂</span>
                <div className={styles.detailContent}>
                  <label>Age</label>
                  <span>{user?.registered.age} years old</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </AuthGuard>
  );
}