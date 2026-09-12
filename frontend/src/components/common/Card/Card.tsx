import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.css";

interface CardProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

function Card({
  children,
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  const classes = [
    styles.card,
    hoverable ? styles.hoverable : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;