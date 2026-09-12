import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import styles from "./Button.module.css";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;