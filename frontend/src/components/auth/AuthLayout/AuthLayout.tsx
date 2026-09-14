import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

export function AuthLayout({
  children,
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthLayoutProps) {
  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <Link to="/giveaway" className={styles.logo}>
          <span className={styles.logoMark}>V</span>
          <span className={styles.logoText}>VELOOP</span>
        </Link>

        <div className={styles.card}>
          <div className={styles.header}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          {children}

          <div className={styles.footer}>
            <span>{footerText}</span>

            <Link to={footerLinkTo}>
              {footerLinkText}
            </Link>
          </div>
        </div>

        <p className={styles.terms}>
          By continuing, you agree to VELOOP&apos;s terms and policies.
        </p>
      </div>
    </main>
  );
}