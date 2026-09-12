import { Link } from "react-router-dom";
import {
  FiGift,
  FiUser,
} from "react-icons/fi";

import Button from "../Button/Button";

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <Link
          to="/giveaway"
          className={styles.logo}
          aria-label="VELOOP Rewards home"
        >
          <span className={styles.logoMark}>
            <FiGift size={18} />
          </span>

          <span>
            VELOOP
            <small>Rewards</small>
          </span>
        </Link>

        <nav
          className={styles.navLinks}
          aria-label="Main navigation"
        >
          <a href="#rewards">Rewards</a>
          <a href="#how-it-works">
            How It Works
          </a>
          <a href="#winners">Winners</a>
        </nav>

        <div className={styles.actions}>
          <Button variant="ghost">
            <FiUser size={17} />
            Login
          </Button>

          <Button size="sm">
            Join Giveaway
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;