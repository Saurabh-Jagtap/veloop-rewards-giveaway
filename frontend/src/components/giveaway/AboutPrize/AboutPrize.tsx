import { FiCheckCircle, FiAward } from "react-icons/fi";

import type { Giveaway } from "../../../data/types";
import styles from "./AboutPrize.module.css";

interface AboutPrizeProps {
  giveaway: Giveaway;
}

const AboutPrize = ({ giveaway }: AboutPrizeProps) => {
  const { prize } = giveaway;

  const features = [
    "6.1-inch Super Retina XDR display",
    "A17 Pro chip with GPU",
    "Pro camera system with 48MP Main",
    "Titanium design. Durable & lightweight",
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.eyebrow}>
              <span className={styles.sparkle}>✦</span>
              <span>About the Prize</span>
            </div>

            <h2 className={styles.title}>{prize.name}</h2>

            <p className={styles.description}>
              {prize.description}
            </p>

            <ul className={styles.features}>
              {features.map((feature) => (
                <li key={feature} className={styles.feature}>
                  <FiCheckCircle aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className={styles.winnerCard}>
              <div className={styles.winnerIcon}>
                <FiAward aria-hidden="true" />
              </div>

              <div className={styles.winnerContent}>
                <span>Number of Winners</span>

                <strong>
                  {giveaway.winnerCount}{" "}
                  {giveaway.winnerCount === 1 ? "Winner" : "Winners"}
                </strong>
              </div>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.imageGlow} />

            <img
              src={prize.image}
              alt={prize.name}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPrize;