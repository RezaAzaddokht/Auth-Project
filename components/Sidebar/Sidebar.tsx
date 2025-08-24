"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: "⚡"
    }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>🔐</div>
        <h2>Auth</h2>
      </div>
      
      <nav className={styles.navigation}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.href} className={styles.menuItem}>
              <Link 
                href={item.href}
                className={`${styles.menuLink} ${pathname === item.href ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className={styles.footer}>
        <div className={styles.footerText}>v1.0.0</div>
      </div>
    </aside>
  );
}
