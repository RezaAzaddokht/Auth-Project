import React, { forwardRef } from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => (
  <div className={styles.inputGroup}>
    {label && <label className={styles.label}>{label}</label>}
    <input ref={ref} className={`${styles.input} ${error ? styles.inputError : ""}`} {...props} />
    {error && <small className={styles.error}>{error}</small>}
  </div>
));

Input.displayName = "Input";

export default Input;