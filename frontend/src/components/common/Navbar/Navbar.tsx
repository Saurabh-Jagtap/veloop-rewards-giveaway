import { Link } from "react-router-dom";
import { FiGift, FiUser } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

import styles from "./Navbar.module.css";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    label: "Giveaways",
    href: "#rewards",
  },
  {
    label: "Winners",
    href: "#winners",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
  },
  {
    label: "Rules",
    href: "#rules",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
  {
    label: "Support",
    href: "#support",
  },
];

function Navbar() {
  const [activeNav, setActiveNav] = useState("Giveaways");

  const navRef = useRef<HTMLElement | null>(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (!navRef.current) return;

    const activeLink = navRef.current.querySelector(
      `.${styles.active}`
    ) as HTMLElement | null;

    if (!activeLink) return;

    setIndicator({
      left: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
    });
  }, [activeNav]);

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.navbarInner}>
          {/* Logo */}
          <Link
            to="/giveaway"
            className={styles.logo}
            aria-label="VELOOP Rewards home"
          >
            <span className={styles.logoMark}>
              <FiGift size={22} strokeWidth={1.8} />
            </span>

            <span className={styles.logoText}>
              <strong>VELOOP</strong>
              <small>REWARDS</small>
            </span>
          </Link>

          {/* Navigation */}
          <nav
            ref={navRef}
            className={styles.navLinks}
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`${styles.navLink} ${activeNav === item.label
                  ? styles.active
                  : ""
                  }`}
                onClick={() => setActiveNav(item.label)}
              >
                {item.label}
              </a>
            ))}

            <span
              className={styles.activeIndicator}
              style={{
                left: `${indicator.left}px`,
                width: `${indicator.width}px`,
              }}
              aria-hidden="true"
            />
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.loginButton}
            >
              <FiUser
                size={18}
                strokeWidth={1.8}
              />

              <span>Login</span>
            </button>

            <button
              type="button"
              className={styles.getStartedButton}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;