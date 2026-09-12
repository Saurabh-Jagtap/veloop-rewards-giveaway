import type { ReactNode } from "react";
import styles from "./Badge.module.css";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "primary";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={`${styles.badge} ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

export default Badge;