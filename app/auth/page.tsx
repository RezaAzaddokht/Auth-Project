"use client";

import React, { useRef, useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import styles from "./auth.module.scss";
import { authFormSchema } from "@/utils/validation";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";

type AuthFormType = z.infer<typeof authFormSchema>;

export default function AuthPage() {
  const { login } = useAuth();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Partial<AuthFormType>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const phone = phoneInputRef.current?.value || "";

    // Validate with Zod
    const result = authFormSchema.safeParse({ phoneNumber: phone });

    if (!result.success) {
      const fieldErrors: Partial<AuthFormType> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "phoneNumber") {
          fieldErrors.phoneNumber = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const json = await res.json();
      const userData = json.results[0];

      if (!userData) {
        setErrors({ phoneNumber: "Failed to fetch user data, please try again." });
        return;
      }

      login(userData);
    } catch {
      setErrors({ phoneNumber: "Network error, please check your connection." });
    } finally {
      setLoading(false);
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

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}