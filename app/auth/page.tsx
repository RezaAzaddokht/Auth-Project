"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import styles from "./auth.module.scss";
import { authFormSchema } from "@/utils/validation";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";

type AuthFormType = z.infer<typeof authFormSchema>;

export default function AuthPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Partial<AuthFormType>>({});
  const [formLoading, setFormLoading] = useState(false);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const phone = phoneInputRef.current?.value || "";
  
    // Validate phone number only
    const validation = authFormSchema.safeParse({ phoneNumber: phone });
    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || "Invalid phone number";
      setErrors({ phoneNumber: errorMessage });
      return;
    }
    setErrors({});
  
    setFormLoading(true);
    try {
      const response = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        const userData = data.results[0];
        login(userData); // Using the full user object from API
      } else {
        setErrors({ phoneNumber: "Failed to fetch user data" });
      }
    } catch {
      setErrors({ phoneNumber: "Network error occurred" });
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <h2 className={styles.title}>Login</h2>

        <Input
          ref={phoneInputRef}
          label="Iranian Mobile Number"
          type="text"
          name="phoneNumber"
          placeholder="09123456789"
          maxLength={11}
          inputMode="numeric"
          error={errors.phoneNumber}
        />

        <Button type="submit" disabled={formLoading}>
          {formLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}