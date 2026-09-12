import type { ReactNode } from "react";

import styles from "./IconText.module.css";

interface IconTextProps {
  icon: ReactNode;
  children: ReactNode;
}

function IconText({
  icon,
  children,
}: IconTextProps) {
  return (
    <span className={styles.wrapper}>
      <span
        className={styles.icon}
        aria-hidden="true"
      >
        {icon}
      </span>

      <span>{children}</span>
    </span>
  );
}

export default IconText;