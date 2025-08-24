import React, { forwardRef } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = "primary", children, ...props }, ref) => (
  <button ref={ref} className={`${styles.button} ${styles[variant]}`} {...props}>
    {children}
  </button>
));

Button.displayName = "Button";

export default Button;