interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

import styles from "./SectionHeading.module.css";

function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className={styles.wrapper}>
      {eyebrow && (
        <span className={styles.eyebrow}>
          {eyebrow}
        </span>
      )}

      <h2 className={styles.title}>
        {title}
      </h2>

      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;