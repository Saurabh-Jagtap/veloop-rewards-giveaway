import {
  FiAward,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiGift,
  FiSearch,
  FiUserCheck,
} from "react-icons/fi";

import type { Giveaway } from "../../../data/types";
import styles from "./HowThisGiveawayWorks.module.css";

interface HowThisGiveawayWorksProps {
  giveaway: Giveaway;
}

const HowThisGiveawayWorks = ({
  giveaway,
}: HowThisGiveawayWorksProps) => {
  const { entryFee } = giveaway;

  const currencyLabel = {
    VE: "VEs",
    SVE: "SVEs",
    TOKEN: "Tokens",
  }[entryFee.currency];

  const steps = [
    {
      number: "01",
      title: "Review Giveaway",
      description: "Read all details, rules and requirements.",
      icon: FiSearch,
      variant: "purple",
    },
    {
      number: "02",
      title: "Check Eligibility",
      description: "Make sure you meet the eligibility criteria.",
      icon: FiUserCheck,
      variant: "blue",
    },
    {
      number: "03",
      title: "Pay Entry Amount",
      description: `Pay ${entryFee.amount.toLocaleString()} ${currencyLabel} to participate.`,
      icon: FiCreditCard,
      variant: "indigo",
    },
    {
      number: "04",
      title: "Participation Recorded",
      description: "Your participation will be recorded successfully.",
      icon: FiCheckCircle,
      variant: "green",
    },
    {
      number: "05",
      title: "Wait Until It Ends",
      description: "The giveaway runs until the scheduled end time.",
      icon: FiClock,
      variant: "orange",
    },
    {
      number: "06",
      title: "Winner Selected",
      description: "Winner is selected after the giveaway ends.",
      icon: FiAward,
      variant: "gold",
    },
    {
      number: "07",
      title: "Winner Claims Prize",
      description: "Winner verifies and claims the prize.",
      icon: FiGift,
      variant: "pink",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.heading}>
            <span className={styles.headingSpark}>✦</span>

            <h2>How This Giveaway Works</h2>

            <span className={styles.headingSpark}>✦</span>
          </div>

          <div className={styles.timeline}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div className={styles.stepWrapper} key={step.number}>
                  <div className={styles.step}>
                    <div
                      className={`${styles.iconWrapper} ${
                        styles[step.variant]
                      }`}
                    >
                      <Icon aria-hidden="true" />
                    </div>

                    <span className={styles.number}>
                      {step.number}
                    </span>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
                  </div>

                  {!isLast && (
                    <div
                      className={styles.connector}
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowThisGiveawayWorks;